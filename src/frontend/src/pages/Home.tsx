import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { TutorAvatar } from "../components/TutorAvatar";
import { LANGUAGES } from "../data/languages";
import { useProfile, useProgress, useTutorSettings } from "../hooks/useQueries";

type Page = "home" | "practice" | "vocabulary" | "lessons" | "profile";

interface HomeProps {
  onNavigate: (page: Page) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

const WEEKLY_DATA = [
  { day: "Mon", val: 40 },
  { day: "Tue", val: 65 },
  { day: "Wed", val: 55 },
  { day: "Thu", val: 80 },
  { day: "Fri", val: 70 },
  { day: "Sat", val: 90 },
  { day: "Sun", val: 85 },
];

export default function Home({
  onNavigate,
  selectedLanguage,
  onSelectLanguage,
}: HomeProps) {
  const { data: profile } = useProfile();
  const { data: progress } = useProgress();
  const { data: tutorSettings } = useTutorSettings();

  const userName = profile?.username || "Sarah";
  const tutorName = tutorSettings?.tutorName || "Aura";
  const streak = progress ? Number(progress.dailyStreak) : 14;
  const lessonsCompleted = progress
    ? Number(progress.totalLessonsCompleted)
    : 28;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="pt-8 pb-10 px-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.92 0.04 65), oklch(0.95 0.025 70))",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                className="mb-3 text-xs"
                style={{
                  backgroundColor: "oklch(0.27 0.072 255)",
                  color: "white",
                }}
              >
                Daily Lesson Ready
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 leading-tight">
                Welcome back, {userName}!
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Ready for today&apos;s lesson? Let&apos;s keep your streak
                going! 🔥
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={() => onNavigate("practice")}
                  data-ocid="home.practice.primary_button"
                  style={{
                    backgroundColor: "oklch(0.27 0.072 255)",
                    color: "white",
                  }}
                  className="rounded-xl px-6 py-2 font-semibold hover:opacity-90 transition-opacity"
                >
                  Start Practicing
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate("lessons")}
                  data-ocid="home.lessons.secondary_button"
                  className="rounded-xl px-6 py-2 font-semibold"
                >
                  Browse Lessons
                </Button>
              </div>
            </motion.div>

            {/* Right — Tutor Avatar */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="w-48 h-48 md:w-56 md:h-56 rounded-3xl flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: "oklch(0.27 0.072 255 / 0.12)" }}
              >
                <TutorAvatar size="lg" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl shadow-card px-5 py-3 border border-border min-w-[180px]">
                <p className="font-bold text-sm text-foreground">{tutorName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Streaks:{" "}
                  <span className="font-semibold text-foreground">
                    {streak} Days
                  </span>
                  {" | "}
                  Lessons:{" "}
                  <span className="font-semibold text-foreground">
                    {lessonsCompleted}
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Language Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="bg-card rounded-2xl shadow-card border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Choose a Language
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <motion.button
                    type="button"
                    key={lang.key}
                    onClick={() => onSelectLanguage(lang.key)}
                    data-ocid={`home.language.${lang.key}.button`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      selectedLanguage === lang.key
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/40"
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {lang.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lang.level}
                      </p>
                    </div>
                    {selectedLanguage === lang.key && (
                      <span className="ml-auto text-primary text-xs font-bold">
                        Active
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Quick Access
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      {
                        page: "practice" as Page,
                        emoji: "💬",
                        label: "Practice",
                      },
                      {
                        page: "vocabulary" as Page,
                        emoji: "📚",
                        label: "Vocabulary",
                      },
                      {
                        page: "lessons" as Page,
                        emoji: "📖",
                        label: "Lessons",
                      },
                    ] as const
                  ).map(({ page, emoji, label }) => (
                    <motion.button
                      type="button"
                      key={page}
                      onClick={() => onNavigate(page)}
                      data-ocid={`home.quickaccess.${page}.button`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex flex-col items-center gap-2 py-4 rounded-xl border border-border hover:bg-secondary transition-colors"
                    >
                      <span className="text-3xl">{emoji}</span>
                      <span className="text-xs font-semibold text-foreground">
                        {label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Weekly Activity
                </h2>
                <div className="flex items-end gap-2 h-24">
                  {WEEKLY_DATA.map(({ day, val }) => (
                    <div
                      key={day}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="w-full rounded-t-md"
                        style={{
                          backgroundColor: `oklch(0.27 0.072 255 / ${0.3 + val / 150})`,
                          height: `${val}%`,
                        }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div>
                    <p className="text-2xl font-extrabold text-foreground">
                      {streak}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Day streak 🔥
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Weekly goal</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
