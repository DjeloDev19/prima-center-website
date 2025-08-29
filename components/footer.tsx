"use client"

import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-white text-gray-800 footer-logo-section">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1 - À propos du centre */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              {/* Votre logo personnalisé - Version robuste */}
              <div className="relative w-16 h-16 flex-shrink-0 bg-transparent">
                <Image
                  src="/logo-prima-center-light.png"
                  alt="PRIMA CENTER Logo"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Au rez-de-chaussée du Prima Center se situe une galerie commerciale lumineuse et agréable au sein de laquelle on trouve des commerces, un food hall et des services variés.
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">NAVIGATION</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/boutiques" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Boutiques
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/actu" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Actus
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 - Service Clients */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">SERVICE CLIENTS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Services & infos
                </Link>
              </li>
              <li>
                <Link href="/meetings" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Meetings & events
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 - Nous Contacter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">NOUS CONTACTER</h3>
            <div className="space-y-3">
              <p className="text-gray-600">
                Bd Hassan II, Cocody - Abidjan
              </p>
              <p className="text-gray-600">
                +225 07 88 00 80 08
              </p>
              <p className="text-gray-600">
                contact@primacenter.ci
              </p>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3 pt-2">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-600 text-sm">
              PC© 2024 | All Rights Reserved
            </div>

            {/* Bouton retour en haut */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 md:mt-0 w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center justify-center transition-colors"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
