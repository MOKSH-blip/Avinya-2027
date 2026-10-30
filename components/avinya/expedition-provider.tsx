'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { Category, DayId, FestEvent } from '@/lib/avinya-data'
import { EVENTS } from '@/lib/avinya-data'
import { EventDialog } from './event-dialog'

export type CategoryFilter = 'All' | Category
export type DayFilter = 0 | DayId

type ExpeditionContextValue = {
  query: string
  setQuery: (q: string) => void
  category: CategoryFilter
  setCategory: (c: CategoryFilter) => void
  day: DayFilter
  setDay: (d: DayFilter) => void
  openEvent: (id: string) => void
  showDirectory: (opts: { day?: DayFilter; category?: CategoryFilter }) => void
  introOpen: boolean
  setIntroOpen: (open: boolean) => void
}

const ExpeditionContext = createContext<ExpeditionContextValue | null>(null)

export function ExpeditionProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [day, setDay] = useState<DayFilter>(0)
  const [selected, setSelected] = useState<FestEvent | null>(null)
  const [introOpen, setIntroOpen] = useState(true)

  const openEvent = useCallback((id: string) => {
    setSelected(EVENTS.find((e) => e.id === id) ?? null)
  }, [])

  const showDirectory = useCallback(
    ({ day: d, category: c }: { day?: DayFilter; category?: CategoryFilter }) => {
      setQuery('')
      setDay(d ?? 0)
      setCategory(c ?? 'All')
      document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
    },
    [],
  )

  const value = useMemo(
    () => ({
      query,
      setQuery,
      category,
      setCategory,
      day,
      setDay,
      openEvent,
      showDirectory,
      introOpen,
      setIntroOpen,
    }),
    [query, category, day, openEvent, showDirectory, introOpen],
  )

  return (
    <ExpeditionContext.Provider value={value}>
      {children}
      <EventDialog
        event={selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
        onShowDay={(d) => {
          setSelected(null)
          showDirectory({ day: d })
        }}
      />
    </ExpeditionContext.Provider>
  )
}

export function useExpedition() {
  const ctx = useContext(ExpeditionContext)
  if (!ctx) throw new Error('useExpedition must be used within ExpeditionProvider')
  return ctx
}
