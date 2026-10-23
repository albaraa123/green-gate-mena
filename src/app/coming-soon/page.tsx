export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-teal-600/30 blur-3xl"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/logo-vertical-white.svg"
        alt="Green Gate — بوابة خضراء"
        className="relative mb-12 h-32 w-auto md:h-40"
      />

      <section lang="en" dir="ltr" className="relative max-w-xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime">
          Coming Soon
        </p>
        <h1 className="font-display text-4xl font-extrabold md:text-5xl">
          Our Website is Launching Soon
        </h1>
        <p className="mt-4 text-lg text-teal-100">
          We are putting the final touches on Green Gate Website. The Arab world&apos;s premier
          gateway to environmental opportunities.
        </p>
        <p className="mt-3 text-lg font-semibold text-white">Please check back shortly!</p>
      </section>

      <div className="relative my-10 h-px w-24 bg-teal-500/60" />

      <section
        lang="ar"
        dir="rtl"
        className="relative max-w-xl"
        style={{ fontFamily: "'ThmanyahSans', var(--font-manrope), sans-serif" }}
      >
        <p className="mb-3 text-base font-bold text-lime">قريباً</p>
        <h2 className="text-4xl font-black leading-tight md:text-5xl">
          موقعنا الإلكتروني ينطلق قريباً
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-teal-100">
          نضع الآن لمساتنا الأخيرة على منصتنا؛ لتكون بوابتكم الأولى والوجهة الرائدة للفرص البيئية
          في منطقة الشرق الأوسط وشمال أفريقيا.
        </p>
        <p className="mt-3 text-lg font-bold text-white">نلقاكم قريبًا!</p>
      </section>
    </main>
  )
}
