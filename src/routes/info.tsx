import { createFileRoute } from '@tanstack/react-router'
import { SOURCES, STAND } from '../data/meta'
import { usePrefs } from '../lib/prefs'

export const Route = createFileRoute('/info')({
    component: InfoPage,
})

function InfoPage() {
    const { lang, t } = usePrefs()

    return (
        <div className="mx-auto max-w-2xl space-y-4">
            <h1 className="text-xl font-extrabold">{t('infoTitle')}</h1>

            <section className="ring-water-100 dark:bg-water-900 dark:ring-water-800 rounded-2xl bg-white p-4 ring-1">
                <p className="text-sm leading-relaxed">{t('infoDisclaimer')}</p>
                <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {t('infoStand')}: {STAND}
                </p>
            </section>

            <section className="ring-water-100 dark:bg-water-900 dark:ring-water-800 rounded-2xl bg-white p-4 ring-1">
                <h2 className="mb-2 font-bold">
                    {lang === 'de'
                        ? 'Fischereischein & Angelkarte'
                        : 'Licence & permit'}
                </h2>
                <p className="text-sm leading-relaxed">{t('infoLicense')}</p>
            </section>

            <section className="ring-water-100 dark:bg-water-900 dark:ring-water-800 rounded-2xl bg-white p-4 ring-1">
                <h2 className="mb-2 font-bold">{t('infoSources')}</h2>
                <ul className="space-y-2 text-sm">
                    {SOURCES.map((s) => (
                        <li key={s.url}>
                            <a
                                href={s.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-water-600 dark:text-water-300 underline underline-offset-2"
                            >
                                {s.name[lang]}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            <p className="bg-water-100 text-water-800 dark:bg-water-900 dark:text-water-200 rounded-2xl p-4 text-sm leading-relaxed">
                📱 {t('installHint')}
            </p>
        </div>
    )
}
