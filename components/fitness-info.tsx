"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, MapPin, Phone, Users, Dumbbell, Heart, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface FitnessService {
  id: string
  name: string
  description: string
  price: string
  duration: string
  category: string
}

const staticServices = [
  {
    icon: Dumbbell,
    title: "Musculation",
    description: "Équipements modernes et espace dédié à la musculation",
  },
  {
    icon: Heart,
    title: "Cardio Training",
    description: "Machines cardio dernière génération pour votre forme",
  },
  {
    icon: Users,
    title: "Cours Collectifs",
    description: "Yoga, Pilates, Zumba et bien d'autres activités",
  },
]

export function FitnessInfo() {
  const [fitnessServices, setFitnessServices] = useState<FitnessService[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubscribing, setIsSubscribing] = useState(false)

  useEffect(() => {
    const fetchFitnessServices = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("fitness_services").select("*").order("category", { ascending: true })

      if (data && !error) {
        setFitnessServices(data)
      }
      setLoading(false)
    }

    fetchFitnessServices()
  }, [])

  const handleSubscribe = () => {
    setIsSubscribing(true)
    // Simuler un processus d'inscription
    setTimeout(() => {
      setIsSubscribing(false)
      // Ici vous pourriez rediriger vers un formulaire d'inscription
    }, 2000)
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">My Fitness</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre salle de sport moderne au cœur de PRIMA CENTER
          </p>
        </div>

        {/* Main Info Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Une salle de sport complète</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              My Fitness vous propose un espace de 800m² entièrement équipé avec les dernières technologies en matière
              de fitness. Que vous soyez débutant ou athlète confirmé, nos équipements et nos coachs professionnels vous
              accompagnent dans l'atteinte de vos objectifs.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Profitez d'un environnement moderne, climatisé et parfaitement éclairé pour vos séances d'entraînement.
              Vestiaires avec casiers sécurisés et douches inclus dans votre abonnement.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-100">
              <Image
                src="/modern-fitness-gym.png"
                alt="My Fitness - Intérieur de la salle"
                width={600}
                height={400}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {staticServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-black rounded-full group-hover:bg-gray-800 transition-colors">
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!loading && fitnessServices.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Tarifs et Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fitnessServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.category}</p>
                    {service.description && <p className="text-gray-700 mb-4">{service.description}</p>}
                    <div className="flex justify-between items-center">
                      {service.price && <span className="text-lg font-bold text-black">{service.price}</span>}
                      {service.duration && <span className="text-sm text-gray-600">{service.duration}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-gray-900 rounded-2xl p-8 lg:p-12 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Informations Pratiques</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-yellow-400" />
                  <span className="text-white">Niveau 2 - Aile Ouest</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <span className="text-white">Lundi - Dimanche : 6h00 - 23h00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-yellow-400" />
                  <span className="text-white">+225 01 02 03 16</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <button 
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubscribing
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800 hover:scale-105'
                }`}
              >
                {isSubscribing ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Inscription en cours...</span>
                  </div>
                ) : (
                  "S'inscrire maintenant"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
