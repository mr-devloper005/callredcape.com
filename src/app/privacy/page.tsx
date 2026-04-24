import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const sections = [
  {
    title: 'Information We Collect',
    points: [
      'Account details you provide during signup such as name and email.',
      'Listing data and media you publish when posting classifieds.',
      'Basic usage telemetry used for reliability, fraud detection, and product quality.',
    ],
  },
  {
    title: 'How We Use Your Data',
    points: [
      'To show your ads, process edits, and maintain your posting history.',
      'To prevent abuse, spam, and suspicious account behavior.',
      'To improve search relevance and local discovery quality.',
    ],
  },
  {
    title: 'Your Controls',
    points: [
      'You can update or remove posted listings from your account interface.',
      'You can request deletion of account-linked data through support.',
      'You can manage optional communication preferences at any time.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-md border border-[#d7dde5] bg-white p-6 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a738e]">Privacy Policy</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2c4f71]">How we collect, use, and protect your data.</h1>
          <p className="mt-3 text-sm text-[#60788f]">Last updated: April 24, 2026</p>
        </section>

        <section className="mt-6 grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-md border border-[#d7dde5] bg-white p-5">
              <h2 className="text-xl font-extrabold text-[#2b4c6d]">{section.title}</h2>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#5b7084]">
                {section.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
