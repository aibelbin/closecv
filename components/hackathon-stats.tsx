"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Award, Users, Target } from "lucide-react"
import type { Stat } from "@/lib/types"

// Icon mapping
const iconMap = {
  Trophy,
  Award,
  Users,
  Target,
}

export default function HackathonStats() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.from("stats").select("*").order("created_at", { ascending: true })

        if (error) throw error
        setStats(data || [])
      } catch (error) {
        console.error("Error fetching stats:", error)
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
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 text-center">
              <div className="h-8 w-8 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="h-8 w-16 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-4 w-20 bg-gray-300 rounded mx-auto"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat) => {
        const IconComponent = stat.icon_name ? iconMap[stat.icon_name as keyof typeof iconMap] : Trophy

        return (
          <Card key={stat.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
