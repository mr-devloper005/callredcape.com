import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 36, { fresh: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'

  const isClassified = task === 'classified'

  if (isClassified) {
    return (
      <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
        <NavbarShell />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="rounded-md border border-[#d7dde5] bg-white p-5 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a738e]">Classified board</p>
              <Link href="/create/classified" className="ml-auto inline-flex items-center rounded-sm border border-[#0f6d22] bg-[#8de860] px-4 py-2 text-sm font-bold text-[#0d421b] hover:bg-[#9cf071]">
                Post new ad
              </Link>
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2c4f71]">Latest classified ads</h1>
            <p className="mt-2 text-sm leading-7 text-[#5a6f82]">Quick-scan feed for local buying, selling, hiring, and services.</p>

            <form action="/search" className="mt-5 grid gap-3 rounded-sm border border-[#cad5e2] bg-[#f7f9fc] p-4 sm:grid-cols-[1fr_220px_auto]">
              <input type="hidden" name="task" defaultValue="classified" />
              <input
                name="q"
                placeholder="Search this board"
                className="h-11 rounded-sm border border-[#b8c7d8] bg-white px-3 text-sm text-[#1f3a56]"
              />
              <select
                name="category"
                defaultValue={normalizedCategory}
                className="h-11 rounded-sm border border-[#b8c7d8] bg-white px-3 text-sm text-[#1f3a56]"
              >
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-[#ae7526] bg-[#f9b95a] px-5 text-sm font-extrabold uppercase text-[#15395c] hover:bg-[#ffc476]">
                <Search className="h-4 w-4" />
                Search
              </button>
            </form>

          </section>

          <section className="mt-6">
            <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f2f4f7] text-[#2d4761]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-md border border-[#d5dde8] bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5f7a95]">Secondary surface</p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#3a5d7f]">{taskConfig?.label || task}</h1>
          <p className="mt-2 text-sm leading-7 text-[#627c95]">
            This task remains fully available by URL but is intentionally de-emphasized to keep classifieds and ad posting as the primary user flow.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/classifieds" className="inline-flex items-center gap-2 rounded-sm border border-[#0f6d22] bg-[#8de860] px-4 py-2 text-sm font-bold text-[#0d421b]">
              Back to classifieds
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/create/classified" className="inline-flex items-center gap-2 rounded-sm border border-[#b9c8d8] bg-[#f5f8fb] px-4 py-2 text-sm font-semibold text-[#365777]">
              Post ad
            </Link>
          </div>
        </section>

        <section className="mt-6">
          <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
