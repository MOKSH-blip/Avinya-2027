'use client'

import { useState } from 'react'
import { ArrowUpRight, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Placeholder } from './placeholder'
import { Reveal, SectionLabel } from './reveal'

const MODULES = [
  { id: 'about', label: 'About', placeholder: 'Hack2Future 2027 overview to be confirmed by the organising team.' },
  { id: 'mission', label: 'Mission overview', placeholder: 'Mission format, duration and structure for 2027.' },
  { id: 'tracks', label: 'Tracks & problem statements', placeholder: 'Tracks and problem statements will be announced.' },
  { id: 'challenges', label: 'Competitions & challenges', placeholder: 'Challenge categories and judging criteria.' },
  { id: 'workshops', label: 'Workshops & sessions', placeholder: 'Workshop and session line-up.' },
  { id: 'participation', label: 'Participation', placeholder: 'Team size, mode and participation details.' },
  { id: 'dates', label: 'Important dates', placeholder: 'Registration and submission dates for 2027.' },
  { id: 'rules', label: 'Rules & eligibility', placeholder: 'Eligibility criteria and official rules.' },
  { id: 'registration', label: 'Registration', placeholder: 'Registration link and process.' },
  { id: 'faqs', label: 'FAQs', placeholder: 'Hack2Future-specific questions and answers.' },
  { id: 'contact', label: 'Contact', placeholder: 'Hack2Future coordinators and contact channels.' },
] as const

export function Hack2Future() {
  const [active, setActive] = useState<(typeof MODULES)[number]['id']>('about')
  const current = MODULES.find((m) => m.id === active) ?? MODULES[0]
  const index = MODULES.indexOf(current)

  return (
    <section id="hack2future" aria-labelledby="h2f-title" className="grain relative isolate overflow-hidden bg-[oklch(0.1_0.02_250)]">
      <img
        src="/images/hack2future.png"
        alt="An astronaut in a futuristic mission-control room surrounded by holographic data screens."
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[oklch(0.1_0.02_250)] via-[oklch(0.1_0.02_250/0.85)] to-[oklch(0.1_0.02_250/0.3)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(oklch(0.82_0.13_195/0.12)_1px,transparent_1px),linear-gradient(90deg,oklch(0.82_0.13_195/0.12)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="08" className="text-[var(--day-3)]">
            Flagship national-level hackathon
          </SectionLabel>
          <h2 id="h2f-title" className="font-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.9]">
            HACK2
            <span className="text-[var(--day-3)]">FUTURE</span>
          </h2>
          <p className="font-display text-base tracking-[0.2em] text-foreground/90 sm:text-xl">
            THE NEXT GENERATION OF INNOVATION
          </p>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-foreground/80">
            A mission where developers, designers and innovators build solutions to real-world
            challenges. Hack2Future is the flagship national-level hackathon of IIIT Dharwad.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://hack2future.iiitdwd.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-label flex items-center gap-3 rounded-sm bg-[var(--day-3)] px-5 py-3.5 text-background transition-opacity hover:opacity-90"
            >
              <Rocket className="size-4" />
              Official Hack2Future website
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <div className="relative mt-16 grid overflow-hidden rounded-md border border-[var(--day-3)]/30 bg-background/60 backdrop-blur-md lg:grid-cols-[18rem_1fr]">
          <div className="hud-corners pointer-events-none absolute -inset-px text-[var(--day-3)]" />
          <div role="tablist" aria-label="Mission modules" aria-orientation="vertical" className="flex gap-1 overflow-x-auto border-b border-border p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">
            {MODULES.map((m, i) => (
              <button
                key={m.id}
                role="tab"
                type="button"
                id={`h2f-tab-${m.id}`}
                aria-selected={active === m.id}
                aria-controls="h2f-panel"
                onClick={() => setActive(m.id)}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm transition-colors',
                  active === m.id
                    ? 'bg-[var(--day-3)]/15 text-foreground'
                    : 'text-foreground/65 hover:bg-foreground/5 hover:text-foreground',
                )}
              >
                <span className={cn('text-label', active === m.id ? 'text-[var(--day-3)]' : 'text-muted-foreground')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {m.label}
              </button>
            ))}
          </div>

          <div id="h2f-panel" role="tabpanel" aria-labelledby={`h2f-tab-${current.id}`} className="relative flex min-h-80 flex-col gap-8 p-6 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-label text-[var(--day-3)]">{`Module ${String(index + 1).padStart(2, '0')} / ${MODULES.length}`}</p>
              <p className="text-label flex items-center gap-2 text-muted-foreground">
                <span className="size-1.5 animate-pulse rounded-full bg-[var(--day-3)]" />
                Awaiting 2027 data
              </p>
            </div>
            <h3 key={current.id} className="animate-reveal font-display text-2xl sm:text-4xl">
              {current.label}
            </h3>
            <div key={`${current.id}-p`} className="animate-reveal flex flex-col items-start gap-4">
              <Placeholder>{current.placeholder}</Placeholder>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Details for the 2027 edition have not been published yet. This module is ready to be
                filled in by the organising team once the information is confirmed. Refer to the
                official website for the latest updates.
              </p>
            </div>
            <div aria-hidden="true" className="mt-auto grid grid-cols-12 items-end gap-1.5 opacity-60">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="animate-pulse rounded-sm bg-[var(--day-3)]/40"
                  style={{ height: `${12 + ((i * 37 + index * 13) % 44)}px`, animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
