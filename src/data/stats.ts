// REPLACE WITH: CMS API CALL — see docs/CMS_INTEGRATION.md
import type { ImpactStat } from '@/types'

export const heroStats = [
  { value: '500', suffix: '+', label: 'Youth Members' },
  { value: '40', suffix: 'K+', label: 'Social Followers' },
  { value: '22', suffix: '', label: 'Arab Countries' },
  { value: '180', suffix: '+', label: 'Event Participants' },
]

export const trustBarStats = [
  { value: 500, suffix: '+', label: 'Community Members' },
  { value: 40000, suffix: '+', label: 'Social Media Followers' },
  { value: 22, suffix: '', label: 'MENA Countries' },
  { value: 180, suffix: '+', label: 'GreenX 2025 Participants' },
]

export const impactStats: ImpactStat[] = [
  {
    value: '500+',
    label: 'Youth Members',
    labelAr: 'أعضاء الشباب',
    description: 'Active members across 22 Arab countries',
    descriptionAr: 'أعضاء نشطون في 22 دولة عربية',
  },
  {
    value: '40K+',
    label: 'Social Media Followers',
    labelAr: 'متابع على التواصل الاجتماعي',
    description: 'Engaged community across Instagram, LinkedIn, and X',
    descriptionAr: 'مجتمع متفاعل عبر إنستغرام ولينكدإن وإكس',
  },
  {
    value: '22',
    label: 'Countries Reached',
    labelAr: 'دولة مشمولة',
    description: 'Full coverage across the Arab region',
    descriptionAr: 'تغطية شاملة لأرجاء المنطقة العربية',
  },
  {
    value: '180+',
    label: 'GreenX 2025 Participants',
    labelAr: 'مشارك في الفعاليات',
    description: 'Youth who joined our flagship environmental summit',
    descriptionAr: 'شباب شاركوا في قمتنا البيئية الرائدة',
  },
  {
    value: '60+',
    label: 'Opportunities Listed',
    labelAr: 'فرصة مدرجة',
    description: 'Fellowships, grants, events and internships aggregated',
    descriptionAr: 'زمالات ومنح وفعاليات وتدريب مجمّعة',
  },
  {
    value: '30+',
    label: 'Partner Organizations',
    labelAr: 'منظمة شريكة',
    description: 'NGOs, institutions, and funders supporting our ecosystem',
    descriptionAr: 'منظمات ومؤسسات وجهات تمويل تدعم منظومتنا',
  },
]

export const impactTimeline = [
  {
    year: '2024',
    title: 'Green Gate 4 MENA Youth Launched',
    titleAr: 'إطلاق Green Gate 4 MENA Youth',
    description: 'Launched Green Gate 4 MENA Youth after COP28 in Dubai, after noticing a clear gap in access for MENA youth to international conferences, programs, and opportunities.',
    descriptionAr: 'إطلاق Green Gate 4 MENA Youth بعد مؤتمر COP28 في دبي، بعد ملاحظة وجود فجوة واضحة في وصول شباب منطقة الشرق الأوسط وشمال أفريقيا إلى المؤتمرات الدولية والبرامج والفرص.',
  },
  {
    year: '2025',
    title: 'GreenX 2025 Summit',
    titleAr: 'قمة GreenX 2025',
    description: '180+ participants from 22 countries gathered for the region\'s premier youth climate summit.',
    descriptionAr: 'جمعت أكثر من 180 مشاركًا من 22 دولة في واحدة من أبرز القمم الشبابية المناخية في المنطقة.',
  },
  {
    year: '2025',
    title: 'First 500 Community Members',
    titleAr: 'أول 500 عضو في المجتمع',
    description: 'Grew to 500+ active youth members across 15 MENA countries within the first year.',
    descriptionAr: 'نمت المنصة لتصل إلى أكثر من 500 عضو شاب نشط من 15 دولة في منطقة الشرق الأوسط وشمال أفريقيا خلال السنة الأولى.',
  },
  {
    year: '2026',
    title: 'Official Platform Launch',
    titleAr: 'إطلاق المنصة الرسمية',
    description: 'Launching our official platform, services, and programs.',
    descriptionAr: 'إطلاق المنصة الرسمية والخدمات والبرامج الخاصة بـ Green Gate.',
  },
]
