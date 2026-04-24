import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const countries = [
  'Argentina',
  'Australia',
  'Brazil',
  'Chile',
  'Colombia',
  'South Africa',
  'Spain',
  'India',
  'Mexico',
  'Nigeria',
  'Pakistan',
  'Peru',
  'Philippines',
  'Portugal',
  'Russia',
  'Singapore',
  'United Kingdom',
  'USA',
  'Venezuela',
]

export function FooterOverride() {
  return (
    <footer className="border-t border-[#c7d2e0] bg-[#e8ebef] text-[#35506b]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm">
          {countries.map((country) => (
            <span key={country} className="inline-flex items-center gap-2">
              <Link href={`/search?q=${encodeURIComponent(country)}`} className="text-[#2978d7] hover:underline">{country}</Link>
              <span className="text-[#96a7ba]">|</span>
            </span>
          ))}
        </div>

        <div className="mt-5 text-center">
          <p className="text-[0.95rem]">Copyright © {new Date().getFullYear()} {SITE_CONFIG.name} — free classifieds marketplace</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link href="/contact" className="text-[#2978d7] hover:underline">Contact Us</Link>
            <Link href="/privacy" className="text-[#2978d7] hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="text-[#2978d7] hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
