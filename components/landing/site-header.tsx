import Link from 'next/link'
import { Logo } from '@/components/brand/logo'

export function SiteHeader() {
  return (
    <header className="sticky top-8 z-40 border-b border-white/10 bg-charcoal/90 text-charcoal-foreground backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo tone="inverted" />
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-charcoal-foreground/75 md:flex">
          <a href="#features" className="hover:text-charcoal-foreground">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-charcoal-foreground">
            How it works
          </a>
          <a href="#currencies" className="hover:text-charcoal-foreground">
            Currencies
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex h-7 items-center justify-center rounded-lg px-2.5 text-sm font-medium text-charcoal-foreground transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex h-7 items-center justify-center rounded-lg bg-brand px-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
