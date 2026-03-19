import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Language = {
    #spanish;
    #french;
    #german;
    #japanese;
    #mandarin;
    #italian;
    #portuguese;
    #arabic;
    #hindi;
    #punjabi;
  };

  type Profile = {
    username : Text;
    selectedLanguage : Language;
    learningGoal : Text;
  };

  type TutorSettings = {
    tutorName : Text;
    personalityStyle : Text;
  };

  type VocabularyStatus = {
    #known;
    #learning;
    #new;
  };

  type VocabularyWord = {
    word : Text;
    translation : Text;
    language : Language;
    status : VocabularyStatus;
  };

  type Lesson = {
    lessonId : Text;
    language : Language;
    category : Text;
    completed : Bool;
  };

  type Progress = {
    dailyStreak : Nat;
    totalLessonsCompleted : Nat;
  };

  module VocabularyWord {
    public func compare(a : VocabularyWord, b : VocabularyWord) : Order.Order {
      Text.compare(a.word, b.word);
    };
  };

  let profiles = Map.empty<Principal, Profile>();
  let tutorSettings = Map.empty<Principal, TutorSettings>();
  let vocabulary = Map.empty<Principal, List.List<VocabularyWord>>();
  let lessons = Map.empty<Principal, List.List<Lesson>>();
  let progress = Map.empty<Principal, Progress>();

  public shared ({ caller }) func saveProfile(username : Text, language : Language, goal : Text) : async () {
    profiles.add(caller, {
      username;
      selectedLanguage = language;
      learningGoal = goal;
    });
  };

  public query ({ caller }) func getProfile() : async ?Profile {
    profiles.get(caller);
  };

  public shared ({ caller }) func saveTutorSettings(name : Text, style : Text) : async () {
    tutorSettings.add(caller, {
      tutorName = name;
      personalityStyle = style;
    });
  };

  public query ({ caller }) func getTutorSettings() : async ?TutorSettings {
    tutorSettings.get(caller);
  };

  public shared ({ caller }) func addVocabulary(words : [VocabularyWord]) : async () {
    let currentWords = switch (vocabulary.get(caller)) {
      case (null) { List.empty<VocabularyWord>() };
      case (?existing) { existing };
    };
    currentWords.addAll(words.values());
    vocabulary.add(caller, currentWords);
  };

  public query func getVocabulary(user : Principal) : async [VocabularyWord] {
    switch (vocabulary.get(user)) {
      case (null) { [] };
      case (?words) { words.toArray().sort() };
    };
  };

  public shared ({ caller }) func updateVocabularyStatus(word : Text, newStatus : VocabularyStatus) : async () {
    switch (vocabulary.get(caller)) {
      case (null) { Runtime.trap("No words found for user") };
      case (?words) {
        let updatedWords = words.map<VocabularyWord, VocabularyWord>(
          func(w) {
            if (w.word == word) {
              {
                w with status = newStatus;
              };
            } else {
              w;
            };
          }
        );
        vocabulary.add(caller, updatedWords);
      };
    };
  };

  public shared ({ caller }) func completeLesson(lessonId : Text, language : Language, category : Text) : async () {
    let currentLessons = switch (lessons.get(caller)) {
      case (null) { List.empty<Lesson>() };
      case (?existing) { existing };
    };
    currentLessons.add({
      lessonId;
      language;
      category;
      completed = true;
    });
    lessons.add(caller, currentLessons);

    switch (progress.get(caller)) {
      case (null) {
        progress.add(caller, {
          dailyStreak = 1;
          totalLessonsCompleted = 1;
        });
      };
      case (?currentProgress) {
        progress.add(caller, {
          dailyStreak = currentProgress.dailyStreak + 1;
          totalLessonsCompleted = currentProgress.totalLessonsCompleted + 1;
        });
      };
    };
  };

  public query ({ caller }) func getLessons() : async [Lesson] {
    switch (lessons.get(caller)) {
      case (null) { [] };
      case (?lessonsList) { lessonsList.toArray() };
    };
  };

  public query ({ caller }) func getProgress() : async ?Progress {
    progress.get(caller);
  };
};
