import { RhythmGrid, Timeline, ContextCard, Hypothesis, ConnectionTag } from "@/components";

// Compás de Soleá (12 tiempos) - acentos en 3, 6, 8, 10, 12
// Representado como array donde 1 = acento
const flamencoPattern = [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1];
const strongBeats = [2, 9, 11]; // beats 3, 10, 12 (0-indexed: 2, 9, 11)
const labels = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

const timelineEvents = [
  {
    period: "1499-1749",
    title: "Persecución sistemática.",
    description: "Pragmáticas anti-gitanas. Prohibición de lengua, vestimenta, oficios. Gran Redada de 1749: 9,000 gitanos arrestados.",
  },
  {
    period: "1850-1920",
    title: "Cafés cantantes.",
    description: "Viajeros románticos 'descubren' Andalucía. El flamenco pasa de vergüenza a atracción. Profesionalización.",
  },
  {
    period: "1936-1975",
    title: "Franquismo.",
    description: "Apropiación como 'folclore nacional español'. Vaciado del contenido de resistencia. Versión edulcorada.",
  },
  {
    period: "1975-presente",
    title: "Renacimiento.",
    description: "Camarón y Paco de Lucía revolucionan el género. UNESCO 2010. Nueva generación: ¿apropiación o evolución?",
  },
];

const contextItems = [
  { label: "Origen étnico", value: "Roma, Morisco, Sefardí" },
  { label: "Condición", value: "Persecución → marginalidad" },
  { label: "Función", value: "Resistencia, identidad, duende" },
  { label: "Espacios", value: "Fragua → juerga → tablao" },
];

export default function FlamencoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="px-6 py-16"
        style={{ 
          background: "var(--color-surface)",
          borderBottom: "4px solid var(--color-spain)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 
                className="text-4xl mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Compás Flamenco
              </h1>
              <p style={{ color: "var(--color-text-secondary)" }}>
                El compás de 12 tiempos — Andalucía, siglos XVIII-XX
              </p>
            </div>
            <span 
              className="text-xs px-3 py-1 rounded"
              style={{ 
                background: "var(--color-spain-light)",
                color: "var(--color-spain-dark)",
              }}
            >
              Siglos XVIII-XX
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
            12 1 2 <span style={{ color: "var(--color-spain)", fontWeight: 700 }}>[3]</span>
            {" "}4 5 <span style={{ color: "var(--color-spain)", fontWeight: 700 }}>[6]</span>
            {" "}7 <span style={{ color: "var(--color-spain)", fontWeight: 700 }}>[8]</span>
            {" "}9 <span style={{ color: "var(--color-spain)", fontWeight: 700 }}>[10]</span>
            {" "}11 <span style={{ color: "var(--color-spain)", fontWeight: 700 }}>[12]</span>
            <span className="ml-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Soleá / Bulería
            </span>
          </div>
          
          <RhythmGrid 
            pattern={flamencoPattern}
            strongBeats={strongBeats}
            labels={labels}
            color="spain"
            tempo={100}
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
                  El compás flamenco es un ciclo de <strong style={{ color: "var(--color-text)" }}>12 tiempos</strong> con 
                  acentos en posiciones específicas: 3, 6, 8, 10 y 12. La cuenta flamenca 
                  <strong style={{ color: "var(--color-text)" }}> empieza en el 12</strong>, no en el 1.
                </p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  El compás de 12 <strong style={{ color: "var(--color-text)" }}>NO es 4+4+4</strong>. 
                  Es <strong style={{ color: "var(--color-text)" }}>3+3+2+2+2 = 12</strong>. 
                  Esta agrupación asimétrica crea el "swing" flamenco — 
                  similar conceptualmente a la clave cubana.
                </p>
              </div>

              {/* Variantes */}
              <div>
                <h2 
                  className="text-2xl mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Variantes
                </h2>
                
                <div className="space-y-4">
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">Soleá (madre del flamenco)</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <strong>Tempo:</strong> 80-120 BPM<br/>
                      <strong>Carácter:</strong> Solemne, profundo, melancólico<br/>
                      <strong>Acentos:</strong> 3, 6, 8, 10, 12 (patrón base)
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">Bulería (fiesta, virtuosismo)</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <strong>Tempo:</strong> 200-280 BPM<br/>
                      <strong>Carácter:</strong> Explosivo, improvisado, festivo<br/>
                      <strong>Acentos:</strong> Similar pero con más libertad
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">Seguiriya (el cante más jondo)</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <strong>Tempo:</strong> 60-90 BPM<br/>
                      <strong>Carácter:</strong> Trágico, desgarro, lamento<br/>
                      <strong>Acentos:</strong> 1, 3, 5, 8, 11 (desplazado)
                    </p>
                  </div>
                </div>
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
                    <h3 className="label mb-2">La "levantá"</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      El momento justo antes del 12 (tiempos 10-11) crea una 
                      <strong> suspensión dramática</strong>. Todo el compás "cae" en el 12. 
                      Esta tensión-resolución es el corazón del <em>duende</em>.
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">Poliritmia</h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      • <strong>Palmas:</strong> Marcan el compás (sordas vs claras)<br/>
                      • <strong>Pies (zapateado):</strong> Contratiempos, ornamentación<br/>
                      • <strong>Guitarra:</strong> Rasgueados en acentos, falsetas en huecos<br/>
                      • <strong>Cante:</strong> Libre sobre el compás, "cae" en los acentos clave
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
                    text="El compás de 12 es un espacio de resistencia temporal. 12 tiempos es difícil de seguir para el no iniciado. Si no lo sientes, se nota. Es un marcador de pertenencia — igual que la clave cubana."
                    color="spain"
                  />
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">¿Por qué los acentos "raros"?</h3>
                    <p className="text-sm italic" style={{ color: "var(--color-text-secondary)" }}>
                      La acentuación rechaza el orden marcial europeo. 
                      La marcha militar es 1-2-3-4. El vals burgués es 1-2-3. 
                      El flamenco dice: "vuestro orden no es el mío". 
                      Es subversión codificada en el cuerpo.
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <h3 className="label mb-2">El "duende"</h3>
                    <p className="text-sm italic" style={{ color: "var(--color-text-secondary)" }}>
                      Ambos conceptos (duende y swing) describen algo similar: 
                      un estado donde el ritmo te posee. Es el momento donde el ritmo 
                      deja de ser técnica y se convierte en trance colectivo — 
                      una forma de libertad temporal.
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
                  <ConnectionTag label="Música romaní" type="ancestor" />
                  <ConnectionTag label="Modos árabes" type="ancestor" />
                  <ConnectionTag label="Folclore andaluz" type="ancestor" />
                  <ConnectionTag label="Nuevo flamenco" type="descendant" />
                  <ConnectionTag label="Flamenco jazz" type="descendant" />
                  <ConnectionTag label="Flamenco pop" type="descendant" />
                  <ConnectionTag label="Clave Cubana" type="parallel" />
                </div>
              </div>
            </div>

            {/* Right column - Context */}
            <div className="lg:col-span-2 space-y-6">
              <ContextCard items={contextItems} />
              
              <div 
                className="p-6 rounded-xl"
                style={{ background: "var(--color-spain-light)" }}
              >
                <h3 
                  className="label mb-4"
                  style={{ color: "var(--color-spain)" }}
                >
                  Contexto Histórico
                </h3>
                <Timeline events={timelineEvents} color="spain" />
              </div>

              {/* Orígenes étnicos */}
              <div 
                className="p-6 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-4">Orígenes étnicos</h3>
                <p 
                  className="text-sm mb-4"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  El flamenco nace de la fusión de pueblos marginados:
                </p>
                <div className="space-y-3 text-sm">
                  {[
                    { name: "Gitanos (Roma)", desc: "Llegaron ~1425, perseguidos sistemáticamente" },
                    { name: "Moriscos", desc: "Musulmanes forzados a convertirse, expulsados 1609" },
                    { name: "Judíos sefardíes", desc: "Expulsados 1492, muchos en secreto" },
                    { name: "Andaluces pobres", desc: "Jornaleros, campesinos sin tierra" },
                  ].map((origin, i) => (
                    <div key={i}>
                      <div className="font-medium">{origin.name}</div>
                      <div style={{ color: "var(--color-text-muted)" }}>{origin.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spaces */}
              <div 
                className="p-6 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-4">Espacios de práctica</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { name: "Fragua", period: "XV-XIX", desc: "Trabajo, identidad gitana" },
                    { name: "Juerga privada", period: "XV-presente", desc: "Ritual, comunidad, duende" },
                    { name: "Café cantante", period: "1850-1920", desc: "Espectáculo, profesionalización" },
                    { name: "Tablao", period: "1960-presente", desc: "Turismo, preservación" },
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

              {/* Escucha esencial */}
              <div 
                className="p-6 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-4">Escucha esencial</h3>
                <ul 
                  className="text-sm space-y-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <li>• Camarón — <em>La Leyenda del Tiempo</em> (1979)</li>
                  <li>• Paco de Lucía — <em>Almoraima</em> (1976)</li>
                  <li>• Enrique Morente — <em>Omega</em> (1996)</li>
                  <li>• Rosalía — <em>El Mal Querer</em> (2018)</li>
                </ul>
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
