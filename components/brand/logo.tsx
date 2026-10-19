import Link from 'next/link'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

type LogoProps = {
  href?: string
  className?: string
  tone?: 'default' | 'inverted'
}

export function Logo({ href = '/', className, tone = 'default' }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
      aria-label="GLOBAL PAY home"
    >
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-lg',
          tone === 'inverted' ? 'bg-brand text-brand-foreground' : 'bg-primary text-primary-foreground',
        )}
        aria-hidden="true"
      >
        <Globe className="size-4.5" strokeWidth={2.25} />
      </span>
      <span
        className={cn(
          'text-[15px] font-semibold tracking-[0.14em]',
          tone === 'inverted' ? 'text-charcoal-foreground' : 'text-foreground',
        )}
      >
        GLOBAL<span className={tone === 'inverted' ? 'text-brand' : 'text-primary'}> PAY</span>
      </span>
    </Link>
  )
}
