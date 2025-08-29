"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "./admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"

interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  published: boolean
  created_at: string
}

export function NewsManager() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    category: "",
    published: false,
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false })
    if (data && !error) {
      setArticles(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    if (editingArticle) {
      const { error } = await supabase.from("news").update(formData).eq("id", editingArticle.id)
    } else {
      const { error } = await supabase.from("news").insert([formData])
    }

    setIsDialogOpen(false)
    setEditingArticle(null)
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image_url: "",
      category: "",
      published: false,
    })
    fetchArticles()
  }

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || "",
      image_url: article.image_url || "",
      category: article.category || "",
      published: article.published,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      const supabase = createClient()
      await supabase.from("news").delete().eq("id", id)
      fetchArticles()
    }
  }

  const togglePublished = async (id: string, published: boolean) => {
    const supabase = createClient()
    await supabase.from("news").update({ published: !published }).eq("id", id)
    fetchArticles()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Actualités</h1>
            <p className="text-gray-600">Gérez les actualités de votre centre commercial</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-black">
                  {editingArticle ? "Modifier l'article" : "Nouvel article"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-black">
                    Titre *
                  </Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border-black focus:border-yellow-500"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt" className="text-black">
                    Résumé
                  </Label>
                  <Textarea
                    id="excerpt"
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="border-black focus:border-yellow-500"
                  />
                </div>
                <div>
                  <Label htmlFor="content" className="text-black">
                    Contenu *
                  </Label>
                  <Textarea
                    id="content"
                    required
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="border-black focus:border-yellow-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-black">
                      Catégorie
                    </Label>
                    <Input
                      id="category"
                      placeholder="Nouveautés, Événements, Travaux..."
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image_url" className="text-black">
                      URL de l'image
                    </Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published" className="text-black">
                    Publier immédiatement
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                  {editingArticle ? "Modifier" : "Publier"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="border-black">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-black">{article.title}</CardTitle>
                      {article.published ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{article.category}</span>
                      <span>{new Date(article.created_at).toLocaleDateString("fr-FR")}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          article.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {article.published ? "Publié" : "Brouillon"}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublished(article.id, article.published)}
                      className="text-black hover:bg-gray-100"
                    >
                      {article.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(article)}
                      className="text-black hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {article.excerpt && (
                <CardContent>
                  <p className="text-gray-700">{article.excerpt}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
