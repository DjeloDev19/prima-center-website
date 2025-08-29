"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
          },
        })
        if (error) throw error
        setError("Compte créé avec succès ! Vérifiez votre email pour confirmer votre compte.")
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
          },
        })
        if (error) throw error
        router.push("/admin")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Une erreur s'est produite")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <Card className="border-black">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-black">PRIMA CENTER</CardTitle>
            <CardDescription className="text-gray-600">
              {isSignup ? "Créer un compte administrateur" : "Administration"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@primacenter.ci"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-black focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-black">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-black focus:border-yellow-500"
                />
              </div>
              {error && (
                <p className={`text-sm ${error.includes("succès") ? "text-green-600" : "text-red-500"}`}>{error}</p>
              )}
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
                {isLoading
                  ? isSignup
                    ? "Création..."
                    : "Connexion..."
                  : isSignup
                    ? "Créer le compte"
                    : "Se connecter"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsSignup(!isSignup)
                  setError(null)
                }}
                className="text-black hover:text-yellow-600"
              >
                {isSignup ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
