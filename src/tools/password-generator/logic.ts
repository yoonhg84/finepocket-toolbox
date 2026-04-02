// Character sets
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const AMBIGUOUS = "0OoIl1";

// ~200 common English words for passphrases (4-8 letters, easy to type)
const WORD_LIST = [
  "able", "acid", "aged", "also", "area", "army", "away", "baby", "back", "ball",
  "band", "bank", "base", "bath", "bear", "beat", "been", "beer", "bell", "belt",
  "best", "bird", "bite", "blow", "blue", "boat", "body", "bomb", "bond", "bone",
  "book", "born", "boss", "both", "burn", "bush", "busy", "call", "calm", "came",
  "camp", "card", "care", "case", "cash", "cast", "cell", "chat", "chip", "city",
  "club", "coal", "code", "cold", "come", "cook", "cool", "cope", "copy", "core",
  "cost", "crew", "crop", "dark", "data", "date", "dawn", "dead", "deal", "dear",
  "deep", "deny", "desk", "diet", "dirt", "disk", "dock", "does", "done", "door",
  "dose", "down", "draw", "drew", "drop", "drug", "drum", "dual", "duke", "dust",
  "duty", "each", "earn", "ease", "east", "easy", "edge", "else", "even", "ever",
  "evil", "exam", "exit", "face", "fact", "fail", "fair", "fall", "fame", "farm",
  "fast", "fate", "fear", "feed", "feel", "feet", "fell", "file", "fill", "film",
  "find", "fine", "fire", "firm", "fish", "five", "flag", "flat", "flew", "flow",
  "folk", "food", "foot", "ford", "form", "fort", "four", "free", "from", "fuel",
  "full", "fund", "gain", "game", "gang", "gate", "gave", "gear", "gene", "gift",
  "girl", "give", "glad", "goal", "goes", "gold", "golf", "gone", "good", "grab",
  "gray", "grew", "grey", "grip", "grow", "gulf", "guru", "hair", "half", "hall",
  "hand", "hang", "hard", "harm", "hate", "have", "head", "hear", "heat", "held",
  "help", "here", "hero", "high", "hill", "hint", "hire", "hold", "hole", "home",
  "hope", "host", "hour", "huge", "hung", "hunt", "hurt", "idea", "inch", "into",
];

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export interface PassphraseOptions {
  wordCount: number;
  separator: string;
  capitalize: boolean;
}

export type StrengthLevel = "weak" | "fair" | "good" | "strong";

export interface StrengthResult {
  level: StrengthLevel;
  score: number; // 0–100
  label: string;
}

function getSecureRandom(max: number): number {
  const array = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  do {
    crypto.getRandomValues(array);
  } while (array[0] >= limit);
  return array[0] % max;
}

export function generatePassword(options: PasswordOptions): string {
  let pool = "";
  if (options.uppercase) pool += UPPERCASE;
  if (options.lowercase) pool += LOWERCASE;
  if (options.numbers) pool += NUMBERS;
  if (options.symbols) pool += SYMBOLS;

  if (!pool) pool = LOWERCASE; // fallback

  if (options.excludeAmbiguous) {
    pool = pool
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += pool[getSecureRandom(pool.length)];
  }
  return password;
}

export function generatePassphrase(options: PassphraseOptions): string {
  const words: string[] = [];
  for (let i = 0; i < options.wordCount; i++) {
    let word = WORD_LIST[getSecureRandom(WORD_LIST.length)];
    if (options.capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    words.push(word);
  }
  return words.join(options.separator);
}

export function calculateStrength(password: string): StrengthResult {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  // Entropy = length * log2(poolSize)
  const entropy = poolSize > 0 ? password.length * Math.log2(poolSize) : 0;

  // Map entropy to score 0–100
  // <28 bits = weak, 28–35 = fair, 36–59 = good, 60+ = strong
  let score: number;
  let level: StrengthLevel;
  let label: string;

  if (entropy < 28) {
    score = Math.round((entropy / 28) * 25);
    level = "weak";
    label = "Weak";
  } else if (entropy < 36) {
    score = 25 + Math.round(((entropy - 28) / 8) * 25);
    level = "fair";
    label = "Fair";
  } else if (entropy < 60) {
    score = 50 + Math.round(((entropy - 36) / 24) * 25);
    level = "good";
    label = "Good";
  } else {
    score = Math.min(100, 75 + Math.round(((entropy - 60) / 40) * 25));
    level = "strong";
    label = "Strong";
  }

  return { level, score, label };
}
