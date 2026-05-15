'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const primaryTabs = [
  { label: 'Home', href: '/' },
  { label: 'Post an ad', href: '/create/classified' },
  { label: 'My ads', href: '/dashboard/ads' },
  { label: 'Help', href: '/help' },
] as const

export function NavbarOverride() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = query.trim()
    if (!value) return
    router.push(`/search?q=${encodeURIComponent(value)}`)
    setMenuOpen(false)
  }

  const handleSignOut = () => {
    logout()
    router.push('/')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#153257] bg-[linear-gradient(180deg,#2f5f8f_0%,#11345a_78%,#0a2746_100%)] text-[#f5f9ff] shadow-[0_12px_32px_rgba(7,27,49,0.35)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 py-4 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/25 bg-white/10 p-1.5">
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full scale-[1.28] object-contain" />
            </div>
            <div>
              <p className="text-3xl font-black leading-none tracking-tight text-[#ffb347]">{SITE_CONFIG.name}</p>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex md:items-center md:gap-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ads, services, rentals, and jobs"
              className="h-10 w-full rounded-sm border border-[#0b2a4a] bg-white px-3 text-sm text-[#10253f] outline-none ring-[#d9922f] transition focus:ring-2"
            />
            <button type="submit" className="h-10 rounded-sm border border-[#b77422] bg-[#f7b14e] px-4 text-sm font-bold uppercase text-[#0d2e50] hover:bg-[#ffc06d]">Search</button>
          </form>

          <div className="hidden items-center justify-end gap-2 md:flex">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-sm border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/25"
              >
                Sign out
              </button>
            ) : (
              <Link href="/login" className="rounded-sm border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/25">Sign in</Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((state) => !state)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/25 bg-white/10 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="hidden border-t border-white/15 pb-2 pt-3 md:flex md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-1">
            {primaryTabs.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-t-md px-6 py-2 text-[1.08rem] font-bold transition',
                    active
                      ? 'bg-[#f2f2f2] text-[#0c2643]'
                      : 'border border-b-0 border-[#0f2d4e] bg-[#e9ecef] text-[#3f566f] hover:bg-[#f2f2f2] hover:text-[#0c2643]'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <Link href="/create/classified" className="inline-flex items-center gap-2 rounded-sm border border-[#0f6d22] bg-[#8fe85d] px-4 py-2 text-sm font-extrabold uppercase text-[#0f3f19] hover:bg-[#a0ef76]">
            Post now
          </Link>
        </div>

        {menuOpen ? (
          <div className="space-y-3 border-t border-white/15 py-4 md:hidden">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#47668a]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search local ads"
                  className="h-10 w-full rounded-sm border border-[#0b2a4a] bg-white pl-8 pr-3 text-sm text-[#10253f]"
                />
              </div>
              <button type="submit" className="h-10 rounded-sm border border-[#b77422] bg-[#f7b14e] px-3 text-xs font-bold uppercase text-[#0d2e50]">Go</button>
            </form>

            <div className="grid grid-cols-2 gap-2">
              {primaryTabs.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-sm border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold">
                  {item.label}
                </Link>
              ))}
            </div>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex w-full items-center justify-center rounded-sm border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold"
              >
                Sign out
              </button>
            ) : (
              <Link href="/login" className="inline-flex w-full items-center justify-center rounded-sm border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold">Sign in</Link>
            )}
          </div>
        ) : null}
      </div>
    </header>
  )
}
