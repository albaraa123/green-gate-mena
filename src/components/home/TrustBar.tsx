import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/Container'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export async function TrustBar() {
  const t = await getTranslations('trust')

  const stats = [
    { target: 500, suffix: '+', label: t('members') },
    { target: 40000, suffix: '+', label: t('followers') },
    { target: 22, suffix: '', label: t('countries') },
    { target: 180, suffix: '+', label: t('participants') },
  ]

  return (
    <section className="bg-teal-700 grain-overlay py-10 md:py-14">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map(({ target, suffix, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <dt className="font-display text-3xl md:text-4xl font-semibold text-white">
                <AnimatedCounter target={target} suffix={suffix} />
              </dt>
              <dd className="text-xs font-mono uppercase tracking-widest text-teal-300/70">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
