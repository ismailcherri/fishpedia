import { Link } from '@tanstack/react-router'
import type { Region } from '../data/types'
import {
  getSourceFish,
  getWaterEnrichment,
  sourceSpeciesLabel,
  substrateLabel,
} from '../data/waters/enrichment'
import { usePrefs } from '../lib/prefs'

/** Supplementary facts never change the official permit records or map shapes. */
export function WaterEnrichment({
  region,
  waterId,
  collapsible = false,
  popup = false,
}: {
  region: Region
  waterId: string
  collapsible?: boolean
  popup?: boolean
}) {
  const { lang, t } = usePrefs()
  const data = getWaterEnrichment(region, waterId)
  if (!data) return null
  const format = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB')
  const facts = [
    data.areaHa != null && [t('waterArea'), `${format.format(data.areaHa)} ha`],
    data.averageDepthM != null && [
      t('waterAverageDepth'),
      `${format.format(data.averageDepthM)} m`,
    ],
    data.maxDepthM != null && [
      t('waterMaxDepth'),
      `${format.format(data.maxDepthM)} m`,
    ],
    data.substrate.length > 0 && [
      t('waterSubstrate'),
      data.substrate.map((s) => substrateLabel(s, lang)).join(', '),
    ],
  ].filter((fact): fact is string[] => !!fact)
  const linkClass = popup
    ? 'text-water-600 font-semibold underline underline-offset-2'
    : 'text-water-600 dark:text-water-300 font-semibold underline underline-offset-2'
  const content = (
    <div className="space-y-2">
      {data.species.length > 0 && (
        <div>
          <p className="font-semibold">{t('waterReportedSpecies')}</p>
          <ul className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
            {data.species.map((species) => {
              const fish = getSourceFish(species.slug)
              return (
                <li key={species.slug}>
                  {fish ? (
                    <Link
                      to="/fisch/$slug"
                      params={{ slug: fish.id }}
                      className={linkClass}
                    >
                      {fish.names[lang]}
                    </Link>
                  ) : (
                    sourceSpeciesLabel(species, lang)
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {facts.length > 0 && (
        <dl className="space-y-0.5">
          {facts.map(([label, value]) => (
            <div key={label} className="flex flex-wrap gap-x-1">
              <dt className="font-semibold">{label}:</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
      <p>
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className={linkClass}
          aria-label={`Fisch-Hitparade: ${data.name}`}
        >
          Fisch-Hitparade ↗
        </a>
        <span className="mt-0.5 block">
          {t('waterRetrieved')}:{' '}
          <time dateTime={data.fetchedAt}>{data.fetchedAt}</time>
        </span>
      </p>
    </div>
  )
  const className = popup
    ? 'mt-2 border-t border-slate-200 pt-2 text-xs text-slate-600'
    : 'mx-2 mb-2 mt-1 border-t border-slate-100 pt-2 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300'
  return collapsible ? (
    <details className={className}>
      <summary className="cursor-pointer py-1 font-semibold">
        {t('waterMoreDetails')}
      </summary>
      <div className="pt-1 pb-1">{content}</div>
    </details>
  ) : (
    <section aria-label={t('waterMoreDetails')} className={className}>
      {content}
    </section>
  )
}
