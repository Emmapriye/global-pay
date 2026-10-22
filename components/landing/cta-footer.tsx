import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/brand/logo'

export function CtaFooter() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-brand p-8 text-brand-foreground sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Ready to take a look?</h2>
            <p className="text-pretty text-sm opacity-80">Create a demo account in seconds. No card, no bank, no real money.</p>
          </div>
          <Link
            href="/register"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-charcoal px-6 text-base font-medium text-charcoal-foreground transition-colors hover:bg-charcoal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get started
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-charcoal-foreground/60 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <Logo tone="inverted" />
            <p className="max-w-sm text-pretty text-xs leading-relaxed">
              GLOBAL PAY is a demonstration application. It is not a bank or licensed money transmitter, does not
              hold funds, and does not send money to any real account.
            </p>
          </div>
          <nav aria-label="Footer" className="flex gap-6">
            <Link href="/login" className="hover:text-charcoal-foreground">
              Log in
            </Link>
            <Link href="/register" className="hover:text-charcoal-foreground">
              Register
            </Link>
            <Link href="/dashboard" className="hover:text-charcoal-foreground">
              Demo
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
