import places from '@/data/places.json';
import type { PlaceData } from '@/lib/types';

export const placeData = places as unknown as PlaceData;

export const detectIntent = (text: string): 'history' | 'culture' | 'fun' | 'unknown' => {
  const normalized = text.toLowerCase();
  if (/(history|when|old|built|date|king|متى|تاريخ|بنى|قديم)/i.test(normalized)) return 'history';
  if (/(culture|belief|tradition|life|after|ثقافة|عادات|معتقد)/i.test(normalized)) return 'culture';
  if (/(fun|joke|game|amazing|رائع|مرح|لعبة|ممتع)/i.test(normalized)) return 'fun';
  return 'unknown';
};
