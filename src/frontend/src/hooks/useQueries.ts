import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Language, VocabularyStatus } from "../backend";
import type { VocabularyWord } from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProgress() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTutorSettings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["tutorSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTutorSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLessons() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLessons();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVocabulary() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["vocabulary"],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getVocabulary(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      language,
      goal,
    }: {
      username: string;
      language: Language;
      goal: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.saveProfile(username, language, goal);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useSaveTutorSettings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, style }: { name: string; style: string }) => {
      if (!actor) throw new Error("No actor");
      await actor.saveTutorSettings(name, style);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tutorSettings"] }),
  });
}

export function useCompleteLesson() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      lessonId,
      language,
      category,
    }: {
      lessonId: string;
      language: Language;
      category: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.completeLesson(lessonId, language, category);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["lessons", "progress"] }),
  });
}

export function useUpdateVocabularyStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      word,
      status,
    }: {
      word: string;
      status: VocabularyStatus;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.updateVocabularyStatus(word, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vocabulary"] }),
  });
}

export function useAddVocabulary() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (words: VocabularyWord[]) => {
      if (!actor) throw new Error("No actor");
      await actor.addVocabulary(words);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vocabulary"] }),
  });
}

export { Language, VocabularyStatus };
