'use client';

import { placeData } from '@/lib/content';
import { useExplorerStore } from '@/lib/store/useExplorerStore';

export function PassportPanel() {
  const { earnedBadges, language, selectedPlaceId } = useExplorerStore();
  const selected = placeData.places.find((p) => p.id === selectedPlaceId) ?? placeData.places[0];

  return (
    <section className="panel p-4">
      <h3 className="text-lg font-black text-amber-100">{language === 'en' ? 'Explorer Passport' : 'جواز المستكشف'}</h3>
      <p className="text-xs text-cyan-100">
        {language === 'en' ? `Current stamp: ${selected.name.en}` : `الختم الحالي: ${selected.name.ar}`}
      </p>
      <div className="mt-3 grid gap-2">
        {placeData.badges.map((badge) => {
          const unlocked = earnedBadges.includes(badge.id);
          return (
            <div key={badge.id} className={`rounded-xl border p-3 ${unlocked ? 'border-emerald-300 bg-emerald-400/20' : 'border-white/20 bg-white/5'}`}>
              <p className="text-sm font-bold">{badge.name[language]}</p>
              <p className="text-xs text-white/80">{badge.description[language]}</p>
              <p className="mt-1 text-[11px]">{unlocked ? (language === 'en' ? 'Unlocked ✅' : 'تم الفتح ✅') : (language === 'en' ? 'Locked 🔒' : 'مغلق 🔒')}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
