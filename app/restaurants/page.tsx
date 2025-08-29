import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RestaurantsGrid } from "@/components/restaurants-grid"

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <div className="pt-20">
        <RestaurantsGrid />
      </div>
      <Footer />
    </div>
  )
}
