import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Account Responsibility',
    body: 'You are responsible for keeping your account credentials secure and for activity posted from your account.',
  },
  {
    title: 'Posting Rules',
    body: 'Listings must be accurate, lawful, and non-deceptive. Duplicate spam postings and prohibited content are not allowed.',
  },
  {
    title: 'Content Rights',
    body: 'You retain ownership of your posted content and grant platform rights required to display and distribute listings.',
  },
  {
    title: 'Enforcement',
    body: 'We may remove listings, restrict features, or suspend accounts for policy violations and abuse prevention.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-md border border-[#d7dde5] bg-white p-6 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a738e]">Terms of Service</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2c4f71]">Rules for using {SITE_CONFIG.name}.</h1>
          <p className="mt-3 text-sm text-[#60788f]">Last updated: April 24, 2026</p>
        </section>

        <section className="mt-6 grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-md border border-[#d7dde5] bg-white p-5">
              <h2 className="text-xl font-extrabold text-[#2b4c6d]">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#5b7084]">{section.body}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
