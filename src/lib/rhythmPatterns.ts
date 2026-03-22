// Rhythm patterns as arrays of 16th notes (16 per 2 bars for clave, 12 for flamenco)
// Each layer has hits at specific positions with velocity (0-1)

export interface RhythmLayer {
  id: string;
  name: string;
  instrument: "clave" | "conga" | "bass" | "bell" | "palmas" | "cajon";
  pattern: number[]; // 0 = silence, 0.1-1 = hit with velocity
  color: string;
  muted: boolean;
}

export interface RhythmPreset {
  id: string;
  name: string;
  origin: string;
  tempo: number;
  gridSize: 16 | 12;
  layers: RhythmLayer[];
}

// Son Cubano - Full groove
export const sonCubano: RhythmPreset = {
  id: "son-cubano",
  name: "Son Cubano",
  origin: "Cuba",
  tempo: 110,
  gridSize: 16,
  layers: [
    {
      id: "clave",
      name: "Clave 3-2",
      instrument: "clave",
      // 1..4..7.....13.15..
      pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
      color: "var(--color-cuba)",
      muted: false,
    },
    {
      id: "conga-tumbao",
      name: "Conga Tumbao",
      instrument: "conga",
      // Contratiempo pattern - fills the gaps
      pattern: [0, 0, 0.6, 0, 0.8, 0, 0, 0.6, 0, 0, 0.6, 0, 0, 0.8, 0, 0.6],
      color: "oklch(55% 0.12 45)", // warm brown
      muted: false,
    },
    {
      id: "bass-tumbao",
      name: "Bajo Tumbao",
      instrument: "bass",
      // Anticipates the downbeat
      pattern: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0.8, 0],
      color: "oklch(40% 0.08 250)", // deep blue
      muted: false,
    },
    {
      id: "campana",
      name: "Campana",
      instrument: "bell",
      // Bell pattern - steady pulse with accents
      pattern: [1, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 0, 0.5, 0],
      color: "oklch(65% 0.15 85)", // gold
      muted: true, // start muted
    },
  ],
};

// Rumba Guaguancó
export const rumbaGuaguanco: RhythmPreset = {
  id: "rumba-guaguanco",
  name: "Rumba Guaguancó",
  origin: "Cuba",
  tempo: 95,
  gridSize: 16,
  layers: [
    {
      id: "clave-rumba",
      name: "Clave Rumba",
      instrument: "clave",
      // Third hit delayed vs son clave
      pattern: [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
      color: "var(--color-cuba)",
      muted: false,
    },
    {
      id: "quinto",
      name: "Quinto (lead)",
      instrument: "conga",
      // Improvisatory - simplified pattern
      pattern: [0, 0, 0.7, 0, 0, 0.9, 0, 0, 0.5, 0, 0, 0.8, 0, 0.6, 0, 0],
      color: "oklch(55% 0.12 45)",
      muted: false,
    },
    {
      id: "salidor",
      name: "Salidor (low)",
      instrument: "conga",
      // Steady low drum
      pattern: [0.8, 0, 0, 0, 0.6, 0, 0, 0, 0.8, 0, 0, 0, 0.6, 0, 0, 0],
      color: "oklch(45% 0.1 40)",
      muted: false,
    },
  ],
};

// Soleá Flamenca
export const soleaFlamenca: RhythmPreset = {
  id: "solea-flamenca",
  name: "Soleá",
  origin: "Andalucía",
  tempo: 90,
  gridSize: 12,
  layers: [
    {
      id: "palmas-compas",
      name: "Palmas Compás",
      instrument: "palmas",
      // Accents on 3, 6, 8, 10, 12 (0-indexed: 2, 5, 7, 9, 11)
      pattern: [0, 0, 1, 0, 0, 0.8, 0, 0.8, 0, 1, 0, 1],
      color: "var(--color-spain)",
      muted: false,
    },
    {
      id: "palmas-contratiempo",
      name: "Palmas Contratiempo",
      instrument: "palmas",
      // Fills between main accents
      pattern: [0.4, 0.4, 0, 0.4, 0.4, 0, 0.4, 0, 0.4, 0, 0.4, 0],
      color: "oklch(55% 0.12 15)",
      muted: true,
    },
    {
      id: "cajon-base",
      name: "Cajón",
      instrument: "cajon",
      // Bass hits on main accents
      pattern: [0, 0, 0.9, 0, 0, 0.7, 0, 0.7, 0, 0.9, 0, 1],
      color: "oklch(35% 0.1 30)",
      muted: false,
    },
  ],
};

// Bulería
export const buleria: RhythmPreset = {
  id: "buleria",
  name: "Bulería",
  origin: "Andalucía",
  tempo: 220,
  gridSize: 12,
  layers: [
    {
      id: "palmas-buleria",
      name: "Palmas",
      instrument: "palmas",
      // Fast, driving pattern
      pattern: [0, 0, 1, 0, 0, 0.9, 0, 1, 0, 1, 0, 1],
      color: "var(--color-spain)",
      muted: false,
    },
    {
      id: "cajon-buleria",
      name: "Cajón",
      instrument: "cajon",
      // Syncopated hits
      pattern: [0.5, 0, 0.9, 0.5, 0, 0.8, 0.5, 0.9, 0, 1, 0.6, 0.9],
      color: "oklch(35% 0.1 30)",
      muted: false,
    },
  ],
};

export const allPresets: RhythmPreset[] = [
  sonCubano,
  rumbaGuaguanco,
  soleaFlamenca,
  buleria,
];
