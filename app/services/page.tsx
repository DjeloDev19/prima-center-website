import { Navbar } from "@/components/navbar"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import { ServicesInfo } from "@/components/services-info"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <div className="pt-20">
        <ServicesInfo />
      </div>
      <Footer />
    </div>
  )
}
