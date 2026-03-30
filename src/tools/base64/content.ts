import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Base64 Encoder / Decoder",
  description:
    "Encode text, files, and images to Base64 or decode Base64 strings back to their original content. Fast, free, and runs entirely in your browser.",
  whatIs:
    "Base64 is a binary-to-text encoding scheme that converts binary data into a printable ASCII string using 64 characters (A-Z, a-z, 0-9, +, /). It is widely used in web development, email protocols (MIME), data URIs, and API communication to safely transmit binary data through text-only channels. This tool lets you encode any UTF-8 text or file into Base64, and decode Base64 strings back to readable text or downloadable files.",
  howToUse:
    "Choose a tab — Text, File, or Image. In Text mode, paste your input and click Encode or Decode. In File mode, drag-and-drop or browse for a file to get its Base64 representation. In Image mode, upload an image to see a live preview alongside the generated data URI.",
  howItWorks:
    "The encoder converts your input text to UTF-8 bytes using the TextEncoder API, then maps every 3 bytes to 4 Base64 characters via the btoa() function. The decoder reverses the process with atob() and TextDecoder. File and image encoding use the FileReader API to produce data URIs that embed the full file content.",
  useCases: [
    "Embedding images directly in HTML or CSS via data URIs",
    "Encoding binary attachments for JSON or XML APIs",
    "Transferring files through text-only protocols like email (MIME)",
    "Storing small assets inline to reduce HTTP requests",
    "Encoding authentication credentials for HTTP Basic Auth headers",
  ],
  faq: [
    {
      q: "Is Base64 encoding the same as encryption?",
      a: "No. Base64 is an encoding scheme, not encryption. It makes data readable as ASCII text but provides zero security — anyone can decode it instantly. Never use Base64 to protect sensitive data.",
    },
    {
      q: "Why does Base64 output become about 33% larger than the original?",
      a: "Base64 represents every 3 bytes of input as 4 ASCII characters. This 4/3 ratio means the output is always roughly 33% larger, plus optional padding characters (=) at the end.",
    },
    {
      q: "Does this tool send my data to a server?",
      a: "No. All encoding and decoding happens entirely in your browser using the Web Crypto and TextEncoder APIs. Your data never leaves your device.",
    },
    {
      q: "Can I encode files other than images?",
      a: "Yes. The File tab accepts any file type — PDFs, ZIPs, documents, audio, and more. The resulting Base64 string can be used wherever you need a text representation of the file.",
    },
    {
      q: "What is a data URI and when should I use one?",
      a: "A data URI embeds file content directly in a URL using the format data:[mime];base64,[encoded data]. It's useful for small images, fonts, or icons to avoid extra HTTP requests, but not recommended for large files because it increases HTML/CSS size.",
    },
  ],
};
