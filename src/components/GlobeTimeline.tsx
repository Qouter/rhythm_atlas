"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import createGlobe from "cobe";
import Link from "next/link";
import { locations, arcs, getArcCoordinates } from "@/lib/mapData";
import { ritmos } from "@/lib/ritmos";

// Timeline periods with globe state
const timelinePeriods = [
  {
    id: "ancestral",
    label: "Orígenes",
    range: "Antes s. XV",
    description: "Ritmos ancestrales en África e India. Tradiciones que viajarán con las migraciones forzadas y voluntarias.",
    activeLocations: ["yoruba", "congo", "rajasthan"],
    activeArcs: [],
    focusPhi: 0.3, // Africa centered
    focusTheta: 0.1,
  },
  {
    id: "colonial",
    label: "Travesías",
    range: "s. XV-XIX",
    description: "La trata esclavista cruza el Atlántico. El pueblo Roma llega a España. Los ritmos sobreviven.",
    activeLocations: ["yoruba", "congo", "rajasthan", "havana", "santiago", "sevilla"],
    activeArcs: ["yoruba-havana", "congo-havana", "rajasthan-sevilla"],
    focusPhi: -0.8, // Atlantic centered
    focusTheta: 0.15,
  },
  {
    id: "formation",
    label: "Cristalización",
    range: "s. XIX-XX",
    description: "En solares y fraguas nacen la rumba y el flamenco. La opresión se transforma en arte.",
    activeLocations: ["havana", "santiago", "sevilla", "jerez", "cadiz"],
    activeArcs: ["cadiz-havana"],
    focusPhi: -0.6,
    focusTheta: 0.2,
  },
  {
    id: "diaspora",
    label: "Diáspora",
    range: "1950s-hoy",
    description: "La clave viaja a NYC. Nace la salsa. El reggaetón lleva el ritmo al s. XXI.",
    activeLocations: ["havana", "puertorico", "nyc", "sevilla", "jerez"],
    activeArcs: ["havana-nyc", "havana-puertorico", "puertorico-nyc"],
    focusPhi: -1.3, // Americas centered
    focusTheta: 0.25,
  },
];

export function GlobeTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0.3);
  const thetaRef = useRef(0.1);
  
  const [activePeriodIndex, setActivePeriodIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activePeriod = timelinePeriods[activePeriodIndex];

  // Get ritmos for current period
  const periodRitmos = useMemo(() => {
    const periodMap: Record<string, string> = {
      ancestral: "ancestral",
      colonial: "colonial", 
      formation: "modern",
      diaspora: "contemporary",
    };
    return ritmos.filter(r => r.period === periodMap[activePeriod.id] || 
      (activePeriod.id === "formation" && r.period === "colonial"));
  }, [activePeriod.id]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActivePeriodIndex(prev => (prev + 1) % timelinePeriods.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Transition animation
  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timeout);
  }, [activePeriodIndex]);

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

    // Prepare markers based on active period
    const markers = locations.map(loc => {
      const isActive = activePeriod.activeLocations.includes(loc.id);
      return {
        location: loc.coordinates as [number, number],
        size: isActive ? 0.08 : 0.015,
        color: isActive 
          ? loc.color as [number, number, number]
          : [0.8, 0.8, 0.8] as [number, number, number],
      };
    });

    // Prepare arcs
    const arcData = arcs
      .map(arc => {
        const coords = getArcCoordinates(arc);
        if (!coords) return null;
        const isActive = activePeriod.activeArcs.includes(arc.id);
        return {
          from: coords.from as [number, number],
          to: coords.to as [number, number],
          color: isActive 
            ? arc.color as [number, number, number]
            : [0.9, 0.9, 0.9] as [number, number, number],
        };
      })
      .filter((a): a is { from: [number, number]; to: [number, number]; color: [number, number, number] } => a !== null);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.94, 0.91, 0.86],
      markerColor: [0.7, 0.35, 0.25],
      glowColor: [0.96, 0.93, 0.88],
      markers,
      arcs: arcData,
      arcColor: [0.7, 0.4, 0.3],
      arcWidth: 0.4,
      arcHeight: 0.35,
      markerElevation: 0.02,
    });

    let animationId: number;
    const targetPhi = activePeriod.focusPhi;
    const targetTheta = activePeriod.focusTheta;

    const animate = () => {
      // Smooth transition to target position
      if (!pointerInteracting.current) {
        phiRef.current += (targetPhi - phiRef.current) * 0.02;
        thetaRef.current += (targetTheta - thetaRef.current) * 0.02;
      }

      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current,
        theta: thetaRef.current,
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
  }, [activePeriod]);

  return (
    <div className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-5xl lg:text-6xl mb-3"
            style={{ 
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Rhythms Atlas
          </h1>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Las rutas del ritmo a través de la historia
          </p>
        </div>

        {/* Main content: Globe + Timeline */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Globe - takes 3 cols */}
          <div className="lg:col-span-3">
            <div 
              ref={containerRef}
              className="relative flex items-center justify-center"
            >
              <canvas
                ref={canvasRef}
                className="cursor-grab w-full aspect-square"
                style={{ maxWidth: "550px" }}
              />
            </div>

            {/* Timeline controls below globe */}
            <div className="mt-6 max-w-[550px] mx-auto">
              {/* Progress bar */}
              <div 
                className="h-1 rounded-full mb-4 overflow-hidden"
                style={{ background: "var(--color-border-subtle)" }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${((activePeriodIndex + 1) / timelinePeriods.length) * 100}%`,
                    background: "var(--color-cuba)",
                  }}
                />
              </div>

              {/* Period buttons */}
              <div className="flex items-center justify-between gap-2">
                {timelinePeriods.map((period, i) => (
                  <button
                    key={period.id}
                    onClick={() => {
                      setActivePeriodIndex(i);
                      setIsPlaying(false);
                    }}
                    className="flex-1 py-2 px-1 rounded-lg text-center transition-all"
                    style={{
                      background: i === activePeriodIndex ? "var(--color-cuba)" : "transparent",
                      color: i === activePeriodIndex ? "white" : "var(--color-text-secondary)",
                    }}
                  >
                    <div className="text-xs font-medium">{period.label}</div>
                    <div className="text-[10px] opacity-70">{period.range}</div>
                  </button>
                ))}
              </div>

              {/* Play button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                  style={{
                    background: "var(--color-surface)",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {isPlaying ? "⏸ Pausar" : "▶ Auto-play"}
                </button>
              </div>
            </div>
          </div>

          {/* Right column: Period info + Ritmos - takes 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Period description */}
            <div 
              className={`p-6 rounded-xl transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}
              style={{ 
                background: "var(--color-surface)",
                borderTop: "3px solid var(--color-cuba)",
              }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 
                  className="text-2xl"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {activePeriod.label}
                </h2>
                <span 
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {activePeriod.range}
                </span>
              </div>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {activePeriod.description}
              </p>
            </div>

            {/* Active locations */}
            <div>
              <h3 
                className="text-sm font-medium mb-3"
                style={{ color: "var(--color-text-muted)" }}
              >
                Lugares activos
              </h3>
              <div className="flex flex-wrap gap-2">
                {activePeriod.activeLocations.map(locId => {
                  const loc = locations.find(l => l.id === locId);
                  if (!loc) return null;
                  return (
                    <span
                      key={locId}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: `rgba(${loc.color[0] * 255}, ${loc.color[1] * 255}, ${loc.color[2] * 255}, 0.15)`,
                        color: `rgb(${loc.color[0] * 200}, ${loc.color[1] * 200}, ${loc.color[2] * 200})`,
                      }}
                    >
                      {loc.name}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Ritmos from this period */}
            {periodRitmos.length > 0 && (
              <div>
                <h3 
                  className="text-sm font-medium mb-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Ritmos de esta época
                </h3>
                <div className="space-y-2">
                  {periodRitmos.map(ritmo => (
                    <Link
                      key={ritmo.id}
                      href={`/ritmos/${ritmo.id}`}
                      className="block px-4 py-3 rounded-lg transition-all hover:translate-x-1"
                      style={{
                        background: "var(--color-surface)",
                        borderLeft: `3px solid ${ritmo.color}`,
                      }}
                    >
                      <div className="font-medium">{ritmo.name}</div>
                      <div 
                        className="text-sm"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {ritmo.country}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="pt-4 flex gap-3">
              <Link
                href="/explorar"
                className="flex-1 text-center px-4 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: "var(--color-bg)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                }}
              >
                📚 Explorar todos
              </Link>
              <Link
                href="/laboratorio"
                className="flex-1 text-center px-4 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: "var(--color-cuba)",
                  color: "white",
                }}
              >
                🎹 Laboratorio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
