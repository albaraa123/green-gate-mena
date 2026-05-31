'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 end-0 w-[600px] h-[600px] rounded-full bg-teal-50 blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 start-0 w-[400px] h-[400px] rounded-full bg-lime/10 blur-3xl opacity-80" />
      </div>

      <Container className="relative z-10 py-24">
        <div className="max-w-2xl flex flex-col gap-8">

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-display-xl text-ink leading-[1.06] text-balance"
          >
            {t('h1Part1')}{' '}
            <span className="relative inline-block">
              <span className="text-teal-700 italic">{t('h1Italic')}</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-2.5 bg-lime/50 -skew-x-6 -z-10 rounded-sm"
                aria-hidden
              />
            </span>
            {t('h1Part2') ? ` ${t('h1Part2')} ` : ' '}
            <span className="text-teal-700">{t('h1Highlight')}</span>
            {t('h1Part3') ? ` ${t('h1Part3')}` : ''}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-ink-soft text-lg leading-relaxed"
          >
            {t('subhead')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap gap-3"
          >
            <Button size="lg" asChild>
              <Link href="/ecosystem/opportunities">
                {t('cta1')}
                <ArrowRight className="ms-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/get-involved">{t('cta2')}</Link>
            </Button>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
