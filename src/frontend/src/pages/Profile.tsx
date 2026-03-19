import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TutorAvatar } from "../components/TutorAvatar";
import { LANGUAGES } from "../data/languages";
import {
  Language,
  useProfile,
  useSaveProfile,
  useSaveTutorSettings,
  useTutorSettings,
} from "../hooks/useQueries";

const PERSONALITY_STYLES = [
  "Friendly",
  "Professional",
  "Encouraging",
  "Strict",
];

export default function Profile() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: tutorSettings, isLoading: tutorLoading } = useTutorSettings();
  const saveProfile = useSaveProfile();
  const saveTutor = useSaveTutorSettings();

  const [username, setUsername] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Language.spanish,
  );
  const [goal, setGoal] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [personalityStyle, setPersonalityStyle] = useState("Friendly");

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "Sarah");
      setSelectedLanguage(profile.selectedLanguage || Language.spanish);
      setGoal(profile.learningGoal || "");
    } else {
      setUsername("Sarah");
    }
  }, [profile]);

  useEffect(() => {
    if (tutorSettings) {
      setTutorName(tutorSettings.tutorName || "Aura");
      setPersonalityStyle(tutorSettings.personalityStyle || "Friendly");
    } else {
      setTutorName("Aura");
    }
  }, [tutorSettings]);

  const handleSaveProfile = async () => {
    try {
      await saveProfile.mutateAsync({
        username,
        language: selectedLanguage,
        goal,
      });
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  const handleSaveTutor = async () => {
    try {
      await saveTutor.mutateAsync({ name: tutorName, style: personalityStyle });
      toast.success("Tutor settings saved!");
    } catch {
      toast.error("Failed to save tutor settings");
    }
  };

  if (profileLoading || tutorLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="profile.loading_state"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-4 pb-8 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Profile & Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your learning preferences and tutor settings
          </p>
        </div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-card border border-border p-6"
          data-ocid="profile.section"
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
              style={{ backgroundColor: "oklch(0.27 0.072 255)" }}
            >
              {(username[0] || "S").toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-foreground">Your Profile</h2>
              <p className="text-xs text-muted-foreground">
                Learning preferences
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                className="mt-1 rounded-xl"
                data-ocid="profile.username.input"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Learning Language</Label>
              <Select
                value={selectedLanguage}
                onValueChange={(v) => setSelectedLanguage(v as Language)}
              >
                <SelectTrigger
                  className="mt-1 rounded-xl"
                  data-ocid="profile.language.select"
                >
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.key} value={lang.key}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goal" className="text-sm font-medium">
                Learning Goal
              </Label>
              <Textarea
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Reach conversational fluency in 6 months"
                className="mt-1 rounded-xl resize-none"
                rows={3}
                data-ocid="profile.goal.textarea"
              />
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={saveProfile.isPending}
              data-ocid="profile.save.submit_button"
              className="w-full rounded-xl"
              style={{
                backgroundColor: "oklch(0.27 0.072 255)",
                color: "white",
              }}
            >
              {saveProfile.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {saveProfile.isPending ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </motion.div>

        {/* Tutor Customization */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card border border-border p-6"
          data-ocid="profile.tutor.section"
        >
          <div className="flex items-center gap-3 mb-5">
            <TutorAvatar size="md" />
            <div>
              <h2 className="font-bold text-foreground">Tutor Customization</h2>
              <p className="text-xs text-muted-foreground">
                Personalize your AI tutor
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="tutorName" className="text-sm font-medium">
                Tutor Name
              </Label>
              <Input
                id="tutorName"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
                placeholder="e.g. Aura"
                className="mt-1 rounded-xl"
                data-ocid="profile.tutor_name.input"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Personality Style</Label>
              <Select
                value={personalityStyle}
                onValueChange={setPersonalityStyle}
              >
                <SelectTrigger
                  className="mt-1 rounded-xl"
                  data-ocid="profile.personality.select"
                >
                  <SelectValue placeholder="Choose style" />
                </SelectTrigger>
                <SelectContent>
                  {PERSONALITY_STYLES.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div
              className="rounded-xl p-4 border border-border flex items-center gap-3"
              style={{ backgroundColor: "oklch(0.27 0.072 255 / 0.04)" }}
            >
              <TutorAvatar size="sm" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Preview</p>
                <p className="text-sm font-medium text-foreground">
                  {tutorName || "Aura"} ·{" "}
                  <span className="text-muted-foreground font-normal">
                    {personalityStyle} style
                  </span>
                </p>
              </div>
            </div>

            <Button
              onClick={handleSaveTutor}
              disabled={saveTutor.isPending}
              data-ocid="profile.tutor.save.submit_button"
              className="w-full rounded-xl"
              style={{
                backgroundColor: "oklch(0.27 0.072 255)",
                color: "white",
              }}
            >
              {saveTutor.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {saveTutor.isPending ? "Saving..." : "Save Tutor Settings"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
