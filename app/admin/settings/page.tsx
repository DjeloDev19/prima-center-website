import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SettingsManager } from "@/components/admin/settings-manager"

export default async function AdminSettingsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return <SettingsManager />
}
