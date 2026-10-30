'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NAV_LINKS } from '@/lib/avinya-data'
import { cn } from '@/lib/utils'
import { useExpedition } from './expedition-provider'

const PRIMARY = [
  { href: '#journey', label: 'Journey' },
  { href: '#day-1', label: 'Day 01', color: 'var(--day-1)' },
  { href: '#day-2', label: 'Day 02', color: 'var(--day-2)' },
  { href: '#day-3', label: 'Day 03', color: 'var(--day-3)' },
  { href: '#events', label: 'Events' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#hack2future', label: 'Hack2Future' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { setCategory, setDay, setQuery } = useExpedition()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled ? 'border-b border-border bg-background/80 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#home" className="flex items-baseline gap-2" aria-label="AVINYA 2027 home">
          <span className="font-display text-base tracking-[0.2em]">AVINYA</span>
          <span className="text-label text-primary">{"'27"}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {PRIMARY.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-label flex items-center gap-2 text-foreground/75 transition-colors hover:text-foreground"
                >
                  {link.color && (
                    <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: link.color }} />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#events"
            className="text-label hidden rounded-sm bg-primary px-4 py-2.5 text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            Explore events
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="text-label flex items-center gap-2 rounded-sm border border-foreground/20 px-3 py-2.5 text-foreground transition-colors hover:border-foreground/50"
              aria-label="Open full navigation"
            >
              <Menu className="size-4" />
              <span className="hidden sm:inline">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-border bg-background p-0 sm:max-w-sm">
              <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-6">
                <SheetTitle className="text-label text-muted-foreground">Navigation · all sectors</SheetTitle>
                <nav aria-label="Full" className="mt-8">
                  <ul className="flex flex-col">
                    {NAV_LINKS.map((link, i) => (
                      <li key={link.label} className="border-b border-border">
                        <a
                          href={link.href}
                          onClick={() => {
                            if (link.filter) {
                              setQuery('')
                              setDay(0)
                              setCategory(link.filter)
                            }
                            setOpen(false)
                          }}
                          className="group flex items-center gap-4 py-3.5 text-sm text-foreground/85 transition-colors hover:text-foreground"
                        >
                          <span className="text-label w-6 text-muted-foreground group-hover:text-primary">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <p className="text-label mt-auto pt-8 text-muted-foreground">12 — 14 March 2027 · IIIT Dharwad</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
