import { Mail, MapPin, Phone } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'support@callredcape.com'

const supportLanes = [
  {
    icon: Phone,
    title: 'Ad posting support',
    body: 'Need help publishing, editing, or renewing a classified ad? Our support lane handles posting issues first.',
  },
  {
    icon: Mail,
    title: 'Safety and reporting',
    body: 'Report suspicious activity, impersonation, or policy violations so we can review and respond quickly.',
  },
  {
    icon: MapPin,
    title: 'City and category requests',
    body: 'Request new city/category coverage and share demand signals from your local marketplace.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-md border border-[#d7dde5] bg-white p-6 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a738e]">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2c4f71]">Support built for classifieds operations.</h1>
            <p className="mt-4 text-sm leading-7 text-[#5a6f82]">
              Share your issue with details and we will route it to the right lane. For fastest resolution, include ad URL, city, and exact action attempted.
            </p>
            <div className="mt-6 space-y-3">
              {supportLanes.map((lane) => (
                <div key={lane.title} className="rounded-sm border border-[#d2dbe6] bg-[#f7fafe] p-4">
                  <lane.icon className="h-4 w-4 text-[#2f6ea9]" />
                  <h2 className="mt-2 text-lg font-bold text-[#2b4c6d]">{lane.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#5b7084]">{lane.body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-md border border-[#d7dde5] bg-white p-6 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
            <h2 className="text-2xl font-extrabold text-[#2b4c6d]">Send a message</h2>
            {CONTACT_EMAIL ? (
              <div className="mt-4 rounded-sm border border-[#d2dbe6] bg-[#f7fafe] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b738c]">Email us directly</p>
                <p className="mt-2 text-sm text-[#2b4c6d]">{CONTACT_EMAIL}</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-3 inline-flex h-10 items-center justify-center rounded-sm border border-[#2f6ea9] bg-white px-4 text-sm font-bold uppercase text-[#2f6ea9] hover:bg-[#eaf3fb]"
                >
                  Email support
                </a>
              </div>
            ) : null}
            <form className="mt-5 grid gap-4">
              <div>
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b738c]">Name</label>
                <input id="name" className="mt-1 h-11 w-full rounded-sm border border-[#b8c8d9] px-3 text-sm text-[#1e3c5a]" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b738c]">Email</label>
                <input id="email" className="mt-1 h-11 w-full rounded-sm border border-[#b8c8d9] px-3 text-sm text-[#1e3c5a]" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="topic" className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b738c]">Topic</label>
                <input id="topic" className="mt-1 h-11 w-full rounded-sm border border-[#b8c8d9] px-3 text-sm text-[#1e3c5a]" placeholder="Ad posting, safety report, billing, other" />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b738c]">Message</label>
                <textarea id="message" className="mt-1 min-h-[160px] w-full rounded-sm border border-[#b8c8d9] px-3 py-2 text-sm text-[#1e3c5a]" placeholder="Please include ad URL, city, and issue details..." />
              </div>
              <button type="submit" className="inline-flex h-11 items-center justify-center rounded-sm border border-[#0f6d22] bg-[#8de860] px-4 text-sm font-bold uppercase text-[#0d421b] hover:bg-[#9cf071]">
                Submit ticket
              </button>
            </form>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  )
}
