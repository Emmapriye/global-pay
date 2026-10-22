import type { Metadata } from 'next'
import Link from 'next/link'
import { signUp } from '../actions'

export const metadata: Metadata = {
  title: 'Create account',
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const messages: Record<string, string> = {
    missing: 'Please complete every field.',
    password: 'Your password must contain at least 8 characters.',
    config: 'Authentication is not configured. Please try again later.',
    signup: 'Registration failed. Check your details or try another email.',
  }

  return (
    <main className="flex min-h-[75dvh] items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm font-semibold text-emerald-800">
          ← GLOBAL PAY
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Join GLOBAL PAY and explore your multi-currency demo wallet.
        </p>

        {error && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {messages[error] ?? 'Something went wrong. Please try again.'}
          </p>
        )}

        <form action={signUp} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-emerald-700"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-emerald-700"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-emerald-700"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-800 px-4 py-3 font-semibold text-white hover:bg-emerald-900"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-emerald-800">
            Sign in
          </Link>
        </p>

        <p className="mt-5 text-xs leading-5 text-gray-500">
          Demo platform only. No real money transfers are performed.
        </p>
      </section>
    </main>
  )
}
