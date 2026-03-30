export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMin: number;
  speakingTimeMin: number;
}

const READING_WPM = 200;
const SPEAKING_WPM = 130;

export function analyzeText(text: string): TextStats {
  if (!text || text.trim().length === 0) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMin: 0,
      speakingTimeMin: 0,
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;

  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length || (text.trim().length > 0 ? 1 : 0);

  const readingTimeMin = Math.max(Math.ceil(words / READING_WPM), words > 0 ? 1 : 0);
  const speakingTimeMin = Math.max(Math.ceil(words / SPEAKING_WPM), words > 0 ? 1 : 0);

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTimeMin,
    speakingTimeMin,
  };
}

export function getKeywordDensity(
  text: string,
  top: number = 10
): Array<{ word: string; count: number; percentage: number }> {
  if (!text || text.trim().length === 0) return [];

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const stopWords = new Set([
    "the", "and", "for", "are", "but", "not", "you", "all", "can",
    "has", "her", "was", "one", "our", "out", "his", "its", "had",
    "she", "how", "him", "has", "who", "did", "get", "let", "say",
    "too", "use", "way", "may", "own", "try", "any", "also", "into",
    "than", "them", "then", "that", "this", "with", "will", "each",
    "from", "they", "been", "have", "many", "some", "when", "very",
    "what", "about", "which", "their", "would", "there", "these",
    "other", "could", "after", "those", "where", "should", "being",
  ]);

  const totalWords = words.length;
  const counts = new Map<string, number>();

  for (const word of words) {
    if (stopWords.has(word)) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([word, count]) => ({
      word,
      count,
      percentage: totalWords > 0 ? Math.round((count / totalWords) * 10000) / 100 : 0,
    }));
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;

  let count = 0;
  const vowels = "aeiouy";
  let prevIsVowel = false;

  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevIsVowel) count++;
    prevIsVowel = isVowel;
  }

  if (w.endsWith("e") && count > 1) count--;
  if (w.endsWith("le") && w.length > 3 && !vowels.includes(w[w.length - 3])) count++;

  return Math.max(count, 1);
}

export function fleschReadingEase(text: string): { score: number; label: string } {
  if (!text || text.trim().length === 0) {
    return { score: 0, label: "N/A" };
  }

  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = words.length;

  if (wordCount === 0) return { score: 0, label: "N/A" };

  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length || 1;

  const totalSyllables = words.reduce(
    (sum, word) => sum + countSyllables(word),
    0
  );

  const score = Math.round(
    206.835 - 1.015 * (wordCount / sentences) - 84.6 * (totalSyllables / wordCount)
  );

  const clampedScore = Math.max(0, Math.min(100, score));

  let label: string;
  if (clampedScore >= 90) label = "Very Easy";
  else if (clampedScore >= 80) label = "Easy";
  else if (clampedScore >= 70) label = "Fairly Easy";
  else if (clampedScore >= 60) label = "Standard";
  else if (clampedScore >= 50) label = "Fairly Difficult";
  else if (clampedScore >= 30) label = "Difficult";
  else label = "Very Difficult";

  return { score: clampedScore, label };
}
