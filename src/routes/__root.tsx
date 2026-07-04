import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { LangToggle, RegionToggle } from '../components/Toggles'
import { PrefsProvider, usePrefs } from '../lib/prefs'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { title: 'Fishpedia - Angel-Begleiter für Berlin & Brandenburg' },
      {
        name: 'description',
        content:
          'Fischarten in Berliner und Brandenburger Gewässern: Bestimmung, Schonzeiten und Mindestmaße auf einen Blick.',
      },
      { name: 'theme-color', content: '#1f404d' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: 'Fishpedia' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'manifest',
        href: `${import.meta.env.BASE_URL}manifest.webmanifest`,
      },
      {
        rel: 'icon',
        href: `${import.meta.env.BASE_URL}icon.svg`,
        type: 'image/svg+xml',
      },
      {
        rel: 'apple-touch-icon',
        href: `${import.meta.env.BASE_URL}icon-192.png`,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  const router = useRouter()

  useEffect(() => {
    // restore deep links that GitHub Pages answered with 404.html
    const stored = sessionStorage.getItem('fishpedia.redirect')
    if (stored) {
      sessionStorage.removeItem('fishpedia.redirect')
      router.history.replace(stored)
    }

    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(`${import.meta.env.BASE_URL}sw.js`)
        .catch(() => {})
    }
  }, [router])

  return (
    <RootDocument>
      <PrefsProvider>
        <AppShell>
          <Outlet />
        </AppShell>
      </PrefsProvider>
    </RootDocument>
  )
}

function AppShell({ children }: { children: ReactNode }) {
  const { t } = usePrefs()
  const navLink =
    'rounded-full px-3 py-1.5 text-sm font-semibold text-water-800 transition-colors hover:bg-water-100 dark:text-water-100 dark:hover:bg-water-800'
  const navLinkActive = 'bg-water-200 dark:bg-water-700'

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-3 sm:px-6">
      <header className="border-water-100 bg-water-50/90 dark:border-water-800 dark:bg-water-950/90 sticky top-0 z-10 -mx-3 mb-3 border-b px-3 pt-[max(env(safe-area-inset-top),0.5rem)] pb-2 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span aria-hidden className="text-2xl">
              🎣
            </span>
            <div>
              <span className="text-water-800 dark:text-water-100 block text-lg leading-none font-extrabold tracking-tight">
                Fishpedia
              </span>
              <span className="text-water-600 dark:text-water-300 hidden text-[11px] sm:block">
                {t('tagline')}
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            <RegionToggle />
            <LangToggle />
          </div>
        </div>
        <nav className="mt-2 flex gap-1">
          <Link
            to="/"
            className={navLink}
            activeProps={{
              className: `${navLink} ${navLinkActive}`,
            }}
          >
            {t('navFish')}
          </Link>
          <Link
            to="/kalender"
            className={navLink}
            activeProps={{
              className: `${navLink} ${navLinkActive}`,
            }}
          >
            {t('navCalendar')}
          </Link>
          <Link
            to="/info"
            className={navLink}
            activeProps={{
              className: `${navLink} ${navLinkActive}`,
            }}
          >
            {t('navInfo')}
          </Link>
        </nav>
      </header>
      <main className="grow pb-6">{children}</main>
      <footer className="border-water-100 text-water-600 dark:border-water-800 dark:text-water-400 border-t py-4 text-center text-xs">
        {t('footerNote')}
      </footer>
    </div>
  )
}

function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-5xl" aria-hidden>
        🐟
      </p>
      <h1 className="mt-3 text-xl font-bold">404</h1>
      <Link
        to="/"
        className="text-water-600 dark:text-water-300 mt-2 inline-block underline"
      >
        Fishpedia
      </Link>
    </div>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-water-50 dark:bg-water-950 min-h-dvh text-slate-900 antialiased dark:text-slate-100">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
