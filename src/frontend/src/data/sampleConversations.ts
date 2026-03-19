import { Language } from "../backend";

export interface ChatMessage {
  role: "tutor" | "user";
  text: string;
}

export const SAMPLE_CONVERSATIONS: Record<Language, ChatMessage[]> = {
  [Language.spanish]: [
    {
      role: "tutor",
      text: "¡Hola! Soy Aura, tu tutora de español. ¿Cómo te llamas?",
    },
    { role: "user", text: "Me llamo Sarah. ¡Mucho gusto!" },
    {
      role: "tutor",
      text: "¡Mucho gusto, Sarah! Hoy practicaremos los saludos. ¿Estás lista?",
    },
  ],
  [Language.french]: [
    {
      role: "tutor",
      text: "Bonjour! Je suis Aura, votre tutrice de français. Comment vous appelez-vous?",
    },
    { role: "user", text: "Je m'appelle Sarah. Enchantée!" },
    {
      role: "tutor",
      text: "Enchantée Sarah! Aujourd'hui, nous allons pratiquer les salutations.",
    },
  ],
  [Language.punjabi]: [
    {
      role: "tutor",
      text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ Aura ਹਾਂ, ਤੁਹਾਡੀ ਪੰਜਾਬੀ ਅਧਿਆਪਕਾ। ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?",
    },
    { role: "user", text: "ਮੇਰਾ ਨਾਮ Sarah ਹੈ। ਖੁਸ਼ੀ ਹੋਈ!" },
    {
      role: "tutor",
      text: "ਖੁਸ਼ੀ ਹੋਈ Sarah! ਅੱਜ ਅਸੀਂ ਮੁੱਢਲੀਆਂ ਗੱਲਾਂ ਸਿੱਖਾਂਗੇ। (Sat Sri Akal means 'God is the eternal truth')",
    },
  ],
  [Language.japanese]: [
    {
      role: "tutor",
      text: "こんにちは！私はAura、あなたの日本語チューターです。お名前は何ですか？",
    },
    { role: "user", text: "私はSarahです。よろしくお願いします！" },
    {
      role: "tutor",
      text: "よろしくお願いします、Sarah！今日は挨拶を練習しましょう。",
    },
  ],
  [Language.german]: [
    {
      role: "tutor",
      text: "Guten Tag! Ich bin Aura, deine Deutschlehrerin. Wie heißt du?",
    },
    { role: "user", text: "Ich heiße Sarah. Schön dich kennenzulernen!" },
    {
      role: "tutor",
      text: "Schön dich kennenzulernen, Sarah! Heute üben wir Begrüßungen.",
    },
  ],
  [Language.mandarin]: [
    { role: "tutor", text: "你好！我是Aura，你的普通话老师。你叫什么名字？" },
    { role: "user", text: "我叫Sarah。很高兴认识你！" },
    { role: "tutor", text: "很高兴认识你，Sarah！今天我们来练习打招呼。" },
  ],
  [Language.italian]: [
    {
      role: "tutor",
      text: "Ciao! Sono Aura, la tua tutor d'italiano. Come ti chiami?",
    },
    { role: "user", text: "Mi chiamo Sarah. Piacere!" },
    {
      role: "tutor",
      text: "Piacere Sarah! Oggi pratichiamo i saluti italiani.",
    },
  ],
  [Language.portuguese]: [
    {
      role: "tutor",
      text: "Olá! Sou a Aura, sua tutora de português. Qual é o seu nome?",
    },
    { role: "user", text: "Meu nome é Sarah. Prazer!" },
    { role: "tutor", text: "Prazer, Sarah! Hoje vamos praticar as saudações." },
  ],
  [Language.arabic]: [
    { role: "tutor", text: "مرحباً! أنا Aura، معلمتك للغة العربية. ما اسمك؟" },
    { role: "user", text: "اسمي Sarah. سعيدة بلقائك!" },
    { role: "tutor", text: "سعيدة بلقائك Sarah! اليوم سنتدرب على التحيات." },
  ],
  [Language.hindi]: [
    {
      role: "tutor",
      text: "नमस्ते! मैं Aura हूँ, आपकी हिंदी शिक्षिका। आपका नाम क्या है?",
    },
    { role: "user", text: "मेरा नाम Sarah है। बहुत खुशी हुई!" },
    { role: "tutor", text: "बहुत खुशी हुई Sarah! आज हम अभिवादन का अभ्यास करेंगे।" },
  ],
};

export const TUTOR_RESPONSES: Record<Language, string[]> = {
  [Language.spanish]: [
    "¡Muy bien! Sigamos practicando. ¿Cómo se dice 'good morning' en español?",
    "¡Excelente! 'Buenos días' significa 'good morning'. ¡Lo estás haciendo muy bien!",
    "¿Puedes decir 'goodbye' en español? Pista: empieza con 'hasta'.",
    "¡Perfecto! 'Hasta luego' o 'adiós'. ¡Tu español mejora rápidamente!",
  ],
  [Language.french]: [
    "Très bien! Continuons. Comment dit-on 'good morning' en français?",
    "Excellent! 'Bonjour' ou 'Bonjour matin'. Vous progressez bien!",
    "Pouvez-vous dire 'thank you' en français?",
    "Parfait! 'Merci' ou 'merci beaucoup'. Votre français s'améliore!",
  ],
  [Language.punjabi]: [
    "ਬਹੁਤ ਵਧੀਆ! ਚਲੋ ਹੋਰ ਅਭਿਆਸ ਕਰੀਏ। 'ਧੰਨਵਾਦ' ਦਾ ਮਤਲਬ 'thank you' ਹੈ।",
    "ਸ਼ਾਬਾਸ਼! ਤੁਸੀਂ ਬਹੁਤ ਵਧੀਆ ਸਿੱਖ ਰਹੇ ਹੋ!",
    "'ਕਿਵੇਂ ਹੋ?' ਦਾ ਜਵਾਬ ਦਿਓ — 'ਮੈਂ ਠੀਕ ਹਾਂ' (I am fine).",
    "ਵਧੀਆ! ਪੰਜਾਬੀ ਬੋਲਣਾ ਜਾਰੀ ਰੱਖੋ!",
  ],
  [Language.japanese]: [
    "素晴らしい！続けましょう。'ありがとう'の意味は'thank you'です。",
    "よくできました！どんどん上手になっていますよ！",
    "'さようなら'はどういう意味ですか？",
    "正解です！'goodbye'という意味です。上手ですね！",
  ],
  [Language.german]: [
    "Sehr gut! Weiter so. Was bedeutet 'Danke'?",
    "Ausgezeichnet! 'Danke' bedeutet 'thank you'. Du lernst schnell!",
    "Wie sagt man 'good evening' auf Deutsch?",
    "Richtig! 'Guten Abend'. Dein Deutsch wird immer besser!",
  ],
  [Language.mandarin]: [
    "非常好！我们继续。'谢谢'是什么意思？",
    "太棒了！'谢谢'的意思是'thank you'。你学得很快！",
    "你能说'goodbye'的中文吗？",
    "完美！'再见'。你的普通话进步很快！",
  ],
  [Language.italian]: [
    "Molto bene! Continuiamo. Cosa significa 'grazie'?",
    "Eccellente! 'Grazie' significa 'thank you'. Stai imparando in fretta!",
    "Come si dice 'good evening' in italiano?",
    "Perfetto! 'Buonasera'. Il tuo italiano migliora rapidamente!",
  ],
  [Language.portuguese]: [
    "Muito bem! Vamos continuar. O que significa 'obrigada'?",
    "Excelente! 'Obrigada' significa 'thank you'. Você está aprendendo rápido!",
    "Como se diz 'goodbye' em português?",
    "Perfeito! 'Tchau' ou 'até logo'. Seu português está melhorando!",
  ],
  [Language.arabic]: [
    "ممتاز! دعنا نكمل. ماذا تعني 'شكراً'؟",
    "رائع! 'شكراً' تعني 'thank you'. أنت تتعلم بسرعة!",
    "كيف تقول 'goodbye' بالعربية؟",
    "مثالي! 'مع السلامة'. عربيتك تتحسن بسرعة!",
  ],
  [Language.hindi]: [
    "बहुत अच्छे! चलते हैं। 'धन्यवाद' का मतलब क्या है?",
    "शानदार! 'धन्यवाद' मतलब 'thank you' है। आप बहुत जल्दी सीख रहे हैं!",
    "'अलविदा' का मतलब बताएं।",
    "बिल्कुल सही! 'Goodbye'। आपकी हिंदी बहुत अच्छी हो रही है!",
  ],
};
