import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'

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
          <Button asChild variant="ghost" size="sm" className="text-charcoal-foreground hover:bg-white/10 hover:text-charcoal-foreground">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
