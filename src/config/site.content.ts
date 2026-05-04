import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: '',
  },
  footer: {
    tagline: 'Post and discover local classifieds',
  },
  hero: {
    badge: 'Live local ads',
    title: ['India classifieds', 'built for quick posting and fast discovery.'],
    description:
      'Explore local classified ads across jobs, rentals, property, services, and resale categories through a utility-first browsing flow.',
    primaryCta: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'Post an ad',
      href: '/create/classified',
    },
    searchPlaceholder: 'Search classifieds, jobs, rentals, and services',
    focusLabel: 'Focus',
    featureCardBadge: 'fresh listings',
    featureCardTitle: 'Latest local ads stay front and center.',
    featureCardDescription:
      'Classified inventory updates continuously while preserving all existing platform routes.',
  },
  home: {
    metadata: {
      title: 'Local classifieds and ad posting',
      description:
        'Browse and post local classifieds for jobs, property, services, and resale deals.',
      openGraphTitle: 'Local classifieds and ad posting',
      openGraphDescription:
        'Fast local classifieds with clear categories, quick search, and simple posting.',
      keywords: ['classifieds', 'local ads', 'post ad', 'property ads', 'jobs classifieds'],
    },
    introBadge: 'About this marketplace',
    introTitle: 'A classifieds-first platform for local buying, selling, and hiring.',
    introParagraphs: [
      'This site is structured around fast-moving local classifieds, with browsing and posting prioritized over secondary content surfaces.',
      'Search, location cues, and compact ad cards are designed for utility and quick response paths.',
      'Secondary tasks remain accessible by URL but are intentionally lower priority in the main UI flow.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Classifieds-first homepage and navigation.',
      'Primary action is posting and managing ads.',
      'Compact local feed for high scanning speed.',
      'Low-friction design with lightweight interactions.',
    ],
    primaryLink: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
    secondaryLink: {
      label: 'Post ad',
      href: '/create/classified',
    },
  },
  cta: {
    badge: 'Start selling',
    title: 'Create your local classified ad in minutes.',
    description:
      'Publish ads quickly and keep your inventory updated from your account dashboard.',
    primaryCta: {
      label: 'Create Ad',
      href: '/create/classified',
    },
    secondaryCta: {
      label: 'Contact Support',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Article archive',
    description: 'Access article content that remains available by direct URL.',
  },
  listing: {
    title: 'Business listing archive',
    description: 'Browse business listings in a lower-priority archive surface.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse local classifieds, offers, jobs, and marketplace updates.',
  },
  image: {
    title: 'Image archive',
    description: 'Open image-based posts in a lower-priority archive surface.',
  },
  profile: {
    title: 'Profile archive',
    description: 'View creator and business profiles by direct URL.',
  },
  sbm: {
    title: 'Bookmark archive',
    description: 'Access social bookmarking and curated links by direct URL.',
  },
  pdf: {
    title: 'PDF archive',
    description: 'Open PDF resources and documents in archive view.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings archive',
    paragraphs: [
      'Business listings are still available and fully functional by URL.',
      'This surface is intentionally lower priority so classifieds and ad posting stay primary.',
      'Use this page for reference browsing while marketplace actions remain centered in classifieds.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Article archive',
    paragraphs: [
      'Article content remains available without affecting the classifieds-first layout system.',
      'This section supports legacy and supplemental reading content.',
      'Use classifieds for primary discovery and article pages for secondary context.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'Open images', href: '/images' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts surface offers, notices, deals, and opportunities in a fast-scanning layout.',
      'Use this feed to discover local postings quickly and follow direct contact paths.',
      'Create, edit, and manage ads through the dashboard workflow.',
    ],
    links: [
      { label: 'Post ad', href: '/create/classified' },
      { label: 'My ads', href: '/dashboard/ads' },
      { label: 'Search all', href: '/search' },
    ],
  },
  image: {
    title: 'Image archive',
    paragraphs: [
      'Image posts remain available for existing URLs and legacy browsing.',
      'This area is intentionally de-emphasized compared to classifieds.',
      'Use image pages for secondary media context when needed.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'Profile archive', href: '/profile' },
    ],
  },
  profile: {
    title: 'Profile archive',
    paragraphs: [
      'Profiles are preserved for trust and identity references across existing URLs.',
      'The main marketplace flow is still centered on classifieds and ad posting.',
      'Use profile pages as supporting context for individual posters or businesses.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'Business listings', href: '/listings' },
    ],
  },
  sbm: {
    title: 'Bookmark archive',
    paragraphs: [
      'Social bookmarking remains accessible and URL-compatible as a secondary surface.',
      'This page is now visually deprioritized to keep classifieds prominent.',
      'Use bookmark pages for reference-only workflows.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'Open PDF archive', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDF archive',
    paragraphs: [
      'PDF pages continue to work as before and stay URL-accessible.',
      'They are presented as lower-priority archive content inside the classifieds-focused UI strategy.',
      'Use this section for document lookup and downloads.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'Search site', href: '/search' },
    ],
  },
  social: {
    title: 'Social archive',
    paragraphs: [
      'Social updates are retained for compatibility and direct URL access.',
      'This section is no longer a primary navigation target.',
      'Use it for secondary signals and context.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'PDF archive', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comment archive',
    paragraphs: [
      'Comment surfaces remain available alongside legacy content.',
      'They are preserved without affecting marketplace-first navigation.',
      'Use them for thread context on older posts.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'Article archive', href: '/articles' },
    ],
  },
  org: {
    title: 'Organization archive',
    paragraphs: [
      'Organization pages remain functional for route compatibility.',
      'They are intentionally secondary to classified browsing and posting.',
      'Use organization pages for reference information only.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Post ad', href: '/create/classified' },
      { label: 'Business listings', href: '/listings' },
    ],
  },
}
