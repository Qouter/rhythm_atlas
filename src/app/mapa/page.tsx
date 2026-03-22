"use client";

import { useState } from "react";
import { Globe } from "@/components/Globe";
import { LocationPanel } from "@/components/LocationPanel";
import { locations, arcs, type RhythmLocation, type MigrationArc } from "@/lib/mapData";

export default function MapaPage() {
  const [selectedLocation, setSelectedLocation] = useState<RhythmLocation | null>(null);
  const [selectedArc, setSelectedArc] = useState<MigrationArc | null>(null);
  const [focusCoords, setFocusCoords] = useState<[number, number] | undefined>(undefined);

  const handleSelectLocation = (locId: string) => {
    const loc = locations.find(l => l.id === locId);
    if (loc) {
      setSelectedLocation(loc);
      setSelectedArc(null);
      setFocusCoords(loc.coordinates);
    }
  };

  const handleSelectArc = (arcId: string) => {
    const arc = arcs.find(a => a.id === arcId);
    if (arc) {
      setSelectedArc(arc);
      setSelectedLocation(null);
      // Focus on midpoint of arc
      const fromLoc = locations.find(l => l.id === arc.from);
      const toLoc = locations.find(l => l.id === arc.to);
      if (fromLoc && toLoc) {
        setFocusCoords([
          (fromLoc.coordinates[0] + toLoc.coordinates[0]) / 2,
          (fromLoc.coordinates[1] + toLoc.coordinates[1]) / 2,
        ]);
      }
    }
  };

  const handleClose = () => {
    setSelectedLocation(null);
    setSelectedArc(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="px-6 py-12 text-center"
        style={{ background: "var(--color-surface)" }}
      >
        <h1 
          className="text-4xl mb-4"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Atlas Geográfico
        </h1>
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Las rutas del ritmo. Desde África y Asia hasta el Caribe y Europa — 
          los caminos de la música a través de siglos de migración.
        </p>
      </section>

      {/* Globe + Panel */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Globe */}
            <div className="lg:col-span-2">
              <Globe 
                onSelectLocation={setSelectedLocation}
                onSelectArc={setSelectedArc}
                selectedLocationId={selectedLocation?.id}
                focusCoordinates={focusCoords}
              />
              
              {/* Instructions */}
              <p 
                className="text-center text-sm mt-4"
                style={{ color: "var(--color-text-muted)" }}
              >
                🌍 Arrastra para rotar el globo. Haz click en un lugar de la lista para explorar.
              </p>
            </div>

            {/* Location list + Panel */}
            <div className="space-y-4">
              {/* Panel when selected */}
              {(selectedLocation || selectedArc) && (
                <LocationPanel 
                  location={selectedLocation}
                  arc={selectedArc}
                  onClose={handleClose}
                />
              )}

              {/* Location list */}
              <div 
                className="rounded-2xl p-6"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-4">Lugares</h3>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc.id)}
                      className="w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-3"
                      style={{
                        background: selectedLocation?.id === loc.id 
                          ? `rgb(${loc.color.map(c => Math.round(c * 255)).join(",")})20`
                          : "transparent",
                        borderLeft: selectedLocation?.id === loc.id
                          ? `3px solid rgb(${loc.color.map(c => Math.round(c * 255)).join(",")})`
                          : "3px solid transparent",
                      }}
                    >
                      <div 
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ 
                          background: `rgb(${loc.color.map(c => Math.round(c * 255)).join(",")})`,
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div 
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--color-text)" }}
                        >
                          {loc.name}
                        </div>
                        <div 
                          className="text-xs truncate"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {loc.region}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Arcs list */}
              <div 
                className="rounded-2xl p-6"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-4">Rutas</h3>
                <div className="space-y-2">
                  {arcs.map(arc => (
                    <button
                      key={arc.id}
                      onClick={() => handleSelectArc(arc.id)}
                      className="w-full text-left px-3 py-2 rounded-lg transition-all"
                      style={{
                        background: selectedArc?.id === arc.id 
                          ? `rgb(${arc.color.map(c => Math.round(c * 255)).join(",")})20`
                          : "transparent",
                        borderLeft: selectedArc?.id === arc.id
                          ? `3px solid rgb(${arc.color.map(c => Math.round(c * 255)).join(",")})`
                          : "3px solid transparent",
                      }}
                    >
                      <div 
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text)" }}
                      >
                        {arc.name}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {arc.period}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context section */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div 
            className="rounded-2xl p-8"
            style={{ background: "var(--color-shared-light)" }}
          >
            <h2 
              className="text-2xl mb-6 text-center"
              style={{ 
                fontFamily: "var(--font-fraunces), Georgia, serif",
                color: "oklch(35% 0.1 85)",
              }}
            >
              Rutas de la Música
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 
                  className="font-medium mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  La ruta atlántica
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  La trata esclavista forzó a millones de africanos a cruzar el océano. 
                  Con ellos viajaron ritmos yoruba y bantú que, en Cuba, se fusionaron 
                  con tradiciones españolas para crear la clave, el son, y la rumba. 
                  Siglos después, la diáspora cubana llevó estos ritmos a Nueva York, 
                  donde nació la salsa.
                </p>
              </div>
              <div>
                <h3 
                  className="font-medium mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  La ruta gitana
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  El pueblo Roma migró desde el norte de India hacia Europa durante siglos, 
                  llevando consigo tradiciones musicales. En Andalucía, estas se fusionaron 
                  con influencias árabes, judías y autóctonas para crear el flamenco. 
                  Una música nacida de la marginación y la resistencia.
                </p>
              </div>
            </div>
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
