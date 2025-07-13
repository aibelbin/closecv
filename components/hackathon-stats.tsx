"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Trophy, Award, Users, Target } from "lucide-react"
import type { Achievement } from "@/lib/types"

interface StatItem {
  id: string
  value: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export default function HackathonStats() {
  const [stats, setStats] = useState<StatItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch achievements to calculate stats
        const { data, error } = await supabase
          .from("achievements")
          .select("*")
          .eq("category", "hackathon")

        if (error) throw error

        const achievements = data || []
        
        // Calculate stats from achievements data
        const totalWins = achievements.length
        const firstPlaceWins = achievements.filter(a => 
          a.title.toLowerCase().includes("1st") || 
          a.title.toLowerCase().includes("first") ||
          a.title.toLowerCase().includes("winner")
        ).length
        const teamEvents = achievements.filter(a => 
          a.description?.toLowerCase().includes("team") ||
          a.title.toLowerCase().includes("team")
        ).length
        const soloEvents = totalWins - teamEvents

        const calculatedStats: StatItem[] = [
          {
            id: "1",
            value: totalWins.toString(),
            label: "Hackathon Wins",
            icon: Trophy
          },
          {
            id: "2", 
            value: firstPlaceWins.toString(),
            label: "First Place",
            icon: Award
          },
          {
            id: "3",
            value: teamEvents.toString(),
            label: "Team Events", 
            icon: Users
          },
          {
            id: "4",
            value: soloEvents.toString(),
            label: "Solo Events",
            icon: Target
          }
        ]

        setStats(calculatedStats)
      } catch (error) {
        console.error("Error fetching stats:", error)
        // Set default stats if there's an error
        setStats([
          { id: "1", value: "0", label: "Hackathon Wins", icon: Trophy },
          { id: "2", value: "0", label: "First Place", icon: Award },
          { id: "3", value: "0", label: "Team Events", icon: Users },
          { id: "4", value: "0", label: "Solo Events", icon: Target }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="text-center p-6 border border-gray-800 rounded-lg bg-gray-900">
              <div className="h-8 w-8 bg-gray-700 rounded-full mx-auto mb-4"></div>
              <div className="h-8 w-16 bg-gray-700 rounded mx-auto mb-2"></div>
              <div className="h-4 w-20 bg-gray-700 rounded mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat) => {
        const IconComponent = stat.icon

        return (
          <div key={stat.id} className="text-center p-6 border border-gray-800 rounded-lg bg-gray-900 hover:border-blue-500 transition-colors group">
            <div className="mb-3">
              <IconComponent className="h-8 w-8 mx-auto text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-bold mb-2 text-blue-400">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        )
      })}
    </div>
  )
}
