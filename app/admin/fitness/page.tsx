import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FitnessManager } from "@/components/admin/fitness-manager"

export default async function AdminFitnessPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return <FitnessManager />
}
