import { Language } from "../backend";

export interface LanguageInfo {
  key: Language;
  name: string;
  flag: string;
  accent: string;
  level: string;
}

export const LANGUAGES: LanguageInfo[] = [
  {
    key: Language.spanish,
    name: "Spanish",
    flag: "🇪🇸",
    accent: "lang-spanish",
    level: "Beginner",
  },
  {
    key: Language.french,
    name: "French",
    flag: "🇫🇷",
    accent: "lang-french",
    level: "Beginner",
  },
  {
    key: Language.german,
    name: "German",
    flag: "🇩🇪",
    accent: "lang-german",
    level: "Beginner",
  },
  {
    key: Language.japanese,
    name: "Japanese",
    flag: "🇯🇵",
    accent: "lang-japanese",
    level: "Beginner",
  },
  {
    key: Language.mandarin,
    name: "Mandarin",
    flag: "🇨🇳",
    accent: "lang-mandarin",
    level: "Beginner",
  },
  {
    key: Language.italian,
    name: "Italian",
    flag: "🇮🇹",
    accent: "lang-italian",
    level: "Beginner",
  },
  {
    key: Language.portuguese,
    name: "Portuguese",
    flag: "🇵🇹",
    accent: "lang-portuguese",
    level: "Beginner",
  },
  {
    key: Language.arabic,
    name: "Arabic",
    flag: "🇸🇦",
    accent: "lang-arabic",
    level: "Beginner",
  },
  {
    key: Language.hindi,
    name: "Hindi",
    flag: "🇮🇳",
    accent: "lang-hindi",
    level: "Beginner",
  },
  {
    key: Language.punjabi,
    name: "Punjabi",
    flag: "🌸",
    accent: "lang-punjabi",
    level: "Beginner",
  },
];

export const LANGUAGE_ACCENT_HEX: Record<Language, string> = {
  [Language.spanish]: "#F3B35C",
  [Language.french]: "#4A78C8",
  [Language.german]: "#7B68C8",
  [Language.japanese]: "#F2A08C",
  [Language.mandarin]: "#E87070",
  [Language.italian]: "#E8926A",
  [Language.portuguese]: "#5ABFB0",
  [Language.arabic]: "#9EC05A",
  [Language.hindi]: "#E8A044",
  [Language.punjabi]: "#3E8B57",
};
