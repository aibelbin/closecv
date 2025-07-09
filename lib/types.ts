export interface Achievement {
  id: string
  title: string
  description?: string
  category: "hackathon" | "award" | "certification" | "other"
  date: string
  image_url?: string
  link_url?: string
  technologies?: string[]
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description?: string
  long_description?: string
  image_url?: string
  demo_url?: string
  github_url?: string
  technologies?: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: "frontend" | "backend" | "tools" | "other"
  proficiency: number
  icon_name?: string
  created_at: string
}
