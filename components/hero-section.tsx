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

      <div className="relative z-10 text-center text-white px-4 w-full max-w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight leading-tight break-words">
          PRIMA CENTER
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-balance max-w-4xl mx-auto mb-8 px-2 break-words">
          BOUTIQUES | RESTAURANTS | BUSINESS CENTER
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-balance max-w-3xl mx-auto px-2 break-words">
          Le centre commercial de référence à Abidjan
        </p>
      </div>
    </section>
  )
}
