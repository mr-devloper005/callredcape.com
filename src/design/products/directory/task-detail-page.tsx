import Link from 'next/link'
import {
  Bookmark,
  Calendar,
  ChevronLeft,
  Globe,
  Mail,
  MapPin,
  Phone,
  Search,
  Share2,
  ShieldCheck,
  Tag,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { TaskPhotoGallery } from '@/design/products/directory/task-photo-gallery'

const readString = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const readNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/,/g, '').trim())
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}


const detailValue = (value: unknown) => {
  const asText = readString(value)
  if (asText) return asText
  const numeric = readNumber(value)
  if (numeric === null) return ''
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(numeric)
}

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location =
    readString(content.address) || readString(content.location) || readString(content.city) || readString(content.area)
  const website = readString(content.website)
  const phone = readString(content.phone)
  const email = readString(content.email)
  const highlights = Array.isArray(content.highlights)
    ? content.highlights.filter((item): item is string => typeof item === 'string')
    : []
  const websiteHref = website ? (website.startsWith('http://') || website.startsWith('https://') ? website : `https://${website}`) : ''
  const fuelType = readString(content.fuelType || content.fuel)
  const owner = readString(content.owner || content.ownership || content.ownerType)
  const views = readNumber(content.views || (post as any).views)

  const adDetails: Array<{ label: string; value: string }> = [
    { label: 'Brand', value: detailValue(content.brand || content.brandName || content.make) },
    { label: 'Model', value: detailValue(content.model) },
    { label: 'Year', value: detailValue(content.year) },
    { label: 'Variant', value: detailValue(content.variant || content.trim) },
    { label: 'Fuel Type', value: detailValue(content.fuelType || content.fuel) },
    { label: 'Condition', value: detailValue(content.condition) },
    { label: 'Kms Driven', value: detailValue(content.kmsDriven || content.kmDriven || content.mileage) },
    { label: 'Seller Type', value: detailValue(content.sellerType || content.seller_type) },
    { label: 'Color', value: detailValue(content.color) },
    { label: 'Location', value: location },
  ].filter((item) => item.value)

  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
              <Link href={taskRoute} className="inline-flex items-center gap-2 hover:text-slate-950">
                <ChevronLeft className="h-4 w-4" /> Back to {taskLabel}
              </Link>
              <span className="text-slate-300">/</span>
              <Link
                href={`/search?task=${encodeURIComponent(task)}&category=${encodeURIComponent(category)}`}
                className="hover:text-slate-950"
              >
                {category || 'All'}
              </Link>
              <span className="text-slate-300">/</span>
              <span className="max-w-[58ch] truncate text-slate-800">{post.title}</span>
            </nav>

            <h1 className="text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
              {typeof views === 'number' ? <span>{new Intl.NumberFormat('en-IN').format(views)} views</span> : null}
              {fuelType ? (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                  {fuelType}
                </span>
              ) : null}
              {owner ? (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                  {owner}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </span>
            </div>
          </div>

          <div className="w-full max-w-xl">
            <form
              action="/search"
              method="GET"
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              <input type="hidden" name="task" value={task} />
              {category ? <input type="hidden" name="category" value={category} /> : null}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                <Search className="h-4 w-4" />
              </div>
              <input
                name="q"
                placeholder={`Search ${taskLabel.toLowerCase()}...`}
                className="h-10 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
                defaultValue=""
              />
              <button
                type="submit"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Search
              </button>
            </form>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">Try: &quot;near me&quot;</span>
              <span className="rounded-full bg-white px-3 py-1 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">Try: &quot;open now&quot;</span>
              <span className="rounded-full bg-white px-3 py-1 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">Try: &quot;budget&quot;</span>
            </div>
          </div>
        </div>

        <section className="grid gap-10 lg:grid-cols-[360px_1fr] lg:items-start">
          <div className="space-y-0 lg:order-2">
            <TaskPhotoGallery images={images} title={post.title} maxImages={13} />

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-6 border-b border-slate-200 px-6 py-4 text-sm font-semibold text-slate-700">
                <a href="#ad-details" className="hover:text-slate-950">
                  Ad Details
                </a>
                <a href="#description" className="hover:text-slate-950">
                  Description
                </a>
              </div>

              <div id="ad-details" className="px-6 py-6">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">Ad Details</h2>
                <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {adDetails.map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                      <p className="text-sm font-semibold text-slate-600">{item.label}</p>
                      <p className="text-sm text-slate-950">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="description" className="border-t border-slate-200 px-6 py-6">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">Description</h2>
                <RichContent html={descriptionHtml} className="mt-4 text-sm leading-8 prose-p:my-3" />
                {highlights.length ? (
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {highlights.slice(0, 6).map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Map</p>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </div>

          <aside className="space-y-6 lg:order-1 lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category || taskLabel}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <Tag className="h-3.5 w-3.5" /> {taskLabel}
                </span>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-slate-700">
                {location ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <MapPin className="h-4 w-4" /> {location}
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Phone className="h-4 w-4" /> {phone}
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Mail className="h-4 w-4" /> {email}
                  </div>
                ) : null}
                {website ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100"
                  >
                    <Globe className="h-4 w-4" /> {website}
                  </a>
                ) : null}
              </div>

              <div className="mt-6 grid gap-3">
                {phone ? (
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500"
                  >
                    CALL
                  </a>
                ) : null}
                {!phone && email ? (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500"
                  >
                    EMAIL
                  </a>
                ) : null}
                {website ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50"
                  >
                    Visit website
                  </a>
                ) : null}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <Link
                  href={`/search?task=${encodeURIComponent(task)}&category=${encodeURIComponent(category)}`}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Link>
                <Link
                  href="/sbm"
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Bookmark className="h-4 w-4" />
                  Save
                </Link>
                <Link
                  href={`/search?q=${encodeURIComponent(post.title)}`}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Link>
              </div>

              <p className="mt-5 text-xs leading-6 text-slate-500">
                Safety tip: avoid advance payments and meet in a public place when possible.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Advertisement</p>
              <div className="mt-4 grid place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                <p className="text-sm font-semibold text-slate-600">Ad space</p>
                <p className="mt-2 text-xs text-slate-500">Your promotion could be here.</p>
              </div>
            </div>
          </aside>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More in {category || taskLabel}</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
