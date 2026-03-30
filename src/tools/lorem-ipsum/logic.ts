/**
 * Pure logic functions for Lorem Ipsum Generator tool.
 * No UI dependencies — all functions are deterministic and side-effect free.
 */

export const WORD_POOL: string[] = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "ac", "accumsan",
  "aliquet", "ante", "aptent", "arcu", "at", "auctor", "augue", "bibendum",
  "blandit", "class", "commodo", "condimentum", "congue", "consequat",
  "conubia", "convallis", "cras", "cubilia", "cum", "curabitur", "cursus",
  "dapibus", "diam", "dictum", "dictumst", "dignissim", "dis", "donec",
  "dui", "efficitur", "egestas", "eget", "eleifend", "elementum",
  "eros", "etiam", "eu", "euismod", "facilisi", "facilisis",
  "fames", "faucibus", "felis", "fermentum", "feugiat", "finibus",
  "fringilla", "fusce", "gravida", "habitant", "habitasse", "hac",
  "hendrerit", "himenaeos", "iaculis", "imperdiet", "integer",
  "interdum", "justo", "lacinia", "lacus", "laoreet", "lectus",
  "leo", "libero", "ligula", "litora", "lobortis", "luctus",
  "maecenas", "malesuada", "massa", "mattis", "mauris", "maximus",
  "metus", "mi", "molestie", "morbi", "nam", "nec", "neque",
  "nibh", "nisl", "nullam", "nunc", "odio", "orci", "ornare",
  "pellentesque", "pharetra", "phasellus", "placerat", "platea",
  "porta", "porttitor", "posuere", "potenti", "praesent", "pretium",
  "primis", "proin", "pulvinar", "purus", "quam", "quisque",
  "rhoncus", "ridiculus", "risus", "rutrum", "sagittis", "sapien",
  "scelerisque", "semper", "senectus", "sociosqu", "sodales",
  "sollicitudin", "suscipit", "suspendisse", "taciti", "tellus",
  "tempus", "tincidunt", "torquent", "tortor", "tristique",
  "turpis", "ultrices", "ultricies", "urna", "varius",
  "vehicula", "vel", "venenatis", "vestibulum", "vitae",
  "vivamus", "viverra", "volutpat", "vulputate",
];

const LOREM_START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWord(): string {
  return WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Generate a specified number of random words.
 */
export function generateWords(count: number, startWithLorem: boolean): string {
  if (count <= 0) return "";

  if (startWithLorem) {
    const loremWords = LOREM_START.replace(",", "").split(" ");
    if (count <= loremWords.length) {
      return loremWords.slice(0, count).join(" ");
    }
    const remaining = Array.from({ length: count - loremWords.length }, () =>
      randomWord()
    );
    return [...loremWords, ...remaining].join(" ");
  }

  return Array.from({ length: count }, () => randomWord()).join(" ");
}

/**
 * Generate a single random sentence (5-15 words).
 */
function generateSentence(): string {
  const wordCount = randomInt(5, 15);
  const words = Array.from({ length: wordCount }, () => randomWord());
  words[0] = capitalize(words[0]);

  // Optionally insert a comma
  if (wordCount > 6 && Math.random() > 0.5) {
    const commaPos = randomInt(2, wordCount - 3);
    words[commaPos] = words[commaPos] + ",";
  }

  return words.join(" ") + ".";
}

/**
 * Generate a specified number of sentences.
 */
export function generateSentences(
  count: number,
  startWithLorem: boolean
): string {
  if (count <= 0) return "";

  const sentences: string[] = [];

  if (startWithLorem) {
    sentences.push(LOREM_START + ".");
    for (let i = 1; i < count; i++) {
      sentences.push(generateSentence());
    }
  } else {
    for (let i = 0; i < count; i++) {
      sentences.push(generateSentence());
    }
  }

  return sentences.join(" ");
}

/**
 * Generate a single random paragraph (3-7 sentences).
 */
function generateParagraph(): string {
  const sentenceCount = randomInt(3, 7);
  const sentences = Array.from({ length: sentenceCount }, () =>
    generateSentence()
  );
  return sentences.join(" ");
}

/**
 * Generate a specified number of paragraphs.
 */
export function generateParagraphs(
  count: number,
  startWithLorem: boolean,
  wrapHtml: boolean
): string {
  if (count <= 0) return "";

  const paragraphs: string[] = [];

  if (startWithLorem) {
    const firstSentences = [LOREM_START + "."];
    const extraCount = randomInt(2, 6);
    for (let i = 0; i < extraCount; i++) {
      firstSentences.push(generateSentence());
    }
    paragraphs.push(firstSentences.join(" "));

    for (let i = 1; i < count; i++) {
      paragraphs.push(generateParagraph());
    }
  } else {
    for (let i = 0; i < count; i++) {
      paragraphs.push(generateParagraph());
    }
  }

  if (wrapHtml) {
    return paragraphs.map((p) => `<p>${p}</p>`).join("\n\n");
  }

  return paragraphs.join("\n\n");
}
