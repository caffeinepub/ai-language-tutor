import { Language } from "../backend";
import type { Lesson } from "../backend";

export const SAMPLE_LESSONS: Lesson[] = [
  {
    lessonId: "es-greet-1",
    language: Language.spanish,
    category: "Greetings",
    completed: false,
  },
  {
    lessonId: "es-greet-2",
    language: Language.spanish,
    category: "Greetings",
    completed: true,
  },
  {
    lessonId: "es-num-1",
    language: Language.spanish,
    category: "Numbers",
    completed: false,
  },
  {
    lessonId: "es-food-1",
    language: Language.spanish,
    category: "Food",
    completed: false,
  },
  {
    lessonId: "es-travel-1",
    language: Language.spanish,
    category: "Travel",
    completed: true,
  },
  {
    lessonId: "es-biz-1",
    language: Language.spanish,
    category: "Business",
    completed: false,
  },
  {
    lessonId: "fr-greet-1",
    language: Language.french,
    category: "Greetings",
    completed: false,
  },
  {
    lessonId: "fr-num-1",
    language: Language.french,
    category: "Numbers",
    completed: false,
  },
  {
    lessonId: "pa-greet-1",
    language: Language.punjabi,
    category: "Greetings",
    completed: false,
  },
  {
    lessonId: "pa-food-1",
    language: Language.punjabi,
    category: "Food",
    completed: false,
  },
  {
    lessonId: "ja-greet-1",
    language: Language.japanese,
    category: "Greetings",
    completed: true,
  },
  {
    lessonId: "hi-greet-1",
    language: Language.hindi,
    category: "Greetings",
    completed: false,
  },
];

export const CATEGORY_ICONS: Record<string, string> = {
  Greetings: "👋",
  Numbers: "🔢",
  Food: "🍜",
  Travel: "✈️",
  Business: "💼",
};

export const LESSON_TITLES: Record<string, Record<string, string>> = {
  Greetings: {
    "es-greet-1": "Basic Spanish Greetings",
    "es-greet-2": "Formal vs. Informal Greetings",
    "fr-greet-1": "French Introductions",
    "pa-greet-1": "Punjabi Greetings & Sat Sri Akal",
    "ja-greet-1": "Japanese Konnichiwa & Ohayou",
    "hi-greet-1": "Hindi Namaste & Phrases",
  },
  Numbers: {
    "es-num-1": "Spanish Numbers 1–20",
    "fr-num-1": "French Counting Basics",
  },
  Food: {
    "es-food-1": "Ordering Food in Spanish",
    "pa-food-1": "Punjabi Food Vocabulary",
  },
  Travel: {
    "es-travel-1": "Travel Phrases in Spanish",
  },
  Business: {
    "es-biz-1": "Business Spanish Essentials",
  },
};
