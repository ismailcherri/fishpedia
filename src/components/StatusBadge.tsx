import type { RegionRule } from '../data/types'
import { usePrefs } from '../lib/prefs'
import { getStatus, type CatchStatus } from '../lib/season'

const styles: Record<CatchStatus, string> = {
  open: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
  closed: 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200',
  protected:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
  unregulated:
    'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
}

const labelKey = {
  open: 'statusOpen',
  closed: 'statusClosed',
  protected: 'statusProtected',
  unregulated: 'statusUnregulated',
} as const

export function StatusBadge({
  rule,
  compact = false,
}: {
  rule: RegionRule
  compact?: boolean
}) {
  const { now, t } = usePrefs()

  if (!now) {
    // date-neutral placeholder for prerendered HTML
    return (
      <span
        className={`inline-block animate-pulse rounded-full bg-slate-200 dark:bg-slate-700 ${compact ? 'h-5 w-16' : 'h-6 w-24'}`}
        aria-hidden
      />
    )
  }

  const status = getStatus(rule, now)
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'} ${styles[status]}`}
    >
      {status === 'closed' && <span aria-hidden>⛔</span>}
      {status === 'protected' && <span aria-hidden>🛡️</span>}
      {status === 'open' && <span aria-hidden>✓</span>}
      {t(labelKey[status])}
    </span>
  )
}
