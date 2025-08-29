"use client"

import { Phone, Clock, Search, Facebook, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function TopBar() {
  return (
    <div className="bg-gray-900 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm">
          {/* Left side - Hours and Phone */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-400" />
              <span>Lundi - Dimanche / 6h00 - 23h00</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-yellow-400" />
              <span>+225 07 88 00 80 08</span>
            </div>
          </div>

          {/* Right side - Navigation and Social */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Link href="/about" className="hover:text-yellow-400 transition-colors">À propos</Link>
              <Link href="/boutiques" className="hover:text-yellow-400 transition-colors">Nos Univers</Link>
              <Link href="/services" className="hover:text-yellow-400 transition-colors">Services & infos</Link>
              <Link href="/actu" className="hover:text-yellow-400 transition-colors">Actus</Link>
              <Link href="/meetings" className="hover:text-yellow-400 transition-colors">Meetings & Events</Link>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="#" className="hover:text-yellow-400 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="hover:text-yellow-400 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="hover:text-yellow-400 transition-colors">
                <Linkedin className="h-4 w-4" />
              </Link>
              <button className="hover:text-yellow-400 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
