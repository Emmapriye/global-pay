'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabasePublicConfig } from '@/lib/supabase/config'

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    redirect('/login?error=missing')
  }

  if (!getSupabasePublicConfig()) {
    redirect('/login?error=config')
  }

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/login?error=credentials')
  }

  redirect('/dashboard')
}

export async function signUp(formData: FormData) {
  const fullName = String(formData.get('fullName') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!fullName || !email || !password) {
    redirect('/register?error=missing')
  }

  if (password.length < 8) {
    redirect('/register?error=password')
  }

  if (!getSupabasePublicConfig()) {
    redirect('/register?error=config')
  }

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    redirect('/register?error=signup')
  }

  if (data.session) {
    redirect('/dashboard')
  }

  redirect('/login?message=check-email')
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()

  await supabase.auth.signOut()

  redirect('/login?message=signed-out')
}
