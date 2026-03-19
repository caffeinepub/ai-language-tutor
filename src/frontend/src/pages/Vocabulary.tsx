import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { LANGUAGES } from "../data/languages";
import { SAMPLE_VOCAB } from "../data/sampleVocab";
import {
  type Language,
  VocabularyStatus,
  useAddVocabulary,
  useUpdateVocabularyStatus,
  useVocabulary,
} from "../hooks/useQueries";

interface VocabularyProps {
  selectedLanguage: Language;
}

const STATUS_COLORS: Record<VocabularyStatus, string> = {
  [VocabularyStatus.known]: "bg-green-100 text-green-700 border-green-200",
  [VocabularyStatus.learning]:
    "bg-yellow-100 text-yellow-700 border-yellow-200",
  [VocabularyStatus.new_]: "bg-blue-100 text-blue-700 border-blue-200",
};

const STATUS_LABELS: Record<VocabularyStatus, string> = {
  [VocabularyStatus.known]: "Known",
  [VocabularyStatus.learning]: "Learning",
  [VocabularyStatus.new_]: "New",
};

export default function Vocabulary({ selectedLanguage }: VocabularyProps) {
  const { data: backendVocab = [] } = useVocabulary();
  const updateStatus = useUpdateVocabularyStatus();
  const addVocabulary = useAddVocabulary();

  const langInfo =
    LANGUAGES.find((l) => l.key === selectedLanguage) || LANGUAGES[0];

  const vocab = useMemo(() => {
    const backendWords = new Set(backendVocab.map((w) => w.word));
    const sampleFiltered = SAMPLE_VOCAB.filter(
      (w) => w.language === selectedLanguage && !backendWords.has(w.word),
    );
    return [
      ...backendVocab.filter((w) => w.language === selectedLanguage),
      ...sampleFiltered,
    ];
  }, [backendVocab, selectedLanguage]);

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentWord = vocab[cardIndex];
  const totalWords = vocab.length;

  const handleMarkKnown = async () => {
    if (!currentWord) return;
    try {
      await updateStatus.mutateAsync({
        word: currentWord.word,
        status: VocabularyStatus.known,
      });
      toast.success("Marked as known!");
    } catch {
      toast.success("Marked as known! ✅");
    }
    if (cardIndex < totalWords - 1) setCardIndex((prev) => prev + 1);
    setFlipped(false);
  };

  const handleMarkLearning = async () => {
    if (!currentWord) return;
    try {
      await updateStatus.mutateAsync({
        word: currentWord.word,
        status: VocabularyStatus.learning,
      });
    } catch {
      // silently handle
    }
    if (cardIndex < totalWords - 1) setCardIndex((prev) => prev + 1);
    setFlipped(false);
  };

  const handleAddSample = async () => {
    const sampleForLang = SAMPLE_VOCAB.filter(
      (w) => w.language === selectedLanguage,
    );
    try {
      await addVocabulary.mutateAsync(sampleForLang);
      toast.success("Vocabulary added!");
    } catch {
      toast.error("Failed to add vocabulary");
    }
  };

  const handleFlipCard = () => setFlipped((f) => !f);

  return (
    <div className="min-h-screen bg-background pt-4 pb-8 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {langInfo.flag} {langInfo.name} Vocabulary
            </h1>
            <p className="text-sm text-muted-foreground">
              {totalWords} words ·{" "}
              {vocab.filter((w) => w.status === VocabularyStatus.known).length}{" "}
              known
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddSample}
            data-ocid="vocabulary.add_words.button"
            className="rounded-xl text-sm"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Add Words
          </Button>
        </div>

        {totalWords === 0 ? (
          <div
            className="bg-card rounded-2xl shadow-card border border-border p-12 text-center"
            data-ocid="vocabulary.empty_state"
          >
            <div className="text-5xl mb-3">📚</div>
            <p className="text-lg font-semibold text-foreground">
              No vocabulary yet
            </p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Add words to start your flashcard practice
            </p>
            <Button
              type="button"
              onClick={handleAddSample}
              data-ocid="vocabulary.empty.add_words.button"
              style={{
                backgroundColor: "oklch(0.27 0.072 255)",
                color: "white",
              }}
              className="rounded-xl"
            >
              Add Sample Words
            </Button>
          </div>
        ) : (
          <>
            {/* Flashcard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <button
                type="button"
                className="w-full bg-card rounded-2xl shadow-card border border-border p-8 text-center cursor-pointer select-none min-h-[220px] flex flex-col items-center justify-center relative"
                onClick={handleFlipCard}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleFlipCard();
                }}
                data-ocid="vocabulary.flashcard.card"
              >
                <Badge
                  variant="outline"
                  className="absolute top-4 right-4 text-xs"
                >
                  {cardIndex + 1} / {totalWords}
                </Badge>
                <AnimatePresence mode="wait">
                  {!flipped ? (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className="text-4xl font-extrabold text-foreground mb-2">
                        {currentWord?.word}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tap to reveal translation
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className="text-2xl text-muted-foreground mb-1">
                        {currentWord?.word}
                      </p>
                      <p className="text-4xl font-extrabold text-foreground">
                        {currentWord?.translation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCardIndex((p) => Math.max(0, p - 1));
                  setFlipped(false);
                }}
                disabled={cardIndex === 0}
                data-ocid="vocabulary.prev.button"
                className="rounded-xl"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <Button
                type="button"
                onClick={handleMarkKnown}
                data-ocid="vocabulary.known.button"
                className="rounded-xl flex-1"
                style={{
                  backgroundColor: "oklch(0.55 0.1 155)",
                  color: "white",
                }}
              >
                <Check className="h-4 w-4 mr-2" /> I Know This
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleMarkLearning}
                data-ocid="vocabulary.learning.button"
                className="rounded-xl flex-1 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                Still Learning
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCardIndex((p) => Math.min(totalWords - 1, p + 1));
                  setFlipped(false);
                }}
                disabled={cardIndex === totalWords - 1}
                data-ocid="vocabulary.next.button"
                className="rounded-xl"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Words list */}
            <div className="bg-card rounded-2xl shadow-card border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">All Words</h3>
              <div className="space-y-2" data-ocid="vocabulary.list">
                {vocab.map((word, i) => (
                  <div
                    key={word.word}
                    data-ocid={`vocabulary.item.${i + 1}`}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      i === cardIndex
                        ? "bg-primary/5 border-primary/20"
                        : "border-border"
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-sm text-foreground">
                        {word.word}
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">
                        — {word.translation}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${STATUS_COLORS[word.status]}`}
                    >
                      {STATUS_LABELS[word.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
