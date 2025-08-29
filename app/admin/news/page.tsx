import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { NewsManager } from "@/components/admin/news-manager"

export default async function AdminNewsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return <NewsManager />
}
