"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, ExternalLink } from "lucide-react"
import type { Achievement } from "@/lib/types"
import Image from "next/image"

export default function PortfolioAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data, error } = await supabase.from("achievements").select("*").order("date", { ascending: false })

        if (error) throw error
        setAchievements(data || [])
      } catch (error) {
        console.error("Error fetching achievements:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [supabase])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Achievements</h2>
            <div className="animate-pulse">Loading achievements...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Achievements</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">My journey of wins, awards, and recognitions</p>
        </div>

        {achievements.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="group hover:shadow-lg transition-shadow">
                {achievement.image_url && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={achievement.image_url || "/placeholder.svg"}
                      alt={achievement.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <Badge variant="secondary">{achievement.category}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{achievement.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {achievement.date ? new Date(achievement.date).toLocaleDateString() : 'No date'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {achievement.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{achievement.description}</p>
                  )}

                  {achievement.technologies && achievement.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {achievement.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {achievement.link_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={achievement.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Details
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No achievements yet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for updates on my latest accomplishments!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
