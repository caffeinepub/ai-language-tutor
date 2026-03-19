import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Language } from "../backend";
import { TutorAvatar } from "../components/TutorAvatar";
import { LANGUAGES } from "../data/languages";
import {
  SAMPLE_CONVERSATIONS,
  TUTOR_RESPONSES,
} from "../data/sampleConversations";
import type { ChatMessage } from "../data/sampleConversations";
import { useTutorSettings } from "../hooks/useQueries";

interface PracticeProps {
  selectedLanguage: Language;
}

interface Message extends ChatMessage {
  id: string;
}

export default function Practice({ selectedLanguage }: PracticeProps) {
  const { data: tutorSettings } = useTutorSettings();
  const tutorName = tutorSettings?.tutorName || "Aura";
  const personalityStyle = tutorSettings?.personalityStyle || "Friendly";

  const langInfo =
    LANGUAGES.find((l) => l.key === selectedLanguage) || LANGUAGES[0];

  const seedMessages = (
    SAMPLE_CONVERSATIONS[selectedLanguage] ||
    SAMPLE_CONVERSATIONS[Language.spanish]
  ).map((m, i) => ({ ...m, id: `seed-${i}` }));

  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const responseIndexRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgCountRef = useRef(messages.length);

  useEffect(() => {
    const newSeed = (
      SAMPLE_CONVERSATIONS[selectedLanguage] ||
      SAMPLE_CONVERSATIONS[Language.spanish]
    ).map((m, i) => ({ ...m, id: `seed-${i}` }));
    setMessages(newSeed);
    responseIndexRef.current = 0;
  }, [selectedLanguage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message count change
  useEffect(() => {
    msgCountRef.current = messages.length;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg: Message = { role: "user", text, id: `user-${Date.now()}` };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const responses =
      TUTOR_RESPONSES[selectedLanguage] || TUTOR_RESPONSES[Language.spanish];
    const responseText = responses[responseIndexRef.current % responses.length];
    responseIndexRef.current += 1;

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "tutor", text: responseText, id: `tutor-${Date.now()}` },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background pt-4 pb-8 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Tutor header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-card border border-border p-4 mb-4 flex items-center gap-4"
        >
          <TutorAvatar size="md" className="flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-foreground">{tutorName}</h2>
              <Badge variant="secondary" className="text-xs">
                {personalityStyle}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {langInfo.flag} {langInfo.name}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your AI language tutor — practicing conversational {langInfo.name}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </motion.div>

        {/* Chat area */}
        <div
          className="bg-card rounded-2xl shadow-card border border-border flex flex-col"
          style={{ height: "calc(100vh - 280px)", minHeight: "400px" }}
          data-ocid="practice.chat.panel"
        >
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "tutor" && (
                    <TutorAvatar
                      size="sm"
                      className="mr-2 flex-shrink-0 mt-0.5"
                    />
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md text-white"
                        : "rounded-bl-md bg-secondary text-foreground"
                    }`}
                    style={
                      msg.role === "user"
                        ? { backgroundColor: "oklch(0.27 0.072 255)" }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <TutorAvatar size="sm" />
                <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-2.5 flex gap-1">
                  {([0, 1, 2] as const).map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 0.6,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder={`Message ${tutorName} in ${langInfo.name}...`}
              className="flex-1 rounded-xl"
              data-ocid="practice.chat.input"
            />
            <Button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              data-ocid="practice.chat.submit_button"
              className="rounded-xl px-4"
              style={{
                backgroundColor: "oklch(0.27 0.072 255)",
                color: "white",
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
