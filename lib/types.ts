export type Lang = 'en' | 'ar';
export type Localized = Record<Lang, string>;
export type PlaceLayer = { id: number; title: Localized; objective: Localized };
export type QuizItem = { id: string; question: Localized; choices: Localized[]; answerIndex: number };
export type Place = {
  id: string;
  coordinates: [number, number, number];
  heroColor: string;
  name: Localized;
  category: Localized;
  overview: Localized;
  funFacts: Localized[];
  quiz: QuizItem[];
  layers: PlaceLayer[];
  voiceIntents: Record<string, Localized>;
};
export type Badge = { id: string; name: Localized; description: Localized };
export type PlaceData = {
  schemaVersion: string;
  defaultLanguage: Lang;
  supportedLanguages: Lang[];
  places: Place[];
  badges: Badge[];
};
