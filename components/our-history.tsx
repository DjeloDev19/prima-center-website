import Image from "next/image"

export function OurHistory() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Notre Histoire</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Depuis son ouverture, PRIMA CENTER s'est imposé comme le centre commercial de référence à Abidjan. Né
              d'une vision ambitieuse de créer un espace de shopping moderne et convivial, notre centre a su évoluer
              avec les besoins de notre clientèle tout en conservant son caractère unique.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Avec plus de 150 boutiques, restaurants et espaces de loisirs, PRIMA CENTER offre une expérience shopping
              complète dans un cadre architectural moderne et lumineux. Notre engagement envers l'excellence et
              l'innovation nous permet d'accueillir plus de 2 millions de visiteurs chaque année.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-100">
              <Image
                src="/modern-shopping-center-exterior-with-glass-facade.png"
                alt="PRIMA CENTER - Vue extérieure"
                width={500}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
