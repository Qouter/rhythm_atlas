import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="px-6 py-24 text-center"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 
            className="mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Rhythms Atlas
          </h1>
          <p 
            className="text-lg mb-8"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Conectando ritmos musicales con su contexto sociopolítico. 
            Explorando cómo los patrones rítmicos reflejan y emergen de 
            condiciones históricas específicas.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/ritmos/clave"
              className="px-6 py-3 rounded-lg font-medium transition-all"
              style={{ 
                background: "var(--color-cuba)", 
                color: "white" 
              }}
            >
              Explorar La Clave
            </Link>
            <Link
              href="/comparador"
              className="px-6 py-3 rounded-lg font-medium transition-all"
              style={{ 
                background: "transparent",
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              Ver Comparador
            </Link>
          </div>
        </div>
      </section>

      {/* Hypothesis */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className="text-2xl mb-6"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Hipótesis Central
          </h2>
          <p 
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Los ritmos no son abstractos — nacen de condiciones materiales. 
            La síncopa de la clave cubana, el compás flamenco, el tresillo del tango... 
            cada uno cuenta una historia de <strong style={{ color: "var(--color-text)" }}>resistencia</strong>, 
            {" "}<strong style={{ color: "var(--color-text)" }}>trabajo</strong>, 
            {" "}<strong style={{ color: "var(--color-text)" }}>migración</strong> y 
            {" "}<strong style={{ color: "var(--color-text)" }}>poder</strong>.
          </p>
        </div>
      </section>

      {/* Rhythm Cards */}
      <section className="px-6 py-16" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 
            className="text-center text-2xl mb-12"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Ritmos Documentados
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Clave */}
            <Link 
              href="/ritmos/clave"
              className="block rounded-2xl p-8 transition-all hover:translate-y-[-2px]"
              style={{ 
                background: "var(--color-surface)",
                borderTop: "4px solid var(--color-cuba)",
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 
                    className="text-xl font-medium"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    La Clave
                  </h3>
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
                    background: "var(--color-silence)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  s. XVI-XX
                </span>
              </div>
              
              <p 
                className="text-sm mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                El corazón rítmico del Caribe. Un patrón de 5 golpes en 2 compases 
                que llegó de África occidental con la diáspora esclavista.
              </p>
              
              <div 
                className="text-sm font-mono px-3 py-2 rounded"
                style={{ 
                  background: "var(--color-bg)",
                  color: "var(--color-cuba)",
                }}
              >
                |X..X..X.|....X.X.|
              </div>
            </Link>

            {/* Flamenco */}
            <Link 
              href="/ritmos/flamenco"
              className="block rounded-2xl p-8 transition-all hover:translate-y-[-2px]"
              style={{ 
                background: "var(--color-surface)",
                borderTop: "4px solid var(--color-spain)",
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 
                    className="text-xl font-medium"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    Compás Flamenco
                  </h3>
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
                    background: "var(--color-silence)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  s. XVIII-XX
                </span>
              </div>
              
              <p 
                className="text-sm mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                El compás de 12 tiempos del flamenco. Nacido de la fusión gitana, 
                morisca y sefardí en la Andalucía marginada.
              </p>
              
              <div 
                className="text-sm font-mono px-3 py-2 rounded"
                style={{ 
                  background: "var(--color-bg)",
                  color: "var(--color-spain)",
                }}
              >
                12 1 2 [3] 4 5 [6] 7 [8] 9 [10] 11 [12]
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 
            className="text-center text-2xl mb-8"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Framework de Análisis
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div 
              className="p-6 rounded-xl"
              style={{ background: "var(--color-surface)" }}
            >
              <h3 className="label mb-3">Análisis Rítmico</h3>
              <ul 
                className="text-sm space-y-2"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <li>• Patrón base (grid notation)</li>
                <li>• Acentuación y peso</li>
                <li>• Tensión/resolución</li>
                <li>• Poliritmia y capas</li>
                <li>• Tempo y contexto</li>
              </ul>
            </div>
            
            <div 
              className="p-6 rounded-xl"
              style={{ background: "var(--color-indigo-light)" }}
            >
              <h3 className="label mb-3" style={{ color: "var(--color-indigo)" }}>
                Contexto Sociopolítico
              </h3>
              <ul 
                className="text-sm space-y-2"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <li>• Período histórico</li>
                <li>• Condiciones económicas</li>
                <li>• Situación política</li>
                <li>• Función social</li>
                <li>• Espacios de práctica</li>
              </ul>
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
        Rhythms Atlas — Conectando ritmos con su historia · 2026
      </footer>
    </div>
  );
}
