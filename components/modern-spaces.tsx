"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

export function ModernSpaces() {
  const [clickedButton, setClickedButton] = useState<string | null>(null)

  const handleButtonClick = (buttonId: string) => {
    setClickedButton(buttonId)
    // Réinitialiser après un délai
    setTimeout(() => setClickedButton(null), 1000)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            DES ESPACES MODERNES ET LUMINEUX
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LA GALERIE */}
          <div className="group">
            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200">
              <img
                src="/modern-shopping-mall-interior-with-glass-ceiling-a.png"
                alt="La Galerie - Espace commercial lumineux"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">LA GALERIE</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                4000m² d'enseignes de proximité et une nouvelle génération de marques très dynamiques.
              </p>
              <Link 
                href="/boutiques"
                onClick={() => handleButtonClick('galerie')}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  clickedButton === 'galerie'
                    ? 'bg-gray-800 text-white scale-95 shadow-lg'
                    : 'bg-black hover:bg-gray-800 text-white hover:scale-105 shadow-md hover:shadow-lg'
                }`}
              >
                {clickedButton === 'galerie' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Chargement...</span>
                  </>
                ) : (
                  <>
                    <span>EN SAVOIR PLUS</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Link>
            </div>
          </div>

          {/* LA KITCHEN */}
          <div className="group">
            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200">
              <img
                src="/food-festival-restaurant.png"
                alt="La Kitchen - Food Hall moderne"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">LA KITCHEN</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Un Food Hall pour des évasions culinaires et des pauses gourmandes animé par son bar central.
              </p>
              <Link 
                href="/restaurants"
                onClick={() => handleButtonClick('kitchen')}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  clickedButton === 'kitchen'
                    ? 'bg-gray-800 text-white scale-95 shadow-lg'
                    : 'bg-black hover:bg-gray-800 text-white hover:scale-105 shadow-md hover:shadow-lg'
                }`}
              >
                {clickedButton === 'kitchen' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Chargement...</span>
                  </>
                ) : (
                  <>
                    <span>EN SAVOIR PLUS</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Link>
            </div>
          </div>

          {/* MEETINGS & EVENTS */}
          <div className="group">
            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200">
              <img
                src="/luxury-mall-interior.png"
                alt="Meetings & Events - Salles de réunion"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">MEETINGS & EVENTS</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Modulables et entièrement équipées, des salles de réunion disponibles à la location.
              </p>
              <Link 
                href="/services"
                onClick={() => handleButtonClick('meetings')}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  clickedButton === 'meetings'
                    ? 'bg-gray-800 text-white scale-95 shadow-lg'
                    : 'bg-black hover:bg-gray-800 text-white hover:scale-105 shadow-md hover:shadow-lg'
                }`}
              >
                {clickedButton === 'meetings' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Chargement...</span>
                  </>
                ) : (
                  <>
                    <span>EN SAVOIR PLUS</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
