import { notFound } from "next/navigation";
import Link from "next/link";
import { ritmos, getRitmoById, getRelatedRitmos, regions, periods } from "@/lib/ritmos";
import { RhythmGrid, Timeline, ContextCard, Hypothesis, ConnectionTag } from "@/components";

// Generate static params for all ritmos
export function generateStaticParams() {
  return ritmos.map(r => ({ id: r.id }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ritmo = getRitmoById(id);
  if (!ritmo) return { title: "Ritmo no encontrado" };
  
  return {
    title: `${ritmo.name} — Rhythms Atlas`,
    description: ritmo.subtitle || `Análisis del ritmo ${ritmo.name} de ${ritmo.country}`,
  };
}

export default async function RitmoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ritmo = getRitmoById(id);
  
  if (!ritmo) {
    notFound();
  }

  const relatedRitmos = getRelatedRitmos(ritmo);
  const region = regions[ritmo.region];
  const period = periods[ritmo.period];

  // Convert timeline to component format
  const timelineEvents = ritmo.timeline.map(t => ({
    period: t.period,
    title: t.title + ".",
    description: t.description,
  }));

  // Convert context to component format  
  const contextItems = [
    { label: "Origen étnico", value: ritmo.context.ethnic },
    { label: "Condición", value: ritmo.context.condition },
    { label: "Función", value: ritmo.context.function },
    { label: "Espacios", value: ritmo.context.spaces },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div 
        className="px-6 py-3 text-sm"
        style={{ 
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link 
            href="/explorar"
            style={{ color: "var(--color-text-muted)" }}
            className="hover:underline"
          >
            Explorar
          </Link>
          <span style={{ color: "var(--color-text-muted)" }}>→</span>
          <Link 
            href={`/explorar?region=${ritmo.region}`}
            style={{ color: "var(--color-text-muted)" }}
            className="hover:underline"
          >
            {region.emoji} {region.label}
          </Link>
          <span style={{ color: "var(--color-text-muted)" }}>→</span>
          <span style={{ color: "var(--color-text)" }}>{ritmo.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section 
        className="px-6 py-12"
        style={{ 
          background: "var(--color-surface)",
          borderBottom: `4px solid ${ritmo.color}`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 
                className="text-4xl mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                {ritmo.name}
              </h1>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {ritmo.subtitle} — {ritmo.country}, {period.range}
              </p>
            </div>
            <span 
              className="text-xs px-3 py-1 rounded"
              style={{ 
                background: ritmo.colorLight,
                color: ritmo.colorDark,
              }}
            >
              {period.label}
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
            <span style={{ color: ritmo.color, fontWeight: 700 }}>
              {ritmo.notation}
            </span>
            <span 
              className="ml-4 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {ritmo.tempo.typical} BPM típico
            </span>
          </div>
          
          <RhythmGrid 
            pattern={ritmo.pattern}
            strongBeats={ritmo.strongBeats}
            color={ritmo.region === "caribe" ? "cuba" : "spain"}
            tempo={ritmo.tempo.typical}
          />
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left column - Analysis */}
            <div className="lg:col-span-3 space-y-8">
              {/* Hypotheses */}
              {ritmo.hypotheses.length > 0 && (
                <div>
                  <h2 
                    className="text-2xl mb-4"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    Hipótesis
                  </h2>
                  <div className="space-y-4">
                    {ritmo.hypotheses.map((h, i) => (
                      <div key={i}>
                        <h3 className="label mb-2">{h.title}</h3>
                        <Hypothesis 
                          text={h.text}
                          color={ritmo.region === "caribe" ? "cuba" : "spain"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Connections */}
              <div>
                <h2 
                  className="text-2xl mb-4"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Conexiones
                </h2>
                <div className="flex flex-wrap gap-2">
                  {ritmo.origins.map(o => (
                    <ConnectionTag key={o} label={o} type="ancestor" />
                  ))}
                  {ritmo.descendants.map(d => (
                    <ConnectionTag key={d} label={d} type="descendant" />
                  ))}
                  {ritmo.parallels.map(p => (
                    <ConnectionTag key={p} label={p} type="parallel" />
                  ))}
                </div>
              </div>

              {/* Related ritmos */}
              {relatedRitmos.length > 0 && (
                <div>
                  <h2 
                    className="text-2xl mb-4"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    Ritmos relacionados
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {relatedRitmos.map(r => (
                      <Link
                        key={r.id}
                        href={`/ritmos/${r.id}`}
                        className="px-4 py-3 rounded-lg transition-all hover:translate-x-1"
                        style={{
                          background: "var(--color-surface)",
                          borderLeft: `3px solid ${r.color}`,
                        }}
                      >
                        <div className="font-medium">{r.name}</div>
                        <div 
                          className="text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {r.country}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Context */}
            <div className="lg:col-span-2 space-y-6">
              <ContextCard items={contextItems} />
              
              <div 
                className="p-6 rounded-xl"
                style={{ background: ritmo.colorLight }}
              >
                <h3 
                  className="label mb-4"
                  style={{ color: ritmo.color }}
                >
                  Contexto Histórico
                </h3>
                <Timeline 
                  events={timelineEvents} 
                  color={ritmo.region === "caribe" ? "cuba" : "spain"} 
                />
              </div>

              {/* Quick facts */}
              <div 
                className="p-6 rounded-xl"
                style={{ background: "var(--color-surface)" }}
              >
                <h3 className="label mb-4">Datos rápidos</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-text-muted)" }}>Compás</span>
                    <span>{ritmo.gridSize} tiempos</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-text-muted)" }}>Tempo</span>
                    <span>{ritmo.tempo.min}-{ritmo.tempo.max} BPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-text-muted)" }}>Región</span>
                    <span>{region.emoji} {region.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-text-muted)" }}>Período</span>
                    <span>{period.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <Link
            href="/laboratorio"
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              background: ritmo.color,
              color: "white",
            }}
          >
            🎹 Probar en el Laboratorio
          </Link>
          <Link
            href="/mapa"
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
          >
            🌍 Ver en el Mapa
          </Link>
          <Link
            href="/comparador"
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
          >
            ⚖️ Comparar
          </Link>
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
