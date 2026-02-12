'use client';

import { useMemo, useState } from 'react';
import { placeData } from '@/lib/content';
import { useExplorerStore } from '@/lib/store/useExplorerStore';

export function PlaceWorldPanel() {
  const { selectedPlaceId, layer, setLayer, language, addProgress, earnBadge } = useExplorerStore();
  const [blockOrder, setBlockOrder] = useState<number[]>([2, 1, 3]);
  const [quizFeedback, setQuizFeedback] = useState<string>('');

  const place = useMemo(
    () => placeData.places.find((p) => p.id === selectedPlaceId) ?? placeData.places[0],
    [selectedPlaceId]
  );

  const currentLayer = place.layers.find((l) => l.id === layer);

  const reorderBlocks = () => {
    const next = [...blockOrder].sort(() => Math.random() - 0.5);
    setBlockOrder(next);
  };

  const solveBlocks = () => {
    const solved = blockOrder.join(',') === '1,2,3';
    if (solved) {
      addProgress(8);
      setQuizFeedback(language === 'en' ? 'Perfect pyramid build! +8 progress' : 'بناء ممتاز للهرم! +8 تقدم');
    } else {
      setQuizFeedback(language === 'en' ? 'Try arranging from smallest to largest' : 'حاول الترتيب من الأصغر إلى الأكبر');
    }
  };

  const submitQuiz = (choice: number) => {
    const firstQuiz = place.quiz[0];
    if (!firstQuiz) return;
    if (choice === firstQuiz.answerIndex) {
      setQuizFeedback(language === 'en' ? 'Sphinx says: Correct! You earned a badge.' : 'أبو الهول يقول: إجابة صحيحة! ربحت شارة.');
      earnBadge('guardian');
      addProgress(12);
    } else {
      setQuizFeedback(language === 'en' ? 'Oops! Try again, explorer.' : 'حاول مرة أخرى يا مستكشف.');
    }
  };

  return (
    <section className="panel p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black" style={{ color: place.heroColor }}>
            {place.name[language]}
          </h2>
          <p className="text-sm text-cyan-100">{place.overview[language]}</p>
        </div>
        <div className="flex gap-2">
          {place.layers.map((l) => (
            <button
              key={l.id}
              className={`rounded-full px-3 py-1 text-xs font-bold ${l.id === layer ? 'bg-cyan-300 text-slate-900' : 'bg-white/10 text-white'}`}
              onClick={() => setLayer(l.id)}
            >
              {language === 'en' ? `Layer ${l.id}` : `الطبقة ${l.id}`}
            </button>
          ))}
        </div>
      </div>

      {currentLayer && (
        <div className="rounded-2xl border border-white/20 bg-slate-950/40 p-4">
          <h3 className="text-lg font-bold text-amber-200">{currentLayer.title[language]}</h3>
          <p className="mb-4 text-sm text-cyan-100">{currentLayer.objective[language]}</p>

          {layer === 1 && (
            <ul className="list-disc space-y-2 pl-6 text-sm text-slate-100">
              {place.funFacts.map((fact, i) => (
                <li key={i}>{fact[language]}</li>
              ))}
            </ul>
          )}

          {layer === 2 && (
            <div className="space-y-3">
              <div className="flex gap-3">
                {blockOrder.map((b, i) => (
                  <button key={`${b}-${i}`} className="h-14 w-14 rounded-xl bg-amber-200 text-lg font-black text-slate-900" onClick={() => setBlockOrder((prev) => prev.map((x, idx) => (idx === i ? (x % 3) + 1 : x)))}>
                    {b}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="kid-button" onClick={reorderBlocks}>{language === 'en' ? 'Shuffle' : 'خلط'}</button>
                <button className="kid-button" onClick={solveBlocks}>{language === 'en' ? 'Check Build' : 'تحقق من البناء'}</button>
              </div>
            </div>
          )}

          {layer === 3 && (
            <div className="grid gap-3 md:grid-cols-3">
              {['Canopic Jar', 'Golden Mask', 'Papyrus Map'].map((item) => (
                <button key={item} className="animate-float rounded-2xl bg-white/10 p-3 text-left transition hover:bg-white/20">
                  <p className="font-semibold text-amber-100">{item}</p>
                  <p className="text-xs text-cyan-100">{language === 'en' ? 'Tap to rotate and inspect.' : 'اضغط للدوران والمعاينة.'}</p>
                </button>
              ))}
            </div>
          )}

          {layer === 4 && place.quiz[0] && (
            <div className="space-y-3">
              <p className="font-semibold text-papyrus">{place.quiz[0].question[language]}</p>
              <div className="flex flex-col gap-2">
                {place.quiz[0].choices.map((choice, idx) => (
                  <button key={idx} className="rounded-xl bg-white/15 px-4 py-2 text-left text-sm hover:bg-white/25" onClick={() => submitQuiz(idx)}>
                    {choice[language]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {layer === 5 && (
            <div className="grid gap-3 md:grid-cols-2">
              {[
                language === 'en' ? 'Protect monuments with smart sensors' : 'حماية الآثار بمستشعرات ذكية',
                language === 'en' ? 'Lead a festival tour for families' : 'قيادة جولة احتفالية للعائلات'
              ].map((option) => (
                <button key={option} className="rounded-2xl border border-cyan-200/30 bg-cyan-900/20 p-4 text-left hover:bg-cyan-800/30" onClick={() => addProgress(5)}>
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {quizFeedback && <p className="mt-4 rounded-xl bg-emerald-400/20 p-2 text-sm text-emerald-100">{quizFeedback}</p>}
    </section>
  );
}
