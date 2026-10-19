import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroPreview } from './hero-preview'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-charcoal-foreground">
      <div
        className="pointer-events-none absolute -right-40 top-0 size-[32rem] rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-20">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-charcoal-foreground/80">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            Interactive demo · simulated balances
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Your money.
            <br />
            <span className="text-brand">Your world.</span>
          </h1>
          <p className="max-w-lg text-pretty text-base leading-relaxed text-charcoal-foreground/75 sm:text-lg">
            Hold US dollars, pounds, euros and yen side by side. Explore how multi-currency wallets, transparent
            fees and step-by-step transfer tracking feel — all with demo money.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-brand px-6 text-base text-brand-foreground hover:bg-brand/90">
              <Link href="/register">
                Get started
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/20 bg-transparent px-6 text-base text-charcoal-foreground hover:bg-white/10 hover:text-charcoal-foreground"
            >
              <Link href="/dashboard">Explore the demo dashboard</Link>
            </Button>
          </div>
          <p className="flex items-center gap-2 text-xs text-charcoal-foreground/60">
            <ShieldCheck className="size-4 text-brand" aria-hidden="true" />
            No real money moves. No bank accounts are connected.
          </p>
        </div>

        <HeroPreview />
      </div>
    </section>
  )
}
