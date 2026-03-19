import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Language } from "./backend";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import Vocabulary from "./pages/Vocabulary";

type Page = "home" | "practice" | "vocabulary" | "lessons" | "profile";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Language.spanish,
  );

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            onNavigate={setCurrentPage}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={(lang) => setSelectedLanguage(lang as Language)}
          />
        );
      case "practice":
        return <Practice selectedLanguage={selectedLanguage} />;
      case "vocabulary":
        return <Vocabulary selectedLanguage={selectedLanguage} />;
      case "lessons":
        return <Lessons selectedLanguage={selectedLanguage} />;
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {/* Offset for fixed navbar */}
      <div className="pt-16 md:pt-16">{renderPage()}</div>
      {/* Footer */}
      <footer className="border-t border-border py-6 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-foreground">Aura</span>
            <span className="text-muted-foreground text-sm">
              · AI Language Tutor
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
      <Toaster richColors />
    </div>
  );
}
