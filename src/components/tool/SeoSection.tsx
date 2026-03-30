interface SeoSectionProps {
  title: string;
  content: string;
}

export function SeoSection({ title, content }: SeoSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h2>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{content}</div>
    </section>
  );
}
