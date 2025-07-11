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
import { Plus, Edit, Trash2, ExternalLink, Mic } from "lucide-react"
import type { Talk } from "@/lib/types"
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

export default function TalksPage() {
  const [talks, setTalks] = useState<Talk[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTalk, setEditingTalk] = useState<Talk | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    topic: "",
    period: "",
    location: "",
    audience: "",
    achievements: "",
    color_gradient: "",
    description: "",
    image_url: "",
    link_url: "",
  })
  const [error, setError] = useState("")
  const supabase = createClient()

  useEffect(() => {
    fetchTalks()
  }, [])

  const fetchTalks = async () => {
    try {
      const { data, error } = await supabase.from("talks").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setTalks(data || [])
    } catch (error) {
      console.error("Error fetching talks:", error)
      setError("Failed to fetch talks")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const talkData = {
        ...formData,
        achievements: formData.achievements ? formData.achievements.split(",").map((a) => a.trim()) : [],
      }

      if (editingTalk) {
        const { error } = await supabase.from("talks").update(talkData).eq("id", editingTalk.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("talks").insert([talkData])
        if (error) throw error
      }

      await fetchTalks()
      resetForm()
      setIsDialogOpen(false)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this talk?")) return

    try {
      const { error } = await supabase.from("talks").delete().eq("id", id)
      if (error) throw error
      await fetchTalks()
    } catch (error: any) {
      setError(error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      topic: "",
      period: "",
      location: "",
      audience: "",
      achievements: "",
      color_gradient: "",
      description: "",
      image_url: "",
      link_url: "",
    })
    setEditingTalk(null)
    setError("")
  }

  const openEditDialog = (talk: Talk) => {
    setEditingTalk(talk)
    setFormData({
      title: talk.title,
      type: talk.type,
      topic: talk.topic || "",
      period: talk.period || "",
      location: talk.location || "",
      audience: talk.audience || "",
      achievements: talk.achievements?.join(", ") || "",
      color_gradient: talk.color_gradient || "",
      description: talk.description || "",
      image_url: talk.image_url || "",
      link_url: talk.link_url || "",
    })
    setIsDialogOpen(true)
  }

  if (loading) {
    return <div className="animate-pulse">Loading talks...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Talks & Speaking</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your speaking engagements and talks
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Talk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTalk ? "Edit Talk" : "Add New Talk"}</DialogTitle>
              <DialogDescription>
                {editingTalk ? "Update your talk details below." : "Add a new speaking engagement to your portfolio."}
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
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Technical Talk, Workshop, etc."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="Main topic or theme"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2024, Q1 2024, etc."
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
                    placeholder="Online, Conference Name, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Input
                    id="audience"
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    placeholder="Developers, Students, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of the talk"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements (comma-separated)</Label>
                <Input
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  placeholder="200+ Attendees, Interactive Q&A, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="link_url">Link URL</Label>
                  <Input
                    id="link_url"
                    type="text"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    placeholder="https://example.com/talk"
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
                    <SelectItem value="from-red-500 to-orange-500">Red to Orange</SelectItem>
                    <SelectItem value="from-blue-500 to-purple-500">Blue to Purple</SelectItem>
                    <SelectItem value="from-green-400 to-blue-500">Green to Blue</SelectItem>
                    <SelectItem value="from-yellow-500 to-blue-500">Yellow to Blue</SelectItem>
                    <SelectItem value="from-purple-400 to-pink-500">Purple to Pink</SelectItem>
                    <SelectItem value="from-indigo-400 to-blue-500">Indigo to Blue</SelectItem>
                  </SelectContent>
                </Select>
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
                <Button type="submit">{editingTalk ? "Update" : "Create"} Talk</Button>
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
        {talks.length > 0 ? (
          talks.map((talk) => (
            <Card key={talk.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {talk.title}
                      <Badge variant="secondary">{talk.type}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {talk.topic && `${talk.topic} • `}
                      {talk.period && `${talk.period} • `}
                      {talk.location}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {talk.link_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={talk.link_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(talk)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(talk.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {talk.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{talk.description}</p>
                )}
                {talk.audience && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <strong>Audience:</strong> {talk.audience}
                  </p>
                )}
                {talk.achievements && talk.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {talk.achievements.map((achievement, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {achievement}
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
              <Mic className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No talks yet</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                Start by adding your first speaking engagement.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Talk
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
