import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BoutiquesGrid } from "@/components/boutiques-grid"

export default function BoutiquesPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <div className="pt-20">
        <BoutiquesGrid />
      </div>
      <Footer />
    </div>
  )
}
