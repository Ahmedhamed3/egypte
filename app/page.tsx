'use client';

import { useExplorerStore } from '@/lib/store/useExplorerStore';
import { MainMenu } from '@/components/MainMenu';
import { EgyptMap3D } from '@/components/EgyptMap3D';
import { PlaceWorldPanel } from '@/components/PlaceWorldPanel';
import { NileBot } from '@/components/NileBot';
import { PassportPanel } from '@/components/PassportPanel';

export default function HomePage() {
  const language = useExplorerStore((s) => s.language);

  return (
    <main dir={language === 'ar' ? 'rtl' : 'ltr'} className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 p-4 lg:p-6">
      <MainMenu />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <EgyptMap3D />
        <div className="space-y-4">
          <NileBot />
          <PassportPanel />
        </div>
      </div>
      <PlaceWorldPanel />

      <noscript>
        <p className="rounded-xl bg-red-900/40 p-3 text-sm">
          {language === 'en'
            ? 'JavaScript is required for 3D interactions and voice mode. You can still read content from /api/places.'
            : 'يتطلب التطبيق JavaScript للتفاعل الثلاثي الأبعاد ووضع الصوت. يمكنك قراءة المحتوى من /api/places.'}
        </p>
      </noscript>
    </main>
  );
}
