import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Lorem Ipsum Generator",

  description:
    "Generate placeholder Lorem Ipsum text in words, sentences, or paragraphs. Free online dummy text generator with HTML wrapping and instant copy.",

  whatIs:
    "Lorem Ipsum is the standard placeholder text used in the printing, typesetting, and web design industries since the 1500s. It is derived from sections of 'De Finibus Bonorum et Malorum' by Cicero, written in 45 BC, with words altered and scrambled to create a meaningless but visually natural-looking block of Latin text. Designers and developers use Lorem Ipsum to fill layouts, mockups, and prototypes with realistic-looking text before final content is available. This free online Lorem Ipsum Generator lets you produce any amount of placeholder text — by word count, sentence count, or paragraph count — with options to start with the classic 'Lorem ipsum dolor sit amet...' opening and to wrap paragraphs in HTML <p> tags for direct use in web projects. Everything runs in your browser with no server interaction.",

  howToUse:
    "1. Choose the unit of text you want: Words, Sentences, or Paragraphs. 2. Enter the quantity (1 to 100). 3. Optionally check 'Start with Lorem ipsum' to begin with the classic opening phrase. 4. For web use, check 'Wrap in HTML <p> tags' (available in paragraph mode) to get ready-to-paste HTML. 5. Click Generate to produce the text. 6. Copy to clipboard or download as a .txt file using the buttons below the output.",

  howItWorks:
    "The generator uses a pool of approximately 200 Latin words commonly found in Lorem Ipsum text. Words are randomly selected and combined into sentences of 5 to 15 words, with occasional commas inserted for natural rhythm. Sentences are grouped into paragraphs of 3 to 7 sentences each. When 'Start with Lorem ipsum' is enabled, the output always begins with the traditional 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' opening. The HTML wrapping option simply encloses each paragraph in <p> tags separated by blank lines. All generation happens client-side using JavaScript's built-in random number generator.",

  useCases: [
    "Filling web page mockups and wireframes with realistic placeholder text during design",
    "Testing typography, font sizes, and line heights with natural-looking text content",
    "Populating CMS templates and blog layouts before real content is written",
    "Generating dummy content for database seeding during development and testing",
    "Creating placeholder text for print layouts, brochures, and magazine spreads",
  ],

  faq: [
    {
      q: "What is Lorem Ipsum and where does it come from?",
      a: "Lorem Ipsum is scrambled Latin text derived from 'De Finibus Bonorum et Malorum' (On the Ends of Good and Evil) by the Roman philosopher Cicero, written in 45 BC. The standard Lorem Ipsum passage has been used as placeholder text since the 1500s when an unknown printer scrambled a section to create a type specimen book. It has survived five centuries of typesetting technology and remains the industry standard for dummy text.",
    },
    {
      q: "Why use Lorem Ipsum instead of real text?",
      a: "Lorem Ipsum helps reviewers and stakeholders focus on the visual design — layout, typography, spacing, and hierarchy — without being distracted by reading actual content. It has a roughly natural distribution of letters and word lengths, making it look more realistic than repeating 'content here' or using random characters.",
    },
    {
      q: "Can I use the generated text commercially?",
      a: "Yes. Lorem Ipsum text is not copyrighted and has been in the public domain for centuries. You can use the generated placeholder text freely in any personal or commercial project, mockup, or prototype.",
    },
    {
      q: "What does the 'Wrap in HTML <p> tags' option do?",
      a: "When enabled in paragraph mode, each generated paragraph is enclosed in HTML <p></p> tags with blank lines between them. This produces ready-to-paste HTML that you can drop directly into a web page, CMS editor, or HTML template without manual formatting.",
    },
  ],
};
