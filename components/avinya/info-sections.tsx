import { Mail, MapPin, Phone, Users } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Placeholder } from './placeholder'
import { Reveal, SectionLabel } from './reveal'

const SPONSOR_TIERS = [
  { tier: 'Title partner', slots: 1 },
  { tier: 'Gold partners', slots: 3 },
  { tier: 'Associate partners', slots: 6 },
]

const FAQS = [
  'Who can attend AVINYA 2027?',
  'Is registration required for events?',
  'Are there any participation fees?',
  'Is accommodation available for outstation participants?',
  'How do I register for Hack2Future?',
  'Whom should I contact for event-specific queries?',
]

const CONTACTS = [
  { role: 'Festival coordinator', icon: Users },
  { role: 'Technical events', icon: Users },
  { role: 'Cultural events', icon: Users },
  { role: 'Sponsorship & partnerships', icon: Users },
]

export function Sponsors() {
  return (
    <section id="sponsors" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <SectionLabel index="09">Sponsors</SectionLabel>
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-5xl">Expedition partners</h2>
        </div>
        <Placeholder>Sponsor line-up for 2027 to be announced</Placeholder>
      </div>
      <div className="mt-12 flex flex-col gap-10">
        {SPONSOR_TIERS.map((t) => (
          <Reveal key={t.tier} className="flex flex-col gap-4">
            <h3 className="text-label text-muted-foreground">{t.tier}</h3>
            <ul
              className={
                t.slots === 1
                  ? 'grid'
                  : t.slots === 3
                    ? 'grid gap-3 sm:grid-cols-3'
                    : 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'
              }
            >
              {Array.from({ length: t.slots }).map((_, i) => (
                <li
                  key={i}
                  className={`flex items-center justify-center rounded-md border border-dashed border-border bg-card/50 text-label text-muted-foreground ${
                    t.slots === 1 ? 'h-36' : t.slots === 3 ? 'h-28' : 'h-20'
                  }`}
                >
                  {'Logo slot'}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Venue() {
  return (
    <section id="venue" className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="10">Venue</SectionLabel>
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-5xl">IIIT Dharwad</h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            AVINYA 2027 takes place across the campus of the Indian Institute of Information Technology
            Dharwad, including the Central Lecture Theatre, the Library, the Sports Complex, the Open
            Air Theatre and the Main Stage.
          </p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-md border border-border bg-background p-6">
            <span className="text-label flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-3.5" />
              Address
            </span>
            <Placeholder>Official campus address</Placeholder>
          </div>
          <div className="flex flex-col gap-3 rounded-md border border-border bg-background p-6">
            <span className="text-label text-muted-foreground">Getting there</span>
            <Placeholder>Directions and travel information</Placeholder>
          </div>
          <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-background">
            <Placeholder>Map embed</Placeholder>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Faqs() {
  return (
    <section id="faqs" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-col gap-4">
        <SectionLabel index="11">FAQs</SectionLabel>
        <h2 className="font-display text-3xl leading-tight text-balance sm:text-5xl">Before you set sail</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Official answers will be published by the organising team. Each entry below is an editable
          placeholder.
        </p>
      </div>
      <Accordion className="border-t border-border">
        {FAQS.map((q, i) => (
          <AccordionItem key={q} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="py-5 text-left text-base hover:no-underline">{q}</AccordionTrigger>
            <AccordionContent className="pb-5">
              <Placeholder>Official answer to be confirmed</Placeholder>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-4">
          <SectionLabel index="12">Contact</SectionLabel>
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-5xl">Open a channel</h2>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map((c) => (
            <li key={c.role} className="flex flex-col gap-4 rounded-md border border-border bg-card p-6">
              <span className="text-label text-primary">{c.role}</span>
              <Placeholder>Name</Placeholder>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-3.5" />
                <Placeholder>Phone</Placeholder>
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-3.5" />
                <Placeholder>Email</Placeholder>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
