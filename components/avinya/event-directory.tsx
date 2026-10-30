'use client'

import { useMemo } from 'react'
import { ArrowUpRight, Clock, MapPin, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { EVENTS, ISLANDS, getIsland } from '@/lib/avinya-data'
import { cn } from '@/lib/utils'
import type { CategoryFilter, DayFilter } from './expedition-provider'
import { useExpedition } from './expedition-provider'
import { SectionLabel } from './reveal'

const CATEGORIES: CategoryFilter[] = ['All', 'Technical', 'Cultural']

export function EventDirectory() {
  const { query, setQuery, category, setCategory, day, setDay, openEvent } = useExpedition()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return EVENTS.filter((e) => (category === 'All' || e.category === category) && (day === 0 || e.day === day))
      .filter(
        (e) =>
          !q ||
          [e.name, e.venue, e.clubs, e.description.join(' ')].some((field) => field.toLowerCase().includes(q)),
      )
      .sort((a, b) => a.day - b.day || a.startMinutes - b.startMinutes)
  }, [query, category, day])

  const hasFilters = query || category !== 'All' || day !== 0

  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <SectionLabel index="06">Event directory</SectionLabel>
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-5xl">Every event, every island.</h2>
        </div>
        <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
          Filter the full manifest of AVINYA 2027 by category and day, or search by event, venue or
          organising club.
        </p>
      </div>

      <div className="sticky top-16 z-30 -mx-5 mt-12 flex flex-col gap-3 border-y border-border bg-background/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:flex-row lg:items-center">
        <div className="relative lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <Input
            id="event-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, venues, clubs"
            className="h-10 bg-card pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterGroup label="Category">
            {CATEGORIES.map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </FilterGroup>
          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border sm:block" />
          <FilterGroup label="Day">
            <Chip active={day === 0} onClick={() => setDay(0)}>
              All days
            </Chip>
            {ISLANDS.map((island) => (
              <Chip
                key={island.slug}
                active={day === island.day}
                onClick={() => setDay(island.day as DayFilter)}
                color={island.accentVar}
              >
                {`Day 0${island.day}`}
              </Chip>
            ))}
          </FilterGroup>
        </div>
        <div className="flex items-center gap-4 lg:ml-auto">
          <p className="text-label text-muted-foreground" aria-live="polite">
            {`${results.length} ${results.length === 1 ? 'event' : 'events'}`}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setCategory('All')
                setDay(0)
              }}
              className="text-label flex items-center gap-1 text-foreground/80 hover:text-primary"
            >
              <X className="size-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-md border border-dashed border-border py-20 text-center">
          <p className="font-display text-lg">No signal on this frequency.</p>
          <p className="text-sm text-muted-foreground">No events match your search. Try a different term or reset the filters.</p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((event) => {
            const island = getIsland(event.day)
            return (
              <li key={event.id}>
                <button
                  type="button"
                  onClick={() => openEvent(event.id)}
                  className="group relative flex h-full w-full flex-col gap-5 overflow-hidden rounded-md border border-border bg-card p-6 text-left transition-colors hover:border-[var(--c)]"
                  style={{ '--c': island.accentVar } as React.CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--c)] transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-label text-[var(--c)]">{`Day 0${event.day} · ${island.name}`}</span>
                    <span className="text-label rounded-sm border border-border px-2 py-1 text-muted-foreground">
                      {event.category}
                    </span>
                  </span>
                  <span className="flex flex-col gap-2">
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-display text-lg leading-snug">{event.name}</span>
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--c)]" />
                    </span>
                    <span className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {event.description[0]}
                    </span>
                  </span>
                  <span className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-xs text-foreground/80">
                    <span className="flex items-center gap-2">
                      <Clock className="size-3.5 text-muted-foreground" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{event.venue}</span>
                    </span>
                    <span className="truncate text-muted-foreground">{event.clubs}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {children}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  color?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'text-label flex items-center gap-2 rounded-sm border px-3 py-2 transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border text-foreground/80 hover:border-foreground/40',
      )}
    >
      {color && <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: color }} />}
      {children}
    </button>
  )
}
