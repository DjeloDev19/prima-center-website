import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ModernSpaces } from "@/components/modern-spaces"
import { OpenStores } from "@/components/open-stores"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <HeroSection />
      <ModernSpaces />
      <OpenStores />
      <Footer />
    </div>
  )
}
