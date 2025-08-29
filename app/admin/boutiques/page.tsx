import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BoutiquesManager } from "@/components/admin/boutiques-manager"

export default async function AdminBoutiquesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return <BoutiquesManager />
}
