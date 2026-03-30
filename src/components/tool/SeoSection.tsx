interface SeoSectionProps {
  title: string;
  content: string;
}

function parseNumberedSteps(text: string): string[] | null {
  const steps = text.split(/\s*(?=\d+\.\s)/).filter(Boolean);
  if (steps.length >= 3 && steps.every((s) => /^\d+\.\s/.test(s))) {
    return steps;
  }
  return null;
}

export function SeoSection({ title, content }: SeoSectionProps) {
  const steps = parseNumberedSteps(content);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h2>
      {steps ? (
        <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
          {steps.map((step, i) => (
            <li key={i}>{step.replace(/^\d+\.\s*/, "")}</li>
          ))}
        </ol>
      ) : (
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{content}</div>
      )}
    </section>
  );
}
