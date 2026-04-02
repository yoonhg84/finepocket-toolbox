import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Random Decision Maker",
  description:
    "Make random decisions with a spinning wheel, coin flip, or dice roll. Free online random picker tool with fun animations — no sign-up required.",
  whatIs:
    "The Random Decision Maker is a versatile tool that helps you make unbiased random choices. It includes three modes: a colorful spinning wheel where you add your own options, a coin flip simulator for binary yes/no decisions, and a dice roller supporting multiple dice types (d4, d6, d8, d10, d12, d20). All randomness is powered by the cryptographically secure crypto.getRandomValues API for truly unbiased results.",
  howToUse:
    "Choose a mode using the tabs at the top. In Wheel Spinner mode, add your options one by one or paste multiple items separated by new lines, then click Spin to watch the wheel animate and land on a random choice. In Coin Flip mode, simply click the flip button to see a realistic 3D coin animation with heads or tails result. In Dice Roll mode, select the number of dice (1–6) and the dice type (d4 through d20), then click Roll to see each die result and the total.",
  howItWorks:
    "All random values are generated using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. The wheel uses CSS conic-gradient for segments and CSS transforms for smooth rotation animation. The coin uses CSS 3D transforms for a realistic flip effect. Dice use CSS animations for a shake/bounce roll effect. Everything runs client-side — no data is sent to any server.",
  useCases: [
    "Deciding where to eat or what movie to watch",
    "Randomly selecting a team member for a task or presentation",
    "Board game and tabletop RPG dice rolling",
    "Settling friendly debates with a fair coin flip",
    "Randomly ordering a to-do list or prioritizing tasks",
    "Classroom activities and random student selection",
  ],
  faq: [
    {
      q: "Is the randomness truly fair and unbiased?",
      a: "Yes. The tool uses crypto.getRandomValues, which is a cryptographically secure random number generator built into your browser. This provides much higher quality randomness than Math.random() and is suitable for fair, unbiased selections.",
    },
    {
      q: "Can I use this for tabletop RPGs like D&D?",
      a: "Absolutely! The Dice Roll mode supports d4, d6, d8, d10, d12, and d20 dice — all the standard polyhedral dice used in D&D and other tabletop RPGs. You can roll up to 6 dice at once.",
    },
    {
      q: "Does the spinning wheel remember my items?",
      a: "Items are stored in your browser session. If you refresh the page, the items will be reset. For permanent storage, consider copying your item list and pasting it back when needed.",
    },
    {
      q: "Does this tool send my data to a server?",
      a: "No. All processing happens entirely in your browser. Your wheel items, flip results, and dice rolls never leave your device.",
    },
    {
      q: "How many items can I add to the wheel?",
      a: "The wheel works best with 2 to 20 items. You can add more, but the segments become very thin and harder to read. For best results, keep it under 20 options.",
    },
  ],
};
