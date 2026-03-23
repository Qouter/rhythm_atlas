"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ritmos, regions, periods, compases, functions, type Ritmo } from "@/lib/ritmos";

type FilterState = {
  region: string | null;
  period: string | null;
  compas: string | null;
  function: string | null;
};

export default function ExplorarPage() {
  const [filters, setFilters] = useState<FilterState>({
    region: null,
    period: null,
    compas: null,
    function: null,
  });
  
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRitmos = useMemo(() => {
    let result = ritmos;
    
    // Apply filters
    if (filters.region) {
      result = result.filter(r => r.region === filters.region);
    }
    if (filters.period) {
      result = result.filter(r => r.period === filters.period);
    }
    if (filters.compas) {
      result = result.filter(r => r.compas === filters.compas);
    }
    if (filters.function) {
      result = result.filter(r => r.function.includes(filters.function as Ritmo["function"][number]));
    }
    
    // Apply search (for future use, keeping it ready)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.country.toLowerCase().includes(q) ||
        r.keywords.some(k => k.includes(q))
      );
    }
    
    return result;
  }, [filters, searchQuery]);

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const clearFilters = () => {
    setFilters({ region: null, period: null, compas: null, function: null });
    setSearchQuery("");
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section 
        className="px-6 py-12"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 
            className="text-4xl mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Explorar Ritmos
          </h1>
          <p 
            className="text-lg max-w-2xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {ritmos.length} ritmos documentados. Filtra por región, período, compás o función social.
          </p>
        </div>
      </section>

      {/* Filters + Results */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Search placeholder - ready for future */}
              <div 
                className="p-4 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <label className="label block mb-2">Buscar</label>
                <input
                  type="text"
                  placeholder="Nombre, país, keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                />
              </div>

              {/* Region filter */}
              <div 
                className="p-4 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-3">Región</h3>
                <div className="space-y-1">
                  {Object.entries(regions).map(([key, { label, emoji }]) => (
                    <button
                      key={key}
                      onClick={() => toggleFilter("region", key)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2"
                      style={{
                        background: filters.region === key 
                          ? "var(--color-cuba-light)" 
                          : "transparent",
                        color: filters.region === key
                          ? "var(--color-cuba-dark)"
                          : "var(--color-text)",
                      }}
                    >
                      <span>{emoji}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Period filter */}
              <div 
                className="p-4 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-3">Período</h3>
                <div className="space-y-1">
                  {Object.entries(periods).map(([key, { label, range }]) => (
                    <button
                      key={key}
                      onClick={() => toggleFilter("period", key)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                      style={{
                        background: filters.period === key 
                          ? "var(--color-indigo-light)" 
                          : "transparent",
                        color: filters.period === key
                          ? "var(--color-indigo)"
                          : "var(--color-text)",
                      }}
                    >
                      <div>{label}</div>
                      <div 
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {range}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Compás filter */}
              <div 
                className="p-4 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-3">Compás</h3>
                <div className="space-y-1">
                  {Object.entries(compases).map(([key, { label, description }]) => (
                    <button
                      key={key}
                      onClick={() => toggleFilter("compas", key)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                      style={{
                        background: filters.compas === key 
                          ? "var(--color-shared-light)" 
                          : "transparent",
                        color: filters.compas === key
                          ? "oklch(40% 0.1 85)"
                          : "var(--color-text)",
                      }}
                    >
                      <div>{label}</div>
                      <div 
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Function filter */}
              <div 
                className="p-4 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-3">Función social</h3>
                <div className="space-y-1">
                  {Object.entries(functions).map(([key, { label, emoji }]) => (
                    <button
                      key={key}
                      onClick={() => toggleFilter("function", key)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2"
                      style={{
                        background: filters.function === key 
                          ? "var(--color-spain-light)" 
                          : "transparent",
                        color: filters.function === key
                          ? "var(--color-spain-dark)"
                          : "var(--color-text)",
                      }}
                    >
                      <span>{emoji}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: "var(--color-bg)",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  Limpiar filtros ({activeFiltersCount})
                </button>
              )}
            </aside>

            {/* Main - Results grid */}
            <main className="lg:col-span-3">
              {/* Results count */}
              <div className="mb-6">
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {filteredRitmos.length === ritmos.length 
                    ? `Mostrando ${ritmos.length} ritmos`
                    : `${filteredRitmos.length} de ${ritmos.length} ritmos`
                  }
                </p>
              </div>

              {/* Grid */}
              {filteredRitmos.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredRitmos.map(ritmo => (
                    <Link
                      key={ritmo.id}
                      href={`/ritmos/${ritmo.id}`}
                      className="block rounded-xl p-6 transition-all hover:translate-y-[-2px]"
                      style={{
                        background: "var(--color-surface)",
                        borderLeft: `4px solid ${ritmo.color}`,
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 
                            className="text-lg font-medium"
                            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                          >
                            {ritmo.name}
                          </h3>
                          <p 
                            className="text-sm"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {ritmo.country}
                          </p>
                        </div>
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={{ 
                            background: ritmo.colorLight,
                            color: ritmo.colorDark,
                          }}
                        >
                          {periods[ritmo.period].label}
                        </span>
                      </div>

                      {/* Subtitle */}
                      {ritmo.subtitle && (
                        <p 
                          className="text-sm mb-3"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {ritmo.subtitle}
                        </p>
                      )}

                      {/* Notation */}
                      <div 
                        className="font-mono text-sm px-3 py-2 rounded mb-3"
                        style={{
                          background: "var(--color-bg)",
                          color: ritmo.color,
                        }}
                      >
                        {ritmo.notation}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {ritmo.function.slice(0, 3).map(fn => (
                          <span
                            key={fn}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              background: "var(--color-bg)",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            {functions[fn].emoji} {functions[fn].label}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div 
                  className="text-center py-12 rounded-xl"
                  style={{ background: "var(--color-surface)" }}
                >
                  <p 
                    className="text-lg mb-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    No hay ritmos que coincidan
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-sm underline"
                    style={{ color: "var(--color-cuba)" }}
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="px-6 py-8 text-center text-sm"
        style={{ 
          borderTop: "1px solid var(--color-border-subtle)",
          color: "var(--color-text-muted)",
        }}
      >
        Rhythms Atlas — Conectando ritmos con su historia
      </footer>
    </div>
  );
}
