import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Timestamp Converter",
  description:
    "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds, ISO 8601, RFC 2822, relative time, and timezone display. Free online tool running entirely in your browser.",
  whatIs:
    "A Unix timestamp (also called Epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC. It is widely used in programming, databases, APIs, and log files as a universal time representation that is independent of time zones. This tool converts between Unix timestamps and human-readable date formats, auto-detecting whether your input is in seconds or milliseconds.",
  howToUse:
    "Enter a Unix timestamp (in seconds or milliseconds) to see it converted into multiple date formats including ISO 8601, RFC 2822, local time, and relative time. Alternatively, pick or type a date to get the corresponding Unix timestamp. The live clock at the top shows the current time updating every second. Click any copy button to copy a value to your clipboard.",
  howItWorks:
    "The converter uses JavaScript's built-in Date object and Intl APIs for all conversions. Timestamps above 10^12 are automatically treated as milliseconds; smaller values are treated as seconds. Relative time is calculated by comparing the input against the current system time. All processing happens client-side in your browser.",
  useCases: [
    "Converting API response timestamps to readable dates for debugging",
    "Generating Unix timestamps for database queries and cron jobs",
    "Debugging log file timestamps across different time zones",
    "Converting between epoch time and ISO 8601 for API requests",
    "Checking relative time differences between events",
    "Verifying token expiration times in JWT and OAuth flows",
  ],
  faq: [
    {
      q: "What is the difference between seconds and milliseconds timestamps?",
      a: "A Unix timestamp in seconds is a 10-digit number (e.g., 1705312200), while milliseconds is 13 digits (e.g., 1705312200000). Many programming languages like JavaScript use milliseconds, while others like Python default to seconds. This tool auto-detects the format.",
    },
    {
      q: "What is the Unix epoch?",
      a: "The Unix epoch is January 1, 1970, 00:00:00 UTC. All Unix timestamps are measured as the number of seconds (or milliseconds) elapsed since this reference point. Dates before the epoch have negative timestamps.",
    },
    {
      q: "Does this tool handle time zones?",
      a: "Yes. The tool displays both UTC and your local time zone. Your browser's timezone is auto-detected and shown alongside the UTC offset. All conversions account for timezone differences.",
    },
    {
      q: "Can I enter negative timestamps?",
      a: "Yes. Negative timestamps represent dates before January 1, 1970. For example, -86400 represents December 31, 1969 in UTC.",
    },
    {
      q: "Does this tool send my data to a server?",
      a: "No. All conversions happen entirely in your browser using JavaScript's Date API. No data is transmitted to any server.",
    },
  ],
};
