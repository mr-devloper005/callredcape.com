import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Posting your first ad',
    body: 'Open Post an ad, choose category, fill details, and publish with clear contact information.',
  },
  {
    title: 'Managing active ads',
    body: 'Use My ads to edit title, update status, and remove listings that are sold or expired.',
  },
  {
    title: 'Safety best practices',
    body: 'Always verify buyer/seller details and avoid off-platform payment requests from unknown users.',
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-md border border-[#d7dde5] bg-white p-6 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a738e]">Help Center</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2c4f71]">Support guides for classifieds posting and management.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5a6f82]">
            Find quick instructions for posting, editing, and keeping listings compliant.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/create/classified" className="rounded-sm border border-[#0f6d22] bg-[#8de860] px-4 py-2 text-sm font-bold text-[#0d421b] hover:bg-[#9cf071]">
              Post an ad
            </Link>
            <Link href="/contact" className="rounded-sm border border-[#b9c8d8] bg-[#f5f8fb] px-4 py-2 text-sm font-semibold text-[#365777] hover:bg-[#eaf1f8]">
              Contact support
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic.title} className="rounded-md border border-[#d7dde5] bg-white p-5">
              <h2 className="text-xl font-extrabold text-[#2b4c6d]">{topic.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#5b7084]">{topic.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-md border border-[#d7dde5] bg-white p-5">
          <h2 className="text-2xl font-extrabold text-[#2b4c6d]">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-4">
            {mockFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  )
}
