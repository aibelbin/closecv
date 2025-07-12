import os
import asyncio
import aiohttp
import json
import re
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from supabase import create_client, Client
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

@dataclass
class HackathonProject:
    title: str
    project_name: str
    year: int
    description: str
    location: Optional[str] = None
    participants: Optional[int] = None
    prize: Optional[str] = None
    technologies: Optional[List[str]] = None
    github_url: str = ""
    link_url: Optional[str] = None
    category: str = "hackathon"
    position: Optional[str] = None
    color_gradient: str = "from-blue-400 to-purple-500"

class GitHubHackathonImporter:
    def __init__(self, dry_run: bool = True):
        self.dry_run = dry_run
        self.github_token = os.getenv('GITHUB_TOKEN')
        self.groq_api_key = os.getenv('GROQ_API_KEY')
        self.supabase_url = os.getenv('SUPABASE_URL')
        self.supabase_key = os.getenv('SUPABASE_ANON_KEY')
        self._validate_env_vars()
        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
        # .api_key = self.groq_api_key
        self.hackathon_keywords = [
            'hackathon', 'devpost', 'submission', '24 hour', '48 hour',
            'built in', 'hack', 'datathon', 'makeathon', 'code jam',
            'programming contest', 'coding competition', 'tech challenge'
        ]
        self.color_gradients = [
            "from-blue-400 to-purple-500",
            "from-green-400 to-blue-500", 
            "from-purple-400 to-pink-500",
            "from-yellow-400 to-red-500",
            "from-indigo-400 to-purple-500",
            "from-pink-400 to-red-500"
        ]

    def _validate_env_vars(self):
        required_vars = ['GITHUB_TOKEN', 'GROQ_API_KEY', 'SUPABASE_URL', 'SUPABASE_ANON_KEY']
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

    async def fetch_github_repos(self) -> List[Dict[str, Any]]:
        headers = {
            'Authorization': f'token {self.github_token}',
            'Accept': 'application/vnd.github.v3+json'
        }
        repos = []
        page = 1
        async with aiohttp.ClientSession() as session:
            while True:
                url = f'https://api.github.com/user/repos?page={page}&per_page=100&type=all'
                async with session.get(url, headers=headers) as response:
                    if response.status != 200:
                        raise Exception(f"GitHub API error: {response.status}")
                    data = await response.json()
                    if not data:
                        break
                    repos.extend(data)
                    page += 1
        return repos

        repos = []
        page = 1
        
        async with aiohttp.ClientSession() as session:
            while True:
                url = f'https://api.github.com/user/repos?page={page}&per_page=100&type=all'
                
                async with session.get(url, headers=headers) as response:
                    if response.status != 200:
                        raise Exception(f"GitHub API error: {response.status}")
                    
                    data = await response.json()
                    if not data:
                        break
                    
                    repos.extend(data)
                    page += 1
        
        print(f" Found {len(repos)} repositories")
        return repos

    async def fetch_readme_content(self, repo: Dict[str, Any]) -> Optional[str]:
        """Fetch README content from a repository"""
        headers = {
            'Authorization': f'token {self.github_token}',
            'Accept': 'application/vnd.github.v3+json'
        }
        
        readme_files = ['README.md', 'readme.md', 'README.MD', 'README.txt', 'README']
        
        async with aiohttp.ClientSession() as session:
            for readme_file in readme_files:
                url = f"https://api.github.com/repos/{repo['full_name']}/contents/{readme_file}"
                
                try:
                    async with session.get(url, headers=headers) as response:
                        if response.status == 200:
                            data = await response.json()
                            if data.get('content'):
                                import base64
                                content = base64.b64decode(data['content']).decode('utf-8')
                                return content
                except Exception:
                    continue
        
        return None

    def is_hackathon_project(self, repo: Dict[str, Any], readme_content: Optional[str]) -> bool:
       
        text_to_check = []
        
       
        if repo.get('name'):
            text_to_check.append(repo['name'].lower())
        if repo.get('description'):
            text_to_check.append(repo['description'].lower())
        if readme_content:
            text_to_check.append(readme_content.lower())
        
        combined_text = ' '.join(text_to_check)
        
        # Check for hackathon keywords
        for keyword in self.hackathon_keywords:
            if keyword in combined_text:
                return True
        
        return False

    async def extract_hackathon_data(self, repo: Dict[str, Any], readme_content: str) -> Optional[HackathonProject]:
        """Use OpenAI to extract structured hackathon data"""
        print(f" Analyzing {repo['name']} with AI...")
        
        prompt = f"""
        Analyze this GitHub repository and README content to extract hackathon project information.
        
        Repository Name: {repo['name']}
        Repository Description: {repo.get('description', 'No description')}
        Repository URL: {repo['html_url']}
        Created: {repo['created_at']}
        
        README Content:
        {readme_content[:3000]}  # Limit content to avoid token limits
        
        Extract the following information and return as JSON:
        {{
            "title": "Hackathon name or event title",
            "project_name": "Specific project name",
            "year": 2024,
            "description": "Brief project description",
            "location": "City/Online/etc (if mentioned)",
            "participants": 100,
            "prize": "Prize amount or position (if mentioned)",
            "technologies": ["React", "Node.js", "etc"],
            "position": "1st Place/2nd Place/Winner/etc (if mentioned)",
            "link_url": "Demo/live project URL (if mentioned in README)"
        }}
        
        Only include fields where you can find clear evidence. Set missing fields to null.
        If this doesn't appear to be a hackathon project, return null.
        """
        
        try:

            client = Groq(api_key=os.environ.get("GROQ_API_KEY"),)


            response = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are an expert at analyzing hackathon projects and extracting structured data. Return valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                model="llama-3.3-70b-versatile",
                stream = False
            )
            
            content = response.choices[0].message.content.strip()
            
            # Parse JSON response
            if content.lower() == 'null' or not content:
                return None
            
            data = json.loads(content)
            
            # Create HackathonProject with extracted data
            return HackathonProject(
                title=data.get('title', repo['name']),
                project_name=data.get('project_name', repo['name']),
                year=data.get('year', datetime.fromisoformat(repo['created_at'].replace('Z', '+00:00')).year),
                description=data.get('description', repo.get('description', '')),
                location=data.get('location'),
                participants=data.get('participants'),
                prize=data.get('prize'),
                technologies=data.get('technologies', []),
                github_url=repo['html_url'],
                link_url=data.get('link_url'),
                position=data.get('position'),
                color_gradient=self.color_gradients[len(data.get('title', '')) % len(self.color_gradients)]
            )
            
        except Exception as e:
            print(f"❌ Error analyzing {repo['name']}: {e}")
            return None

    async def save_to_supabase(self, project: HackathonProject) -> bool:
        """Save hackathon project to Supabase"""
        if self.dry_run:
            print(f"🧪 DRY RUN - Would save: {project.title}")
            return True
        
        try:
            data = {
                'title': project.title,
                'project_name': project.project_name,
                'year': str(project.year),
                'description': project.description,
                'category': project.category,
                'location': project.location,
                'participants': str(project.participants) if project.participants else None,
                'prize': project.prize,
                'technologies': project.technologies or [],
                'github_url': project.github_url,
                'link_url': project.link_url,
                'position': project.position,
                'color_gradient': project.color_gradient,
                'date': f"{project.year}-01-01"  # Default date
            }
            
            result = self.supabase.table('achievements').insert(data).execute()
            
            if result.data:
                print(f"✅ Saved: {project.title}")
                return True
            else:
                print(f"❌ Failed to save: {project.title}")
                return False
                
        except Exception as e:
            print(f"❌ Error saving {project.title}: {e}")
            return False

    async def run(self):
        """Main execution method"""
        print("🚀 Starting GitHub Hackathon Importer...")
        print(f"📋 Mode: {'DRY RUN' if self.dry_run else 'LIVE'}")
        
        try:
            # Fetch all repositories
            repos = await self.fetch_github_repos()
            
            hackathon_projects = []
            processed = 0
            
            # Process each repository
            for repo in repos:
                processed += 1
                print(f"📊 Processing {processed}/{len(repos)}: {repo['name']}")
                
                # Fetch README content
                readme_content = await self.fetch_readme_content(repo)
                
                # Check if it's a hackathon project
                if self.is_hackathon_project(repo, readme_content):
                    print(f"🎯 Detected hackathon project: {repo['name']}")
                    
                    if readme_content:
                        # Extract structured data with AI
                        project = await self.extract_hackathon_data(repo, readme_content)
                        
                        if project:
                            hackathon_projects.append(project)
                            await self.save_to_supabase(project)
                    else:
                        print(f"⚠️  No README found for {repo['name']}")
                
                # Add delay to respect rate limits
                await asyncio.sleep(0.5)
            
            # Summary
            print(f"\n📈 Summary:")
            print(f"   📦 Total repositories: {len(repos)}")
            print(f"   🎯 Hackathon projects found: {len(hackathon_projects)}")
            print(f"   💾 Projects saved: {len(hackathon_projects) if not self.dry_run else 0}")
            
            if self.dry_run:
                print("\n🧪 This was a dry run. Set dry_run=False to actually save data.")
            
        except Exception as e:
            print(f"❌ Fatal error: {e}")

async def main():
    """Entry point"""
    # Set to False when you're ready to actually import data
    DRY_RUN = True
    
    importer = GitHubHackathonImporter(dry_run=DRY_RUN)
    await importer.run()

if __name__ == "__main__":
    asyncio.run(main())