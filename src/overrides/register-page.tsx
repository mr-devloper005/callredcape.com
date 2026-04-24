'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, UserPlus } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Name, email, and password are required.')
      return
    }

    try {
      await signup(name.trim(), email.trim(), password)
      router.push('/')
    } catch {
      setError('Could not create account. Please retry.')
    }
  }

  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-md border border-[#cfd8e3] bg-[#f4f8fc] p-6 shadow-[0_8px_24px_rgba(15,45,74,0.08)]">
            <p className="inline-flex items-center gap-2 rounded-sm border border-[#bad0e8] bg-white px-2 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#3f6894]">
              <UserPlus className="h-3.5 w-3.5" />
              Seller onboarding
            </p>
            <h1 className="mt-4 text-4xl font-extrabold text-[#294c6f]">Create your classifieds account</h1>
            <p className="mt-4 text-sm leading-7 text-[#5b7188]">
              Register once and start posting property, jobs, services, and resale ads in minutes. Your account is saved locally for quick return access.
            </p>
          </div>

          <div className="rounded-md border border-[#cfd8e3] bg-white p-6 shadow-[0_8px_24px_rgba(15,45,74,0.08)]">
            <h2 className="text-xl font-extrabold text-[#2f5378]">Create account</h2>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
              <div>
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b738c]">Full name</label>
                <input id="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-1 h-11 w-full rounded-sm border border-[#b8c8d9] px-3 text-sm text-[#1e3c5a]" placeholder="Your name" autoComplete="name" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b738c]">Email</label>
                <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 h-11 w-full rounded-sm border border-[#b8c8d9] px-3 text-sm text-[#1e3c5a]" placeholder="you@example.com" autoComplete="email" />
              </div>
              <div>
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b738c]">Password</label>
                <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 h-11 w-full rounded-sm border border-[#b8c8d9] px-3 text-sm text-[#1e3c5a]" placeholder="Create password" autoComplete="new-password" />
              </div>

              {error ? <p className="rounded-sm border border-[#edc7ca] bg-[#fff0f1] px-3 py-2 text-sm text-[#aa2f3f]">{error}</p> : null}

              <button type="submit" disabled={isLoading} className="inline-flex h-11 items-center justify-center rounded-sm border border-[#0f6d22] bg-[#8de860] px-4 text-sm font-bold uppercase text-[#0d421b] disabled:cursor-not-allowed disabled:opacity-60">
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="mt-5 text-sm text-[#5f7690]">
              Already have an account?{' '}
              <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-[#2868a6] hover:underline">
                Sign in
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
