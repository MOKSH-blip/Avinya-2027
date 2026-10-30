'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { DayId } from '@/lib/avinya-data'
import { ISLANDS, eventsForDay } from '@/lib/avinya-data'
import { cn } from '@/lib/utils'
import type { CategoryFilter } from './expedition-provider'
import { useExpedition } from './expedition-provider'
import { SectionLabel } from './reveal'

function formatSlot(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}${m ? `:${String(m).padStart(2, '0')}` : ''} ${suffix}`
}

export function Schedule() {
  const { openEvent } = useExpedition()
  const [day, setDay] = useState<DayId>(1)
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [query, setQuery] = useState('')
  const island = ISLANDS[day - 1]

  const slots = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = eventsForDay(day).filter(
      (e) =>
        (category === 'All' || e.category === category) &&
        (!q || [e.name, e.venue, e.clubs].some((f) => f.toLowerCase().includes(q))),
    )
    const grouped = new Map<number, typeof list>()
    for (const e of list) grouped.set(e.startMinutes, [...(grouped.get(e.startMinutes) ?? []), e])
    return [...grouped.entries()]
  }, [day, category, query])

  return (
    <section
      id="schedule"
      className="border-y border-border bg-card/40"
      style={{ '--accent-day': island.accentVar } as React.CSSProperties}
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <SectionLabel index="07">Full schedule</SectionLabel>
            <h2 className="font-display text-3xl leading-tight text-balance sm:text-5xl">Ship&apos;s log</h2>
          </div>
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            The complete day-wise timetable, in chronological order. Events running in the same slot are
            shown side by side.
          </p>
        </div>

        <div role="tablist" aria-label="Festival day" className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
          {ISLANDS.map((isl) => {
            const active = isl.day === day
            return (
              <button
                key={isl.slug}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="schedule-panel"
                onClick={() => setDay(isl.day)}
                className={cn(
                  'relative flex flex-col gap-1 p-5 text-left transition-colors',
                  active ? 'bg-background' : 'bg-card hover:bg-background/60',
                )}
              >
                {active && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5" style={{ background: isl.accentVar }} />
                )}
                <span className="text-label" style={{ color: isl.accentVar }}>
                  {`Day 0${isl.day} · ${isl.weekday}, ${isl.shortDate}`}
                </span>
                <span className={cn('font-display text-sm', !active && 'text-foreground/70')}>{isl.name}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div role="group" aria-label="Category" className="flex gap-1.5">
            {(['All', 'Technical', 'Cultural'] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  'text-label rounded-sm border px-3 py-2 transition-colors',
                  category === c
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-foreground/80 hover:border-foreground/40',
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="schedule-search" className="sr-only">
              Search the schedule
            </label>
            <Input
              id="schedule-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this day"
              className="h-10 bg-background pl-9"
            />
          </div>
        </div>

        <div id="schedule-panel" role="tabpanel" className="mt-10">
          {slots.length === 0 ? (
            <p className="rounded-md border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              No events match on this day.
            </p>
          ) : (
            <ol className="relative flex flex-col">
              {slots.map(([start, events]) => (
                <li key={start} className="grid gap-4 border-t border-border py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
                  <div className="flex items-center gap-3 sm:items-start">
                    <span aria-hidden="true" className="mt-1.5 size-2 rounded-full" style={{ background: 'var(--accent-day)' }} />
                    <span className="font-display text-lg tabular-nums">{formatSlot(start)}</span>
                  </div>
                  <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {events.map((event) => (
                      <li key={event.id}>
                        <button
                          type="button"
                          onClick={() => openEvent(event.id)}
                          className="group flex h-full w-full flex-col gap-2 rounded-md border border-border bg-background p-4 text-left transition-colors hover:border-[var(--accent-day)]"
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-label text-muted-foreground">{event.category}</span>
                            <span className="text-xs tabular-nums text-muted-foreground">{event.time}</span>
                          </span>
                          <span className="font-medium transition-colors group-hover:text-[var(--accent-day)]">{event.name}</span>
                          <span className="text-xs leading-relaxed text-muted-foreground">{event.venue}</span>
                          <span className="text-xs text-foreground/70">{event.clubs}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
