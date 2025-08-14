"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, MapPin, Users, Gift, ExternalLink, Github } from "lucide-react"
import type { Achievement } from "@/lib/types"
import hackathonsData from "@/data/hackathons.json"

export default function HackathonWins() {
  const [hackathons, setHackathons] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const data = (hackathonsData as unknown as Achievement[]).filter(h => h.category === "hackathon")
      // Sort by year desc (string)
      data.sort((a, b) => (parseInt(b.year || "0") - parseInt(a.year || "0")))
      setHackathons(data)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hackathon Victories</h2>
            <div className="animate-pulse">Loading hackathon wins...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Hackathon Victories</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Turning ideas into winning solutions across the globe
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {hackathons.map((hackathon, index) => (
            <Card
              key={hackathon.id}
              className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0"
            >
              <div className={`h-2 bg-gradient-to-r ${hackathon.color_gradient || "from-blue-400 to-purple-500"}`} />
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-full bg-gradient-to-r ${
                        hackathon.color_gradient || "from-blue-400 to-purple-500"
                      }`}
                    >
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {hackathon.position}
                      </Badge>
                      <h3 className="text-xl font-bold">{hackathon.title}</h3>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-400">{hackathon.year}</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{hackathon.project_name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{hackathon.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {hackathon.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{hackathon.location}</span>
                      </div>
                    )}
                    {hackathon.participants && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{hackathon.participants} participants</span>
                      </div>
                    )}
                    {hackathon.prize && (
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold text-green-600">{hackathon.prize}</span>
                      </div>
                    )}
                  </div>

                  {hackathon.technologies && hackathon.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {hackathon.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {hackathon.github_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={hackathon.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {hackathon.link_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={hackathon.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Project
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
