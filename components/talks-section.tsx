"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, CheckCircle } from "lucide-react"
import type { Talk } from "@/lib/types"

export default function TalksSection() {
  const [talks, setTalks] = useState<Talk[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchTalks = async () => {
      try {
        const { data, error } = await supabase.from("talks").select("*").order("period", { ascending: false })

        if (error) throw error
        setTalks(data || [])
      } catch (error) {
        console.error("Error fetching talks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTalks()
  }, [supabase])

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Speaking Engagements</h2>
            <div className="animate-pulse">Loading talks...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Speaking Engagements</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Sharing knowledge and inspiring the next generation of innovators
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talks.map((talk) => (
            <Card key={talk.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${talk.color_gradient || "from-blue-500 to-purple-600"}`} />
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{talk.type}</Badge>
                  {talk.period && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {talk.period}
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{talk.title}</CardTitle>
                {talk.topic && <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{talk.topic}</p>}
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {talk.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{talk.location}</span>
                    </div>
                  )}
                  {talk.audience && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{talk.audience}</span>
                    </div>
                  )}
                </div>

                {talk.description && <p className="text-gray-600 dark:text-gray-400 mb-4">{talk.description}</p>}

                {talk.achievements && talk.achievements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Highlights:</h4>
                    <div className="space-y-1">
                      {talk.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
