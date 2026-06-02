'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { HeroOrbit } from './HeroOrbit'

interface Props {
  heroImage?: string
}

// Small decorative floating dots scattered around the hero.
const FLOAT_DOTS = [
  { top: '12%', left: '6%', size: 14, color: 'bg-teal-700', delay: 0 },
  { top: '24%', right: '10%', size: 10, color: 'bg-lime', delay: 0.4 },
  { bottom: '18%', left: '12%', size: 12, color: 'bg-teal-500', delay: 0.8 },
  { top: '60%', left: '3%', size: 8, color: 'bg-lime', delay: 1.2 },
  { bottom: '28%', right: '6%', size: 16, color: 'bg-teal-600', delay: 0.6 },
]

export function HeroSection({ heroImage }: Props) {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-gradient-to-br from-white via-teal-50/30 to-lime/5">

      {/* Custom uploaded background image (optional) */}
      {heroImage && (
        <>
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-teal-900/70" aria-hidden />
        </>
      )}

      {/* Soft blurred gradient blobs */}
      {!heroImage && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <motion.div
            className="absolute top-0 end-0 w-[700px] h-[700px] rounded-full bg-teal-100/50 blur-3xl translate-x-1/3 -translate-y-1/4"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 start-0 w-[500px] h-[500px] rounded-full bg-lime/15 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>
      )}

      {/* Floating decorative dots */}
      {!heroImage && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {FLOAT_DOTS.map((d, i) => (
            <motion.span
              key={i}
              className={`absolute rounded-full ${d.color}`}
              style={{
                top: d.top,
                bottom: d.bottom,
                left: d.left,
                right: d.right,
                width: d.size,
                height: d.size,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
            />
          ))}
        </div>
      )}

      <Container className="relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Text column */}
          <div className="flex flex-col gap-7 text-center lg:text-start">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto lg:mx-0"
            >
              <span
                className={[
                  'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium',
                  heroImage ? 'bg-white/15 text-white' : 'bg-teal-100/70 text-teal-800',
                ].join(' ')}
              >
                <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
                {t('eyebrow')}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className={[
                'font-display text-display-xl leading-[1.3] text-balance',
                heroImage ? 'text-white' : 'text-ink',
              ].join(' ')}
            >
              {t('h1Part1')}{' '}
              <span className={heroImage ? 'text-lime' : 'text-teal-700'}>{t('h1Italic')}</span>
              {t('h1Part2') ? ` ${t('h1Part2')} ` : ' '}
              <span className={heroImage ? 'text-lime' : 'text-teal-700'}>{t('h1Highlight')}</span>
              {t('h1Part3') ? ` ${t('h1Part3')}` : ''}
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className={[
                'text-lg leading-[1.9] max-w-xl mx-auto lg:mx-0',
                heroImage ? 'text-white/80' : 'text-ink-soft',
              ].join(' ')}
            >
              {t('subhead')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <Button size="lg" asChild>
                <Link href="/ecosystem/opportunities">
                  {t('cta1')}
                  <ArrowRight className="ms-1.5 h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className={heroImage ? 'border-white/40 text-white hover:bg-white/10 hover:border-white/60' : ''}
              >
                <Link href="/get-involved">{t('cta2')}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Animated brand orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex justify-center"
          >
            <HeroOrbit />
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
