"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { localizePath } from "@/i18n";
import { getLocalizedToolText } from "@/i18n/tools";
import {
  ALL_TOOLS,
  getCategoryHref,
  getToolsByCategory,
  getToolHref,
  type ToolCategory,
} from "@/lib/tools-registry";
import { useI18n } from "./LocaleProvider";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const devTools = getToolsByCategory("developer");
const textTools = getToolsByCategory("text");
const financeTools = getToolsByCategory("finance");
const calculatorTools = getToolsByCategory("calculators");

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, t } = useI18n();
  const categories: Array<{
    category: ToolCategory;
    label: string;
    href: string;
    tools: typeof ALL_TOOLS;
  }> = [
    {
      category: "developer",
      label: t("nav.developerTools"),
      href: getCategoryHref("developer", locale),
      tools: devTools,
    },
    {
      category: "text",
      label: t("nav.textTools"),
      href: getCategoryHref("text", locale),
      tools: textTools,
    },
    {
      category: "finance",
      label: t("nav.financeTools"),
      href: getCategoryHref("finance", locale),
      tools: financeTools,
    },
    {
      category: "calculators",
      label: t("nav.calculatorTools"),
      href: getCategoryHref("calculators", locale),
      tools: calculatorTools,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[960px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href={localizePath("/", locale)}
          className="font-bold text-lg text-gray-900 dark:text-gray-100"
        >
          FinePocket <span className="text-blue-600 dark:text-blue-400">Toolbox</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {categories.map((item) => (
            <NavDropdown
              key={item.category}
              label={item.label}
              hubHref={item.href}
              tools={item.tools}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("nav.toggleMenu")}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
          {categories.map((item, index) => (
            <div key={item.category} className={index === 0 ? undefined : "mt-4"}>
              <Link
                href={item.href}
                className="block text-xs font-semibold uppercase text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              <div className="mt-2">
                {item.tools.map((tool) => {
                  const localized = getLocalizedToolText(tool, t);

                  return (
                    <Link
                      key={tool.slug}
                      href={getToolHref(tool, locale)}
                      className="block py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() => setMobileOpen(false)}
                    >
                      {localized.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

function NavDropdown({
  label,
  hubHref,
  tools,
}: {
  label: string;
  hubHref: string;
  tools: typeof ALL_TOOLS;
}) {
  const [open, setOpen] = useState(false);
  const { locale, t } = useI18n();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
          setTimeout(() => {
            const first = menuRef.current?.querySelector("a") as HTMLElement;
            first?.focus();
          }, 0);
        }
        return;
      }

      const items = Array.from(
        menuRef.current?.querySelectorAll("a") ?? []
      ) as HTMLElement[];
      const idx = items.indexOf(document.activeElement as HTMLElement);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          items[(idx + 1) % items.length]?.focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          items[(idx - 1 + items.length) % items.length]?.focus();
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
          break;
        case "Home":
          e.preventDefault();
          items[0]?.focus();
          break;
        case "End":
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;
      }
    },
    [open]
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-1">
        <Link
          href={hubHref}
          className="py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          {label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          className="rounded p-1 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          onClick={() => setOpen(!open)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={t("nav.openCategoryMenu", { category: label }, `Open ${label} menu`)}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="absolute top-full left-0 pt-1">
          <div
            ref={menuRef}
            role="menu"
            className="min-w-[240px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50"
          >
            <Link
              href={hubHref}
              role="menuitem"
              className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 dark:text-blue-400 dark:hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              {t("nav.browseCategory", { category: label }, `Browse ${label}`)}
            </Link>
            <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
            {tools.map((tool) => {
              const localized = getLocalizedToolText(tool, t);

              return (
                <Link
                  key={tool.slug}
                  href={getToolHref(tool, locale)}
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-2 font-mono text-xs">{tool.icon}</span>
                  {localized.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
