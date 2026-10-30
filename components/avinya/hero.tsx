'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, Play } from 'lucide-react'
import { ISLANDS } from '@/lib/avinya-data'
import { useExpedition } from './expedition-provider'

const LAUNCH = new Date('2027-03-12T09:00:00+05:30').getTime()

function useCountdown() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  if (now === null) return null
  const diff = Math.max(0, LAUNCH - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Hero() {
  const { setIntroOpen } = useExpedition()
  const countdown = useCountdown()

  return (
    <section id="home" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <img
        src="/images/astronaut.png"
        alt="A lone astronaut stands on a rocky alien plateau, facing a low sun and a ringed planet through drifting fog."
        className="animate-drift absolute inset-0 -z-20 h-full w-full scale-110 object-cover object-[30%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/10 to-background" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6">
            <p className="text-label flex items-center gap-3 text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Transmission live · Techno-cultural festival
            </p>
            <h1 className="font-display text-[clamp(2.75rem,10vw,8.5rem)] leading-[0.9] tracking-tight">
              AVINYA
              <span className="block text-primary">2027</span>
            </h1>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
              <p className="font-display text-sm tracking-[0.18em] sm:text-base">12 — 14 MARCH 2027</p>
              <span aria-hidden="true" className="hidden h-4 w-px bg-foreground/30 sm:block" />
              <p className="text-sm text-muted-foreground">Indian Institute of Information Technology Dharwad</p>
            </div>
            <p className="max-w-xl text-pretty leading-relaxed text-foreground/80">
              A three-day expedition across an unknown ocean. Board the vessel, make landfall on three
              extraordinary islands and explore 24 technical and cultural events, led by the flagship
              Hack2Future hackathon.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#journey"
                className="text-label flex items-center gap-3 rounded-sm bg-primary px-5 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
              >
                Begin the journey
                <ArrowDown className="size-4" />
              </a>
              <a
                href="#events"
                className="text-label rounded-sm border border-foreground/25 bg-background/30 px-5 py-3.5 text-foreground backdrop-blur transition-colors hover:border-foreground/60"
              >
                Explore all events
              </a>
              <button
                type="button"
                onClick={() => setIntroOpen(true)}
                className="text-label flex items-center gap-2 px-3 py-3.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Play className="size-3.5" />
                Replay transmission
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-sm border border-foreground/15 bg-background/40 p-5 backdrop-blur-md lg:w-96">
            <div className="hud-corners pointer-events-none absolute -inset-px text-primary/70" />
            <p className="text-label text-muted-foreground">T-minus to landfall</p>
            <div className="mt-4 grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3" aria-live="off">
              {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
                <div key={unit} className="flex flex-col gap-1">
                  <span className="font-display text-2xl tabular-nums">
                    {countdown ? String(countdown[unit]).padStart(2, '0') : '--'}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav aria-label="Jump to an island" className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
          {ISLANDS.map((island) => (
            <a
              key={island.slug}
              href={`#${island.slug}`}
              className="group flex items-center justify-between gap-4 bg-background/70 px-5 py-4 backdrop-blur transition-colors hover:bg-background/90"
            >
              <span className="flex flex-col gap-1">
                <span className="text-label" style={{ color: island.accentVar }}>
                  {`Day 0${island.day} · ${island.shortDate}`}
                </span>
                <span className="font-display text-sm">{island.name}</span>
              </span>
              <span
                aria-hidden="true"
                className="text-lg text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
              >
                {'→'}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
