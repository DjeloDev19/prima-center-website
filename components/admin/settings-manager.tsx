"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AdminLayout } from "./admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

interface SiteSetting {
  id: string
  key: string
  value: string
  description: string
}

export function SettingsManager() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("site_settings").select("*").order("key")
    if (data && !error) {
      setSettings(data)
      const formValues: Record<string, string> = {}
      data.forEach((setting) => {
        formValues[setting.key] = setting.value || ""
      })
      setFormData(formValues)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const supabase = createClient()

    try {
      for (const [key, value] of Object.entries(formData)) {
        await supabase.from("site_settings").update({ value }).eq("key", key)
      }
      alert("Paramètres sauvegardés avec succès !")
    } catch (error) {
      alert("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }

  const settingGroups = {
    "Informations générales": ["site_name", "site_description", "opening_hours"],
    Contact: ["phone_primary", "phone_secondary", "email", "address"],
    "Réseaux sociaux": ["facebook_url", "instagram_url", "twitter_url", "linkedin_url"],
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Paramètres du site</h1>
          <p className="text-gray-600">Gérez les informations générales de votre site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(settingGroups).map(([groupName, keys]) => (
            <Card key={groupName} className="border-black">
              <CardHeader>
                <CardTitle className="text-black">{groupName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {keys.map((key) => {
                  const setting = settings.find((s) => s.key === key)
                  if (!setting) return null

                  return (
                    <div key={key}>
                      <Label htmlFor={key} className="text-black">
                        {setting.description}
                      </Label>
                      {key === "site_description" ? (
                        <Textarea
                          id={key}
                          value={formData[key] || ""}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="border-black focus:border-yellow-500"
                        />
                      ) : (
                        <Input
                          id={key}
                          value={formData[key] || ""}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="border-black focus:border-yellow-500"
                          type={key.includes("email") ? "email" : key.includes("url") ? "url" : "text"}
                        />
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-black text-white hover:bg-gray-800">
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
