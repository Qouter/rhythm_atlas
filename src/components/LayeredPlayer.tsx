"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { RhythmPreset, RhythmLayer } from "@/lib/rhythmPatterns";
import { playInstrument, initAudio } from "@/lib/instruments";

interface LayeredPlayerProps {
  preset: RhythmPreset;
  onPresetChange?: (presetId: string) => void;
  presetOptions?: { id: string; name: string; origin: string }[];
}

export function LayeredPlayer({ preset, onPresetChange, presetOptions }: LayeredPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [layers, setLayers] = useState<RhythmLayer[]>(preset.layers);
  const [tempo, setTempo] = useState(preset.tempo);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const beatRef = useRef(0);
  
  // Update layers when preset changes
  useEffect(() => {
    setLayers(preset.layers);
    setTempo(preset.tempo);
    if (isPlaying) {
      stop();
    }
  }, [preset]);

  const tick = useCallback(() => {
    const beat = beatRef.current;
    setCurrentBeat(beat);
    
    // Play each unmuted layer
    layers.forEach(layer => {
      if (!layer.muted && layer.pattern[beat] > 0) {
        const velocity = layer.pattern[beat];
        // Determine if it's a slap based on velocity
        const isSlap = velocity > 0.75;
        playInstrument(layer.instrument, velocity, { isSlap });
      }
    });
    
    beatRef.current = (beat + 1) % preset.gridSize;
  }, [layers, preset.gridSize]);

  const play = useCallback(() => {
    // Initialize audio system
    initAudio();
    
    setIsPlaying(true);
    beatRef.current = 0;
    
    // Calculate interval: for 16 grid = 16th notes, for 12 grid = 8th note triplets
    const beatsPerBar = preset.gridSize === 16 ? 4 : 4;
    const subdivisionsPerBeat = preset.gridSize / beatsPerBar;
    const intervalMs = (60000 / tempo) / subdivisionsPerBeat;
    
    tick();
    intervalRef.current = setInterval(tick, intervalMs);
  }, [tempo, preset.gridSize, tick]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(-1);
    beatRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const toggleLayer = useCallback((layerId: string) => {
    setLayers(prev => prev.map(l => 
      l.id === layerId ? { ...l, muted: !l.muted } : l
    ));
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Recalculate interval when tempo changes
  useEffect(() => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const beatsPerBar = preset.gridSize === 16 ? 4 : 4;
      const subdivisionsPerBeat = preset.gridSize / beatsPerBar;
      const intervalMs = (60000 / tempo) / subdivisionsPerBeat;
      intervalRef.current = setInterval(tick, intervalMs);
    }
  }, [tempo, isPlaying, preset.gridSize, tick]);

  return (
    <div 
      className="rounded-2xl p-6"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 
            className="text-xl font-medium"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {preset.name}
          </h3>
          <p 
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {preset.origin}
          </p>
        </div>
        
        {presetOptions && presetOptions.length > 1 && (
          <select
            value={preset.id}
            onChange={(e) => onPresetChange?.(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm"
            style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            {presetOptions.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.origin})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Layer controls */}
      <div className="space-y-3 mb-6">
        {layers.map(layer => (
          <div 
            key={layer.id}
            className="flex items-center gap-4"
          >
            {/* Mute toggle */}
            <button
              onClick={() => toggleLayer(layer.id)}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all"
              style={{
                background: layer.muted ? "var(--color-silence)" : layer.color,
                color: layer.muted ? "var(--color-text-muted)" : "white",
                opacity: layer.muted ? 0.6 : 1,
              }}
            >
              {layer.muted ? "OFF" : "ON"}
            </button>
            
            {/* Layer name */}
            <span 
              className="w-36 text-sm font-medium"
              style={{ 
                color: layer.muted ? "var(--color-text-muted)" : "var(--color-text)",
              }}
            >
              {layer.name}
            </span>
            
            {/* Pattern visualization */}
            <div className="flex gap-0.5 flex-1">
              {layer.pattern.map((hit, i) => (
                <div
                  key={i}
                  className="h-8 flex-1 rounded-sm transition-all duration-75"
                  style={{
                    background: hit > 0 
                      ? layer.muted 
                        ? "var(--color-silence)"
                        : layer.color
                      : "var(--color-bg)",
                    opacity: hit > 0 ? (layer.muted ? 0.3 : 0.3 + hit * 0.7) : 1,
                    transform: currentBeat === i ? "scaleY(1.4)" : "scaleY(1)",
                    boxShadow: currentBeat === i && hit > 0 && !layer.muted
                      ? `0 0 12px ${layer.color}`
                      : "none",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Transport controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={isPlaying ? stop : play}
          className="px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
          style={{
            background: preset.origin === "Cuba" ? "var(--color-cuba)" : "var(--color-spain)",
            color: "white",
          }}
        >
          {isPlaying ? "⏸ Pausar" : "▶ Reproducir"}
        </button>
        
        {/* Tempo control */}
        <div className="flex items-center gap-3">
          <span 
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Tempo:
          </span>
          <input
            type="range"
            min={60}
            max={280}
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-32 accent-current"
            style={{ accentColor: preset.origin === "Cuba" ? "var(--color-cuba)" : "var(--color-spain)" }}
          />
          <span 
            className="text-sm w-20 font-mono"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {tempo} BPM
          </span>
        </div>
      </div>

      {/* Instructions */}
      <p 
        className="text-xs mt-4"
        style={{ color: "var(--color-text-muted)" }}
      >
        💡 Click en ON/OFF para activar o silenciar cada capa. 
        Las barras más altas indican golpes más fuertes.
      </p>
    </div>
  );
}
