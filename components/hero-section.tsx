export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/modern-shopping-mall-interior-with-glass-ceiling-a.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
          PRIMA CENTER
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-balance max-w-5xl mx-auto mb-8">
          BOUTIQUES | RESTAURANTS | BUSINESS CENTER
        </p>
        <p className="text-lg sm:text-xl md:text-2xl font-light text-balance max-w-4xl mx-auto">
          Le centre commercial de référence à Abidjan
        </p>
      </div>
    </section>
  )
}
