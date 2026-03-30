interface FaqSectionProps {
  items: Array<{ q: string; a: string }>;
}

export function FaqSection({ items }: FaqSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">FAQ</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} className="group border border-gray-200 rounded-lg">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900">
              {item.q}
              <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                &#9660;
              </span>
            </summary>
            <div className="px-4 pb-4 text-gray-600">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
