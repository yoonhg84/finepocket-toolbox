import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Hash Generator",
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text or files instantly. Free online hash generator that runs entirely in your browser.",
  whatIs:
    "A cryptographic hash function takes an input (text, file, or any data) and produces a fixed-length string of characters called a digest or hash value. Hash functions are one-way — you cannot reverse a hash back to the original input. This tool supports five widely used algorithms: MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), SHA-384 (384-bit), and SHA-512 (512-bit). Each algorithm produces a unique fingerprint for the same input, making hashes essential for data integrity verification, password storage, and digital signatures.",
  howToUse:
    "Type or paste text into the input area and all five hash values are computed automatically. You can also upload a file using the file drop zone to hash its binary content. Toggle between uppercase and lowercase hex output. Click the copy button next to any hash to copy it to your clipboard.",
  howItWorks:
    "SHA-family hashes are computed using the Web Crypto API (crypto.subtle.digest), which runs natively in your browser with hardware acceleration where available. MD5 is computed using a pure JavaScript implementation since Web Crypto does not support MD5. All processing happens client-side — your data never leaves your device.",
  useCases: [
    "Verifying file integrity after downloads by comparing checksums",
    "Generating content-addressable storage keys for deduplication",
    "Creating unique identifiers for cache busting and ETags",
    "Comparing passwords or tokens without storing plaintext",
    "Validating data integrity in API communication",
    "Digital forensics and evidence integrity verification",
  ],
  faq: [
    {
      q: "Which hash algorithm should I use?",
      a: "For security-sensitive use cases (passwords, signatures), use SHA-256 or SHA-512. MD5 and SHA-1 are considered cryptographically broken and should only be used for non-security purposes like checksums or cache keys.",
    },
    {
      q: "Is MD5 still safe to use?",
      a: "MD5 is not safe for security purposes because collision attacks are practical — two different inputs can produce the same hash. However, MD5 is still fine for non-security uses like checksums, cache keys, or data deduplication where intentional collision is not a concern.",
    },
    {
      q: "Can I reverse a hash back to the original text?",
      a: "No. Cryptographic hash functions are designed to be one-way. You cannot mathematically reverse a hash to recover the original input. Attackers use brute-force or rainbow tables to guess common inputs, which is why strong, salted hashing is important for passwords.",
    },
    {
      q: "Does this tool send my data to a server?",
      a: "No. All hash computations happen entirely in your browser using the Web Crypto API and JavaScript. Your text and files never leave your device.",
    },
    {
      q: "Why do different algorithms produce different length outputs?",
      a: "Each algorithm has a fixed output size: MD5 produces 128 bits (32 hex chars), SHA-1 produces 160 bits (40 hex chars), SHA-256 produces 256 bits (64 hex chars), SHA-384 produces 384 bits (96 hex chars), and SHA-512 produces 512 bits (128 hex chars). Longer outputs provide more collision resistance.",
    },
  ],
};
