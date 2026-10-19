import { ArrowLeftRight, Eye, ListChecks, Users, Wallet, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: Wallet,
    title: 'Four currency wallets',
    description: 'USD, GBP, EUR and JPY balances, each formatted the way locals read them.',
  },
  {
    icon: Eye,
    title: 'Fees up front',
    description: 'See the exchange rate, fee and exact amount received before you confirm anything.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Instant conversion preview',
    description: 'Switch currencies and watch the converted amount update as you type.',
  },
  {
    icon: ListChecks,
    title: 'Step-by-step tracking',
    description: 'Follow each simulated transfer from Created to Completed on a clear timeline.',
  },
  {
    icon: Users,
    title: 'Saved recipients',
    description: 'Keep a tidy list of beneficiaries so repeat transfers take seconds.',
  },
  {
    icon: Zap,
    title: 'Built for your phone',
    description: 'A mobile-first interface that stays fast, readable and accessible on any screen.',
  },
]

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-28 bg-background py-16 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <div className="flex max-w-2xl flex-col gap-3">
          <span className="text-sm font-semibold text-primary">Features</span>
          <h2 id="features-heading" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything an international wallet should feel like
          </h2>
          <p className="text-pretty text-muted-foreground">
            GLOBAL PAY is a product demo. Explore the full experience end to end — without any real funds.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <li key={feature.title} className="flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-xs">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden="true">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
