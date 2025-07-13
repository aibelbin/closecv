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
        self.groq_client = Groq(api_key=self.groq_api_key)
        self.hackathon_keywords = [
            'hackathon', 'devpost', 'submission', '24 hour', '48 hour',
            'built in', 'hack', 'datathon', 'makeathon', 'code jam',
            'programming contest', 'coding competition', 'tech challenge',
            'nasa space apps', 'space apps', 'crushathon', 'top 100 coders'
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
            raise ValueError(f"missing required environment variables: {', '.join(missing_vars)}")

    async def fetch_github_repos(self) -> List[Dict[str, Any]]:
        print("fetching github repositories...")
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
                        raise Exception(f"github api error: {response.status}")
                    data = await response.json()
                    if not data:
                        break
                    repos.extend(data)
                    page += 1
        print(f"found {len(repos)} repositories")
        return repos

    async def fetch_readme_content(self, repo: Dict[str, Any]) -> Optional[str]:
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
        for keyword in self.hackathon_keywords:
            if keyword in combined_text:
                return True
        return False

    async def extract_hackathon_data(self, repo: Dict[str, Any], readme_content: str) -> Optional[HackathonProject]:
        print(f"analyzing {repo['name']} with ai...")
        prompt = f"""analyze this github repository and extract hackathon information as json.

repository: {repo['name']}
description: {repo.get('description', 'no description')}
created: {repo['created_at']}

readme (first 1500 chars):
{readme_content[:1500]}

return only valid json with these fields (use null for missing data):
{{
    "title": "hackathon event name",
    "project_name": "project name", 
    "year": 2024,
    "description": "brief description",
    "location": "location if mentioned",
    "participants": 100,
    "prize": "prize if mentioned",
    "technologies": ["tech1", "tech2"],
    "position": "place/rank if mentioned",
    "link_url": "demo url if mentioned"
}}

if not a hackathon project, return: {{"is_hackathon": false}}"""
        try:
            response = self.groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "system", 
                        "content": "you are an expert at analyzing hackathon projects. return only valid json. no explanations or markdown formatting."
                    },
                    {"role": "user", "content": prompt}
                ],
                model="llama-3.1-8b-instant",
                temperature=0.1,
                max_tokens=400
            )
            content = response.choices[0].message.content.strip()
            print(f"raw ai response for {repo['name']}: {content}")
            if content.startswith('```json'):
                content = content.replace('```json', '').replace('```', '').strip()
            elif content.startswith('```'):
                content = content.replace('```', '').strip()
            if not content or content.lower().strip() in ['null', 'none', '']:
                print(f"ai returned empty response for {repo['name']}")
                return None
            try:
                data = json.loads(content)
            except json.JSONDecodeError as json_error:
                print(f"json parsing error for {repo['name']}: {json_error}")
                print(f"content was: {content}")
                return None
            if data.get('is_hackathon') == False:
                print(f"ai determined {repo['name']} is not a hackathon project")
                return None
            if not data.get('title') and not data.get('project_name'):
                print(f"missing required fields for {repo['name']}")
                return None
            project = HackathonProject(
                title=data.get('title', repo['name']),
                project_name=data.get('project_name', repo['name']),
                year=data.get('year', datetime.fromisoformat(repo['created_at'].replace('Z', '+00:00')).year),
                description=data.get('description', repo.get('description', ''))[:500],
                location=data.get('location'),
                participants=data.get('participants'),
                prize=data.get('prize'),
                technologies=data.get('technologies', []) if data.get('technologies') else [],
                github_url=repo['html_url'],
                link_url=data.get('link_url'),
                position=data.get('position'),
                color_gradient=self.color_gradients[hash(data.get('title', repo['name'])) % len(self.color_gradients)]
            )
            print(f"successfully parsed data for {repo['name']}: {project.title}")
            return project
        except Exception as e:
            print(f"error analyzing {repo['name']}: {e}")
            print(f"error type: {type(e).__name__}")
            if "hackathon" in repo['name'].lower() or "nasa" in repo['name'].lower():
                print(f"creating fallback project for {repo['name']}")
                return HackathonProject(
                    title=repo['name'].replace('_', ' ').replace('-', ' ').title(),
                    project_name=repo['name'],
                    year=datetime.fromisoformat(repo['created_at'].replace('Z', '+00:00')).year,
                    description=repo.get('description', f"hackathon project: {repo['name']}")[:500],
                    github_url=repo['html_url'],
                    color_gradient=self.color_gradients[hash(repo['name']) % len(self.color_gradients)]
                )
            return None

    async def save_to_supabase(self, project: HackathonProject) -> bool:
        if self.dry_run:
            print(f"dry run - would save: {project.title}")
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
                'date': f"{project.year}-01-01"
            }
            result = self.supabase.table('achievements').insert(data).execute()
            if result.data:
                print(f"saved: {project.title}")
                return True
            else:
                print(f"failed to save: {project.title}")
                return False
        except Exception as e:
            print(f"error saving {project.title}: {e}")
            return False

    async def run(self):
        print("starting github hackathon importer...")
        print(f"mode: {'dry run' if self.dry_run else 'live'}")
        try:
            repos = await self.fetch_github_repos()
            hackathon_projects = []
            processed = 0
            for repo in repos:
                processed += 1
                print(f"processing {processed}/{len(repos)}: {repo['name']}")
                readme_content = await self.fetch_readme_content(repo)
                if self.is_hackathon_project(repo, readme_content):
                    print(f"detected hackathon project: {repo['name']}")
                    if readme_content:
                        project = await self.extract_hackathon_data(repo, readme_content)
                        if project:
                            hackathon_projects.append(project)
                            await self.save_to_supabase(project)
                    else:
                        print(f"no readme found for {repo['name']}, creating fallback...")
                        if any(keyword in repo['name'].lower() for keyword in ['hackathon', 'nasa', 'space-apps', 'crushathon']):
                            project = HackathonProject(
                                title=repo['name'].replace('_', ' ').replace('-', ' ').title(),
                                project_name=repo['name'],
                                year=datetime.fromisoformat(repo['created_at'].replace('Z', '+00:00')).year,
                                description=repo.get('description', f"hackathon project: {repo['name']}")[:500],
                                github_url=repo['html_url'],
                                color_gradient=self.color_gradients[hash(repo['name']) % len(self.color_gradients)]
                            )
                            hackathon_projects.append(project)
                            await self.save_to_supabase(project)
                await asyncio.sleep(0.5)
            print(f"\nsummary:")
            print(f"total repositories: {len(repos)}")
            print(f"hackathon projects found: {len(hackathon_projects)}")
            print(f"projects saved: {len(hackathon_projects) if not self.dry_run else 0}")
            if self.dry_run:
                print("\nthis was a dry run. set dry_run=false to actually save data.")
            if hackathon_projects:
                print(f"\nfound hackathon projects:")
                for project in hackathon_projects:
                    print(f"   • {project.title} ({project.year}) - {project.position or 'no position'}")
            else:
                print(f"\ntips for better detection:")
                print(f"make sure repo names/descriptions contain hackathon keywords")
                print(f"add readme files to your hackathon projects")
                print(f"include words like 'hackathon', 'devpost', 'nasa space apps', etc.")
        except Exception as e:
            print(f"fatal error: {e}")
            import traceback
            traceback.print_exc()

async def main():
    dry_run = True
    importer = GitHubHackathonImporter(dry_run=dry_run)
    await importer.run()

if __name__ == "__main__":
    asyncio.run(main())
