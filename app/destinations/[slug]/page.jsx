import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDestination } from '../../../components/data';

export async function generateMetadata({ params }) {
  const d = getDestination(params.slug);
  if (!d) return { title: 'Destination not found' };
  return { title: `${d.name} • 360 Preview` };
}

export default function DestinationPreview({ params }) {
  const d = getDestination(params.slug);
  if (!d) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Link href="/destinations" className="text-sm text-green-700 hover:text-green-800">← Back to Destinations</Link>
      </div>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">{d.name} 360° Preview</h1>
        <p className="text-neutral-600">{d.location}</p>
      </header>
      {/* 360 embed */}
      <div className="w-full aspect-video rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm">
        <iframe
          src={d.previewUrl}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${d.name} 360° Preview`}
        />
      </div>
    </main>
  );
}

