'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { mockClassifiedAds } from '@/data/mock-data'
import type { ClassifiedAd } from '@/types'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import { useAuth } from '@/lib/auth-context'

const mergeAds = (stored: ClassifiedAd[]) => {
  const map = new Map<string, ClassifiedAd>()
  stored.forEach((ad) => map.set(ad.id, ad))
  mockClassifiedAds.forEach((ad) => {
    if (!map.has(ad.id)) {
      map.set(ad.id, ad)
    }
  })
  return Array.from(map.values())
}

export default function DashboardAdsPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [ads, setAds] = useState<ClassifiedAd[]>(() => [...mockClassifiedAds])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [statusMap, setStatusMap] = useState<Record<string, string>>(() =>
    Object.fromEntries(mockClassifiedAds.map((ad) => [ad.id, ad.status]))
  )
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draftTitle, setDraftTitle] = useState('')
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null)

  const isUserAd = (ad: ClassifiedAd) =>
    ad.id.startsWith('user-') || (!!user && ad.seller?.id === user.id)
  const userAds = useMemo(() => ads.filter((ad) => isUserAd(ad)), [ads, user])
  const allSelected = selectedIds.length === userAds.length && userAds.length > 0
  const selectedCount = selectedIds.length

  const activeAd = useMemo(
    () => userAds.find((ad) => ad.id === activeSheetId),
    [activeSheetId, userAds]
  )

  useEffect(() => {
    const stored = loadFromStorage<ClassifiedAd[]>(storageKeys.ads, [])
    const merged = mergeAds(stored)
    setAds(merged)
    setStatusMap(Object.fromEntries(merged.map((ad) => [ad.id, ad.status])))
  }, [])

  const persistUserAds = (nextAds: ClassifiedAd[]) => {
    const userAds = nextAds.filter((ad) => isUserAd(ad))
    saveToStorage(storageKeys.ads, userAds)
  }

  const updateStatus = (id: string, status: ClassifiedAd['status']) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }))
    const nextAds = ads.map((ad) => (ad.id === id ? { ...ad, status } : ad))
    setAds(nextAds)
    persistUserAds(nextAds)
    toast({
      title: 'Status updated',
      description: `Ad status set to ${status}.`,
    })
  }

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleBulkAction = (action: string) => {
    if (action === 'Deleted') {
      const nextAds = ads.filter((ad) => !selectedIds.includes(ad.id))
      setAds(nextAds)
      persistUserAds(nextAds)
    }
    toast({
      title: `${action} applied`,
      description: `${selectedCount} ads updated.`,
    })
    setSelectedIds([])
  }

  return (
    <div className="min-h-screen bg-[#ececec] text-[#1d324a]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-6 rounded-md border border-[#d7dde5] bg-white p-6 shadow-[0_8px_24px_rgba(13,38,65,0.08)]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a738e]">My ads</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2c4f71]">Manage your live classifieds</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5a6f82]">Edit titles, change status, and remove sold listings from your active board.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/create/classified" className="inline-flex items-center rounded-sm border border-[#0f6d22] bg-[#8de860] px-4 py-2 text-sm font-bold text-[#0d421b] hover:bg-[#9cf071]">
            Post new ad
          </Link>
          <Link href="/classifieds" className="inline-flex items-center rounded-sm border border-[#b9c8d8] bg-[#f5f8fb] px-4 py-2 text-sm font-semibold text-[#365777] hover:bg-[#eaf1f8]">
            Browse classifieds
          </Link>
        </div>
      </section>
      {selectedCount > 0 && (
        <Card className="mb-4 border-[#c9d6e4] bg-white">
          <CardContent className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-[#5f7890]">{selectedCount} selected</div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('Marked sold')}>
                Mark Sold
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('Exported')}>
                Export
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleBulkAction('Deleted')}>
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {userAds.length > 0 && (
          <Card className="border-[#c9d6e4] bg-white">
            <CardContent className="p-4 flex items-center gap-3">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => setSelectedIds(checked ? userAds.map((a) => a.id) : [])}
              />
              <span className="text-sm text-[#5f7890]">Select all</span>
            </CardContent>
          </Card>
        )}

        {userAds.map((ad) => (
          <Card key={ad.id} className="border-[#c9d6e4] bg-white transition-transform hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedIds.includes(ad.id)}
                  onCheckedChange={() => toggleSelection(ad.id)}
                />
                <div>
                  {editingId === ad.id ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <Input
                        value={draftTitle}
                        onChange={(event) => setDraftTitle(event.target.value)}
                        className="h-9 w-64"
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          const nextAds = ads.map((item) =>
                            item.id === ad.id ? { ...item, title: draftTitle } : item
                          )
                          setAds(nextAds)
                          persistUserAds(nextAds)
                          toast({
                            title: 'Title updated',
                            description: `Saved "${draftTitle}"`,
                          })
                          setEditingId(null)
                        }}
                      >
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-lg font-bold text-[#2b4c6d]">{ad.title}</h2>
                      <p className="text-sm text-[#5f7890]">{ad.location} · ${ad.price.toLocaleString()}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-sm border border-[#b8c7d8] bg-[#f0f6fd] text-[#345a7f] hover:bg-[#f0f6fd]">{ad.category}</Badge>
                <Badge className="rounded-sm border border-[#d4deea] bg-white text-[#5f7a95] hover:bg-white">Owner Only</Badge>
                <Select
                  value={statusMap[ad.id]}
                  onValueChange={(value) => updateStatus(ad.id, value as ClassifiedAd['status'])}
                >
                  <SelectTrigger className="h-9 w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setActiveSheetId(ad.id)}>
                  Preview
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/classifieds/${ad.slug}`}>View Live</Link>
                </Button>
                <Button
                  onClick={() => {
                    setEditingId(ad.id)
                    setDraftTitle(ad.title)
                  }}
                >
                  Edit Title
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDeleteId(ad.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {userAds.length === 0 && (
          <Card className="border-[#c9d6e4] bg-white">
            <CardContent className="p-8 text-center text-sm text-[#5f7890]">
              No ads yet. Create your first ad to see it here.
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={Boolean(deleteId)} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this ad?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will remove the ad from the marketplace. You can repost it later.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                const nextAds = ads.filter((ad) => ad.id !== deleteId)
                setAds(nextAds)
                persistUserAds(nextAds)
                toast({ title: 'Ad removed', description: 'The ad was deleted from your dashboard.' })
                setDeleteId(null)
              }}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={Boolean(activeSheetId)} onOpenChange={() => setActiveSheetId(null)}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Ad Preview</SheetTitle>
            <SheetDescription>Quick glance before opening the full ad.</SheetDescription>
          </SheetHeader>
          {activeAd && (
            <div className="mt-6 space-y-4">
              <Badge variant="secondary">{activeAd.category}</Badge>
              <h3 className="text-xl font-semibold text-foreground">{activeAd.title}</h3>
              <p className="text-sm text-muted-foreground">{activeAd.description}</p>
              <Button asChild>
                <Link href={`/classifieds/${activeAd.slug}`}>View Live Ad</Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
      </main>
      <Footer />
    </div>
  )
}
