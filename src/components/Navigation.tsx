"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/explorar", label: "Explorar" },
  { href: "/laboratorio", label: "Laboratorio" },
  { href: "/mapa", label: "Mapa" },
  { href: "/comparador", label: "Comparador" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50"
      style={{ 
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          <span className="text-xl">🥁</span>
          <span className="font-medium text-lg tracking-tight">Rhythms Atlas</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive ? "var(--color-cuba)" : "var(--color-text-secondary)",
                  background: isActive ? "var(--color-cuba-light)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
