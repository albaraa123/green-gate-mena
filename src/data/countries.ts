// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md

export interface Country {
  code: string
  name: string
  nameAr: string
  region: 'north-africa' | 'levant' | 'gulf' | 'horn'
}

export const countries: Country[] = [
  { code: 'MA', name: 'Morocco', nameAr: 'المغرب', region: 'north-africa' },
  { code: 'DZ', name: 'Algeria', nameAr: 'الجزائر', region: 'north-africa' },
  { code: 'TN', name: 'Tunisia', nameAr: 'تونس', region: 'north-africa' },
  { code: 'LY', name: 'Libya', nameAr: 'ليبيا', region: 'north-africa' },
  { code: 'EG', name: 'Egypt', nameAr: 'مصر', region: 'north-africa' },
  { code: 'SD', name: 'Sudan', nameAr: 'السودان', region: 'north-africa' },
  { code: 'MR', name: 'Mauritania', nameAr: 'موريتانيا', region: 'north-africa' },
  { code: 'LB', name: 'Lebanon', nameAr: 'لبنان', region: 'levant' },
  { code: 'SY', name: 'Syria', nameAr: 'سوريا', region: 'levant' },
  { code: 'JO', name: 'Jordan', nameAr: 'الأردن', region: 'levant' },
  { code: 'PS', name: 'Palestine', nameAr: 'فلسطين', region: 'levant' },
  { code: 'IQ', name: 'Iraq', nameAr: 'العراق', region: 'levant' },
  { code: 'SA', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', region: 'gulf' },
  { code: 'AE', name: 'UAE', nameAr: 'الإمارات', region: 'gulf' },
  { code: 'KW', name: 'Kuwait', nameAr: 'الكويت', region: 'gulf' },
  { code: 'QA', name: 'Qatar', nameAr: 'قطر', region: 'gulf' },
  { code: 'BH', name: 'Bahrain', nameAr: 'البحرين', region: 'gulf' },
  { code: 'OM', name: 'Oman', nameAr: 'عُمان', region: 'gulf' },
  { code: 'YE', name: 'Yemen', nameAr: 'اليمن', region: 'gulf' },
  { code: 'DJ', name: 'Djibouti', nameAr: 'جيبوتي', region: 'horn' },
  { code: 'SO', name: 'Somalia', nameAr: 'الصومال', region: 'horn' },
  { code: 'KM', name: 'Comoros', nameAr: 'جزر القمر', region: 'horn' },
]

export const countryOptions = countries.map((c) => ({
  value: c.code,
  label: c.name,
}))

export function getCountryName(code: string): string {
  return countries.find((c) => c.code === code)?.name ?? code
}
