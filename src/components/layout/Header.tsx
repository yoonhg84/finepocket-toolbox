"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_TOOLS } from "@/lib/tools-registry";

const devTools = ALL_TOOLS.filter((t) => t.category === "developer");
const textTools = ALL_TOOLS.filter((t) => t.category === "text");
const financeTools = ALL_TOOLS.filter((t) => t.category === "finance");

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[960px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-gray-900">
          FinePocket <span className="text-blue-600">Toolbox</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavDropdown label="Developer Tools" tools={devTools} />
          <NavDropdown label="Text Tools" tools={textTools} />
          <NavDropdown label="Finance & Calculators" tools={financeTools} />
        </nav>

        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Developer Tools</p>
          {devTools.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className="block py-1.5 text-sm text-gray-700 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {t.name}
            </Link>
          ))}
          <p className="text-xs font-semibold text-gray-400 uppercase mt-3 mb-2">Text Tools</p>
          {textTools.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className="block py-1.5 text-sm text-gray-700 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {t.name}
            </Link>
          ))}
          <p className="text-xs font-semibold text-gray-400 uppercase mt-3 mb-2">Finance & Calculators</p>
          {financeTools.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className="block py-1.5 text-sm text-gray-700 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {t.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function NavDropdown({ label, tools }: { label: string; tools: typeof ALL_TOOLS }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="text-sm text-gray-600 hover:text-gray-900 font-medium py-2"
        onClick={() => setOpen(!open)}
      >
        {label}
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[220px]">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={t.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setOpen(false)}
              >
                <span className="mr-2 font-mono text-xs">{t.icon}</span>
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
