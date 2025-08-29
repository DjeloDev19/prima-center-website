"use client"

import { Phone, Clock } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-black text-white py-2">
      <div className="container mx-auto px-4">
        {/* Desktop: éléments côte à côte */}
        <div className="hidden md:flex items-center justify-center text-sm">
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
        </div>

        {/* Mobile: éléments superposés */}
        <div className="md:hidden flex flex-col items-center space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-yellow-400" />
            <span>Lundi - Dimanche / 6h00 - 23h00</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-3 w-3 text-yellow-400" />
            <span>+225 07 88 00 80 08</span>
          </div>
        </div>
      </div>
    </div>
  )
}
