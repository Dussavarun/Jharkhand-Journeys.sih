import Link from 'next/link';
import Image from 'next/image';
import { destinations } from '@/components/data';
import { useSettings } from '@/components/SettingsProvider';

export const metadata = {
  title: 'Destinations | Jharkhand Journeys',
};

export default function DestinationsPage() {
  let t = (k) => k;
  try {
    // Hook can only be used in client; fall back if SSR
    // eslint-disable-next-line react-hooks/rules-of-hooks
    t = useSettings().t;
  } catch {}
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t('destinations')}</h1>
        <p className="mt-2 text-neutral-600">{t('Explore Jharkhand')}</p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d) => (
          <article key={d.slug} className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-56 w-full bg-neutral-100">
              {/* Using next/image for optimization, with fallback to regular img if needed */}
              <Image src={d.image} alt={d.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold leading-snug">{d.name}</h2>
                  <p className="text-sm text-neutral-600">{d.location}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-neutral-700 line-clamp-3">{d.summary}</p>
              <div className="mt-4 flex items-center gap-3">
                <Link href={`/destinations/${d.slug}`} className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-green-700 hover:to-emerald-700">
                  360° Preview
                </Link>
                <Link href={`/destinations/${d.slug}`} className="text-sm font-medium text-green-700 hover:text-green-800">
                  Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

