import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lesson {
    lessonId: string;
    completed: boolean;
    language: Language;
    category: string;
}
export interface VocabularyWord {
    status: VocabularyStatus;
    word: string;
    language: Language;
    translation: string;
}
export interface Progress {
    totalLessonsCompleted: bigint;
    dailyStreak: bigint;
}
export interface Profile {
    username: string;
    selectedLanguage: Language;
    learningGoal: string;
}
export interface TutorSettings {
    personalityStyle: string;
    tutorName: string;
}
export enum Language {
    hindi = "hindi",
    portuguese = "portuguese",
    japanese = "japanese",
    italian = "italian",
    punjabi = "punjabi",
    spanish = "spanish",
    german = "german",
    arabic = "arabic",
    french = "french",
    mandarin = "mandarin"
}
export enum VocabularyStatus {
    new_ = "new",
    learning = "learning",
    known = "known"
}
export interface backendInterface {
    addVocabulary(words: Array<VocabularyWord>): Promise<void>;
    completeLesson(lessonId: string, language: Language, category: string): Promise<void>;
    getLessons(): Promise<Array<Lesson>>;
    getProfile(): Promise<Profile | null>;
    getProgress(): Promise<Progress | null>;
    getTutorSettings(): Promise<TutorSettings | null>;
    getVocabulary(user: Principal): Promise<Array<VocabularyWord>>;
    saveProfile(username: string, language: Language, goal: string): Promise<void>;
    saveTutorSettings(name: string, style: string): Promise<void>;
    updateVocabularyStatus(word: string, newStatus: VocabularyStatus): Promise<void>;
}
