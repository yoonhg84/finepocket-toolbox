"use client";

interface Tab {
  id: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function TabGroup({ tabs, activeTab, onChange }: TabGroupProps) {
  return (
    <div role="tablist" className="flex gap-1 border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
            activeTab === tab.id
              ? "bg-white text-blue-600 border border-gray-200 border-b-white -mb-px"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
