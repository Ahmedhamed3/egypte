'use client';

import { useExplorerStore } from '@/lib/store/useExplorerStore';

export function MainMenu() {
  const { language, setLanguage, progress } = useExplorerStore();

  return (
    <header className="panel p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-wide text-amber-200">NileQuest</h1>
          <p className="text-sm text-cyan-100">
            {language === 'en' ? 'Explore Egypt with NileBot!' : 'استكشف مصر مع نايل بوت!'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="kid-button" onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>
            English
          </button>
          <button className="kid-button" onClick={() => setLanguage('ar')} aria-pressed={language === 'ar'}>
            العربية
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-cyan-100">
          <span>{language === 'en' ? 'Explorer Progress' : 'تقدم المستكشف'}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </header>
  );
}
