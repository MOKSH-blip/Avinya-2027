import { EVENT_COUNTS } from '@/lib/avinya-data'
import { Reveal, SectionLabel } from './reveal'

const STATS = [
  { value: '03', label: 'Days', note: '12 — 14 March 2027' },
  { value: '03', label: 'Islands', note: 'One world per day' },
  { value: String(EVENT_COUNTS.technical).padStart(2, '0'), label: 'Technical events', note: 'Code, AI, quantum, Linux' },
  { value: String(EVENT_COUNTS.cultural).padStart(2, '0'), label: 'Cultural events', note: 'Stage, sound, art, words' },
]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="01">About AVINYA</SectionLabel>
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-5xl">
            A festival built as an expedition.
          </h2>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 text-pretty text-lg leading-relaxed text-foreground/80">
          <p>
            AVINYA is the techno-cultural festival of the Indian Institute of Information Technology
            Dharwad. For 2027, the festival becomes a journey: an explorer receives a transmission from
            deep space, crosses an unknown ocean and lands on three extraordinary islands.
          </p>
          <p className="text-muted-foreground">
            Each island is a day of the festival, with its own world, atmosphere and line-up of
            technical and cultural events. Together they form one continuous expedition, from the
            desert citadel of The Last Outpost, through the neon megacity of The Pandemonium, to the
            illuminated finale of The Carnival Island. Alongside them runs Hack2Future, the
            institute&apos;s flagship national-level hackathon.
          </p>
        </Reveal>
      </div>

      <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="flex flex-col gap-3 bg-background p-6 sm:p-8">
            <dt className="text-label text-muted-foreground">{stat.label}</dt>
            <dd className="font-display text-4xl text-primary sm:text-5xl">{stat.value}</dd>
            <dd className="text-sm text-muted-foreground">{stat.note}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
