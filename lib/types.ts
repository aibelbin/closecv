export interface Achievement {
  id: string
  title: string
  description?: string
  category: "hackathon" | "award" | "certification" | "other"
  position?: string // '1st Place', '2nd Place', etc.
  year: string
  location?: string
  project_name?: string
  prize?: string
  participants?: string
  date?: string
  image_url?: string
  link_url?: string
  github_url?: string
  technologies?: string[]
  color_gradient?: string
  created_at: string
  updated_at: string
}

export interface Talk {
  id: string
  title: string
  type: string // talk ano or workshop ano etc etc
  topic?: string
  period?: string
  location?: string
  audience?: string
  achievements?: string[]
  color_gradient?: string
  description?: string
  image_url?: string
  link_url?: string
  created_at: string
  updated_at: string
}

export interface Stat {
  id: string
  key: string
  value: string
  label: string
  icon_name?: string
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
  category: string
  proficiency?: number
  icon_name?: string
  created_at: string
}

export interface Research {
  id: string
  title: string
  description: string
  icon_name?: string
  featured: boolean
  created_at: string
  updated_at: string
}
