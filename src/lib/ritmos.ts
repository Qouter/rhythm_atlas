/**
 * Centralized rhythm database
 * Structured for filtering, search, and dynamic page generation
 */

export interface Ritmo {
  id: string;
  name: string;
  subtitle?: string;
  
  // Classification (for filtering)
  region: "africa" | "caribe" | "iberia" | "latam" | "northamerica";
  country: string;
  period: "ancestral" | "colonial" | "modern" | "contemporary";
  compas: "binary" | "ternary" | "12beat" | "polymetric";
  function: ("ritual" | "work" | "dance" | "resistance" | "commercial")[];
  
  // Pattern
  pattern: number[];
  gridSize: 16 | 12 | 8;
  strongBeats: number[];
  notation: string;
  tempo: { min: number; max: number; typical: number };
  
  // Context
  origins: string[];
  descendants: string[];
  parallels: string[];
  
  timeline: {
    period: string;
    title: string;
    description: string;
  }[];
  
  context: {
    ethnic: string;
    condition: string;
    function: string;
    spaces: string;
  };
  
  hypotheses: {
    title: string;
    text: string;
  }[];
  
  // For search indexing
  keywords: string[];
  
  // UI
  color: string;
  colorLight: string;
  colorDark: string;
}

// Filter options with labels
export const regions = {
  africa: { label: "África", emoji: "🌍" },
  caribe: { label: "Caribe", emoji: "🌴" },
  iberia: { label: "Iberia", emoji: "🇪🇸" },
  latam: { label: "América Latina", emoji: "🌎" },
  northamerica: { label: "Norteamérica", emoji: "🇺🇸" },
};

export const periods = {
  ancestral: { label: "Ancestral", range: "antes s.XVI" },
  colonial: { label: "Colonial", range: "s.XVI-XIX" },
  modern: { label: "Moderno", range: "s.XX" },
  contemporary: { label: "Contemporáneo", range: "s.XXI" },
};

export const compases = {
  binary: { label: "Binario", description: "4/4, 2/4" },
  ternary: { label: "Ternario", description: "3/4, 6/8" },
  "12beat": { label: "12 tiempos", description: "Flamenco, Afro 6/8" },
  polymetric: { label: "Polimétrico", description: "Múltiples capas" },
};

export const functions = {
  ritual: { label: "Ritual/Religioso", emoji: "🙏" },
  work: { label: "Trabajo", emoji: "⚒️" },
  dance: { label: "Fiesta/Baile", emoji: "💃" },
  resistance: { label: "Resistencia", emoji: "✊" },
  commercial: { label: "Comercial", emoji: "🎵" },
};

// The rhythm database
export const ritmos: Ritmo[] = [
  // ============ CUBA / CARIBE ============
  {
    id: "clave-son",
    name: "Clave de Son",
    subtitle: "El corazón del Caribe",
    region: "caribe",
    country: "Cuba",
    period: "colonial",
    compas: "binary",
    function: ["resistance", "dance", "ritual"],
    
    pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    gridSize: 16,
    strongBeats: [0, 6],
    notation: "|X..X..X.|....X.X.|",
    tempo: { min: 90, max: 200, typical: 120 },
    
    origins: ["Yoruba bell pattern", "Congo", "Kpanlogo"],
    descendants: ["Salsa", "Timba", "Reggaetón"],
    parallels: ["Compás flamenco"],
    
    timeline: [
      { period: "1600-1850", title: "Formación", description: "En las plantaciones de azúcar, los esclavizados mantienen ritmos africanos como forma de resistencia espiritual y comunicación encubierta." },
      { period: "1886", title: "Abolición", description: "Cuba es el último país de América en abolir la esclavitud. La comunidad negra se concentra en los solares urbanos." },
      { period: "1920-1959", title: "Era dorada", description: "La Habana se convierte en la capital mundial del ritmo. Los cabarets 'blanquean' la música negra para turistas americanos." },
      { period: "1959+", title: "Revolución", description: "Casas de cultura preservan las tradiciones. La música viaja a NYC con la diáspora, nace la salsa." },
    ],
    
    context: {
      ethnic: "Yoruba, Congo, Carabalí",
      condition: "Esclavitud → marginalidad",
      function: "Resistencia, identidad, ritual",
      spaces: "Plantación → solar → cabaret",
    },
    
    hypotheses: [
      { title: "Síncopa como resistencia", text: "La síncopa es resistencia codificada. El colonizador marca UN-dos-TRES-cuatro. La clave pone peso donde no debería — dice 'sí' con la boca mientras el cuerpo dice 'no'." },
      { title: "Asimetría y opresión", text: "La asimetría 3-2 refleja la experiencia vivida de opresión. Nada está balanceado. El trabajo no es justo. El poder no es equitativo. El ritmo tampoco." },
    ],
    
    keywords: ["clave", "son", "cuba", "salsa", "afrocubano", "3-2", "tumbao", "habana"],
    
    color: "var(--color-cuba)",
    colorLight: "var(--color-cuba-light)",
    colorDark: "var(--color-cuba-dark)",
  },
  
  {
    id: "rumba-guaguanco",
    name: "Rumba Guaguancó",
    subtitle: "El ritmo de los solares",
    region: "caribe",
    country: "Cuba",
    period: "colonial",
    compas: "binary",
    function: ["dance", "resistance", "ritual"],
    
    pattern: [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    gridSize: 16,
    strongBeats: [0, 7],
    notation: "|X..X...X|....X.X.|",
    tempo: { min: 70, max: 140, typical: 95 },
    
    origins: ["Clave de son", "Tradiciones Bantú"],
    descendants: ["Timba", "Rumba moderna"],
    parallels: ["Clave de son"],
    
    timeline: [
      { period: "1880s", title: "Origen", description: "Nace en los solares habaneros tras la abolición. Espacio de recreación y expresión de la comunidad negra urbana." },
      { period: "1900-1950", title: "Consolidación", description: "Se definen los tres estilos: yambú (lento), guaguancó (medio) y columbia (rápido, solo hombres)." },
    ],
    
    context: {
      ethnic: "Afrocubano urbano",
      condition: "Post-abolición, marginalidad urbana",
      function: "Recreación, cortejo, identidad barrial",
      spaces: "Solares, patios, calles",
    },
    
    hypotheses: [
      { title: "El tercer golpe", text: "La clave de rumba desplaza el tercer golpe respecto a la clave de son. Este desplazamiento crea más tensión, más espacio para la improvisación." },
    ],
    
    keywords: ["rumba", "guaguancó", "solar", "cuba", "baile", "afrocubano"],
    
    color: "var(--color-cuba)",
    colorLight: "var(--color-cuba-light)",
    colorDark: "var(--color-cuba-dark)",
  },
  
  // ============ SPAIN / IBERIA ============
  {
    id: "solea",
    name: "Soleá",
    subtitle: "La madre del flamenco",
    region: "iberia",
    country: "España",
    period: "modern",
    compas: "12beat",
    function: ["resistance", "ritual"],
    
    pattern: [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    gridSize: 12,
    strongBeats: [2, 9, 11],
    notation: "12 1 2 [3] 4 5 [6] 7 [8] 9 [10] 11 [12]",
    tempo: { min: 80, max: 120, typical: 100 },
    
    origins: ["Música romaní", "Modos árabes", "Folclore andaluz"],
    descendants: ["Bulería", "Alegrías", "Nuevo flamenco"],
    parallels: ["Clave de son"],
    
    timeline: [
      { period: "1499-1749", title: "Persecución", description: "Pragmáticas anti-gitanas. Prohibición de lengua, vestimenta, oficios. Gran Redada de 1749." },
      { period: "1850-1920", title: "Cafés cantantes", description: "El flamenco pasa de vergüenza a atracción. Profesionalización." },
      { period: "1936-1975", title: "Franquismo", description: "Apropiación como folclore nacional. Versión edulcorada." },
      { period: "1975+", title: "Renacimiento", description: "Camarón y Paco de Lucía revolucionan el género. UNESCO 2010." },
    ],
    
    context: {
      ethnic: "Roma, Morisco, Sefardí",
      condition: "Persecución → marginalidad",
      function: "Resistencia, identidad, duende",
      spaces: "Fragua → juerga → tablao",
    },
    
    hypotheses: [
      { title: "Compás como barrera", text: "El compás de 12 es un espacio de resistencia temporal. 12 tiempos es difícil de seguir para el no iniciado. Si no lo sientes, se nota." },
      { title: "Rechazo del orden", text: "Los acentos 'raros' (3,6,8,10,12) rechazan el orden marcial europeo. La marcha es 1-2-3-4. El flamenco dice: 'vuestro orden no es el mío'." },
    ],
    
    keywords: ["soleá", "flamenco", "compás", "andalucía", "gitano", "duende", "12 tiempos"],
    
    color: "var(--color-spain)",
    colorLight: "var(--color-spain-light)",
    colorDark: "var(--color-spain-dark)",
  },
  
  {
    id: "buleria",
    name: "Bulería",
    subtitle: "El palo más rápido",
    region: "iberia",
    country: "España",
    period: "modern",
    compas: "12beat",
    function: ["dance", "resistance"],
    
    pattern: [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    gridSize: 12,
    strongBeats: [2, 9, 11],
    notation: "12 1 2 [3] 4 5 [6] 7 [8] 9 [10] 11 [12]",
    tempo: { min: 200, max: 280, typical: 220 },
    
    origins: ["Soleá"],
    descendants: ["Bulería por soleá", "Flamenco fusion"],
    parallels: [],
    
    timeline: [
      { period: "s.XIX", title: "Origen", description: "Deriva de la soleá pero a velocidad vertiginosa. Jerez como epicentro." },
      { period: "s.XX", title: "Virtuosismo", description: "Se convierte en el palo de cierre, el momento de lucimiento y fiesta." },
    ],
    
    context: {
      ethnic: "Gitano andaluz",
      condition: "Tradición familiar",
      function: "Fiesta, virtuosismo, cierre",
      spaces: "Juergas, tablaos, festivales",
    },
    
    hypotheses: [
      { title: "Velocidad como libertad", text: "A 240 BPM el pensamiento consciente no puede seguir. El cuerpo toma control. Es una forma de trance accesible." },
    ],
    
    keywords: ["bulería", "flamenco", "jerez", "rápido", "fiesta", "palmas"],
    
    color: "var(--color-spain)",
    colorLight: "var(--color-spain-light)",
    colorDark: "var(--color-spain-dark)",
  },
  
  // ============ PLACEHOLDER para futuros ============
  // Estos son stubs para mostrar cómo escala el sistema
  
  {
    id: "dembow",
    name: "Dembow",
    subtitle: "El ritmo del reggaetón",
    region: "caribe",
    country: "Puerto Rico / Jamaica",
    period: "contemporary",
    compas: "binary",
    function: ["dance", "commercial"],
    
    pattern: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    gridSize: 16,
    strongBeats: [0, 3, 6, 8, 11, 14],
    notation: "|X..X..X.|X..X..X.|",
    tempo: { min: 85, max: 105, typical: 95 },
    
    origins: ["Dancehall", "Clave cubana"],
    descendants: ["Reggaetón", "Trap latino"],
    parallels: [],
    
    timeline: [
      { period: "1990s", title: "Jamaica", description: "Shabba Ranks y el riddim 'Dem Bow' crean el patrón base." },
      { period: "2000s", title: "Puerto Rico", description: "DJ Playero, Daddy Yankee. El dembow se fusiona con hip-hop latino." },
      { period: "2010s+", title: "Global", description: "Despacito, Bad Bunny. El ritmo conquista el mainstream mundial." },
    ],
    
    context: {
      ethnic: "Afrocaribeño, urbano",
      condition: "Pobreza urbana, caseríos",
      function: "Baile, identidad juvenil",
      spaces: "Discotecas, reggaetoneras, streaming",
    },
    
    hypotheses: [
      { title: "La clave simplificada", text: "El dembow es una simplificación de la clave cubana para consumo masivo. Pierde complejidad, gana accesibilidad." },
    ],
    
    keywords: ["dembow", "reggaeton", "puerto rico", "bad bunny", "dancehall", "urbano"],
    
    color: "oklch(50% 0.15 280)",
    colorLight: "oklch(92% 0.04 280)",
    colorDark: "oklch(35% 0.12 280)",
  },
];

// Helper functions
export function getRitmoById(id: string): Ritmo | undefined {
  return ritmos.find(r => r.id === id);
}

export function getRitmosByRegion(region: Ritmo["region"]): Ritmo[] {
  return ritmos.filter(r => r.region === region);
}

export function getRitmosByPeriod(period: Ritmo["period"]): Ritmo[] {
  return ritmos.filter(r => r.period === period);
}

export function searchRitmos(query: string): Ritmo[] {
  const q = query.toLowerCase().trim();
  if (!q) return ritmos;
  
  return ritmos.filter(r => 
    r.name.toLowerCase().includes(q) ||
    r.country.toLowerCase().includes(q) ||
    r.keywords.some(k => k.includes(q))
  );
}

export function getRelatedRitmos(ritmo: Ritmo): Ritmo[] {
  const relatedIds = [...ritmo.origins, ...ritmo.descendants, ...ritmo.parallels];
  return ritmos.filter(r => 
    relatedIds.some(id => r.name.toLowerCase().includes(id.toLowerCase()) || r.id === id) &&
    r.id !== ritmo.id
  );
}
