import { createClient } from '@/lib/supabase/server'
import { SettingsForm } from './_components/SettingsForm'

export const metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('key, value')

  const settings: Record<string, string> = {}
  for (const row of data ?? []) {
    settings[row.key as string] = row.value as string
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Site Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  )
}
