const STEPS = [
  { title: 'Create a demo account', description: 'Sign up to explore. Your wallets start with simulated balances.' },
  { title: 'Choose who and how much', description: 'Pick a recipient, a source wallet and the amount to send.' },
  { title: 'Review, then simulate', description: 'Check the rate and fee, confirm, and follow the simulated timeline.' },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-28 border-y bg-card py-16 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <div className="flex max-w-2xl flex-col gap-3">
          <span className="text-sm font-semibold text-primary">How it works</span>
          <h2 id="how-heading" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps, zero surprises
          </h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="tabular flex size-10 items-center justify-center rounded-full bg-charcoal text-sm font-semibold text-charcoal-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
