import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "QR Code Generator",
  description:
    "Generate QR codes from text or URLs instantly. Customize size, colors, and error correction level. Download as PNG. Free online QR code generator that runs entirely in your browser.",
  whatIs:
    "A QR (Quick Response) code is a two-dimensional barcode that stores data in a grid of black and white squares called modules. Originally invented in 1994 by Denso Wave for tracking automotive parts, QR codes are now widely used for sharing URLs, contact information, Wi-Fi credentials, and more. This tool generates standard QR codes using byte-mode encoding with configurable error correction levels (L, M, Q, H), allowing 7% to 30% of the code to be damaged while remaining readable.",
  howToUse:
    "Enter any text or URL in the input field and a QR code is generated instantly. Adjust the size using the slider (100-500px). Pick custom foreground and background colors using the color pickers. Select an error correction level based on your needs — higher levels make the code more resilient but also larger. Click Download PNG to save the image, or Copy to Clipboard to paste it elsewhere.",
  howItWorks:
    "The QR code is generated entirely in your browser using a pure JavaScript implementation. Your text is encoded in byte mode, error correction codewords are computed using Reed-Solomon coding, and the resulting data is arranged into a matrix following the QR code specification. The matrix is then rendered to an HTML canvas element. No data is sent to any server.",
  useCases: [
    "Sharing website URLs on printed materials like flyers and business cards",
    "Encoding Wi-Fi network credentials for easy guest access",
    "Creating scannable links for product packaging and labels",
    "Generating payment QR codes for point-of-sale terminals",
    "Embedding contact information (vCard) for quick sharing",
    "Adding scannable links to presentations and documents",
  ],
  faq: [
    {
      q: "What is the maximum amount of data a QR code can store?",
      a: "A standard QR code can store up to 2,953 bytes of binary data, 4,296 alphanumeric characters, or 7,089 numeric digits at the highest version (Version 40). This tool supports versions 1 through 10, which can encode up to several hundred characters — more than enough for URLs and short text.",
    },
    {
      q: "What do the error correction levels mean?",
      a: "Error correction allows a QR code to be read even if part of it is damaged. Level L recovers up to 7% damage, M up to 15%, Q up to 25%, and H up to 30%. Higher levels make the QR code more resilient but require more modules, resulting in a denser code.",
    },
    {
      q: "Does this tool send my data to a server?",
      a: "No. The QR code is generated entirely in your browser using JavaScript. Your text never leaves your device.",
    },
    {
      q: "Can I customize the colors of the QR code?",
      a: "Yes. You can pick any foreground and background color using the color pickers. Make sure there is sufficient contrast between the two colors — scanners need a clear difference to read the code reliably.",
    },
    {
      q: "What image format is the download?",
      a: "The QR code is downloaded as a PNG image at the size you selected. PNG is lossless, so the sharp edges of the QR modules are preserved perfectly.",
    },
  ],
};
