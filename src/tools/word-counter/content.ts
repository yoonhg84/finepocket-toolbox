import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Word & Character Counter",
  description:
    "Count words, characters, sentences, and paragraphs instantly. Get reading time estimates, keyword density analysis, and readability scores — all free and in your browser.",
  whatIs:
    "A Word & Character Counter is an essential writing tool that provides detailed statistics about your text in real time. It counts words, characters (with and without spaces), sentences, and paragraphs, while also estimating how long it takes to read or speak the content aloud. Beyond basic counting, it performs keyword density analysis to show which terms appear most frequently, and calculates a Flesch Reading Ease score to gauge how accessible your writing is to your audience. Whether you are writing a blog post, an academic essay, social media copy, or a product description, this tool gives you the metrics you need to write with confidence.",
  howToUse:
    "Paste or type your text into the large text area above. All statistics update instantly as you type — no need to press a button. The stats grid shows character count, word count, sentence count, paragraph count, and estimated reading and speaking times. Scroll down to see the top 10 keywords ranked by frequency and a Flesch Reading Ease score with a plain-English label describing the difficulty level.",
  howItWorks:
    "The tool splits your input on whitespace boundaries to count words, detects sentence-ending punctuation (.!?) for sentence counts, and identifies paragraph breaks by double newlines. Reading time is estimated at 200 words per minute (average silent reading speed) and speaking time at 130 words per minute. Keyword density filters out common English stop words and ranks the remaining terms by frequency. The Flesch Reading Ease formula (206.835 − 1.015 × ASL − 84.6 × ASW) measures readability based on average sentence length and average syllables per word.",
  useCases: [
    "Check word count limits for essays, articles, or assignments before submission",
    "Analyze keyword density for SEO content optimization",
    "Estimate presentation or speech duration with speaking time",
    "Evaluate readability for target audiences such as students, professionals, or general readers",
    "Monitor character limits for social media posts, meta descriptions, and ad copy",
    "Compare paragraph and sentence structure across multiple drafts",
  ],
  faq: [
    {
      q: "How are words counted?",
      a: "Words are counted by splitting the text on whitespace characters (spaces, tabs, newlines). Consecutive whitespace is treated as a single separator, and empty strings are filtered out. This matches how most word processors count words.",
    },
    {
      q: "What is the Flesch Reading Ease score?",
      a: "The Flesch Reading Ease score is a readability metric that rates text on a 0–100 scale. Higher scores mean the text is easier to read. A score of 60–70 is considered standard (suitable for most adults), while scores above 80 indicate very easy text and scores below 30 indicate very difficult academic or technical prose.",
    },
    {
      q: "How is reading time calculated?",
      a: "Reading time is calculated by dividing the total word count by 200 words per minute, which is the average silent reading speed for English text. The result is rounded up to the nearest minute, with a minimum of 1 minute for any non-empty text.",
    },
    {
      q: "What are stop words and why are they excluded from keyword density?",
      a: "Stop words are extremely common words like 'the', 'and', 'is', and 'for' that carry little semantic meaning. They are excluded from keyword density analysis because they would otherwise dominate the results and obscure the meaningful keywords in your content.",
    },
    {
      q: "Does this tool support languages other than English?",
      a: "Basic word, character, sentence, and paragraph counting works for any language that uses whitespace between words. However, the keyword density stop-word filter and Flesch Reading Ease formula are designed for English text and may not produce accurate results for other languages.",
    },
    {
      q: "Is my text sent to a server?",
      a: "No. All processing happens entirely in your browser using JavaScript. Your text never leaves your device and is not stored, logged, or transmitted anywhere. The tool works fully offline once the page is loaded.",
    },
  ],
};
