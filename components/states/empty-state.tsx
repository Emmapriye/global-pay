import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-10 text-center',
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary" aria-hidden="true">
        <Icon className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="max-w-xs text-pretty text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}
