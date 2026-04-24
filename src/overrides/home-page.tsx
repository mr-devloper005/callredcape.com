import Link from 'next/link'
import { MapPin, Search, SquareArrowOutUpRight, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'

export const HOME_PAGE_OVERRIDE_ENABLED = true

type CityBucket = {
  name: string
  count: number
}

const topCities: CityBucket[] = [
  { name: 'Delhi', count: 421 },
  { name: 'Bangalore', count: 385 },
  { name: 'Mumbai', count: 342 },
  { name: 'Hyderabad', count: 266 },
  { name: 'Noida', count: 181 },
  { name: 'Chennai', count: 173 },
  { name: 'Ahmedabad', count: 152 },
  { name: 'Pune', count: 140 },
]

const fastCategories = [
  'Cars & Bikes',
  'Property Rentals',
  'Property Sale',
  'Jobs',
  'Services',
  'Electronics',
  'Furniture',
  'Community',
]

function getImage(post: any) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item: any) => typeof item?.url === 'string' && item.url)?.url
  if (mediaUrl) return mediaUrl
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const image = typeof content.image === 'string' ? content.image : null
  if (image) return image
  const images = Array.isArray(content.images) ? content.images : []
  const first = images.find((item) => typeof item === 'string')
  return typeof first === 'string' ? first : '/placeholder.svg?height=640&width=960'
}

function getLocation(post: any) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const value = typeof content.location === 'string' ? content.location : typeof content.address === 'string' ? content.address : ''
  return value || 'India'
}

function getPrice(post: any) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const value = content.price
  if (typeof value === 'number' && Number.isFinite(value)) return `Rs ${value.toLocaleString('en-IN')}`
  if (typeof value === 'string' && value.trim()) return value
  return null
}

export async function HomePageOverride() {
  const ads = await fetchTaskPosts('classified', 24, { fresh: true })
  const spotlight = ads.slice(0, 10)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_260px] lg:px-8">
        <section>
          <div className="rounded-md border border-[#d7dde5] bg-white p-5 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-sm border border-[#9fb2c6] bg-[#f2f6fb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#284b71]">
                <Tag className="h-3.5 w-3.5" />
                Free classifieds in India
              </span>
              <Link href="/create/classified" className="ml-auto inline-flex items-center rounded-sm border border-[#0f6d22] bg-[#8de860] px-4 py-2 text-sm font-bold text-[#0d421b] hover:bg-[#9cf071]">
                Post an ad
              </Link>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#27496a] sm:text-5xl">Buy, Sell, Rent, Hire. Fast local classifieds.</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4f6478]">
              Browse verified local classifieds for jobs, rentals, services, properties, and resale deals. Built for quick scanning and fast contact.
            </p>

            <form action="/search" className="mt-6 grid gap-3 rounded-sm border border-[#cad5e2] bg-[#f7f9fc] p-4 sm:grid-cols-[1fr_1fr_auto]">
              <label className="sr-only" htmlFor="q">Search</label>
              <input id="q" name="q" placeholder="What are you looking for?" className="h-11 rounded-sm border border-[#b8c7d8] bg-white px-3 text-sm text-[#1f3a56]" />
              <label className="sr-only" htmlFor="city">City</label>
              <input id="city" name="city" placeholder="City (e.g. Bangalore)" className="h-11 rounded-sm border border-[#b8c7d8] bg-white px-3 text-sm text-[#1f3a56]" />
              <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-[#ae7526] bg-[#f9b95a] px-5 text-sm font-extrabold uppercase text-[#15395c] hover:bg-[#ffc476]">
                <Search className="h-4 w-4" />
                Search
              </button>
            </form>
          </div>

          <div className="mt-6 rounded-md border border-[#d7dde5] bg-white p-5 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
            <h2 className="text-2xl font-extrabold text-[#304e6d]">Recent ads</h2>
            <p className="mt-1 text-sm text-[#5c6f81]">Friday, 24 April, 2026</p>

            <div className="mt-5 space-y-1">
              {spotlight.map((post) => {
                const price = getPrice(post)
                const location = getLocation(post)
                return (
                  <article key={post.id} className="grid gap-3 border-b border-[#e3e8ef] py-4 sm:grid-cols-[94px_1fr_auto] sm:items-center">
                    <div className="relative h-[74px] w-[94px] overflow-hidden rounded-sm border border-[#d2dae4] bg-[#eff3f7]">
                      <ContentImage src={getImage(post)} alt={post.title} fill className="object-cover" />
                    </div>
                    <div>
                      <Link href={`/classifieds/${post.slug}`} className="text-[1.03rem] font-semibold leading-6 text-[#2272db] hover:underline">
                        {post.title}
                      </Link>
                      <p className="line-clamp-2 text-sm leading-6 text-[#586d80]">{post.summary || 'Fresh local post with direct contact path and clearer listing information.'}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#0a7d2e]"><MapPin className="h-3.5 w-3.5" />{location}</p>
                    </div>
                    {price ? <p className="inline-flex h-10 items-center rounded-sm bg-[#f59a3a] px-4 text-base font-bold text-white">{price}</p> : null}
                  </article>
                )
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {fastCategories.map((category) => (
                <Link key={category} href={`/classifieds?category=${encodeURIComponent(category.toLowerCase())}`} className="rounded-sm border border-[#ccd5df] bg-[#f6f9fc] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#40607f] hover:bg-[#e8eef5]">
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-md border border-[#c7d6e6] bg-[#f2f7fc] shadow-[0_8px_20px_rgba(10,44,78,0.08)]">
            <p className="rounded-t-md bg-[#3f8ee3] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-white">Top cities</p>
            <ul className="space-y-1 p-4">
              {topCities.map((city) => (
                <li key={city.name}>
                  <Link href={`/search?q=${encodeURIComponent(city.name)}`} className="flex items-center justify-between rounded-sm px-2 py-1.5 text-[0.98rem] text-[#1d5ca8] hover:bg-[#e7f0fa]">
                    <span>{city.name}</span>
                    <span className="text-xs font-semibold text-[#5f7791]">{city.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-[#d5dde8] bg-white p-4 shadow-[0_8px_20px_rgba(10,44,78,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5a738e]">Secondary task</p>
            <h3 className="mt-2 text-lg font-extrabold text-[#2b4b6b]">Ad posting workflow</h3>
            <p className="mt-2 text-sm leading-6 text-[#5b6e81]">Create and manage your local listings in your account dashboard.</p>
            <div className="mt-3 grid gap-2">
              <Link href="/create/classified" className="inline-flex items-center justify-between rounded-sm border border-[#0f6d22] bg-[#8de860] px-3 py-2 text-sm font-bold text-[#0d421b]">
                Create ad
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/dashboard/ads" className="inline-flex items-center justify-between rounded-sm border border-[#c3d0dd] bg-[#f7f9fc] px-3 py-2 text-sm font-semibold text-[#2f5375] hover:bg-[#eef3f8]">
                My ads
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  )
}
