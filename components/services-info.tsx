import { Clock, Car, Wifi, CreditCard, Users, Accessibility } from "lucide-react"

export function ServicesInfo() {
  const services = [
    {
      icon: Clock,
      title: "Horaires d'ouverture",
      description: "Lundi - Dimanche : 6h00 - 23h00",
    },
    {
      icon: Car,
      title: "Parking",
      description: "Parking souterrain sécurisé",
    },
    {
      icon: Wifi,
      title: "Wifi Gratuit",
      description: "Connexion haut débit dans tout le centre",
    },
    {
      icon: CreditCard,
      title: "Paiement",
      description: "Tous types de paiements acceptés",
    },
    {
      icon: Users,
      title: "Espace Famille",
      description: "Zone dédiée aux familles",
    },
    {
      icon: Accessibility,
      title: "Accessibilité",
      description: "Centre accessible à tous",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Services & Infos</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez tous les services et informations pratiques pour votre visite au Prima Center
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-black transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
