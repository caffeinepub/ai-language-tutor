import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Play } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { LANGUAGES } from "../data/languages";
import {
  CATEGORY_ICONS,
  LESSON_TITLES,
  SAMPLE_LESSONS,
} from "../data/sampleLessons";
import {
  type Language,
  useCompleteLesson,
  useLessons,
} from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Greetings",
  "Numbers",
  "Food",
  "Travel",
  "Business",
];

interface LessonsProps {
  selectedLanguage: Language;
}

export default function Lessons({ selectedLanguage }: LessonsProps) {
  const { data: backendLessons = [] } = useLessons();
  const completeLesson = useCompleteLesson();
  const [activeCategory, setActiveCategory] = useState("All");
  const [completedLocal, setCompletedLocal] = useState<Set<string>>(new Set());

  const langInfo =
    LANGUAGES.find((l) => l.key === selectedLanguage) || LANGUAGES[0];

  const backendIds = new Set(backendLessons.map((l) => l.lessonId));
  const allLessons = [
    ...backendLessons,
    ...SAMPLE_LESSONS.filter(
      (l) => l.language === selectedLanguage && !backendIds.has(l.lessonId),
    ),
  ];

  const filtered = allLessons.filter(
    (l) => activeCategory === "All" || l.category === activeCategory,
  );

  const getLessonTitle = (lesson: (typeof allLessons)[0]) => {
    return (
      LESSON_TITLES[lesson.category]?.[lesson.lessonId] ||
      `${lesson.category} Lesson`
    );
  };

  const isLessonCompleted = (
    lessonId: string,
    fromBackend: boolean,
    backendCompleted: boolean,
  ) => {
    return fromBackend ? backendCompleted : completedLocal.has(lessonId);
  };

  const handleStart = async (lesson: (typeof allLessons)[0]) => {
    const alreadyCompleted = backendIds.has(lesson.lessonId)
      ? lesson.completed
      : completedLocal.has(lesson.lessonId);

    if (alreadyCompleted) {
      toast("Lesson already completed!");
      return;
    }

    try {
      await completeLesson.mutateAsync({
        lessonId: lesson.lessonId,
        language: lesson.language,
        category: lesson.category,
      });
      setCompletedLocal((prev) => new Set([...prev, lesson.lessonId]));
      toast.success("Lesson completed! 🎉");
    } catch {
      setCompletedLocal((prev) => new Set([...prev, lesson.lessonId]));
      toast.success("Lesson completed! 🎉");
    }
  };

  const completedCount = allLessons.filter((l) =>
    backendIds.has(l.lessonId) ? l.completed : completedLocal.has(l.lessonId),
  ).length;

  return (
    <div className="min-h-screen bg-background pt-4 pb-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {langInfo.flag} {langInfo.name} Lessons
            </h1>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {allLessons.length} completed
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div
          className="flex gap-2 flex-wrap mb-6"
          data-ocid="lessons.filter.tab"
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-ocid={`lessons.${cat.toLowerCase()}.tab`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat
                  ? "text-white border-transparent"
                  : "border-border text-muted-foreground hover:border-muted-foreground/50"
              }`}
              style={
                activeCategory === cat
                  ? { backgroundColor: "oklch(0.27 0.072 255)" }
                  : {}
              }
            >
              {CATEGORY_ICONS[cat] || "📚"} {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div
            className="bg-card rounded-2xl shadow-card border border-border p-12 text-center"
            data-ocid="lessons.empty_state"
          >
            <div className="text-5xl mb-3">
              {CATEGORY_ICONS[activeCategory] || "📖"}
            </div>
            <p className="text-lg font-semibold">
              No {activeCategory} lessons yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            data-ocid="lessons.list"
          >
            {filtered.map((lesson, i) => {
              const fromBackend = backendIds.has(lesson.lessonId);
              const completed = isLessonCompleted(
                lesson.lessonId,
                fromBackend,
                lesson.completed,
              );
              return (
                <motion.div
                  key={lesson.lessonId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  data-ocid={`lessons.item.${i + 1}`}
                  className="bg-card rounded-2xl shadow-card border border-border p-5 flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: "oklch(0.27 0.072 255 / 0.08)" }}
                  >
                    {CATEGORY_ICONS[lesson.category] || "📖"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {lesson.category}
                      </Badge>
                      {completed && (
                        <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="font-semibold text-sm text-foreground">
                      {getLessonTitle(lesson)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {langInfo.name} · {lesson.category}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleStart(lesson)}
                    data-ocid={`lessons.start.button.${i + 1}`}
                    className="rounded-xl flex-shrink-0"
                    style={
                      completed
                        ? {
                            backgroundColor: "oklch(0.55 0.1 155)",
                            color: "white",
                          }
                        : {
                            backgroundColor: "oklch(0.27 0.072 255)",
                            color: "white",
                          }
                    }
                  >
                    {completed ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
