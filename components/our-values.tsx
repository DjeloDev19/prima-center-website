import { CheckCircle, Users, Star, Award } from "lucide-react"

export function OurValues() {
  const values = [
    {
      icon: CheckCircle,
      title: "Qualité Premium",
      description: "Nous sélectionnons avec soin nos partenaires pour garantir une expérience shopping exceptionnelle."
    },
    {
      icon: Users,
      title: "Service Client",
      description: "Notre équipe est disponible 7j/7 pour vous accompagner et répondre à tous vos besoins."
    },
    {
      icon: Star,
      title: "Innovation",
      description: "Nous repoussons constamment les limites pour créer des espaces modernes et innovants."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Notre engagement quotidien est de vous offrir le meilleur du shopping et des loisirs."
    }
  ]

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pourquoi Choisir PRIMA CENTER ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce qui fait de nous le centre commercial de référence à Abidjan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>

        {/* Statistiques */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">50+</div>
            <div className="text-gray-600">Boutiques & Services</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">15+</div>
            <div className="text-gray-600">Restaurants & Cafés</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">24/7</div>
            <div className="text-gray-600">Disponibilité</div>
          </div>
        </div>
      </div>
    </section>
  )
}
