'use client';

import { FormEvent, useMemo, useState } from 'react';
import { detectIntent, placeData } from '@/lib/content';
import { useExplorerStore } from '@/lib/store/useExplorerStore';

declare global {
  interface Window {
    SpeechRecognition?: new () => any;
    webkitSpeechRecognition?: new () => any;
  }
}

export function NileBot() {
  const { selectedPlaceId, language, pushChat } = useExplorerStore();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(language === 'en' ? 'Ask me about history, culture, or fun facts!' : 'اسألني عن التاريخ أو الثقافة أو الحقائق الممتعة!');

  const place = useMemo(() => placeData.places.find((p) => p.id === selectedPlaceId) ?? placeData.places[0], [selectedPlaceId]);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ar' ? 'ar-EG' : 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const reply = (text: string) => {
    const intent = detectIntent(text);
    const fallback = language === 'en' ? 'I can help with history, culture, or fun!' : 'يمكنني المساعدة في التاريخ أو الثقافة أو المرح!';
    const next = intent === 'unknown' ? fallback : place.voiceIntents[intent]?.[language] ?? fallback;
    setResponse(next);
    pushChat(`${text} → ${next}`);
    speak(next);
  };

  const submitText = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    reply(input);
    setInput('');
  };

  const listen = () => {
    if (typeof window === 'undefined') return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setResponse(language === 'en' ? 'Voice is unavailable. Type your question below.' : 'الصوت غير متاح. اكتب سؤالك بالأسفل.');
      return;
    }

    const recognition = new Recognition();
    recognition.lang = language === 'ar' ? 'ar-EG' : 'en-US';
    recognition.onresult = (event: any) => {
      const heard = event.results[0][0].transcript;
      reply(heard);
    };
    recognition.start();
  };

  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-12 w-12 animate-pulseSlow rounded-full bg-gradient-to-br from-cyan-300 to-indigo-400" />
        <div>
          <h3 className="text-lg font-black text-cyan-100">NileBot</h3>
          <p className="text-xs text-white/70">{language === 'en' ? 'Your magical guide robot' : 'دليلك الروبوت السحري'}</p>
        </div>
      </div>
      <p className="rounded-2xl bg-slate-900/60 p-3 text-sm">{response}</p>
      <div className="mt-3 flex gap-2">
        <button className="kid-button" onClick={listen}>{language === 'en' ? '🎙️ Speak' : '🎙️ تحدث'}</button>
        <button className="kid-button" onClick={() => speak(response)}>{language === 'en' ? '🔊 Repeat' : '🔊 إعادة'}</button>
      </div>
      <form className="mt-3 flex gap-2" onSubmit={submitText}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'en' ? 'Ask NileBot...' : 'اسأل نايل بوت...'}
          className="w-full rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 text-sm"
          aria-label="NileBot text input"
        />
        <button className="kid-button" type="submit">{language === 'en' ? 'Send' : 'إرسال'}</button>
      </form>
    </section>
  );
}
