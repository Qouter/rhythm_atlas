import { RhythmGrid, Timeline, ContextCard, Hypothesis, ConnectionTag } from "@/components";

// Clave de Son 3-2 pattern (16 subdivisions)
const clavePattern = [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0];
const strongBeats = [0, 6]; // beats 1 and 7

const timelineEvents = [
  {
    period: "1600-1850",
    title: "Formación.",
    description: "En las plantaciones de azúcar, los esclavizados mantienen ritmos africanos como forma de resistencia espiritual y comunicación encubierta.",
  },
  {
    period: "1886",
    title: "Abolición.",
    description: "Cuba es el último país de América en abolir la esclavitud. La comunidad negra se concentra en los solares urbanos.",
  },
  {
    period: "1920-1959",
    title: "Era dorada.",
    description: "La Habana se convierte en la capital mundial del ritmo. Los cabarets 'blanquean' la música negra para turistas americanos.",
  },
  {
    period: "1959+",
    title: "Revolución.",
    description: "Casas de cultura preservan las tradiciones. La música viaja a NYC con la diáspora, nace la salsa.",
  },
];

const contextItems = [
  { label: "Origen étnico", value: "Yoruba, Congo, Carabalí" },
  { label: "Condición", value: "Esclavitud → marginalidad" },
  { label: "Función", value: "Resistencia, identidad, ritual" },
  { label: "Espacios", value: "Plantación → solar → cabaret" },
];

export default function ClavePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="px-6 py-16"
        style={{ 
          background: "var(--color-surface)",
          borderBottom: "4px solid var(--color-cuba)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 
                className="text-4xl mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                La Clave
              </h1>
              <p style={{ color: "var(--color-text-secondary)" }}>
                El corazón rítmico del Caribe — Cuba, siglos XVI-XX
              </p>
            </div>
            <span 
              className="text-xs px-3 py-1 rounded"
              style={{ 
                background: "var(--color-cuba-light)",
                color: "var(--color-cuba-dark)",
              }}
            >
              Siglos XVI-XX
            </span>
          </div>
          
          {/* Notation */}
          <div 
            className="font-mono text-lg px-4 py-3 rounded-lg mb-6"
            style={{ 
              background: "var(--color-bg)",
              color: "var(--color-text-secondary)",
            }}
          >
            <span style={{ color: "var(--color-cuba)", fontWeight: 700 }}>|X</span>
            ..<span style={{ color: "var(--color-cuba)", fontWeight: 700 }}>X</span>
            ..<span style={{ color: "var(--color-cuba)", fontWeight: 700 }}>X</span>
            .|....<span style={{ color: "var(--color-cuba)", fontWeight: 700 }}>X</span>
            .<span style={{ color: "var(--color-cuba)", fontWeight: 700 }}>X</span>.|
            <span className="ml-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Clave de Son 3-2
            </span>
          </div>
          
          <RhythmGrid 
            pattern={clavePattern}
            strongBeats={strongBeats}
            color="cuba"
            tempo={120}
          />
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left column - Analysis */}
            <div className="lg:col-span-3 space-y-8">
              {/* El Patrón */}
              <div>
                <h2 
                  className="text-2xl mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  El Patrón
                </h2>
                <p 
                  className="mb-4"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  La clave es un patrón de <strong style={{ color: "var(--color-text)" }}>5 golpes en 2 compases</strong>. 
                  La versión "3-2" tiene tres golpes en el primer compás y dos en el segundo. 
                  La versión "2-3" lo invierte.
                </p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  La clave es <strong style={{ color: "var(--color-text)" }}>asimétrica por diseño</strong>. 
                  El lado de 3 establece el "ground", el lado de 2 crea suspensión. 
                  Esta asimetría es lo que genera el <em>swing</em> — la música respira, no marcha.
                </p>
              </div>

              {/* Análisis */}
              <div>
                <h2 
                  className="text-2xl mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Análisis Rítmico
                </h2>
                
                <div className="space-y-4">
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">Acentuación</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <strong>Golpes fuertes:</strong> 1 (ancla), 7 (cierre del lado de 3)<br/>
                      <strong>Golpe de tensión:</strong> El beat 13-15 del lado de 2 — crea anticipación<br/>
                      <strong>Resolución:</strong> Regreso al 1
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">Poliritmia típica</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      La clave raramente se toca sola. Se entrelaza con:<br/>
                      • <strong>Bajo (tumbao):</strong> Contratiempo, llena los silencios<br/>
                      • <strong>Campana:</strong> Patrón propio que dialoga<br/>
                      • <strong>Conga:</strong> Múltiples patrones según la sección
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">Tempo</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <strong>Son tradicional:</strong> 90-120 BPM (conversacional, para bailar pegado)<br/>
                      <strong>Salsa moderna:</strong> 160-200 BPM (energético, para lucirse)<br/>
                      <strong>Rumba:</strong> Variable, a menudo más lento para improvisar
                    </p>
                  </div>
                </div>
              </div>

              {/* Hipótesis */}
              <div>
                <h2 
                  className="text-2xl mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Hipótesis de Conexión
                </h2>
                
                <div className="space-y-4">
                  <Hypothesis 
                    text="La síncopa es resistencia codificada. El colonizador marca UN-dos-TRES-cuatro. La clave pone peso donde no debería — dice 'sí' con la boca mientras el cuerpo dice 'no'."
                    color="cuba"
                  />
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">¿Por qué 3-2 y no simétrico?</h3>
                    <p className="text-sm italic" style={{ color: "var(--color-text-secondary)" }}>
                      La asimetría refleja la experiencia vivida de opresión. 
                      Nada está balanceado. El trabajo no es justo. El poder no es equitativo. 
                      El ritmo tampoco. Pero esa asimetría genera movimiento — 
                      la búsqueda constante de resolución que nunca llega completa.
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">¿Por qué persiste?</h3>
                    <p className="text-sm italic" style={{ color: "var(--color-text-secondary)" }}>
                      La clave es un meme (en el sentido original de Dawkins) — 
                      una unidad de información cultural que se replica porque es útil. 
                      Útil para coordinar grupos, crear identidad compartida, 
                      marcar quién pertenece, resistir homogeneización cultural.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conexiones */}
              <div>
                <h2 
                  className="text-2xl mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Conexiones
                </h2>
                <div className="flex flex-wrap gap-2">
                  <ConnectionTag label="Yoruba bell pattern" type="ancestor" />
                  <ConnectionTag label="Congo" type="ancestor" />
                  <ConnectionTag label="Kpanlogo" type="ancestor" />
                  <ConnectionTag label="Salsa" type="descendant" />
                  <ConnectionTag label="Timba" type="descendant" />
                  <ConnectionTag label="Reggaetón" type="descendant" />
                  <ConnectionTag label="Compás Flamenco" type="parallel" />
                </div>
              </div>
            </div>

            {/* Right column - Context */}
            <div className="lg:col-span-2 space-y-6">
              <ContextCard items={contextItems} />
              
              <div 
                className="p-6 rounded-xl"
                style={{ background: "var(--color-indigo-light)" }}
              >
                <h3 
                  className="label mb-4"
                  style={{ color: "var(--color-indigo)" }}
                >
                  Contexto Histórico
                </h3>
                <Timeline events={timelineEvents} color="indigo" />
              </div>

              {/* Spaces */}
              <div 
                className="p-6 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-4">Espacios de práctica</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { name: "Plantación", period: "XVI-XIX", desc: "Supervivencia, resistencia" },
                    { name: "Cabildo", period: "XVII-XX", desc: "Religión, comunidad" },
                    { name: "Solar", period: "1880s-1960s", desc: "Recreación, identidad" },
                    { name: "Cabaret", period: "1920s-1959", desc: "Entretenimiento, turismo" },
                  ].map((space, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{space.name}</div>
                        <div style={{ color: "var(--color-text-muted)" }}>{space.desc}</div>
                      </div>
                      <span 
                        className="text-xs font-mono"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {space.period}
                      </span>
                    </div>
                  ))}
                </div>
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
