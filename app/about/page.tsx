import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OurHistory } from "@/components/our-history"
import { PrimaCenterStats } from "@/components/prima-center-stats"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <div className="pt-20">
        <OurHistory />
        <PrimaCenterStats />
      </div>
      <Footer />
    </div>
  )
}
