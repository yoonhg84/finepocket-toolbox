import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Password Generator",
  description:
    "Generate strong, random passwords and memorable passphrases instantly. Customize length, character sets, and strength. Free online password generator that runs entirely in your browser.",
  whatIs:
    "A password generator creates cryptographically random passwords using your browser's built-in random number generator (crypto.getRandomValues). Strong passwords are essential for protecting online accounts from brute-force attacks, credential stuffing, and dictionary attacks. This tool supports both traditional random character passwords and memorable word-based passphrases, giving you flexibility between maximum entropy and ease of memorization.",
  howToUse:
    "Adjust the password length using the slider (8-128 characters) and toggle character sets on or off: uppercase letters, lowercase letters, numbers, and symbols. Enable 'Exclude ambiguous characters' to avoid visually similar characters like 0/O and l/1/I. Click 'Generate' or change any option to instantly create new passwords. Switch to passphrase mode to generate memorable word-based passwords with configurable separators. Use the copy button to copy any generated password to your clipboard.",
  howItWorks:
    "Passwords are generated using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random values. Characters are selected uniformly from the enabled character pool to ensure maximum entropy. Passphrase words are drawn from a curated list of common English words. All generation happens client-side — your passwords never leave your device.",
  useCases: [
    "Creating strong, unique passwords for online accounts",
    "Generating API keys and secret tokens for development",
    "Creating memorable passphrases for master passwords",
    "Generating random strings for database seeds and test data",
    "Producing secure passwords that meet specific complexity requirements",
    "Bulk generating multiple passwords for team onboarding",
  ],
  faq: [
    {
      q: "Are the generated passwords truly random?",
      a: "Yes. This tool uses crypto.getRandomValues(), a cryptographically secure pseudorandom number generator built into your browser. It provides the same quality of randomness used in TLS encryption and other security protocols.",
    },
    {
      q: "Does this tool send my passwords to a server?",
      a: "No. All password generation happens entirely in your browser using the Web Crypto API. Your passwords never leave your device and are not stored anywhere.",
    },
    {
      q: "How long should my password be?",
      a: "For most online accounts, 16 characters with mixed character types provides excellent security. For master passwords or high-security applications, use 20+ characters or a 5+ word passphrase. Longer passwords exponentially increase the time required for brute-force attacks.",
    },
    {
      q: "Is a passphrase better than a random password?",
      a: "Both can be equally secure depending on length. A 5-word passphrase has roughly the same entropy as a 20-character random password. Passphrases are easier to memorize but longer to type. Use random passwords with a password manager and passphrases for things you need to remember.",
    },
    {
      q: "Why exclude ambiguous characters?",
      a: "Characters like 0 (zero) and O (capital O), or l (lowercase L) and 1 (one), look nearly identical in many fonts. Excluding them prevents confusion when reading or manually entering passwords, especially useful for shared credentials or printed passwords.",
    },
  ],
};
