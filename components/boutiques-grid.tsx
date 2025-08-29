"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, MapPin, Clock, Phone } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

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

export function BoutiquesGrid() {
  const [boutiques, setBoutiques] = useState<Boutique[]>([])
  const [selectedBoutique, setSelectedBoutique] = useState<Boutique | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBoutiques = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("boutiques").select("*").order("name")

      if (data && !error) {
        setBoutiques(data)
      }
      setLoading(false)
    }

    fetchBoutiques()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des boutiques...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Nos Boutiques</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez plus de {boutiques.length} boutiques des plus grandes marques internationales
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {boutiques.map((boutique) => (
            <div
              key={boutique.id}
              onClick={() => setSelectedBoutique(boutique)}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100 group"
            >
              <div className="aspect-square relative mb-4">
                <Image
                  src={boutique.logo_url || "/placeholder.svg?height=100&width=100&query=boutique logo"}
                  alt={boutique.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-yellow-600 transition-colors">{boutique.name}</h3>
              <p className="text-sm text-gray-500 text-center mt-1">{boutique.category}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedBoutique && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
              <button
                onClick={() => setSelectedBoutique(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src={selectedBoutique.logo_url || "/placeholder.svg?height=80&width=80&query=boutique logo"}
                    alt={selectedBoutique.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedBoutique.name}</h2>
                <p className="text-yellow-600 font-medium">{selectedBoutique.category}</p>
              </div>

              <div className="space-y-4">
                {selectedBoutique.description && <p className="text-gray-700">{selectedBoutique.description}</p>}

                {selectedBoutique.floor && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-900" />
                    <span className="text-gray-700">{selectedBoutique.floor}</span>
                  </div>
                )}

                {selectedBoutique.opening_hours && (
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-900" />
                    <span className="text-gray-700">{selectedBoutique.opening_hours}</span>
                  </div>
                )}

                {selectedBoutique.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-900" />
                    <span className="text-gray-700">{selectedBoutique.phone}</span>
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
