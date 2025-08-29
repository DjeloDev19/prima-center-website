import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FitnessInfo } from "@/components/fitness-info"

export default function FitnessPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <div className="pt-20">
        <FitnessInfo />
      </div>
      <Footer />
    </div>
  )
}
