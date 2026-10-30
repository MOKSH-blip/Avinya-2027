'use client'

import { ArrowRight, MapPin } from 'lucide-react'
import type { Island } from '@/lib/avinya-data'
import { ISLANDS, eventsForDay } from '@/lib/avinya-data'
import { cn } from '@/lib/utils'
import { useExpedition } from './expedition-provider'
import { Reveal, SectionLabel } from './reveal'

const ATMOSPHERE: Record<number, string> = {
  1: 'bg-[radial-gradient(ellipse_at_70%_20%,oklch(0.78_0.14_62/0.18),transparent_60%)]',
  2: 'bg-[repeating-linear-gradient(0deg,transparent_0,transparent_3px,oklch(0.68_0.25_350/0.06)_3px,oklch(0.68_0.25_350/0.06)_4px)]',
  3: 'bg-[radial-gradient(circle_at_20%_30%,oklch(0.82_0.13_195/0.14),transparent_40%),radial-gradient(circle_at_80%_10%,oklch(0.85_0.15_90/0.12),transparent_35%)]',
}

export function IslandSection({ island }: { island: Island }) {
  const { openEvent, showDirectory } = useExpedition()
  const events = eventsForDay(island.day)
  const technical = events.filter((e) => e.category === 'Technical')
  const cultural = events.filter((e) => e.category === 'Cultural')
  const next = ISLANDS[island.day]

  return (
    <section
      id={island.slug}
      aria-labelledby={`${island.slug}-title`}
      className="relative isolate overflow-hidden"
      style={{ '--accent-day': island.accentVar } as React.CSSProperties}
    >
      <div className="grain relative flex min-h-[92svh] flex-col justify-end">
        <img
          src={island.image || '/placeholder.svg'}
          alt={island.imageAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-background/50" />
        <div className={cn('absolute inset-0 -z-10', ATMOSPHERE[island.day])} />

        <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8">
          <Reveal className="flex flex-col gap-6">
            <SectionLabel index={`0${island.day + 2}`} className="text-foreground/80">
              <span style={{ color: 'var(--accent-day)' }}>{`Day 0${island.day}`}</span>
              <span>{`${island.weekday}, ${island.date}`}</span>
            </SectionLabel>
            <h2
              id={`${island.slug}-title`}
              className="font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.95] text-balance"
            >
              {island.name}
            </h2>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-foreground/85">{island.summary}</p>
              <dl className="flex gap-8">
                <div>
                  <dt className="text-label text-muted-foreground">Technical</dt>
                  <dd className="font-display text-3xl" style={{ color: 'var(--accent-day)' }}>
                    {String(technical.length).padStart(2, '0')}
                  </dd>
                </div>
                <div>
                  <dt className="text-label text-muted-foreground">Cultural</dt>
                  <dd className="font-display text-3xl" style={{ color: 'var(--accent-day)' }}>
                    {String(cultural.length).padStart(2, '0')}
                  </dd>
                </div>
                <div className="hidden sm:block">
                  <dt className="text-label text-muted-foreground">Coordinates</dt>
                  <dd className="text-label mt-3 text-foreground">{island.coordinates}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-2">
        <EventManifest title="Technical manifest" events={technical} onOpen={openEvent} />
        <EventManifest title="Cultural manifest" events={cultural} onOpen={openEvent} />

        <div className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between lg:col-span-2">
          <button
            type="button"
            onClick={() => showDirectory({ day: island.day })}
            className="text-label flex items-center justify-center gap-3 rounded-sm px-5 py-3.5 text-background transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent-day)' }}
          >
            {`Explore Day 0${island.day} events`}
            <ArrowRight className="size-4" />
          </button>
          <a
            href={next ? `#${next.slug}` : '#events'}
            className="text-label flex items-center justify-center gap-3 rounded-sm border border-foreground/20 px-5 py-3.5 text-foreground transition-colors hover:border-foreground/60"
          >
            {next ? `Set sail · ${next.name}` : 'Continue · Event directory'}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function EventManifest({
  title,
  events,
  onOpen,
}: {
  title: string
  events: ReturnType<typeof eventsForDay>
  onOpen: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-label flex items-center gap-3 text-muted-foreground">
        <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: 'var(--accent-day)' }} />
        {title}
      </h3>
      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">No events in this category on this day.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border border-y border-border">
          {events.map((event, i) => (
            <Reveal as="li" key={event.id} delay={i * 60}>
              <button
                type="button"
                onClick={() => onOpen(event.id)}
                className="group grid w-full grid-cols-[6.5rem_1fr_auto] items-center gap-4 py-4 text-left sm:grid-cols-[8rem_1fr_auto]"
              >
                <span className="text-xs tabular-nums text-muted-foreground">{event.time}</span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-medium text-foreground transition-colors group-hover:text-[var(--accent-day)]">
                    {event.name}
                  </span>
                  <span className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                    <MapPin className="size-3 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent-day)]" />
              </button>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  )
}
