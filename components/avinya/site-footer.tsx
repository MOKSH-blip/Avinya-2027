import { ISLANDS } from '@/lib/avinya-data'

export function SiteFooter() {
  return (
    <footer className="grain relative isolate overflow-hidden border-t border-border">
      <img src="/images/deep-space.png" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background" />
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 py-24 sm:px-8">
        <div className="flex flex-col items-start gap-8">
          <p className="text-label text-primary">End of transmission</p>
          <p className="font-display text-[clamp(2.4rem,8vw,6.5rem)] leading-[0.95]">
            See you on
            <br />
            the islands.
          </p>
          <a
            href="#events"
            className="text-label rounded-sm bg-primary px-6 py-4 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore all events
          </a>
        </div>
        <div className="flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            AVINYA 2027 · Indian Institute of Information Technology Dharwad · 12 — 14 March 2027
          </p>
          <ul className="flex flex-wrap gap-5">
            {ISLANDS.map((i) => (
              <li key={i.slug}>
                <a href={`#${i.slug}`} className="text-label flex items-center gap-2 text-foreground/70 hover:text-foreground">
                  <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: i.accentVar }} />
                  {`Day 0${i.day}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
