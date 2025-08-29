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

interface FitnessService {
  id: string
  name: string
  description: string
  price: string
  duration: string
  category: string
}

export function FitnessManager() {
  const [services, setServices] = useState<FitnessService[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<FitnessService | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("fitness_services").select("*").order("name")
    if (data && !error) {
      setServices(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    if (editingService) {
      const { error } = await supabase.from("fitness_services").update(formData).eq("id", editingService.id)
    } else {
      const { error } = await supabase.from("fitness_services").insert([formData])
    }

    setIsDialogOpen(false)
    setEditingService(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
    })
    fetchServices()
  }

  const handleEdit = (service: FitnessService) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || "",
      price: service.price || "",
      duration: service.duration || "",
      category: service.category || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      const supabase = createClient()
      await supabase.from("fitness_services").delete().eq("id", id)
      fetchServices()
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Services Fitness</h1>
            <p className="text-gray-600">Gérez les services de My Fitness</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-black">
                  {editingService ? "Modifier le service" : "Ajouter un service"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-black">
                    Nom du service *
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
                    <Label htmlFor="price" className="text-black">
                      Prix
                    </Label>
                    <Input
                      id="price"
                      placeholder="25 000 FCFA"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="text-black">
                      Durée
                    </Label>
                    <Input
                      id="duration"
                      placeholder="1h"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-black">
                      Catégorie
                    </Label>
                    <Input
                      id="category"
                      placeholder="Cours, Abonnement, Coaching"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="border-black focus:border-yellow-500"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                  {editingService ? "Modifier" : "Ajouter"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="border-black">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-black">{service.name}</CardTitle>
                    <p className="text-sm text-gray-600">{service.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                      className="text-black hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {service.description && <p className="text-gray-700">{service.description}</p>}
                  <div className="flex justify-between items-center">
                    {service.price && (
                      <p>
                        <span className="font-medium text-black">Prix:</span> {service.price}
                      </p>
                    )}
                    {service.duration && (
                      <p>
                        <span className="font-medium text-black">Durée:</span> {service.duration}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
