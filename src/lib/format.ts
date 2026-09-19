import type { CourseLevel, LessonType } from "@/lib/catalog";

export function formatPrice(cents: number, currency = "PKR") {
  if (cents === 0) return "Free";
  const amount = cents / 100;
  const digits = Number.isInteger(amount) ? 0 : 2;
  return `${currency} ${amount.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

/** "1h 2m", "19m" — the same notation the platform already uses. */
export function formatDuration(seconds: number) {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  if (h === 0) return `${Math.max(m, 1)}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** ISO-8601 duration for structured data, e.g. PT1H2M. */
export function isoDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return `PT${h ? `${h}H` : ""}${m || !h ? `${m}M` : ""}`;
}

export const levelLabel: Record<CourseLevel, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  ALL_LEVELS: "All levels",
};

export function lessonTypeLabel(type: LessonType) {
  switch (type) {
    case "VIDEO":
    case "EXTERNAL_VIDEO":
      return "Video";
    case "QUIZ":
      return "Quiz";
    case "FLASHCARDS":
      return "Flashcards";
    case "ASSIGNMENT":
      return "Assignment";
    default:
      return "Lesson";
  }
}

export function plural(count: number, word: string, pluralWord = `${word}s`) {
  return `${count.toLocaleString("en-US")} ${count === 1 ? word : pluralWord}`;
}

const MINOR_WORDS = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "with"]);
const ACRONYMS = new Set(["CAT", "IPR", "TMD", "II", "III", "IV", "CBCT", "CSSD", "PPE"]);

/**
 * Some course titles were entered in capitals. They are shown in title case so
 * they sit in the typography like every other title; the words are unchanged.
 */
export function displayTitle(title: string) {
  if (/[a-z]/.test(title)) return title;
  return title
    .toLowerCase()
    .split(/(\s+|[(),&/-])/)
    .map((part, i) => {
      const upper = part.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      if (!/[a-z]/.test(part)) return part;
      if (i > 0 && MINOR_WORDS.has(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}

/** "[text](/href)" → "text", for places that need plain text (meta, JSON-LD). */
export function stripLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
}
