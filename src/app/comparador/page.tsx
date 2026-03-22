import { RhythmGrid, Hypothesis, ConnectionTag } from "@/components";
import Link from "next/link";

// Patterns
const clavePattern = [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0];
const claveStrongBeats = [0, 6];

const flamencoPattern = [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1];
const flamencoStrongBeats = [2, 9, 11];
const flamencoLabels = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

const sharedConnections = [
  { label: "Asimetría como identidad", description: "Ambos rechazan el orden simétrico europeo" },
  { label: "Barrera de entrada", description: "Si no lo sientes, se nota. Marcador de pertenencia" },
  { label: "Trance colectivo", description: "Swing ↔ Duende — el ritmo te posee" },
  { label: "Resistencia codificada", description: "Subversión del orden a través del cuerpo" },
];

const comparisons = [
  { aspect: "Origen étnico", cuba: "Yoruba, Congo, Carabalí", spain: "Roma, Morisco, Sefardí" },
  { aspect: "Condición histórica", cuba: "Esclavitud", spain: "Persecución étnica" },
  { aspect: "Compás", cuba: "16 subdivisiones (2 compases)", spain: "12 tiempos (1 ciclo)" },
  { aspect: "Agrupación", cuba: "3 + 2 golpes", spain: "3+3+2+2+2" },
  { aspect: "Trance", cuba: "Swing", spain: "Duende" },
  { aspect: "Evolución", cuba: "Plantación → solar → cabaret", spain: "Fragua → juerga → tablao" },
  { aspect: "Apropiación", cuba: "Turismo americano 1920s", spain: "Franquismo 1940s-70s" },
  { aspect: "Exportación", cuba: "Salsa (NYC 1970s)", spain: "UNESCO 2010" },
];

export default function ComparadorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="px-6 py-16 text-center"
        style={{ background: "var(--color-surface)" }}
      >
        <h1 
          className="text-4xl mb-4"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Ritmos de Resistencia
        </h1>
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Clave Cubana vs Compás Flamenco — patrones paralelos, historias conectadas
        </p>
      </section>

      {/* Side by side */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Cuba */}
            <div 
              className="rounded-2xl p-8"
              style={{ 
                background: "var(--color-surface)",
                borderTop: "4px solid var(--color-cuba)",
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 
                    className="text-2xl"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    Clave de Son
                  </h2>
                  <p 
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Cuba · Caribe
                  </p>
                </div>
                <span 
                  className="text-xs px-2 py-1 rounded"
                  style={{ 
                    background: "var(--color-cuba-light)",
                    color: "var(--color-cuba-dark)",
                  }}
                >
                  s. XVI-XX
                </span>
              </div>
              
              <div 
                className="font-mono text-sm px-3 py-2 rounded mb-4"
                style={{ 
                  background: "var(--color-bg)",
                  color: "var(--color-cuba)",
                }}
              >
                |X..X..X.|....X.X.|
              </div>
              
              <RhythmGrid 
                pattern={clavePattern}
                strongBeats={claveStrongBeats}
                color="cuba"
                tempo={120}
              />
              
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-muted)" }}>Origen</span>
                  <span>Yoruba, Congo, Carabalí</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-muted)" }}>Condición</span>
                  <span>Esclavitud → marginalidad</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-muted)" }}>Función</span>
                  <span>Resistencia, identidad, ritual</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Hypothesis 
                  text="La síncopa es resistencia codificada. El colonizador marca UN-dos-TRES-cuatro. La clave pone peso donde no debería."
                  color="cuba"
                />
              </div>
              
              <Link 
                href="/ritmos/clave"
                className="mt-6 block text-center text-sm font-medium py-2 rounded-lg transition-all"
                style={{ 
                  background: "var(--color-cuba-light)",
                  color: "var(--color-cuba-dark)",
                }}
              >
                Ver análisis completo →
              </Link>
            </div>

            {/* Spain */}
            <div 
              className="rounded-2xl p-8"
              style={{ 
                background: "var(--color-surface)",
                borderTop: "4px solid var(--color-spain)",
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 
                    className="text-2xl"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    Compás de Soleá
                  </h2>
                  <p 
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Andalucía · España
                  </p>
                </div>
                <span 
                  className="text-xs px-2 py-1 rounded"
                  style={{ 
                    background: "var(--color-spain-light)",
                    color: "var(--color-spain-dark)",
                  }}
                >
                  s. XVIII-XX
                </span>
              </div>
              
              <div 
                className="font-mono text-sm px-3 py-2 rounded mb-4"
                style={{ 
                  background: "var(--color-bg)",
                  color: "var(--color-spain)",
                }}
              >
                12 1 2 [3] 4 5 [6] 7 [8] 9 [10] 11 [12]
              </div>
              
              <RhythmGrid 
                pattern={flamencoPattern}
                strongBeats={flamencoStrongBeats}
                labels={flamencoLabels}
                color="spain"
                tempo={100}
              />
              
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-muted)" }}>Origen</span>
                  <span>Roma, Morisco, Sefardí</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-muted)" }}>Condición</span>
                  <span>Persecución → marginalidad</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-text-muted)" }}>Función</span>
                  <span>Resistencia, identidad, duende</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Hypothesis 
                  text="El compás de 12 es un espacio de resistencia temporal. Si no lo sientes, se nota. Es un marcador de pertenencia."
                  color="spain"
                />
              </div>
              
              <Link 
                href="/ritmos/flamenco"
                className="mt-6 block text-center text-sm font-medium py-2 rounded-lg transition-all"
                style={{ 
                  background: "var(--color-spain-light)",
                  color: "var(--color-spain-dark)",
                }}
              >
                Ver análisis completo →
              </Link>
            </div>
          </div>

          {/* Shared connections */}
          <div 
            className="rounded-2xl p-8 mb-12"
            style={{ background: "var(--color-shared-light)" }}
          >
            <h2 
              className="text-2xl text-center mb-8"
              style={{ 
                fontFamily: "var(--font-fraunces), Georgia, serif",
                color: "oklch(35% 0.1 85)",
              }}
            >
              Lo que comparten
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sharedConnections.map((conn, i) => (
                <div key={i} className="text-center">
                  <div 
                    className="font-medium mb-2"
                    style={{ color: "oklch(35% 0.1 85)" }}
                  >
                    {conn.label}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {conn.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div 
            className="rounded-2xl p-8 mb-12"
            style={{ background: "var(--color-surface)" }}
          >
            <h2 
              className="text-2xl text-center mb-8"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Comparación
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                    <th className="text-left py-3 pr-4 font-medium" style={{ color: "var(--color-text-muted)" }}>
                      Aspecto
                    </th>
                    <th className="text-left py-3 px-4 font-medium" style={{ color: "var(--color-cuba)" }}>
                      Clave Cubana
                    </th>
                    <th className="text-left py-3 pl-4 font-medium" style={{ color: "var(--color-spain)" }}>
                      Compás Flamenco
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr 
                      key={i}
                      style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
                    >
                      <td 
                        className="py-3 pr-4"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {row.aspect}
                      </td>
                      <td className="py-3 px-4">{row.cuba}</td>
                      <td className="py-3 pl-4">{row.spain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shared hypothesis */}
          <div 
            className="rounded-2xl p-8 text-center"
            style={{ background: "var(--color-indigo-light)" }}
          >
            <h2 
              className="text-2xl mb-6"
              style={{ 
                fontFamily: "var(--font-fraunces), Georgia, serif",
                color: "var(--color-indigo)",
              }}
            >
              Hipótesis Compartida
            </h2>
            <p 
              className="text-lg leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-text)" }}
            >
              Ambos ritmos nacen de pueblos oprimidos. Ambos usan la <strong>asimetría</strong> como 
              forma de resistencia — rechazando el orden marcial europeo (1-2-3-4) con acentos que 
              caen "donde no deberían". Ambos crean <strong>barreras de entrada</strong> que marcan 
              pertenencia. Y ambos buscan un <strong>estado de trance colectivo</strong> (swing, duende) 
              donde el cuerpo escapa temporalmente del control — aunque la situación material no cambie.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <ConnectionTag label="Clave Cubana" type="parallel" />
              <ConnectionTag label="Compás Flamenco" type="parallel" />
              <ConnectionTag label="Swing Jazz" type="parallel" />
              <ConnectionTag label="Groove Funk" type="parallel" />
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
