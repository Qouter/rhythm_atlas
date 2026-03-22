"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { locations, arcs, getArcCoordinates, type RhythmLocation, type MigrationArc } from "@/lib/mapData";

interface GlobeProps {
  onSelectLocation?: (location: RhythmLocation | null) => void;
  onSelectArc?: (arc: MigrationArc | null) => void;
  selectedLocationId?: string | null;
  focusCoordinates?: [number, number];
}

export function Globe({ 
  focusCoordinates 
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  // Convert lat/lon to phi/theta for globe focus
  const coordsToAngles = useCallback((lat: number, lon: number): [number, number] => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return [phi, theta];
  }, []);

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

    // Prepare markers from locations
    const markers = locations.map(loc => ({
      location: loc.coordinates as [number, number],
      size: loc.type === "origin" ? 0.08 : loc.type === "evolution" ? 0.06 : 0.05,
      color: loc.color as [number, number, number],
    }));

    // Prepare arcs
    const arcData = arcs
      .map(arc => {
        const coords = getArcCoordinates(arc);
        if (!coords) return null;
        return {
          from: coords.from as [number, number],
          to: coords.to as [number, number],
          color: arc.color as [number, number, number],
        };
      })
      .filter((a): a is { from: [number, number]; to: [number, number]; color: [number, number, number] } => a !== null);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: 0.2,
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
      arcWidth: 0.4,
      arcHeight: 0.4,
      markerElevation: 0.03,
    });

    globeRef.current = globe;

    // Animation loop
    let animationId: number;
    let targetPhi = focusCoordinates 
      ? coordsToAngles(focusCoordinates[0], focusCoordinates[1])[1]
      : 0;

    const animate = () => {
      // Auto-rotate when not interacting
      if (!pointerInteracting.current) {
        phiRef.current += 0.003;
      }
      
      // Smooth rotation to target when focus changes
      if (focusCoordinates) {
        const [, newTargetTheta] = coordsToAngles(focusCoordinates[0], focusCoordinates[1]);
        targetPhi = newTargetTheta;
        phiRef.current += (targetPhi - phiRef.current) * 0.05;
      }

      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current,
        width: width * 2,
        height: width * 2,
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Pointer interaction for manual rotation
    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
    };

    const onPointerUp = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grab";
      }
    };

    const onPointerOut = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grab";
      }
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
  }, [focusCoordinates, coordsToAngles]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full aspect-square cursor-grab"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "block",
        }}
      />
      
      {/* Legend */}
      <div 
        className="absolute bottom-4 left-4 p-3 rounded-lg text-xs space-y-2"
        style={{ background: "var(--color-surface)", opacity: 0.95 }}
      >
        <div className="font-medium mb-2" style={{ color: "var(--color-text)" }}>
          Leyenda
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "oklch(65% 0.15 60)" }} />
          <span style={{ color: "var(--color-text-secondary)" }}>Origen africano/asiático</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "var(--color-cuba)" }} />
          <span style={{ color: "var(--color-text-secondary)" }}>Evolución cubana</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "var(--color-spain)" }} />
          <span style={{ color: "var(--color-text-secondary)" }}>Evolución flamenca</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "oklch(55% 0.1 250)" }} />
          <span style={{ color: "var(--color-text-secondary)" }}>Diáspora</span>
        </div>
      </div>
    </div>
  );
}
