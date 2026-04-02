import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Emoji Picker",
  description:
    "Browse, search, and copy emojis instantly. Free online emoji picker with categories, skin tone support, keyword search, and one-click copy to clipboard.",
  whatIs:
    "An emoji picker is an interactive tool that lets you browse the full set of Unicode emojis organized by category, search by keyword, and copy any emoji to your clipboard with a single click. Unlike the built-in OS emoji keyboards that can be hard to find or navigate, this web-based picker gives you a large, easy-to-browse grid with search, recently-used tracking, and skin tone modifiers — all without installing anything.",
  howToUse:
    "Browse emojis by clicking the category tabs at the top (Smileys, Gestures, Animals, Food, Travel, Objects, Symbols, Flags). Use the search box to filter emojis by name or keyword. Click any emoji to instantly copy it to your clipboard — a notification will confirm the copy. Your recently used emojis appear at the top for quick access. Use the skin tone selector to choose a preferred skin tone for supported emojis.",
  howItWorks:
    "The emoji data is stored as a curated list of Unicode emoji characters with names and keyword metadata. Searching filters the list in real time by matching against emoji names and keyword arrays. When you click an emoji, the Clipboard API copies it to your system clipboard. Recently used emojis are persisted in your browser's localStorage so they survive page refreshes. All processing runs client-side — nothing is sent to any server.",
  useCases: [
    "Quickly finding and copying emojis for social media posts",
    "Adding emojis to emails, documents, or chat messages",
    "Discovering emojis you didn't know existed via keyword search",
    "Consistent emoji access across all devices and browsers",
    "Designers and writers browsing emoji sets for content ideas",
    "Developers testing emoji rendering in their applications",
  ],
  faq: [
    {
      q: "Do I need to install anything to use this emoji picker?",
      a: "No. This emoji picker runs entirely in your web browser. Just open the page, browse or search, and click to copy.",
    },
    {
      q: "How does the skin tone selector work?",
      a: "Unicode defines five skin tone modifiers (Fitzpatrick scale) that can be applied to human emojis. Select a skin tone from the selector and applicable emojis (hands, faces with skin) will display in that tone. The default yellow tone is the neutral Unicode default.",
    },
    {
      q: "Why do some emojis look different on my device?",
      a: "Emoji appearance is determined by your operating system and browser. Apple, Google, Microsoft, and Samsung each have their own emoji art styles. The underlying Unicode character is the same — only the visual rendering differs.",
    },
    {
      q: "Does this tool track which emojis I use?",
      a: "Your recently used emojis are stored only in your browser's localStorage on your device. No data is sent to any server. Clearing your browser data will reset the recent list.",
    },
    {
      q: "Can I copy multiple emojis at once?",
      a: "Each click copies a single emoji. You can quickly click multiple emojis in sequence — each one is copied individually to your clipboard, ready to paste wherever you need it.",
    },
  ],
};
