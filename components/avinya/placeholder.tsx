import { cn } from '@/lib/utils'

export function Placeholder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-sm border border-dashed border-primary/50 bg-primary/5 px-2.5 py-1 text-xs text-primary',
        className,
      )}
    >
      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]">TBA</span>
      <span className="text-foreground/75">{children}</span>
    </span>
  )
}
