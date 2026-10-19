import { CtaFooter } from '@/components/landing/cta-footer'
import { CurrenciesSection } from '@/components/landing/currencies-section'
import { Features } from '@/components/landing/features'
import { Hero } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { SiteHeader } from '@/components/landing/site-header'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CurrenciesSection />
      </main>
      <CtaFooter />
    </>
  )
}
