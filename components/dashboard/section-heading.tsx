import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type SectionHeadingProps = {
  id: string
  title: string
  href?: string
  linkLabel?: string
  meta?: React.ReactNode
}

export function SectionHeading({ id, title, href, linkLabel, meta }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-baseline gap-2">
        <h2 id={id} className="text-base font-semibold tracking-tight">
          {title}
        </h2>
        {meta}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="flex items-center gap-0.5 rounded-md text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          {linkLabel}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
