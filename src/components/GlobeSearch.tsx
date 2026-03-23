"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import createGlobe from "cobe";
import Link from "next/link";
import { ritmos, regions, periods, functions, searchRitmos, type Ritmo } from "@/lib/ritmos";
import { locations, arcs, getArcCoordinates, type RhythmLocation } from "@/lib/mapData";

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
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    region: null,
    period: null,
    function: null,
  });
  const [selectedRitmo, setSelectedRitmo] = useState<Ritmo | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<RhythmLocation | null>(null);
  const [focusCoordinates, setFocusCoordinates] = useState<[number, number] | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
      // Also apply other filters
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
    // If no filters, show all
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
  };

  const selectRitmo = (ritmo: Ritmo) => {
    setSelectedRitmo(ritmo);
    setSelectedLocation(null);
    
    const locId = ritmoLocations[ritmo.id];
    const loc = locations.find(l => l.id === locId);
    if (loc) {
      setFocusCoordinates(loc.coordinates);
    }
  };

  const clearSelection = () => {
    setSelectedRitmo(null);
    setSelectedLocation(null);
    setFocusCoordinates(null);
  };

  // Globe setup
  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Prepare markers - dim inactive ones
    const markers = locations.map(loc => ({
      location: loc.coordinates as [number, number],
      size: activeLocationIds.has(loc.id) ? 0.06 : 0.02,
      color: activeLocationIds.has(loc.id) 
        ? loc.color as [number, number, number]
        : [0.7, 0.7, 0.7] as [number, number, number],
    }));

    // Prepare arcs
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
            : [0.85, 0.85, 0.85] as [number, number, number],
        };
      })
      .filter((a): a is { from: [number, number]; to: [number, number]; color: [number, number, number] } => a !== null);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: 0.15,
      dark: 0,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 4,
      baseColor: [0.92, 0.88, 0.82],
      markerColor: [0.7, 0.35, 0.25],
      glowColor: [0.95, 0.9, 0.85],
      markers,
      arcs: arcData,
      arcColor: [0.7, 0.4, 0.3],
      arcWidth: 0.3,
      arcHeight: 0.3,
      markerElevation: 0.02,
    });

    globeRef.current = globe;

    // Animation loop
    let animationId: number;

    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.002;
      }
      
      if (focusCoordinates) {
        const targetPhi = (focusCoordinates[1] + 180) * (Math.PI / 180);
        phiRef.current += (targetPhi - phiRef.current) * 0.05;
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

    // Pointer interaction
    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    };

    const onPointerUp = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    };

    const onPointerOut = () => {
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
    canvas.addEventListener("pointerout", onPointerOut);
    canvas.addEventListener("pointermove", onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerout", onPointerOut);
      canvas.removeEventListener("pointermove", onMouseMove);
    };
  }, [activeLocationIds, focusCoordinates]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Search bar - floating */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-4">
        <div 
          className="relative rounded-2xl shadow-lg transition-all"
          style={{ 
            background: "var(--color-surface)",
            boxShadow: isSearchFocused 
              ? "0 8px 32px rgba(0,0,0,0.12)" 
              : "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex items-center px-4 py-3">
            <span className="text-xl mr-3">🔍</span>
            <input
              type="text"
              placeholder="Buscar ritmos, lugares, estilos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="flex-1 bg-transparent outline-none text-base"
              style={{ color: "var(--color-text)" }}
            />
            {(searchQuery || activeFiltersCount > 0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilters({ region: null, period: null, function: null });
                  clearSelection();
                }}
                className="text-sm px-2 py-1 rounded"
                style={{ color: "var(--color-text-muted)" }}
              >
                Limpiar
              </button>
            )}
          </div>
          
          {/* Filter chips */}
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {/* Region filters */}
            {Object.entries(regions).slice(0, 3).map(([key, { label, emoji }]) => (
              <button
                key={key}
                onClick={() => toggleFilter("region", key)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={{
                  background: filters.region === key ? "var(--color-cuba)" : "var(--color-bg)",
                  color: filters.region === key ? "white" : "var(--color-text-secondary)",
                }}
              >
                {emoji} {label}
              </button>
            ))}
            {/* Period filter */}
            <button
              onClick={() => toggleFilter("period", "modern")}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                background: filters.period === "modern" ? "var(--color-indigo)" : "var(--color-bg)",
                color: filters.period === "modern" ? "white" : "var(--color-text-secondary)",
              }}
            >
              ⏱ s.XX
            </button>
            {/* Function filter */}
            <button
              onClick={() => toggleFilter("function", "resistance")}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                background: filters.function === "resistance" ? "var(--color-spain)" : "var(--color-bg)",
                color: filters.function === "resistance" ? "white" : "var(--color-text-secondary)",
              }}
            >
              ✊ Resistencia
            </button>
          </div>

          {/* Search results dropdown */}
          {(isSearchFocused || searchQuery) && filteredRitmos.length > 0 && (
            <div 
              className="border-t px-2 py-2 max-h-64 overflow-y-auto"
              style={{ borderColor: "var(--color-border-subtle)" }}
            >
              {filteredRitmos.map(ritmo => (
                <button
                  key={ritmo.id}
                  onClick={() => {
                    selectRitmo(ritmo);
                    setIsSearchFocused(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg transition-all hover:bg-[var(--color-bg)] flex items-center gap-3"
                >
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: ritmo.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{ritmo.name}</div>
                    <div 
                      className="text-xs truncate"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {ritmo.country} · {ritmo.subtitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Globe */}
      <div className="flex items-center justify-center pt-24 pb-8">
        <canvas
          ref={canvasRef}
          className="cursor-grab"
          style={{
            width: "min(600px, 90vw)",
            height: "min(600px, 90vw)",
          }}
        />
      </div>

      {/* Selected ritmo panel */}
      {selectedRitmo && (
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4"
        >
          <div 
            className="rounded-2xl p-5 shadow-lg animate-in slide-in-from-bottom-4 duration-300"
            style={{ 
              background: "var(--color-surface)",
              borderLeft: `4px solid ${selectedRitmo.color}`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 
                  className="text-xl font-medium"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {selectedRitmo.name}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {selectedRitmo.country} · {selectedRitmo.subtitle}
                </p>
              </div>
              <button
                onClick={clearSelection}
                className="text-lg"
                style={{ color: "var(--color-text-muted)" }}
              >
                ✕
              </button>
            </div>
            
            {/* Pattern preview */}
            <div 
              className="font-mono text-sm px-3 py-2 rounded mb-4"
              style={{ 
                background: "var(--color-bg)",
                color: selectedRitmo.color,
              }}
            >
              {selectedRitmo.notation}
            </div>
            
            <div className="flex gap-2">
              <Link
                href={`/ritmos/${selectedRitmo.id}`}
                className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: selectedRitmo.color,
                  color: "white",
                }}
              >
                Ver análisis completo →
              </Link>
              <Link
                href="/laboratorio"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: "var(--color-bg)",
                  color: "var(--color-text)",
                }}
              >
                🎹
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      {(searchQuery || activeFiltersCount > 0) && !selectedRitmo && (
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full text-sm"
          style={{ 
            background: "var(--color-surface)",
            color: "var(--color-text-secondary)",
          }}
        >
          {filteredRitmos.length} ritmo{filteredRitmos.length !== 1 ? "s" : ""} encontrado{filteredRitmos.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Hint when no filters */}
      {!searchQuery && activeFiltersCount === 0 && !selectedRitmo && (
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center"
          style={{ color: "var(--color-text-muted)" }}
        >
          <p className="text-sm">Arrastra el globo · Busca ritmos · Explora conexiones</p>
        </div>
      )}
    </div>
  );
}
