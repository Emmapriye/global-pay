import type { Metadata } from 'next'
import Link from 'next/link'
import { signIn } from '../actions'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams

  const errors: Record<string, string> = {
    missing: 'Enter your email address and password.',
    config: 'Authentication is not configured. Please try again later.',
    credentials: 'We could not sign you in. Check your email and password.',
  }

  const notices: Record<string, string> = {
    'check-email': 'Registration received. Check your email if confirmation is required before signing in.',
    'signed-out': 'You have been signed out.',
  }

  return (
    <main className="flex min-h-[75dvh] items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm font-semibold text-emerald-800">
          ← GLOBAL PAY
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Sign in to access your account.
        </p>

        {error && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {errors[error] ?? 'Something went wrong. Please try again.'}
          </p>
        )}

        {message && (
          <p role="status" className="mt-5 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
            {notices[message] ?? 'Please continue.'}
          </p>
        )}

        <form action={signIn} className="mt-6 space-y-4">
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
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-emerald-700"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-800 px-4 py-3 font-semibold text-white hover:bg-emerald-900"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to GLOBAL PAY?{' '}
          <Link href="/register" className="font-semibold text-emerald-800">
            Create an account
          </Link>
        </p>

        <p className="mt-5 text-xs leading-5 text-gray-500">
          Demo platform only. No real money transfers are performed.
        </p>
      </section>
    </main>
  )
}
