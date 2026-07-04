import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { getFish } from '../data/fish'
import { fishImageUrl } from '../lib/fishImages'
import { usePrefs } from '../lib/prefs'
import { RegulationTable } from '../components/RegulationTable'

export const Route = createFileRoute('/fisch/$slug')({
  loader: ({ params }) => {
    const fish = getFish(params.slug)
    if (!fish) throw notFound()
    return { fishId: fish.id }
  },
  head: ({ loaderData }) => {
    const fish = loaderData ? getFish(loaderData.fishId) : undefined
    return {
      meta: fish
        ? [
            {
              title: `${fish.names.de} (${fish.names.scientific}) – Fishpidea`,
            },
            {
              name: 'description',
              content: fish.description.de,
            },
          ]
        : [],
    }
  },
  component: FishDetailPage,
})

function FishDetailPage() {
  const { fishId } = Route.useLoaderData()
  const fish = getFish(fishId)!
  const { lang, t, tx } = usePrefs()

  const isFullyProtected =
    fish.regulations.berlin.fullyProtected &&
    fish.regulations.brandenburg.fullyProtected

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        to="/"
        className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-water-600 hover:underline dark:text-water-300"
      >
        <span aria-hidden>←</span> {t('backToList')}
      </Link>

      <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-water-100 to-white shadow-sm ring-1 ring-water-100 dark:from-water-800 dark:to-water-900 dark:ring-water-800">
        <img
          src={fish.image.photoUrl ?? fishImageUrl(fish.image.svg)}
          alt={fish.names[lang]}
          className="mx-auto aspect-8/5 w-full max-w-xl object-contain px-4 pt-3"
        />
        {fish.image.photoAttribution && (
          <p className="px-4 pb-1 text-right text-[10px] text-slate-400">
            {fish.image.photoAttribution}
          </p>
        )}
        <div className="p-4 sm:p-5">
          <h1 className="text-2xl font-extrabold leading-tight">
            {fish.names[lang]}
          </h1>
          <p className="italic text-slate-500 dark:text-slate-400">
            {fish.names.scientific}
            {lang === 'de' && fish.names.en !== fish.names.de && (
              <span className="not-italic"> · engl. {fish.names.en}</span>
            )}
            {lang === 'en' && (
              <span className="not-italic"> · German: {fish.names.de}</span>
            )}
          </p>
          <p className="mt-3 leading-relaxed">{tx(fish.description)}</p>
        </div>
      </div>

      {isFullyProtected && (
        <p className="mt-3 rounded-2xl bg-purple-100 p-4 text-sm font-semibold text-purple-900 ring-1 ring-purple-200 dark:bg-purple-950/60 dark:text-purple-100 dark:ring-purple-900">
          🛡️ {t('protectedBanner')}
        </p>
      )}

      <section className="mt-5">
        <h2 className="mb-2 text-lg font-bold">{t('regulations')}</h2>
        <RegulationTable fish={fish} />
        {!isFullyProtected && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {t('undersizedHint')}
          </p>
        )}
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-water-100 dark:bg-water-900 dark:ring-water-800">
          <h2 className="mb-2 text-lg font-bold">{t('identification')}</h2>
          <ul className="space-y-2 text-sm leading-relaxed">
            {fish.identification.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-0.5 text-water-500">◆</span>
                <span>{tx(item)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-water-100 dark:bg-water-900 dark:ring-water-800">
            <h2 className="mb-2 text-lg font-bold">{t('size')}</h2>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">{t('avgLength')}</dt>
                <dd className="font-semibold">~ {fish.avgLengthCm} cm</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">{t('maxLength')}</dt>
                <dd className="font-semibold">{fish.maxLengthCm} cm</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-water-100 dark:bg-water-900 dark:ring-water-800">
            <h2 className="mb-2 text-lg font-bold">{t('habitat')}</h2>
            <p className="text-sm leading-relaxed">{tx(fish.habitat)}</p>
          </div>
        </div>
      </section>
    </article>
  )
}
