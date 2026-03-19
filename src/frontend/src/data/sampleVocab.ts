import { Language, VocabularyStatus } from "../backend";
import type { VocabularyWord } from "../backend";

export const SAMPLE_VOCAB: VocabularyWord[] = [
  // Spanish
  {
    word: "Hola",
    translation: "Hello",
    language: Language.spanish,
    status: VocabularyStatus.known,
  },
  {
    word: "Gracias",
    translation: "Thank you",
    language: Language.spanish,
    status: VocabularyStatus.known,
  },
  {
    word: "Por favor",
    translation: "Please",
    language: Language.spanish,
    status: VocabularyStatus.learning,
  },
  {
    word: "Buenos días",
    translation: "Good morning",
    language: Language.spanish,
    status: VocabularyStatus.new_,
  },
  {
    word: "Hasta luego",
    translation: "Goodbye",
    language: Language.spanish,
    status: VocabularyStatus.new_,
  },
  // French
  {
    word: "Bonjour",
    translation: "Hello",
    language: Language.french,
    status: VocabularyStatus.known,
  },
  {
    word: "Merci",
    translation: "Thank you",
    language: Language.french,
    status: VocabularyStatus.known,
  },
  {
    word: "S'il vous plaît",
    translation: "Please",
    language: Language.french,
    status: VocabularyStatus.learning,
  },
  {
    word: "Au revoir",
    translation: "Goodbye",
    language: Language.french,
    status: VocabularyStatus.new_,
  },
  // Punjabi
  {
    word: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
    translation: "Hello (Sat Sri Akal)",
    language: Language.punjabi,
    status: VocabularyStatus.new_,
  },
  {
    word: "ਧੰਨਵਾਦ",
    translation: "Thank you (Dhanyavaad)",
    language: Language.punjabi,
    status: VocabularyStatus.new_,
  },
  {
    word: "ਕਿਵੇਂ ਹੋ?",
    translation: "How are you?",
    language: Language.punjabi,
    status: VocabularyStatus.new_,
  },
  {
    word: "ਮੈਂ ਠੀਕ ਹਾਂ",
    translation: "I am fine",
    language: Language.punjabi,
    status: VocabularyStatus.new_,
  },
  // Japanese
  {
    word: "こんにちは",
    translation: "Hello (Konnichiwa)",
    language: Language.japanese,
    status: VocabularyStatus.learning,
  },
  {
    word: "ありがとう",
    translation: "Thank you (Arigatou)",
    language: Language.japanese,
    status: VocabularyStatus.new_,
  },
  // Hindi
  {
    word: "नमस्ते",
    translation: "Hello (Namaste)",
    language: Language.hindi,
    status: VocabularyStatus.known,
  },
  {
    word: "धन्यवाद",
    translation: "Thank you",
    language: Language.hindi,
    status: VocabularyStatus.learning,
  },
];
