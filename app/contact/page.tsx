import { Navbar } from "@/components/navbar"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </div>
  )
}
