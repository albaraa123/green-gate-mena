// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
import type { OpportunityTheme } from '@/types'

export interface ThemeDefinition {
  id: OpportunityTheme
  label: string
  labelAr: string
  icon: string
  color: string
}

export const themes: ThemeDefinition[] = [
  { id: 'climate', label: 'Climate Action', labelAr: 'العمل المناخي', icon: '🌡️', color: 'teal' },
  { id: 'energy', label: 'Renewable Energy', labelAr: 'الطاقة المتجددة', icon: '⚡', color: 'yellow' },
  { id: 'water', label: 'Water & Oceans', labelAr: 'المياه والمحيطات', icon: '💧', color: 'blue' },
  { id: 'biodiversity', label: 'Biodiversity', labelAr: 'التنوع البيولوجي', icon: '🌿', color: 'green' },
  { id: 'waste', label: 'Waste & Circular Economy', labelAr: 'النفايات والاقتصاد الدائري', icon: '♻️', color: 'orange' },
  { id: 'sustainability', label: 'Sustainability', labelAr: 'الاستدامة', icon: '🌱', color: 'leaf' },
  { id: 'policy', label: 'Environmental Policy', labelAr: 'السياسات البيئية', icon: '📋', color: 'purple' },
  { id: 'finance', label: 'Green Finance', labelAr: 'التمويل الأخضر', icon: '💰', color: 'emerald' },
  { id: 'agriculture', label: 'Food & Agriculture', labelAr: 'الغذاء والزراعة', icon: '🌾', color: 'amber' },
  { id: 'urban', label: 'Urban & Smart Cities', labelAr: 'المدن الذكية', icon: '🏙️', color: 'gray' },
  { id: 'oceans', label: 'Marine & Oceans', labelAr: 'البحار والمحيطات', icon: '🌊', color: 'turquoise' },
  { id: 'youth', label: 'Youth Leadership', labelAr: 'قيادة الشباب', icon: '🌟', color: 'lime' },
]

export function getThemeLabel(id: OpportunityTheme): string {
  return themes.find((t) => t.id === id)?.label ?? id
}

export const themeOptions = themes.map((t) => ({
  value: t.id,
  label: t.label,
}))
