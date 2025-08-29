"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

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

export function OpenStores() {
  const [boutiques, setBoutiques] = useState<Boutique[]>([])
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              DES COMMERCES OUVERTS 7J/7
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 open-stores-section">
      <div className="container mx-auto px-4">
        {/* Titre principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            DES COMMERCES OUVERTS 7J/7
          </h2>
        </div>

        {/* Container pour le défilement */}
        <div className="relative overflow-hidden w-full">
          {/* Ligne de défilement automatique */}
          <div className="flex animate-scroll w-full">
            {/* Premier groupe de logos */}
            {boutiques.map((boutique) => (
              <div
                key={`first-${boutique.id}`}
                className="group flex-shrink-0 flex flex-col items-center mx-2 sm:mx-4 md:mx-8 lg:mx-12"
              >
                {/* Logo avec effet de survol - LOGOS PLUS GRANDS SUR MOBILE */}
                <div className="w-28 h-28 sm:w-28 sm:h-28 md:w-36 md:h-36 relative bg-white rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center p-2 sm:p-4">
                  <Image
                    src={boutique.logo_url || "/placeholder-logo.png"}
                    alt={boutique.name}
                    fill
                    className="object-contain p-1 sm:p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay blanc au survol */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                </div>
                
                {/* Nom de la boutique - ÉCRITURES PLUS PETITES SUR MOBILE */}
                <div className="mt-2 sm:mt-3 text-center w-full max-w-[80px] sm:max-w-[100px] md:max-w-none">
                  <h3 className="text-[10px] sm:text-xs font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors break-words leading-tight">
                    {boutique.name}
                  </h3>
                  <p className="text-[8px] sm:text-xs text-gray-600 mt-1 break-words leading-tight">{boutique.category}</p>
                </div>
              </div>
            ))}
            
            {/* Deuxième groupe de logos (pour l'effet de boucle) */}
            {boutiques.map((boutique) => (
              <div
                key={`second-${boutique.id}`}
                className="group flex-shrink-0 flex flex-col items-center mx-2 sm:mx-4 md:mx-8 lg:mx-12"
              >
                {/* Logo avec effet de survol - LOGOS PLUS GRANDS SUR MOBILE */}
                <div className="w-28 h-28 sm:w-28 sm:h-28 md:w-36 md:h-36 relative bg-white rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center p-2 sm:p-4">
                  <Image
                    src={boutique.logo_url || "/placeholder-logo.png"}
                    alt={boutique.name}
                    fill
                    className="object-contain p-1 sm:p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay blanc au survol */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                </div>
                
                {/* Nom de la boutique - ÉCRITURES PLUS PETITES SUR MOBILE */}
                <div className="mt-2 sm:mt-3 text-center w-full max-w-[80px] sm:max-w-[100px] md:max-w-none">
                  <h3 className="text-[10px] sm:text-xs font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors break-words leading-tight">
                    {boutique.name}
                  </h3>
                  <p className="text-[8px] sm:text-xs text-gray-600 mt-1 break-words leading-tight">{boutique.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message si pas de boutiques */}
        {boutiques.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucune boutique disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
