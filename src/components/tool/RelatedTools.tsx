import Link from "next/link";
import { getRelatedTools } from "@/lib/tools-registry";

interface RelatedToolsProps {
  currentSlug: string;
}

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const related = getRelatedTools(currentSlug, 4);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-600 dark:hover:bg-blue-900/30 transition-colors"
          >
            <span className="font-mono text-sm mr-2">{tool.icon}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{tool.name}</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tool.shortDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
