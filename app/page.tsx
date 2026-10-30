import { About } from '@/components/avinya/about'
import { EventDialog } from '@/components/avinya/event-dialog'
import { EventDirectory } from '@/components/avinya/event-directory'
import { ExpeditionProvider } from '@/components/avinya/expedition-provider'
import { Hack2Future } from '@/components/avinya/hack2future'
import { Hero } from '@/components/avinya/hero'
import { Contact, Faqs, Sponsors, Venue } from '@/components/avinya/info-sections'
import { IntroSequence } from '@/components/avinya/intro-sequence'
import { IslandSection } from '@/components/avinya/island-section'
import { Journey } from '@/components/avinya/journey'
import { Schedule } from '@/components/avinya/schedule'
import { SiteFooter } from '@/components/avinya/site-footer'
import { SiteHeader } from '@/components/avinya/site-header'
import { ISLANDS } from '@/lib/avinya-data'

export default function Page() {
  return (
    <ExpeditionProvider>
      <IntroSequence />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Journey />
        {ISLANDS.map((island) => (
          <IslandSection key={island.slug} island={island} />
        ))}
        <EventDirectory />
        <Schedule />
        <Hack2Future />
        <Sponsors />
        <Venue />
        <Faqs />
        <Contact />
      </main>
      <SiteFooter />
      <EventDialog />
    </ExpeditionProvider>
  )
}
