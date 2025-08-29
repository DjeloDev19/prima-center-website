"use client"

import { useEffect, useState } from "react"

interface CounterProps {
  end: number
  duration: number
  suffix?: string
}

function Counter({ end, duration, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span className="text-5xl lg:text-6xl font-bold text-black">
      {count}
      {suffix}
    </span>
  )
}

export function PrimaCenterStats() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16">PRIMA CENTER en Chiffres</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Counter end={150} duration={2000} suffix="+" />
            <p className="text-gray-700 text-lg lg:text-xl font-medium">Boutiques</p>
          </div>

          <div className="space-y-4">
            <Counter end={2} duration={2000} suffix="M+" />
            <p className="text-gray-700 text-lg lg:text-xl font-medium">Visiteurs par an</p>
          </div>

          <div className="space-y-4">
            <Counter end={45} duration={2000} suffix="km²" />
            <p className="text-gray-700 text-lg lg:text-xl font-medium">de surface</p>
          </div>

          <div className="space-y-4">
            <Counter end={365} duration={2000} />
            <p className="text-gray-700 text-lg lg:text-xl font-medium">Jours d'ouverture</p>
          </div>
        </div>
      </div>
    </section>
  )
}
