import { Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import { TaskPostCard } from '@/components/shared/task-post-card'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'

  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  )

  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((siteTask) => getMockPostsForTask(siteTask.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-md border border-[#d7dde5] bg-white p-6 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a738e]">Search classifieds</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2c4f71]">
            {query ? `Results for "${query}"` : 'Find listings, services, and local ads'}
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#5a6f82]">
            Use keyword search across titles, summaries, categories, and content metadata.
          </p>

          <form action="/search" className="mt-5 grid gap-3 rounded-sm border border-[#cad5e2] bg-[#f7f9fc] p-4 sm:grid-cols-[1fr_auto]">
            <input type="hidden" name="master" value="1" />
            {category ? <input type="hidden" name="category" value={category} /> : null}
            {task ? <input type="hidden" name="task" value={task} /> : null}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#47668a]" />
              <input
                name="q"
                defaultValue={query}
                placeholder="Search by title, location, category, or keyword"
                className="h-11 w-full rounded-sm border border-[#b8c7d8] bg-white pl-9 pr-3 text-sm text-[#1f3a56]"
              />
            </div>
            <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-[#ae7526] bg-[#f9b95a] px-5 text-sm font-extrabold uppercase text-[#15395c] hover:bg-[#ffc476]">
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>
        </section>

        <section className="mt-6">
          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const resolvedTask = getPostTaskKey(post)
                const href = resolvedTask ? buildPostUrl(resolvedTask, post.slug) : `/posts/${post.slug}`
                return <TaskPostCard key={post.id} post={post} href={href} />
              })}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-[#c4cfdb] bg-white p-10 text-center text-sm text-[#5f7890]">
              No matching posts found.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
