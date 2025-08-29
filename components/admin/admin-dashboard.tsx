"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "./admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, UtensilsCrossed, Dumbbell, Newspaper } from "lucide-react"

export function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    boutiques: 0,
    restaurants: 0,
    fitnessServices: 0,
    news: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient()

        const [boutiques, restaurants, fitnessServices, news] = await Promise.all([
          supabase.from("boutiques").select("id", { count: "exact" }),
          supabase.from("restaurants").select("id", { count: "exact" }),
          supabase.from("fitness_services").select("id", { count: "exact" }),
          supabase.from("news").select("id", { count: "exact" }),
        ])

        setStats({
          boutiques: boutiques.count || 0,
          restaurants: restaurants.count || 0,
          fitnessServices: fitnessServices.count || 0,
          news: news.count || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const handleQuickAction = (path: string) => {
    router.push(path)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-600">Vue d'ensemble de votre centre commercial</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Boutiques</CardTitle>
              <Store className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.boutiques}</div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Restaurants</CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.restaurants}</div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Services Fitness</CardTitle>
              <Dumbbell className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.fitnessServices}</div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Actualités</CardTitle>
              <Newspaper className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.news}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleQuickAction("/admin/boutiques")}
                  className="p-4 border border-black rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Store className="h-6 w-6 text-black mb-2" />
                  <p className="text-sm font-medium text-black">Ajouter une boutique</p>
                </button>
                <button
                  onClick={() => handleQuickAction("/admin/restaurants")}
                  className="p-4 border border-black rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <UtensilsCrossed className="h-6 w-6 text-black mb-2" />
                  <p className="text-sm font-medium text-black">Ajouter un restaurant</p>
                </button>
                <button
                  onClick={() => handleQuickAction("/admin/fitness")}
                  className="p-4 border border-black rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Dumbbell className="h-6 w-6 text-black mb-2" />
                  <p className="text-sm font-medium text-black">Ajouter un service</p>
                </button>
                <button
                  onClick={() => handleQuickAction("/admin/news")}
                  className="p-4 border border-black rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Newspaper className="h-6 w-6 text-black mb-2" />
                  <p className="text-sm font-medium text-black">Publier une actualité</p>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">Nouvelle boutique ajoutée</p>
                    <p className="text-xs text-gray-500">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">Article publié</p>
                    <p className="text-xs text-gray-500">Il y a 5 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">Paramètres mis à jour</p>
                    <p className="text-xs text-gray-500">Hier</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
