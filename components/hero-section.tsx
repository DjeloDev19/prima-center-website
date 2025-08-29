export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image avec overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/modern-shopping-mall-interior-with-glass-ceiling-a.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenu principal avec responsive parfait */}
      <div className="relative z-10 text-center text-white px-4 w-full max-w-7xl mx-auto">
        {/* Titre principal - Responsive et élégant */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight break-words">
          PRIMA CENTER
        </h1>
        
        {/* Sous-titre principal - Espacement optimisé */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-balance max-w-4xl mx-auto mb-6 sm:mb-8 px-2 leading-relaxed">
          BOUTIQUES | RESTAURANTS | BUSINESS CENTER
        </p>
        
        {/* Description - Taille adaptée mobile */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-balance max-w-3xl mx-auto px-2 leading-relaxed">
          Le centre commercial de référence à Abidjan
        </p>
      </div>
    </section>
  )
}
