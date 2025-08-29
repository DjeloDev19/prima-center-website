import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { RestaurantsManager } from "@/components/admin/restaurants-manager"

export default async function AdminRestaurantsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return <RestaurantsManager />
}
