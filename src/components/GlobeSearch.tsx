"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import createGlobe from "cobe";
import Link from "next/link";
import { ritmos, regions, periods, functions, searchRitmos, type Ritmo } from "@/lib/ritmos";
import { locations, arcs, getArcCoordinates } from "@/lib/mapData";

// Map ritmos to their primary location
const ritmoLocations: Record<string, string> = {
  "clave-son": "havana",
  "rumba-guaguanco": "havana",
  "solea": "sevilla",
  "buleria": "jerez",
  "dembow": "puertorico",
};

type FilterState = {
  region: string | null;
  period: string | null;
  function: string | null;
};

export function GlobeSearch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    region: null,
    period: null,
    function: null,
  });
  const [selectedRitmo, setSelectedRitmo] = useState<Ritmo | null>(null);
  const [focusCoordinates, setFocusCoordinates] = useState<[number, number] | null>(null);

  // Filter ritmos
  const filteredRitmos = useMemo(() => {
    let result = ritmos;
    
    if (filters.region) {
      result = result.filter(r => r.region === filters.region);
    }
    if (filters.period) {
      result = result.filter(r => r.period === filters.period);
    }
    if (filters.function) {
      result = result.filter(r => r.function.includes(filters.function as Ritmo["function"][number]));
    }
    if (searchQuery.trim()) {
      result = searchRitmos(searchQuery);
      if (filters.region) result = result.filter(r => r.region === filters.region);
      if (filters.period) result = result.filter(r => r.period === filters.period);
      if (filters.function) result = result.filter(r => r.function.includes(filters.function as Ritmo["function"][number]));
    }
    
    return result;
  }, [searchQuery, filters]);

  // Get active location IDs based on filtered ritmos
  const activeLocationIds = useMemo(() => {
    const ids = new Set<string>();
    filteredRitmos.forEach(r => {
      const locId = ritmoLocations[r.id];
      if (locId) ids.add(locId);
    });
    if (!searchQuery && !filters.region && !filters.period && !filters.function) {
      locations.forEach(l => ids.add(l.id));
    }
    return ids;
  }, [filteredRitmos, searchQuery, filters]);

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
    setSelectedRitmo(null);
  };

  const selectRitmo = (ritmo: Ritmo) => {
    setSelectedRitmo(ritmo);
    const locId = ritmoLocations[ritmo.id];
    const loc = locations.find(l => l.id === locId);
    if (loc) {
      setFocusCoordinates(loc.coordinates);
    }
  };

  const clearAll = () => {
    setSearchQuery("");
    setFilters({ region: null, period: null, function: null });
    setSelectedRitmo(null);
    setFocusCoordinates(null);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;
  const hasActiveSearch = searchQuery.trim().length > 0 || activeFiltersCount > 0;

  // Globe setup
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let width = containerRef.current.offsetWidth;
    const onResize = () => {
      if (containerRef.current) {
        width = containerRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);

    const markers = locations.map(loc => ({
      location: loc.coordinates as [number, number],
      size: activeLocationIds.has(loc.id) ? 0.07 : 0.02,
      color: activeLocationIds.has(loc.id) 
        ? loc.color as [number, number, number]
        : [0.75, 0.75, 0.75] as [number, number, number],
    }));

    const arcData = arcs
      .map(arc => {
        const coords = getArcCoordinates(arc);
        if (!coords) return null;
        const isActive = activeLocationIds.has(arc.from) && activeLocationIds.has(arc.to);
        return {
          from: coords.from as [number, number],
          to: coords.to as [number, number],
          color: isActive 
            ? arc.color as [number, number, number]
            : [0.88, 0.88, 0.88] as [number, number, number],
        };
      })
      .filter((a): a is { from: [number, number]; to: [number, number]; color: [number, number, number] } => a !== null);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: 0.1,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.93, 0.90, 0.85],
      markerColor: [0.7, 0.35, 0.25],
      glowColor: [0.96, 0.93, 0.88],
      markers,
      arcs: arcData,
      arcColor: [0.7, 0.4, 0.3],
      arcWidth: 0.25,
      arcHeight: 0.25,
      markerElevation: 0.015,
    });

    let animationId: number;

    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.002;
      }
      
      if (focusCoordinates) {
        const targetPhi = (focusCoordinates[1] + 180) * (Math.PI / 180);
        phiRef.current += (targetPhi - phiRef.current) * 0.04;
      }

      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current,
        width: width * 2,
        height: width * 2,
        markers,
        arcs: arcData,
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    };

    const onPointerUp = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    };

    const onMouseMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta / 100;
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerout", onPointerUp);
    canvas.addEventListener("pointermove", onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerout", onPointerUp);
      canvas.removeEventListener("pointermove", onMouseMove);
    };
  }, [activeLocationIds, focusCoordinates]);

  return (
    <div className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Split layout: left text, right globe */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left column: Title + Search + Filters + Results */}
          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-3">
              <h1 
                className="text-5xl lg:text-6xl"
                style={{ 
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Rhythms Atlas
              </h1>
              <p 
                className="text-lg"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Las rutas del ritmo a través de la historia
              </p>
            </div>

            {/* Search */}
            <div className="space-y-4">
              <div 
                className="relative rounded-xl"
                style={{ 
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-center px-4 py-3">
                  <span className="text-lg mr-3" style={{ opacity: 0.5 }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar ritmos, lugares..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedRitmo(null);
                    }}
                    className="flex-1 bg-transparent outline-none"
                    style={{ 
                      color: "var(--color-text)",
                      fontSize: "1rem",
                    }}
                  />
                  {hasActiveSearch && (
                    <button
                      onClick={clearAll}
                      className="text-sm px-2 py-1 rounded transition-all hover:bg-[var(--color-bg)]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(regions).map(([key, { label, emoji }]) => (
                  <button
                    key={key}
                    onClick={() => toggleFilter("region", key)}
                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      background: filters.region === key ? "var(--color-cuba)" : "var(--color-surface)",
                      color: filters.region === key ? "white" : "var(--color-text-secondary)",
                      border: filters.region === key ? "none" : "1px solid var(--color-border-subtle)",
                    }}
                  >
                    {emoji} {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results or Selected Ritmo */}
            <div className="space-y-3">
              {selectedRitmo ? (
                /* Selected ritmo detail */
                <div 
                  className="rounded-xl p-6"
                  style={{ 
                    background: "var(--color-surface)",
                    borderLeft: `4px solid ${selectedRitmo.color}`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 
                        className="text-2xl mb-1"
                        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                      >
                        {selectedRitmo.name}
                      </h3>
                      <p style={{ color: "var(--color-text-secondary)" }}>
                        {selectedRitmo.country} · {selectedRitmo.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedRitmo(null)}
                      className="text-lg p-1"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div 
                    className="font-mono text-sm px-3 py-2 rounded mb-4"
                    style={{ 
                      background: "var(--color-bg)",
                      color: selectedRitmo.color,
                    }}
                  >
                    {selectedRitmo.notation}
                  </div>
                  
                  <Link
                    href={`/ritmos/${selectedRitmo.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: selectedRitmo.color,
                      color: "white",
                    }}
                  >
                    Ver análisis completo →
                  </Link>
                </div>
              ) : (
                /* Ritmo list */
                <>
                  <p 
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {filteredRitmos.length} ritmo{filteredRitmos.length !== 1 ? "s" : ""}
                    {hasActiveSearch ? " encontrado" + (filteredRitmos.length !== 1 ? "s" : "") : " disponibles"}
                  </p>
                  
                  <div className="space-y-2">
                    {filteredRitmos.map(ritmo => (
                      <button
                        key={ritmo.id}
                        onClick={() => selectRitmo(ritmo)}
                        className="w-full text-left px-4 py-3 rounded-lg transition-all hover:translate-x-1"
                        style={{
                          background: "var(--color-surface)",
                          borderLeft: `3px solid ${ritmo.color}`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{ritmo.name}</div>
                            <div 
                              className="text-sm"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {ritmo.country}
                            </div>
                          </div>
                          <span 
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ 
                              background: ritmo.colorLight,
                              color: ritmo.colorDark,
                            }}
                          >
                            {periods[ritmo.period].label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right column: Globe */}
          <div 
            ref={containerRef}
            className="relative flex items-center justify-center lg:sticky lg:top-24"
          >
            <canvas
              ref={canvasRef}
              className="cursor-grab w-full aspect-square"
              style={{ maxWidth: "500px" }}
            />
            
            {/* Hint */}
            <p 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              Arrastra para rotar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
