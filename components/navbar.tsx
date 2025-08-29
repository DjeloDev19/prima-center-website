"use client"
import { useState } from "react"
import { Menu, X, ChevronDown, Loader2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const handleLinkClick = () => {
    setIsLoading(true)
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const isActiveLink = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={handleLinkClick}>
              {/* Votre logo personnalisé - Remplacez le chemin par celui de votre logo */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src="/logo-prima-center-light.png" // 👈 REMPLACEZ PAR LE CHEMIN DE VOTRE LOGO
                  alt="PRIMA CENTER Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              <Link 
                href="/about" 
                className={`transition-colors cursor-pointer font-medium ${
                  isActiveLink('/about') 
                    ? 'text-yellow-600 border-b-2 border-yellow-600' 
                    : 'text-gray-900 hover:text-yellow-600'
                }`}
                onClick={handleLinkClick}
              >
                À Propos
              </Link>

              {/* Menu déroulant personnalisé */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-900 hover:text-yellow-600 font-medium transition-colors"
                >
                  <span>Nos Univers</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <Link 
                        href="/boutiques" 
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActiveLink('/boutiques')
                            ? 'bg-yellow-50 text-yellow-600 border-l-4 border-yellow-600'
                            : 'text-black hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        onClick={handleLinkClick}
                      >
                        Boutiques
                      </Link>
                      <Link 
                        href="/restaurants" 
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActiveLink('/restaurants')
                            ? 'bg-yellow-50 text-yellow-600 border-l-4 border-yellow-600'
                            : 'text-black hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        onClick={handleLinkClick}
                      >
                        Restaurants
                      </Link>
                      <Link 
                        href="/fitness" 
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActiveLink('/fitness')
                            ? 'bg-yellow-50 text-yellow-600 border-l-4 border-yellow-600'
                            : 'text-black hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        onClick={handleLinkClick}
                      >
                        My Fitness
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/services" 
                className={`transition-colors cursor-pointer font-medium ${
                  isActiveLink('/services') 
                    ? 'text-yellow-600 border-b-2 border-yellow-600' 
                    : 'text-gray-900 hover:text-yellow-600'
                }`}
                onClick={handleLinkClick}
              >
                Services & Infos
              </Link>

              <Link 
                href="/actu" 
                className={`transition-colors cursor-pointer font-medium ${
                  isActiveLink('/actu') 
                    ? 'text-yellow-600 border-b-2 border-yellow-600' 
                    : 'text-gray-900 hover:text-yellow-600'
                }`}
                onClick={handleLinkClick}
              >
                Actus
              </Link>

              <Link 
                href="/contact" 
                className={`transition-colors cursor-pointer font-medium ${
                  isActiveLink('/contact') 
                    ? 'text-yellow-600 border-b-2 border-yellow-600' 
                    : 'text-gray-900 hover:text-yellow-600'
                }`}
                onClick={handleLinkClick}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-900 hover:text-yellow-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/about" 
                className={`transition-colors font-medium ${
                  isActiveLink('/about') 
                    ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' 
                    : 'text-gray-900 hover:text-yellow-600'
                }`}
                onClick={handleLinkClick}
              >
                À Propos
              </Link>
              <div className="space-y-2">
                <span className="text-gray-900 font-medium">Nos Univers</span>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/boutiques" 
                    className={`block transition-colors ${
                      isActiveLink('/boutiques')
                        ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2'
                        : 'text-gray-600 hover:text-yellow-600'
                    }`}
                    onClick={handleLinkClick}
                  >
                    Boutiques
                  </Link>
                  <Link 
                    href="/restaurants" 
                    className={`block transition-colors ${
                      isActiveLink('/restaurants')
                        ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2'
                        : 'text-gray-600 hover:text-yellow-600'
                    }`}
                    onClick={handleLinkClick}
                  >
                    Restaurants
                  </Link>
                  <Link 
                    href="/fitness" 
                    className={`block transition-colors ${
                      isActiveLink('/fitness')
                        ? 'text-yellow-600 border-b-2 border-yellow-600'
                        : 'text-gray-600 hover:text-yellow-600'
                    }`}
                    onClick={handleLinkClick}
                  >
                    My Fitness
                  </Link>
                </div>
              </div>
              <Link 
                href="/services" 
                className={`transition-colors font-medium ${
                  isActiveLink('/services') 
                    ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' 
                    : 'text-gray-900 hover:text-yellow-600'
                }`}
                onClick={handleLinkClick}
              >
                Services & Infos
              </Link>
              <Link 
                href="/actu" 
                className={`transition-colors font-medium ${
                  isActiveLink('/actu') 
                    ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' 
                    : 'text-gray-900 hover:text-yellow-600'
                }`}
                onClick={handleLinkClick}
              >
                Actus
              </Link>
              <Link 
                href="/contact" 
                className={`transition-colors font-medium ${
                  isActiveLink('/contact') 
                    ? 'text-yellow-600 border-l-4 border-yellow-600 pl-2' 
                    : 'text-gray-900 hover:text-yellow-600'
                }`}
                onClick={handleLinkClick}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay pour fermer le dropdown quand on clique ailleurs */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Indicateur de chargement global */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-yellow-500 z-50">
          <div className="h-full bg-yellow-600 animate-pulse"></div>
        </div>
      )}
    </nav>
  )
}
