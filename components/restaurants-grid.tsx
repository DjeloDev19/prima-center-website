"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, MapPin, Clock, Phone } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

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

export function RestaurantsGrid() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurants = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("restaurants").select("*").order("name")

      if (data && !error) {
        setRestaurants(data)
      }
      setLoading(false)
    }

    fetchRestaurants()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des restaurants...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Nos Restaurants</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Savourez une expérience culinaire unique avec nos {restaurants.length} restaurants et food court
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant)}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100 group"
            >
              <div className="aspect-square relative mb-4">
                <Image
                  src={restaurant.logo_url || "/placeholder.svg?height=100&width=100&query=restaurant logo"}
                  alt={restaurant.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-yellow-600 transition-colors">{restaurant.name}</h3>
              <p className="text-sm text-gray-500 text-center mt-1">{restaurant.cuisine_type}</p>
              {restaurant.price_range && (
                <div className="flex items-center justify-center mt-2">
                  <span className="text-sm text-gray-600">{restaurant.price_range}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedRestaurant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src={selectedRestaurant.logo_url || "/placeholder.svg?height=80&width=80&query=restaurant logo"}
                    alt={selectedRestaurant.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedRestaurant.name}</h2>
                <p className="text-yellow-600 font-medium">{selectedRestaurant.cuisine_type}</p>
                {selectedRestaurant.price_range && (
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-gray-600">{selectedRestaurant.price_range}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {selectedRestaurant.description && <p className="text-gray-700">{selectedRestaurant.description}</p>}

                {selectedRestaurant.floor && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-900" />
                    <span className="text-gray-700">{selectedRestaurant.floor}</span>
                  </div>
                )}

                {selectedRestaurant.opening_hours && (
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-900" />
                    <span className="text-gray-700">{selectedRestaurant.opening_hours}</span>
                  </div>
                )}

                {selectedRestaurant.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-900" />
                    <span className="text-gray-700">{selectedRestaurant.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
