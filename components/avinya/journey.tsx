'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { Anchor, Navigation } from 'lucide-react'
import { ISLANDS } from '@/lib/avinya-data'
import { cn } from '@/lib/utils'
import { SectionLabel } from './reveal'

const OceanScene = dynamic(() => import('./ocean-scene'), {
  ssr: false,
  loading: () => <SceneFallback label="Charting the ocean…" />,
})

function SceneFallback({ label }: { label: string }) {
  return (
    <div className="absolute inset-0">
      <img src="/images/expedition-boat.png" alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-background/30">
        <p className="text-label text-foreground/80">{label}</p>
      </div>
    </div>
  )
}

export function Journey() {
  const container = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [compact, setCompact] = useState(false)
  const [target, setTarget] = useState(0)
  const [arrived, setArrived] = useState(0)

  useEffect(() => {
    setCompact(window.matchMedia('(max-width: 768px)').matches)
    const el = container.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '200px 0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const destination = target ? ISLANDS[target - 1] : null
  const docked = target !== 0 && arrived === target

  return (
    <section id="journey" className="relative border-y border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 pb-8 pt-24 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <SectionLabel index="02">Explore the journey</SectionLabel>
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-5xl">The Crossing</h2>
        </div>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          Three beacons burn on the horizon. Set a course, steer the expedition vessel across the
          ocean and make landfall on each island of AVINYA 2027.
        </p>
      </div>

      <div ref={container} className="relative h-[78svh] min-h-[520px] w-full overflow-hidden bg-black">
        {inView ? (
          <OceanScene
            target={target}
            onSelect={(i) => setTarget(i)}
            onArrive={(i) => setArrived(i)}
            compact={compact}
          />
        ) : (
          <SceneFallback label="Approaching the ocean…" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-8">
          <div className="pointer-events-auto flex flex-col gap-1 border-l-2 border-primary bg-background/40 px-3 py-2 backdrop-blur">
            <span className="text-label text-muted-foreground">Vessel status</span>
            <span className="text-sm font-medium" aria-live="polite">
              {target === 0
                ? 'Holding position · awaiting course'
                : docked
                  ? `Anchored off ${destination?.name}`
                  : `Under way → ${destination?.name}`}
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <ol className="grid gap-2 sm:grid-cols-3 lg:w-[720px]" aria-label="Set course">
              {ISLANDS.map((island) => {
                const active = target === island.day
                return (
                  <li key={island.slug}>
                    <button
                      type="button"
                      onClick={() => setTarget(island.day)}
                      aria-pressed={active}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-md border bg-background/70 p-3 text-left backdrop-blur-md transition-colors',
                        active ? 'border-[var(--c)]' : 'border-border hover:border-foreground/40',
                      )}
                      style={{ '--c': island.accentVar } as React.CSSProperties}
                    >
                      <Navigation
                        className={cn('size-4 shrink-0 transition-transform', active && 'rotate-45')}
                        style={{ color: island.accentVar }}
                      />
                      <span className="flex flex-col">
                        <span className="text-label" style={{ color: island.accentVar }}>
                          {`Day 0${island.day}`}
                        </span>
                        <span className="font-display text-xs">{island.name}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <a
              href={destination ? `#${destination.slug}` : '#day-1'}
              className={cn(
                'text-label flex items-center justify-center gap-3 rounded-md px-5 py-4 transition-all',
                docked
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-foreground/25 bg-background/60 text-foreground backdrop-blur',
              )}
            >
              <Anchor className="size-4" />
              {docked ? `Make landfall · ${destination?.name}` : 'Skip to the islands'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
