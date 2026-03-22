"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface RhythmGridProps {
  pattern: number[]; // 1s and 0s
  strongBeats?: number[]; // indices of strong beats (0-indexed)
  labels?: string[]; // optional labels for each beat
  color?: "cuba" | "spain";
  tempo?: number; // BPM
}

export function RhythmGrid({ 
  pattern, 
  strongBeats = [], 
  labels,
  color = "cuba",
  tempo = 120 
}: RhythmGridProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const colors = {
    cuba: {
      hit: "var(--color-cuba)",
      strong: "var(--color-cuba-dark)",
      light: "var(--color-cuba-light)",
    },
    spain: {
      hit: "var(--color-spain)",
      strong: "var(--color-spain-dark)",
      light: "var(--color-spain-light)",
    },
  };

  const playClick = useCallback((isHit: boolean, isStrong: boolean) => {
    if (!audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = isHit ? (isStrong ? 1200 : 1000) : 400;
    osc.type = "sine";
    
    gain.gain.setValueAtTime(isHit ? 0.3 : 0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }, []);

  const tick = useCallback((beatIndex: number) => {
    setCurrentBeat(beatIndex);
    
    const isHit = pattern[beatIndex] === 1;
    const isStrong = strongBeats.includes(beatIndex);
    
    if (isHit) {
      playClick(true, isStrong);
    }
  }, [pattern, strongBeats, playClick]);

  const play = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    
    setIsPlaying(true);
    let beat = 0;
    
    // 16th notes at given tempo
    const interval = (60000 / tempo) / 4;
    
    tick(beat);
    intervalRef.current = setInterval(() => {
      beat = (beat + 1) % pattern.length;
      tick(beat);
    }, interval);
  }, [tempo, pattern.length, tick]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(-1);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Determine bar divisions (8 beats per bar for clave, 12 for flamenco)
  const barLength = pattern.length === 12 ? 12 : 8;

  return (
    <div className="space-y-4">
      {/* Beat grid */}
      <div className="flex flex-wrap gap-1 items-center">
        {pattern.map((hit, i) => {
          const isHit = hit === 1;
          const isStrong = strongBeats.includes(i);
          const isActive = currentBeat === i;
          const showDivider = (i + 1) % barLength === 0 && i < pattern.length - 1;

          return (
            <div key={i} className="flex items-center gap-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-100"
                style={{
                  background: isHit 
                    ? (isStrong ? colors[color].strong : colors[color].hit)
                    : "var(--color-silence)",
                  color: isHit ? "white" : "var(--color-text-muted)",
                  transform: isActive ? "scale(1.25)" : "scale(1)",
                  boxShadow: isActive && isHit 
                    ? `0 0 20px ${colors[color].hit}` 
                    : isStrong && isHit 
                      ? `0 0 0 3px ${colors[color].light}`
                      : "none",
                }}
              >
                {labels?.[i] ?? i + 1}
              </div>
              {showDivider && (
                <div 
                  className="w-0.5 h-7 mx-1"
                  style={{ background: "var(--color-border)" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={isPlaying ? stop : play}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            background: colors[color].hit,
            color: "white",
          }}
        >
          {isPlaying ? "⏸ Pausar" : "▶ Reproducir"}
        </button>
        <span 
          className="text-xs"
          style={{ 
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-muted)",
          }}
        >
          {tempo} BPM
        </span>
      </div>
    </div>
  );
}
