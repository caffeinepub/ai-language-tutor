import { motion } from "motion/react";

type Page = "home" | "practice" | "vocabulary" | "lessons" | "profile";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_LINKS: { key: Page; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "practice", label: "Practice" },
  { key: "vocabulary", label: "Vocabulary" },
  { key: "lessons", label: "Lessons" },
  { key: "profile", label: "Profile" },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{ backgroundColor: "oklch(0.27 0.072 255)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate("home")}
          data-ocid="nav.home.link"
        >
          <span className="text-2xl">🎓</span>
          <span className="text-white font-bold text-xl tracking-tight">
            Aura
          </span>
        </button>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <motion.button
              type="button"
              key={link.key}
              onClick={() => onNavigate(link.key)}
              data-ocid={`nav.${link.key}.link`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === link.key
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {link.label}
            </motion.button>
          ))}
        </nav>

        {/* Avatar */}
        <button
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
          style={{ backgroundColor: "oklch(0.55 0.1 155)", color: "white" }}
          data-ocid="nav.profile.link"
          onClick={() => onNavigate("profile")}
        >
          S
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className="md:hidden flex items-center justify-around px-2 py-1 border-t"
        style={{
          borderColor: "oklch(0.35 0.06 255)",
          backgroundColor: "oklch(0.27 0.072 255)",
        }}
      >
        {NAV_LINKS.map((link) => (
          <button
            type="button"
            key={link.key}
            onClick={() => onNavigate(link.key)}
            data-ocid={`mobile.nav.${link.key}.link`}
            className={`px-2 py-1 rounded text-xs font-medium ${
              currentPage === link.key ? "text-white" : "text-white/60"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
}
