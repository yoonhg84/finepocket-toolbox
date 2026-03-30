import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Color Picker & Converter",

  description:
    "Pick colors visually and convert between HEX, RGB, HSL, HSB, and CMYK formats. Free online color tool with contrast checker and palette generator.",

  whatIs:
    "A color picker and converter is an essential tool for designers, developers, and anyone working with digital color. This free online Color Picker & Converter lets you select any color using a native color wheel or by entering values in HEX, RGB, or HSL format — all inputs stay in perfect sync. It instantly displays the equivalent values in every major color format: HEX, RGB, HSL, HSB (also known as HSV), and CMYK. It also includes an opacity slider for generating RGBA and HSLA values, a WCAG contrast ratio checker for verifying text accessibility, and a palette generator for creating complementary, analogous, and triadic color schemes. Everything runs entirely in your browser — no data is sent to any server.",

  howToUse:
    "1. Pick a color using the color wheel, or type a value into the HEX, RGB, or HSL input fields — all fields update automatically. 2. Adjust the opacity slider to generate RGBA and HSLA values. 3. Copy any color format to your clipboard using the copy button next to each value. 4. Use the Contrast Checker section to test foreground and background color combinations for WCAG accessibility compliance. 5. Generate harmonious color palettes by clicking the Complementary, Analogous, or Triadic buttons in the Palette section.",

  howItWorks:
    "The tool converts between color models using standard mathematical formulas. HEX is parsed as three pairs of hexadecimal digits representing red, green, and blue channels (0-255). RGB-to-HSL conversion calculates hue from the dominant channel, saturation from the chroma range, and lightness from the midpoint of min and max channel values. HSB (brightness) differs from HSL (lightness) in that brightness equals the maximum channel value. CMYK is derived by computing the key (black) component and subtracting normalized RGB channels. The WCAG contrast ratio is computed using relative luminance (per WCAG 2.1 specification) with a formula that accounts for human perception of different wavelengths. All calculations happen client-side in JavaScript.",

  useCases: [
    "Converting a brand's HEX color to RGB or HSL for use in CSS stylesheets",
    "Checking foreground/background contrast ratios for WCAG accessibility compliance",
    "Generating complementary or triadic color palettes for design projects",
    "Extracting CMYK values from a screen color for print design preparation",
    "Adjusting opacity to create semi-transparent overlay colors (RGBA/HSLA)",
    "Quickly comparing HSL lightness and saturation across multiple colors",
    "Finding the exact HEX code from a native color picker for developer handoff",
  ],

  faq: [
    {
      q: "Is my data safe?",
      a: "Yes, completely. All color conversions happen directly in your web browser using JavaScript. No color values are transmitted to any server, stored, or logged.",
    },
    {
      q: "What is the difference between HSL and HSB (HSV)?",
      a: "HSL (Hue, Saturation, Lightness) and HSB/HSV (Hue, Saturation, Brightness/Value) are both cylindrical representations of color, but they differ in how they measure the 'light' component. In HSL, 100% lightness is always white. In HSB, 100% brightness is the purest form of the hue — you need to also reduce saturation to reach white. HSL is more commonly used in CSS, while HSB is popular in design tools like Photoshop and Figma.",
    },
    {
      q: "What do the WCAG contrast levels (AAA, AA, Fail) mean?",
      a: "WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios for text readability. AA requires at least 4.5:1 for normal text and 3:1 for large text. AAA requires at least 7:1 for normal text and 4.5:1 for large text. 'Fail' means the contrast is below AA level and the color combination should not be used for text.",
    },
    {
      q: "Why does my CMYK value look different from what I see in Photoshop?",
      a: "CMYK conversion from RGB is device-dependent and ideally requires an ICC color profile for accurate results. This tool uses a standard mathematical conversion that gives a good approximation, but professional print workflows should use color management software with the appropriate ICC profile for the target printer.",
    },
    {
      q: "What are complementary, analogous, and triadic palettes?",
      a: "Complementary colors are opposite each other on the color wheel (180 degrees apart) and create high contrast. Analogous colors are adjacent on the wheel (30 degrees apart) and create harmonious, low-contrast combinations. Triadic colors are evenly spaced (120 degrees apart) and create vibrant, balanced palettes. Each scheme serves different design purposes.",
    },
  ],
};
