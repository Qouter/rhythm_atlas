"use client";

import type { RhythmLocation, MigrationArc } from "@/lib/mapData";
import Link from "next/link";

interface LocationPanelProps {
  location: RhythmLocation | null;
  arc: MigrationArc | null;
  onClose: () => void;
}

export function LocationPanel({ location, arc, onClose }: LocationPanelProps) {
  if (!location && !arc) return null;

  const typeLabels: Record<string, string> = {
    origin: "Origen",
    evolution: "Evolución",
    diaspora: "Diáspora",
    forced: "Migración forzada",
    cultural: "Intercambio cultural",
    commercial: "Ruta comercial",
  };

  const typeColors: Record<string, string> = {
    origin: "oklch(65% 0.15 60)",
    evolution: "var(--color-cuba)",
    diaspora: "oklch(55% 0.1 250)",
    forced: "oklch(50% 0.15 30)",
    cultural: "oklch(55% 0.12 85)",
    commercial: "oklch(50% 0.08 60)",
  };

  // Rhythm to page mapping
  const rhythmLinks: Record<string, string> = {
    "Son": "/ritmos/clave",
    "Rumba": "/ritmos/clave",
    "Clave": "/ritmos/clave",
    "Bulería": "/ritmos/flamenco",
    "Soleá": "/ritmos/flamenco",
    "Alegrías": "/ritmos/flamenco",
    "Flamenco": "/ritmos/flamenco",
    "Salsa": "/ritmos/clave",
  };

  return (
    <div 
      className="rounded-2xl p-6 animate-in slide-in-from-right-4 duration-300"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all"
        style={{ 
          background: "var(--color-bg)",
          color: "var(--color-text-muted)",
        }}
      >
        ✕
      </button>

      {location && (
        <>
          {/* Header */}
          <div className="mb-4">
            <div 
              className="inline-block px-2 py-1 rounded text-xs font-medium mb-2"
              style={{ 
                background: `${typeColors[location.type]}20`,
                color: typeColors[location.type],
              }}
            >
              {typeLabels[location.type]}
            </div>
            <h3 
              className="text-2xl mb-1"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              {location.name}
            </h3>
            <p 
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {location.region} · {location.period}
            </p>
          </div>

          {/* Description */}
          <p 
            className="text-sm leading-relaxed mb-6"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {location.description}
          </p>

          {/* Rhythms */}
          <div className="mb-6">
            <h4 className="label mb-2">Ritmos asociados</h4>
            <div className="flex flex-wrap gap-2">
              {location.rhythms.map(rhythm => {
                const link = rhythmLinks[rhythm];
                if (link) {
                  return (
                    <Link
                      key={rhythm}
                      href={link}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
                      style={{
                        background: typeColors[location.type],
                        color: "white",
                      }}
                    >
                      {rhythm} →
                    </Link>
                  );
                }
                return (
                  <span
                    key={rhythm}
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      background: "var(--color-bg)",
                      color: "var(--color-text)",
                    }}
                  >
                    {rhythm}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Coordinates */}
          <div 
            className="text-xs font-mono"
            style={{ color: "var(--color-text-muted)" }}
          >
            {location.coordinates[0].toFixed(2)}°{location.coordinates[0] >= 0 ? "N" : "S"},{" "}
            {Math.abs(location.coordinates[1]).toFixed(2)}°{location.coordinates[1] >= 0 ? "E" : "W"}
          </div>
        </>
      )}

      {arc && (
        <>
          {/* Header */}
          <div className="mb-4">
            <div 
              className="inline-block px-2 py-1 rounded text-xs font-medium mb-2"
              style={{ 
                background: `${typeColors[arc.type]}20`,
                color: typeColors[arc.type],
              }}
            >
              {typeLabels[arc.type]}
            </div>
            <h3 
              className="text-2xl mb-1"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              {arc.name}
            </h3>
            <p 
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {arc.period}
            </p>
          </div>

          {/* Description */}
          <p 
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {arc.description}
          </p>
        </>
      )}
    </div>
  );
}
