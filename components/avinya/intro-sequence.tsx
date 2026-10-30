'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { ISLANDS } from '@/lib/avinya-data'
import { cn } from '@/lib/utils'
import { useExpedition } from './expedition-provider'

const SCENES = [
  { id: 'space', image: '/images/deep-space.png', duration: 3600 },
  { id: 'astronaut', image: '/images/astronaut.png', duration: 4200 },
  { id: 'transmission', image: '/images/astronaut.png', duration: 4200 },
  { id: 'briefing', image: '/images/deep-space.png', duration: 5200 },
  { id: 'ocean', image: '/images/expedition-boat.png', duration: 0 },
] as const

export function IntroSequence() {
  const { introOpen, setIntroOpen } = useExpedition()
  const [scene, setScene] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!introOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [introOpen])

  useEffect(() => {
    if (!introOpen) return
    const duration = SCENES[scene].duration
    if (!duration) return
    const t = setTimeout(() => setScene((s) => Math.min(s + 1, SCENES.length - 1)), duration)
    return () => clearTimeout(t)
  }, [scene, introOpen])

  useEffect(() => {
    if (!introOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function close() {
    setLeaving(true)
    setTimeout(() => {
      setIntroOpen(false)
      setLeaving(false)
      setScene(0)
    }, 700)
  }

  if (!introOpen) return null

  const current = SCENES[scene]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AVINYA 2027 mission introduction"
      className={cn(
        'grain fixed inset-0 z-[60] overflow-hidden bg-black text-foreground transition-opacity duration-700',
        leaving ? 'opacity-0' : 'opacity-100',
      )}
    >
      {SCENES.map((s, i) => (
        <div
          key={s.id}
          aria-hidden="true"
          className={cn(
            'absolute inset-0 transition-opacity duration-[1600ms] ease-out',
            i === scene ? 'opacity-100' : 'opacity-0',
          )}
        >
          {Math.abs(i - scene) <= 1 && (
            <img
              src={s.image || '/placeholder.svg'}
              alt=""
              className={cn(
                'h-full w-full object-cover',
                i === scene && 'animate-slow-zoom',
                s.id === 'transmission' && 'brightness-[0.35] saturate-50',
                s.id === 'briefing' && 'brightness-[0.45]',
              )}
            />
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[12vh] bg-black" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-[12vh] bg-black" aria-hidden="true" />

      <div className="absolute inset-x-0 top-0 flex h-[12vh] items-center justify-between px-5 sm:px-10">
        <p className="text-label text-muted-foreground">
          <span className="text-primary">{'● REC '}</span>
          {`AVN-27 / SEQ 0${scene + 1} of 0${SCENES.length}`}
        </p>
        <button
          type="button"
          onClick={close}
          className="text-label rounded-sm border border-foreground/25 px-3 py-2 text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Skip intro
        </button>
      </div>

      <div className="absolute inset-x-0 top-[12vh] bottom-[12vh] flex items-center justify-center px-6">
        <div key={current.id} className="flex w-full max-w-4xl flex-col items-center text-center">
          {current.id === 'space' && (
            <div className="animate-reveal flex flex-col items-center gap-5">
              <p className="text-label text-muted-foreground">Deep space · signal acquired</p>
              <p className="font-display text-2xl leading-snug text-balance sm:text-4xl">
                Somewhere beyond the known charts,
                <br />
                a signal is waiting.
              </p>
            </div>
          )}

          {current.id === 'astronaut' && (
            <div className="animate-reveal flex flex-col items-center gap-5 self-end sm:self-auto sm:pl-[30%] sm:text-left">
              <p className="text-label text-primary">Explorer status · landed</p>
              <p className="font-display text-2xl leading-snug text-balance sm:text-4xl">
                {'You are the explorer.'}
              </p>
              <p className="max-w-md text-muted-foreground">
                An unknown planet. A horizon no one has crossed. Your expedition begins now.
              </p>
            </div>
          )}

          {current.id === 'transmission' && (
            <div className="animate-reveal relative flex w-full max-w-2xl flex-col items-center gap-6 border border-primary/30 bg-black/40 px-6 py-10 backdrop-blur-sm sm:px-12">
              <div className="hud-corners pointer-events-none absolute -inset-px text-primary" />
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="animate-scan h-1/3 w-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
              </div>
              <p className="text-label text-primary">Incoming transmission</p>
              <h2 className="font-display text-4xl tracking-wide sm:text-6xl">AVINYA 2027</h2>
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
                <span className="text-label text-foreground">12 — 14 March 2027</span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-foreground/30 sm:block" />
                <span className="text-label text-foreground">IIIT Dharwad</span>
              </div>
            </div>
          )}

          {current.id === 'briefing' && (
            <div className="animate-reveal flex w-full flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-3">
                <p className="text-label text-primary">Mission briefing</p>
                <p className="font-display text-2xl text-balance sm:text-3xl">Three islands. Three days.</p>
              </div>
              <ol className="grid w-full gap-3 sm:grid-cols-3">
                {ISLANDS.map((island, i) => (
                  <li
                    key={island.slug}
                    className="animate-reveal flex items-center gap-4 overflow-hidden rounded-md border border-foreground/15 bg-black/50 p-2 text-left backdrop-blur sm:flex-col sm:items-stretch sm:p-0"
                    style={{ animationDelay: `${300 + i * 350}ms` }}
                  >
                    <img
                      src={island.image || '/placeholder.svg'}
                      alt=""
                      className="h-16 w-24 shrink-0 rounded-sm object-cover sm:h-28 sm:w-full sm:rounded-none"
                    />
                    <div className="flex flex-col gap-1 sm:p-4">
                      <span className="text-label" style={{ color: island.accentVar }}>
                        {`Day 0${island.day} · ${island.shortDate}`}
                      </span>
                      <span className="font-display text-sm">{island.name}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {current.id === 'ocean' && (
            <div className="animate-reveal flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-4">
                <p className="text-label text-primary">The journey begins</p>
                <p className="font-display text-3xl leading-tight text-balance sm:text-5xl">
                  Cross the ocean.
                  <br />
                  Discover the islands.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="group text-label flex items-center gap-3 rounded-sm bg-primary px-6 py-4 text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Enter the experience
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-[12vh] items-center justify-center gap-2 px-6">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScene(i)}
            aria-label={`Go to scene ${i + 1}`}
            aria-current={i === scene}
            className="group flex h-8 items-center"
          >
            <span
              className={cn(
                'block h-px transition-all duration-500',
                i === scene ? 'w-12 bg-primary' : 'w-6 bg-foreground/30 group-hover:bg-foreground/60',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
