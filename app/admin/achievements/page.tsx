"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ExternalLink, Trophy } from "lucide-react"
import type { Achievement } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "hackathon" as Achievement["category"],
    position: "",
    year: "",
    location: "",
    project_name: "",
    prize: "",
    participants: "",
    date: "",
    image_url: "",
    link_url: "",
    technologies: "",
    color_gradient: "",
  })
  const [error, setError] = useState("")
  const supabase = createClient()

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase.from("achievements").select("*").order("date", { ascending: false })

      if (error) throw error
      setAchievements(data || [])
    } catch (error) {
      console.error("Error fetching achievements:", error)
      setError("Failed to fetch achievements")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const achievementData = {
        ...formData,
        technologies: formData.technologies ? formData.technologies.split(",").map((t) => t.trim()) : [],
      }

      if (editingAchievement) {
        const { error } = await supabase.from("achievements").update(achievementData).eq("id", editingAchievement.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("achievements").insert([achievementData])

        if (error) throw error
      }

      await fetchAchievements()
      resetForm()
      setIsDialogOpen(false)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return

    try {
      const { error } = await supabase.from("achievements").delete().eq("id", id)

      if (error) throw error
      await fetchAchievements()
    } catch (error: any) {
      setError(error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "hackathon",
      position: "",
      year: "",
      location: "",
      project_name: "",
      prize: "",
      participants: "",
      date: "",
      image_url: "",
      link_url: "",
      technologies: "",
      color_gradient: "",
    })
    setEditingAchievement(null)
    setError("")
  }

  const openEditDialog = (achievement: Achievement) => {
    setEditingAchievement(achievement)
    setFormData({
      title: achievement.title,
      description: achievement.description || "",
      category: achievement.category,
      position: achievement.position || "",
      year: achievement.year,
      location: achievement.location || "",
      project_name: achievement.project_name || "",
      prize: achievement.prize || "",
      participants: achievement.participants || "",
      date: achievement.date || "",
      image_url: achievement.image_url || "",
      link_url: achievement.link_url || "",
      technologies: achievement.technologies?.join(", ") || "",
      color_gradient: achievement.color_gradient || "",
    })
    setIsDialogOpen(true)
  }

  if (loading) {
    return <div className="animate-pulse">Loading achievements...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your hackathon wins, awards, and other achievements
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAchievement ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
              <DialogDescription>
                {editingAchievement
                  ? "Update your achievement details below."
                  : "Add a new achievement to your portfolio."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: Achievement["category"]) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="award">Award</SelectItem>
                      <SelectItem value="certification">Certification</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="link_url">Link URL</Label>
                <Input
                  id="link_url"
                  type="text"
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  placeholder="https://github.com/username/project"
                />
              </div>
              
              {/* Hackathon-specific fields */}
              {formData.category === "hackathon" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        placeholder="1st Place, 2nd Place, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="2024"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Online, New York, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project_name">Project Name</Label>
                      <Input
                        id="project_name"
                        value={formData.project_name}
                        onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                        placeholder="Your project name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prize">Prize</Label>
                      <Input
                        id="prize"
                        value={formData.prize}
                        onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                        placeholder="₹35,000, $5,000, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="participants">Participants</Label>
                      <Input
                        id="participants"
                        value={formData.participants}
                        onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                        placeholder="1200+, 500 participants, etc."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="color_gradient">Color Gradient</Label>
                    <Select
                      value={formData.color_gradient}
                      onValueChange={(value) => setFormData({ ...formData, color_gradient: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a gradient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="from-yellow-400 to-orange-500">Yellow to Orange (Gold)</SelectItem>
                        <SelectItem value="from-blue-400 to-purple-500">Blue to Purple</SelectItem>
                        <SelectItem value="from-green-400 to-blue-500">Green to Blue</SelectItem>
                        <SelectItem value="from-pink-400 to-red-500">Pink to Red</SelectItem>
                        <SelectItem value="from-purple-400 to-pink-500">Purple to Pink</SelectItem>
                        <SelectItem value="from-indigo-400 to-blue-500">Indigo to Blue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingAchievement ? "Update" : "Create"} Achievement</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {achievement.title}
                      <Badge variant="secondary">{achievement.category}</Badge>
                    </CardTitle>
                    <CardDescription>{achievement.date ? new Date(achievement.date).toLocaleDateString() : 'No date'}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {achievement.link_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={achievement.link_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(achievement)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(achievement.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {achievement.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
                )}
                {achievement.technologies && achievement.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {achievement.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Trophy className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No achievements yet</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                Start by adding your first hackathon win or achievement.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Achievement
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
