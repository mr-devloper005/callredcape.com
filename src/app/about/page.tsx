import Link from 'next/link'
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const stats = [
  { label: 'Active city feeds', value: '120+' },
  { label: 'Ads posted daily', value: '3,500+' },
  { label: 'Avg. response speed', value: '< 2 hrs' },
]

const values = [
  {
    icon: Zap,
    title: 'Fast posting flow',
    body: 'Post and publish with minimal friction so sellers can list quickly and buyers can act faster.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust-focused design',
    body: 'Cleaner ad cards, clear contact cues, and location visibility help users evaluate listings confidently.',
  },
  {
    icon: CheckCircle2,
    title: 'Utility over clutter',
    body: 'Every major page is optimized for scan speed, search intent, and direct action.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-md border border-[#d7dde5] bg-white p-6 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a738e]">About {SITE_CONFIG.name}</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2c4f71] sm:text-5xl">
            Built for local classifieds at real marketplace speed.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5a6f82]">
            {SITE_CONFIG.name} helps buyers and sellers connect through fast, practical classified experiences.
            We focus on clean discovery, stronger ad visibility, and lower friction between search and response.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/classifieds" className="rounded-sm border border-[#0f6d22] bg-[#8de860] px-4 py-2 text-sm font-bold text-[#0d421b] hover:bg-[#9cf071]">
              Browse classifieds
            </Link>
            <Link href="/create/classified" className="rounded-sm border border-[#b9c8d8] bg-[#f5f8fb] px-4 py-2 text-sm font-semibold text-[#365777] hover:bg-[#eaf1f8]">
              Post an ad
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <article key={item.label} className="rounded-md border border-[#d7dde5] bg-white p-5 shadow-[0_8px_20px_rgba(10,44,78,0.07)]">
              <p className="text-3xl font-extrabold text-[#2b4c6d]">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-[#637b92]">{item.label}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} className="rounded-md border border-[#d7dde5] bg-white p-5">
              <item.icon className="h-5 w-5 text-[#2f6ea9]" />
              <h2 className="mt-3 text-xl font-bold text-[#2b4c6d]">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#5b7084]">{item.body}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
