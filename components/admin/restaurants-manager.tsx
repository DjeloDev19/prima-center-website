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

interface Restaurant {
  id: string
  name: string
  description: string
  logo_url: string
  cuisine_type: string
  floor: string
  phone: string
  email: string
  website: string
  opening_hours: string
  price_range: string
}

export function RestaurantsManager() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo_url: "",
    cuisine_type: "",
    floor: "",
    phone: "",
    email: "",
    website: "",
    opening_hours: "",
    price_range: "",
  })

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("restaurants").select("*").order("name")
    if (data && !error) {
      setRestaurants(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    if (editingRestaurant) {
      const { error } = await supabase.from("restaurants").update(formData).eq("id", editingRestaurant.id)
    } else {
      const { error } = await supabase.from("restaurants").insert([formData])
    }

    setIsDialogOpen(false)
    setEditingRestaurant(null)
    setFormData({
      name: "",
      description: "",
      logo_url: "",
      cuisine_type: "",
      floor: "",
      phone: "",
      email: "",
      website: "",
      opening_hours: "",
      price_range: "",
    })
    fetchRestaurants()
  }

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant)
    setFormData({
      name: restaurant.name,
      description: restaurant.description || "",
      logo_url: restaurant.logo_url || "",
      cuisine_type: restaurant.cuisine_type || "",
      floor: restaurant.floor || "",
      phone: restaurant.phone || "",
      email: restaurant.email || "",
      website: restaurant.website || "",
      opening_hours: restaurant.opening_hours || "",
      price_range: restaurant.price_range || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce restaurant ?")) {
      const supabase = createClient()
      await supabase.from("restaurants").delete().eq("id", id)
      fetchRestaurants()
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Restaurants</h1>
            <p className="text-gray-600">Gérez les restaurants de votre centre commercial</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un restaurant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-black">
                  {editingRestaurant ? "Modifier le restaurant" : "Ajouter un restaurant"}
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
                    <Label htmlFor="cuisine_type" className="text-black">
                      Type de cuisine
                    </Label>
                    <Input
                      id="cuisine_type"
                      value={formData.cuisine_type}
                      onChange={(e) => setFormData({ ...formData, cuisine_type: e.target.value })}
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
                <div className="grid grid-cols-3 gap-4">
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
                  <div>
                    <Label htmlFor="price_range" className="text-black">
                      Gamme de prix
                    </Label>
                    <Input
                      id="price_range"
                      placeholder="€, €€, €€€"
                      value={formData.price_range}
                      onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
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
                  {editingRestaurant ? "Modifier" : "Ajouter"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="border-black">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-black">{restaurant.name}</CardTitle>
                    <p className="text-sm text-gray-600">{restaurant.cuisine_type}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(restaurant)}
                      className="text-black hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(restaurant.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {restaurant.description && <p className="text-gray-700">{restaurant.description}</p>}
                  {restaurant.floor && (
                    <p>
                      <span className="font-medium text-black">Étage:</span> {restaurant.floor}
                    </p>
                  )}
                  {restaurant.phone && (
                    <p>
                      <span className="font-medium text-black">Tél:</span> {restaurant.phone}
                    </p>
                  )}
                  {restaurant.price_range && (
                    <p>
                      <span className="font-medium text-black">Prix:</span> {restaurant.price_range}
                    </p>
                  )}
                  {restaurant.opening_hours && (
                    <p>
                      <span className="font-medium text-black">Horaires:</span> {restaurant.opening_hours}
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
