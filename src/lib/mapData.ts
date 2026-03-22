/**
 * Geographic data for rhythm origins and migration routes
 */

export interface RhythmLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lon]
  region: string;
  type: "origin" | "evolution" | "diaspora";
  rhythms: string[];
  period: string;
  description: string;
  color: [number, number, number]; // RGB 0-1
}

export interface MigrationArc {
  id: string;
  from: string; // location id
  to: string; // location id
  name: string;
  period: string;
  description: string;
  type: "forced" | "cultural" | "commercial";
  color: [number, number, number];
}

// Locations
export const locations: RhythmLocation[] = [
  // Africa
  {
    id: "yoruba",
    name: "Territorio Yoruba",
    coordinates: [7.5, 4.0], // Nigeria
    region: "África Occidental",
    type: "origin",
    rhythms: ["Batá", "Dundun"],
    period: "Ancestral",
    description: "Origen de patrones rítmicos que se convertirían en la clave. Ritmos religiosos yoruba conectados con los orishas.",
    color: [0.8, 0.6, 0.2], // gold
  },
  {
    id: "congo",
    name: "Reino del Congo",
    coordinates: [-4.4, 15.3], // Congo
    region: "África Central",
    type: "origin",
    rhythms: ["Ritmos Bantú"],
    period: "Ancestral",
    description: "Tradiciones rítmicas bantú que influenciaron la rumba cubana y otros ritmos caribeños.",
    color: [0.8, 0.6, 0.2],
  },
  
  // Cuba
  {
    id: "havana",
    name: "La Habana",
    coordinates: [23.1, -82.4],
    region: "Cuba",
    type: "evolution",
    rhythms: ["Son", "Rumba", "Clave"],
    period: "s. XIX-XX",
    description: "Los solares habaneros: cuna de la rumba urbana. Fusión de tradiciones africanas en contexto colonial.",
    color: [0.7, 0.35, 0.25], // terracotta
  },
  {
    id: "santiago",
    name: "Santiago de Cuba",
    coordinates: [20.0, -75.8],
    region: "Cuba",
    type: "evolution",
    rhythms: ["Son Montuno", "Changüí"],
    period: "s. XIX",
    description: "Oriente cubano: donde nació el son. Influencia más directa de las tradiciones africanas.",
    color: [0.7, 0.35, 0.25],
  },
  
  // Spain
  {
    id: "sevilla",
    name: "Sevilla",
    coordinates: [37.4, -6.0],
    region: "Andalucía",
    type: "evolution",
    rhythms: ["Sevillanas", "Flamenco"],
    period: "s. XVIII-XX",
    description: "Triana: barrio gitano histórico. Fraguas y tabernas donde se forjó el cante jondo.",
    color: [0.5, 0.2, 0.15], // burgundy
  },
  {
    id: "jerez",
    name: "Jerez de la Frontera",
    coordinates: [36.7, -6.1],
    region: "Andalucía",
    type: "evolution",
    rhythms: ["Bulería", "Soleá"],
    period: "s. XIX-XX",
    description: "Capital de la bulería. Dinastías gitanas que definieron el flamenco moderno.",
    color: [0.5, 0.2, 0.15],
  },
  {
    id: "cadiz",
    name: "Cádiz",
    coordinates: [36.5, -6.3],
    region: "Andalucía",
    type: "evolution",
    rhythms: ["Alegrías", "Tangos"],
    period: "s. XIX",
    description: "Puerto histórico. Punto de contacto entre América y España. Influencia ida y vuelta.",
    color: [0.5, 0.2, 0.15],
  },
  
  // Diaspora
  {
    id: "nyc",
    name: "Nueva York",
    coordinates: [40.7, -74.0],
    region: "Estados Unidos",
    type: "diaspora",
    rhythms: ["Salsa", "Latin Jazz"],
    period: "1950s-1970s",
    description: "El Barrio y el Bronx: la clave cubana se transforma en salsa. Fania Records, identidad panlatina.",
    color: [0.4, 0.5, 0.7], // blue
  },
  {
    id: "puertorico",
    name: "Puerto Rico",
    coordinates: [18.2, -66.5],
    region: "Caribe",
    type: "diaspora",
    rhythms: ["Bomba", "Plena", "Reggaetón"],
    period: "s. XX-XXI",
    description: "Puente entre Cuba y NYC. La bomba como resistencia. Reggaetón: la clave en el s. XXI.",
    color: [0.4, 0.5, 0.7],
  },
  
  // Roma route
  {
    id: "rajasthan",
    name: "Rajastán",
    coordinates: [26.9, 75.8],
    region: "India",
    type: "origin",
    rhythms: ["Ritmos Rajasthani"],
    period: "Ancestral",
    description: "Origen propuesto del pueblo Roma. Tradiciones musicales que viajaron hacia occidente.",
    color: [0.6, 0.4, 0.5], // purple-ish
  },
];

// Migration arcs
export const arcs: MigrationArc[] = [
  // Slave trade routes
  {
    id: "yoruba-havana",
    from: "yoruba",
    to: "havana",
    name: "Trata esclavista",
    period: "s. XVI-XIX",
    description: "Millones de africanos forzados a cruzar el Atlántico. Con ellos viajaron sus ritmos, que sobrevivieron en cabildos y plantaciones.",
    type: "forced",
    color: [0.8, 0.5, 0.2],
  },
  {
    id: "congo-havana",
    from: "congo",
    to: "havana",
    name: "Trata esclavista",
    period: "s. XVI-XIX",
    description: "Tradiciones bantú del Congo que influyeron especialmente en la rumba y el guaguancó.",
    type: "forced",
    color: [0.8, 0.5, 0.2],
  },
  
  // Cuban diaspora
  {
    id: "havana-nyc",
    from: "havana",
    to: "nyc",
    name: "Diáspora cubana",
    period: "1950s-1970s",
    description: "Músicos cubanos emigran a NYC. La clave se encuentra con el jazz, nace la salsa.",
    type: "cultural",
    color: [0.7, 0.35, 0.25],
  },
  {
    id: "havana-puertorico",
    from: "havana",
    to: "puertorico",
    name: "Intercambio caribeño",
    period: "s. XX",
    description: "Flujo constante entre islas. La bomba puertorriqueña dialoga con el son cubano.",
    type: "cultural",
    color: [0.7, 0.35, 0.25],
  },
  {
    id: "puertorico-nyc",
    from: "puertorico",
    to: "nyc",
    name: "Migración boricua",
    period: "1940s-1970s",
    description: "Gran migración puertorriqueña. El Barrio como crisol de ritmos latinos.",
    type: "cultural",
    color: [0.4, 0.5, 0.7],
  },
  
  // Roma route
  {
    id: "rajasthan-sevilla",
    from: "rajasthan",
    to: "sevilla",
    name: "Ruta gitana",
    period: "s. X-XV",
    description: "Migración del pueblo Roma desde India hasta Europa. Siglos de viaje, persecución y adaptación.",
    type: "forced",
    color: [0.6, 0.4, 0.5],
  },
  
  // Atlantic exchange
  {
    id: "cadiz-havana",
    from: "cadiz",
    to: "havana",
    name: "Intercambio atlántico",
    period: "s. XVI-XX",
    description: "Puerto de Cádiz: puerta a América. Influencia ida y vuelta entre flamenco y música cubana.",
    type: "commercial",
    color: [0.5, 0.4, 0.4],
  },
];

// Helper to get location by id
export function getLocation(id: string): RhythmLocation | undefined {
  return locations.find(l => l.id === id);
}

// Helper to get arc endpoints as coordinates
export function getArcCoordinates(arc: MigrationArc): { from: [number, number]; to: [number, number] } | null {
  const fromLoc = getLocation(arc.from);
  const toLoc = getLocation(arc.to);
  if (!fromLoc || !toLoc) return null;
  return {
    from: fromLoc.coordinates,
    to: toLoc.coordinates,
  };
}
