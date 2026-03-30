"use client";

import { useState } from "react";
import Link from "next/link";
import { getLocalizedToolText } from "@/i18n/tools";
import { ALL_TOOLS } from "@/lib/tools-registry";
import { useI18n } from "./LocaleProvider";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const devTools = ALL_TOOLS.filter((t) => t.category === "developer");
const textTools = ALL_TOOLS.filter((t) => t.category === "text");
const financeTools = ALL_TOOLS.filter((t) => t.category === "finance");

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[960px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-gray-900 dark:text-gray-100">
          FinePocket <span className="text-blue-600 dark:text-blue-400">Toolbox</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavDropdown label={t("nav.developerTools")} tools={devTools} />
          <NavDropdown label={t("nav.textTools")} tools={textTools} />
          <NavDropdown label={t("nav.financeTools")} tools={financeTools} />
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
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2">{t("nav.developerTools")}</p>
          {devTools.map((tool) => {
            const localized = getLocalizedToolText(tool, t);

            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className="block py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setMobileOpen(false)}
              >
                {localized.name}
              </Link>
            );
          })}
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mt-3 mb-2">{t("nav.textTools")}</p>
          {textTools.map((tool) => {
            const localized = getLocalizedToolText(tool, t);

            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className="block py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setMobileOpen(false)}
              >
                {localized.name}
              </Link>
            );
          })}
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mt-3 mb-2">{t("nav.financeTools")}</p>
          {financeTools.map((tool) => {
            const localized = getLocalizedToolText(tool, t);

            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className="block py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setMobileOpen(false)}
              >
                {localized.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

function NavDropdown({ label, tools }: { label: string; tools: typeof ALL_TOOLS }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium py-2"
        onClick={() => setOpen(!open)}
      >
        {label}
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-1">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900/50 py-2 min-w-[220px]">
            {tools.map((tool) => {
              const localized = getLocalizedToolText(tool, t);

              return (
                <Link
                  key={tool.slug}
                  href={tool.href}
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
