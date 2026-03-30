interface SeoSectionProps {
  title: string;
  content: string;
}

export function SeoSection({ title, content }: SeoSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed whitespace-pre-line">{content}</div>
    </section>
  );
}
