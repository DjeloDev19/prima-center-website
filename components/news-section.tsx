"use client"

import { useState, useEffect } from "react"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  published: boolean
  created_at: string
}

export function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6)

      if (data && !error) {
        setNews(data)
      }
      setLoading(false)
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des actualités...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Actualités</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Restez informé des dernières nouveautés, événements et actualités de Prima Center
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-black transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image_url || "/placeholder.svg?height=200&width=400&query=news article"}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(article.created_at).toLocaleDateString("fr-FR")}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt || article.content.substring(0, 150) + "..."}
                </p>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-black group-hover:text-white group-hover:border-black transition-all bg-transparent border-gray-300 text-gray-700"
                >
                  Lire la suite
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
