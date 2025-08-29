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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Boutique {
  id: string
  name: string
  description: string
  logo_url: string
  category: string
  floor: string
  phone: string
  email: string
  website: string
  opening_hours: string
}

export function BoutiquesManager() {
  const [boutiques, setBoutiques] = useState<Boutique[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBoutique, setEditingBoutique] = useState<Boutique | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo_url: "",
    category: "",
    floor: "",
    phone: "",
    email: "",
    website: "",
    opening_hours: "",
  })

  useEffect(() => {
    fetchBoutiques()
  }, [])

  const fetchBoutiques = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("boutiques").select("*").order("name")
    if (data && !error) {
      setBoutiques(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    if (editingBoutique) {
      const { error } = await supabase.from("boutiques").update(formData).eq("id", editingBoutique.id)
    } else {
      const { error } = await supabase.from("boutiques").insert([formData])
    }

    setIsDialogOpen(false)
    setEditingBoutique(null)
    setFormData({
      name: "",
      description: "",
      logo_url: "",
      category: "",
      floor: "",
      phone: "",
      email: "",
      website: "",
      opening_hours: "",
    })
    fetchBoutiques()
  }

  const handleEdit = (boutique: Boutique) => {
    setEditingBoutique(boutique)
    setFormData({
      name: boutique.name,
      description: boutique.description || "",
      logo_url: boutique.logo_url || "",
      category: boutique.category || "",
      floor: boutique.floor || "",
      phone: boutique.phone || "",
      email: boutique.email || "",
      website: boutique.website || "",
      opening_hours: boutique.opening_hours || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette boutique ?")) {
      const supabase = createClient()
      await supabase.from("boutiques").delete().eq("id", id)
      fetchBoutiques()
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Boutiques</h1>
            <p className="text-gray-600">Gérez les boutiques de votre centre commercial</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une boutique
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-black">
                  {editingBoutique ? "Modifier la boutique" : "Ajouter une boutique"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-black">
                      Nom *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-black">
                      Catégorie
                    </Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="text-black">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-black focus:border-yellow-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="floor" className="text-black">
                      Étage
                    </Label>
                    <Input
                      id="floor"
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-black">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-black">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-black">
                      Site web
                    </Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="opening_hours" className="text-black">
                    Horaires d'ouverture
                  </Label>
                  <Input
                    id="opening_hours"
                    value={formData.opening_hours}
                    onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })}
                    className="border-black focus:border-yellow-500"
                  />
                </div>
                <div>
                  <Label htmlFor="logo_url" className="text-black">
                    URL du logo
                  </Label>
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="border-black focus:border-yellow-500"
                  />
                </div>
                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                  {editingBoutique ? "Modifier" : "Ajouter"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boutiques.map((boutique) => (
            <Card key={boutique.id} className="border-black">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-black">{boutique.name}</CardTitle>
                    <p className="text-sm text-gray-600">{boutique.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(boutique)}
                      className="text-black hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(boutique.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {boutique.description && <p className="text-gray-700">{boutique.description}</p>}
                  {boutique.floor && (
                    <p>
                      <span className="font-medium text-black">Étage:</span> {boutique.floor}
                    </p>
                  )}
                  {boutique.phone && (
                    <p>
                      <span className="font-medium text-black">Tél:</span> {boutique.phone}
                    </p>
                  )}
                  {boutique.opening_hours && (
                    <p>
                      <span className="font-medium text-black">Horaires:</span> {boutique.opening_hours}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
