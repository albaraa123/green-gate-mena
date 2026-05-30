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
    year: '2022',
    title: 'Green Gate MENA Founded',
    titleAr: 'تأسيس Green Gate MENA',
    description: 'Launched as a youth-led initiative to connect MENA youth with climate opportunities.',
    descriptionAr: 'انطلقت كمبادرة شبابية لربط الشباب العربي بالفرص المناخية.',
  },
  {
    year: '2023',
    title: 'First 500 Community Members',
    titleAr: 'أول 500 عضو في المجتمع',
    description: 'Grew to 500+ active youth members across 15 MENA countries within the first year.',
    descriptionAr: 'وصلنا إلى 500+ عضو شباب نشط في أرجاء المنطقة العربية خلال العام الأول.',
  },
  {
    year: '2024',
    title: 'Regional Partnerships',
    titleAr: 'الشراكات الإقليمية',
    description: 'Established formal partnerships with 30+ NGOs, UN agencies, and regional institutions.',
    descriptionAr: 'أرسينا شراكات رسمية مع 30+ منظمة غير حكومية ووكالات أممية ومؤسسات إقليمية.',
  },
  {
    year: '2025',
    title: 'GreenX 2025 Summit',
    titleAr: 'قمة GreenX 2025',
    description: '180+ participants from 22 countries gathered for the region\'s premier youth climate summit.',
    descriptionAr: 'اجتمع 180+ مشارك من 22 دولة في قمة المناخ الشبابية الرائدة في المنطقة.',
  },
  {
    year: '2026',
    title: 'Platform Launch',
    titleAr: 'إطلاق المنصة',
    description: 'Launching the comprehensive digital ecosystem connecting every green actor in MENA.',
    descriptionAr: 'إطلاق المنظومة الرقمية الشاملة التي تربط كل فاعل أخضر في المنطقة العربية.',
  },
]
