"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Brain, Users } from "lucide-react"
import type { Research } from "@/lib/types"
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

export default function ResearchPage() {
  const [research, setResearch] = useState<Research[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingResearch, setEditingResearch] = useState<Research | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon_name: "",
    featured: false,
  })
  const [error, setError] = useState("")
  const supabase = createClient()

  useEffect(() => {
    fetchResearch()
  }, [])

  const fetchResearch = async () => {
    try {
      const { data, error } = await supabase
        .from("research")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })

      if (error) throw error
      setResearch(data || [])
    } catch (error) {
      console.error("Error fetching research:", error)
      setError("Failed to fetch research")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon_name: "",
      featured: false,
    })
    setEditingResearch(null)
    setError("")
  }

  const openDialog = (research?: Research) => {
    if (research) {
      setEditingResearch(research)
      setFormData({
        title: research.title,
        description: research.description,
        icon_name: research.icon_name || "",
        featured: research.featured,
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required")
      return
    }

    try {
      if (editingResearch) {
        // Update existing research
        const { error } = await supabase
          .from("research")
          .update({
            title: formData.title,
            description: formData.description,
            icon_name: formData.icon_name || null,
            featured: formData.featured,
          })
          .eq("id", editingResearch.id)

        if (error) throw error
      } else {
        // Create new research
        const { error } = await supabase.from("research").insert([
          {
            title: formData.title,
            description: formData.description,
            icon_name: formData.icon_name || null,
            featured: formData.featured,
          },
        ])

        if (error) throw error
      }

      await fetchResearch()
      closeDialog()
    } catch (error) {
      console.error("Error saving research:", error)
      setError("Failed to save research")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this research area?")) return

    try {
      const { error } = await supabase.from("research").delete().eq("id", id)

      if (error) throw error

      await fetchResearch()
    } catch (error) {
      console.error("Error deleting research:", error)
      setError("Failed to delete research")
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain":
        return <Brain className="h-12 w-12 text-purple-400" />
      case "Users":
        return <Users className="h-12 w-12 text-purple-400" />
      default:
        return <Brain className="h-12 w-12 text-purple-400" />
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading research...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Research Management</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your research areas and academic interests
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Research
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingResearch ? "Edit Research Area" : "Add New Research Area"}</DialogTitle>
              <DialogDescription>
                {editingResearch
                  ? "Update the research area information below."
                  : "Add a new research area to your portfolio."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {error && (
                  <Alert>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Non-Invasive Brain Computer Interfacing"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your research area and what you're working on..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon_name">Icon Name</Label>
                  <Input
                    id="icon_name"
                    value={formData.icon_name}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    placeholder="Brain, Users, Code, etc."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured Research</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button type="submit">{editingResearch ? "Update" : "Create"} Research</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Research Areas Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {research.map((area) => (
          <Card key={area.id} className="relative hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {area.icon_name && getIcon(area.icon_name)}
                  {area.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDialog(area)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(area.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{area.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{area.description}</p>
              {area.icon_name && (
                <div className="mt-4 text-xs text-gray-500">Icon: {area.icon_name}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {research.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Research Areas Yet</CardTitle>
            <CardDescription>Start by adding your first research area to showcase your academic work.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
