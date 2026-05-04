'use client'

import * as React from 'react'
import { ContentImage } from '@/components/shared/content-image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export function TaskPhotoGallery({
  images,
  title,
  maxImages = 13,
}: {
  images: string[]
  title: string
  maxImages?: number
}) {
  const normalized = Array.isArray(images) ? images.filter((item) => typeof item === 'string' && item.trim()) : []
  const gallery = normalized.slice(0, Math.max(1, maxImages))
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const openAt = React.useCallback((index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), Math.max(0, gallery.length - 1)))
    setOpen(true)
  }, [gallery.length])

  const active = gallery[activeIndex] || gallery[0]

  return (
    <>
      <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group relative block w-full overflow-hidden bg-slate-100 text-left"
        >
          <div className="relative aspect-[16/9] w-full">
            <ContentImage src={gallery[0]} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          </div>
          <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
            {gallery.length} photos
          </div>
        </button>

        {gallery.length > 1 ? (
          <div className="grid grid-cols-4 gap-3 border-t border-slate-200 p-4">
            {gallery.slice(1, 5).map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => openAt(index + 1)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <ContentImage src={image} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              </button>
            ))}
            {gallery.length > 5 ? (
              <button
                type="button"
                onClick={() => openAt(5)}
                className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                +{gallery.length - 5} more
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0" showCloseButton>
          <div className="rounded-lg bg-black">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white">
              <DialogTitle className="text-sm font-semibold">
                Photos ({gallery.length})
              </DialogTitle>
              <span className="text-xs text-white/70">{title}</span>
            </div>

            <div className="p-4">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-black">
                {active ? (
                  <ContentImage src={active} alt={title} fill className="object-contain" />
                ) : null}
              </div>

              {gallery.length > 1 ? (
                <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-8">
                  {gallery.map((image, index) => {
                    const isActive = index === activeIndex
                    return (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={[
                          'relative aspect-[4/3] overflow-hidden rounded-md border bg-black',
                          isActive ? 'border-white' : 'border-white/20 hover:border-white/50',
                        ].join(' ')}
                      >
                        <ContentImage src={image} alt={title} fill className="object-cover" />
                      </button>
                    )
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
