// Migration script to populate database with existing hardcoded data
// Run this once to migrate your data to Supabase

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Your existing hackathon data
const hackathonWins = [
  {
    title: "Nasa Space Apps Hackathon",
    position: "1st Place",
    year: "2024",
    location: "Amal Jyothi College of engineering",
    project_name: "Waste reduction and poverty management software",
    description: "Built a website which lets restaurants donate unsold food at the end of the day to the poor",
    prize: "₹35,000",
    participants: "1200+",
    technologies: ["React", "Python", "supabase"],
    color_gradient: "from-yellow-400 to-orange-500",
    link_url: "https://github.com/aibelbin/nasa-space-apps-project",
    date: "2024-10-01",
    category: "hackathon" as const
  },
  {
    title: "Gen AI International Hackathon",
    position: "5th Place",
    year: "2024",
    location: "Online",
    project_name: "NewsRag",
    description: "AI-powered news generation software",
    prize: "₹65,000",
    participants: "300+",
    technologies: ["Next.js", "Hugging Faces", "AWS", "SupaBase"],
    color_gradient: "from-blue-400 to-purple-500",
    link_url: "https://github.com/aibelbin/newsrag",
    date: "2024-11-15",
    category: "hackathon" as const
  },
  {
    title: "TinkHack",
    position: "2nd Place",
    year: "2025",
    location: "Model Engineering College",
    project_name: "LogiScale",
    description: "Created a map system from scratch with better location provider and heatmaps based on cctv footages",
    prize: "₹25,000",
    participants: "800+",
    technologies: ["TypeScript", "Python", "Yolo V8", "SupaBase"],
    color_gradient: "from-green-400 to-blue-500",
    link_url: "https://github.com/aibelbin/logiscale",
    date: "2025-01-20",
    category: "hackathon" as const
  },
  {
    title: "Useless Projects",
    position: "Winner",
    year: "2025",
    location: "Online",
    project_name: "Appam Thinnam Kuzhi Ennam",
    description: "Created a funny program to read the number of holes in an appam",
    prize: "₹32,000",
    participants: "1500+",
    technologies: ["React Native", "Python", "Streamlit", "SupaBase"],
    color_gradient: "from-pink-400 to-red-500",
    link_url: "https://github.com/aibelbin/appam-hole-counter",
    date: "2025-02-10",
    category: "hackathon" as const
  },
]

// Your hackathon stats
const hackathonStats = [
  { key: "hackathons_won", value: "4", label: "Hackathons Won", icon_name: "Trophy" },
  { key: "current_streak", value: "4", label: "Current Streak", icon_name: "Award" },
  { key: "cities_visited", value: "3", label: "Cities Visited", icon_name: "Users" },
  { key: "latest_win", value: "2025", label: "Latest Win", icon_name: "Target" },
]

async function migrateData() {
  console.log('Starting data migration...')

  try {
    // Insert achievements
    console.log('Inserting achievements...')
    const { data: achievementsData, error: achievementsError } = await supabase
      .from('achievements')
      .insert(hackathonWins)
      .select()

    if (achievementsError) {
      console.error('Error inserting achievements:', achievementsError)
      return
    }

    console.log('✅ Achievements inserted successfully:', achievementsData?.length)

    // Insert stats
    console.log('Inserting stats...')
    const { data: statsData, error: statsError } = await supabase
      .from('stats')
      .insert(hackathonStats)
      .select()

    if (statsError) {
      console.error('Error inserting stats:', statsError)
      return
    }

    console.log('✅ Stats inserted successfully:', statsData?.length)
    console.log('🎉 Migration completed successfully!')

  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run migration
migrateData()
