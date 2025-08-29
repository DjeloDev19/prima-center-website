import { Navbar } from "@/components/navbar"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import { NewsSection } from "@/components/news-section"

export default function ActuPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <div className="pt-20">
        <NewsSection />
      </div>
      <Footer />
    </div>
  )
}
