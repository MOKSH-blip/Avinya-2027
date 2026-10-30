'use client'

import { Clock, MapPin, Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import type { DayId, FestEvent } from '@/lib/avinya-data'
import { getIsland } from '@/lib/avinya-data'

export function EventDialog({
  event,
  onOpenChange,
  onShowDay,
}: {
  event: FestEvent | null
  onOpenChange: (open: boolean) => void
  onShowDay: (day: DayId) => void
}) {
  const island = event ? getIsland(event.day) : null

  return (
    <Dialog open={!!event} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto border-border bg-popover p-0 sm:max-w-2xl">
        {event && island && (
          <article style={{ '--accent-day': island.accentVar } as React.CSSProperties}>
            <div className="relative h-40 overflow-hidden sm:h-52">
              <img
                src={island.image || '/placeholder.svg'}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-popover via-popover/50 to-transparent" />
              <div className="absolute bottom-4 left-6 right-12 flex flex-wrap items-center gap-2">
                <span
                  className="text-label rounded-sm px-2 py-1 text-background"
                  style={{ background: 'var(--accent-day)' }}
                >
                  {event.category}
                </span>
                <span className="text-label rounded-sm border border-foreground/20 bg-background/60 px-2 py-1 text-foreground backdrop-blur">
                  {`Day 0${event.day} · ${island.name}`}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <header className="flex flex-col gap-2">
                <DialogTitle className="font-display text-2xl leading-tight text-balance sm:text-3xl">
                  {event.name}
                </DialogTitle>
                {event.tagline && event.tagline !== event.description[0] && (
                  <p className="text-label" style={{ color: 'var(--accent-day)' }}>
                    {event.tagline}
                  </p>
                )}
              </header>

              <dl className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                <Meta icon={<Clock className="size-4" />} label="Time" value={`${event.time}`} sub={island.date} />
                <Meta icon={<MapPin className="size-4" />} label="Venue" value={event.venue} />
                <Meta icon={<Users className="size-4" />} label="Organised by" value={event.clubs} />
              </dl>

              <DialogDescription render={<div />} className="flex flex-col gap-3 text-base leading-relaxed text-muted-foreground">
                {event.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {event.detailsPending && (
                  <p className="rounded-md border border-dashed border-foreground/25 p-3 text-sm">
                    Further details for this event will be published by the organising team.
                  </p>
                )}
              </DialogDescription>

              <button
                type="button"
                onClick={() => onShowDay(event.day)}
                className="text-label self-start border-b pb-1 text-foreground transition-colors hover:text-[var(--accent-day)]"
                style={{ borderColor: 'var(--accent-day)' }}
              >
                {`All Day 0${event.day} events →`}
              </button>
            </div>
          </article>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Meta({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex flex-col gap-1.5 bg-popover p-4">
      <dt className="text-label flex items-center gap-2 text-muted-foreground">
        <span style={{ color: 'var(--accent-day)' }}>{icon}</span>
        {label}
      </dt>
      <dd className="text-sm font-medium leading-snug text-foreground">{value}</dd>
      {sub && <dd className="text-xs text-muted-foreground">{sub}</dd>}
    </div>
  )
}
