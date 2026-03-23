import { GlobeSearch } from "@/components/GlobeSearch";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Main: Globe Search */}
      <GlobeSearch />

      {/* Quick links */}
      <section 
        className="px-6 py-16"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-2xl mb-8 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Herramientas
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Link
              href="/laboratorio"
              className="p-6 rounded-xl transition-all hover:translate-y-[-2px]"
              style={{ 
                background: "var(--color-bg)",
              }}
            >
              <span className="text-3xl mb-3 block">🎹</span>
              <h3 
                className="text-lg font-medium mb-1"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Laboratorio
              </h3>
              <p 
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Escucha las capas de cada ritmo. Activa y desactiva instrumentos.
              </p>
            </Link>

            <Link
              href="/comparador"
              className="p-6 rounded-xl transition-all hover:translate-y-[-2px]"
              style={{ 
                background: "var(--color-bg)",
              }}
            >
              <span className="text-3xl mb-3 block">⚖️</span>
              <h3 
                className="text-lg font-medium mb-1"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Comparador
              </h3>
              <p 
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Clave vs Flamenco lado a lado. Encuentra los paralelos.
              </p>
            </Link>

            <Link
              href="/explorar"
              className="p-6 rounded-xl transition-all hover:translate-y-[-2px]"
              style={{ 
                background: "var(--color-bg)",
              }}
            >
              <span className="text-3xl mb-3 block">📚</span>
              <h3 
                className="text-lg font-medium mb-1"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Explorar
              </h3>
              <p 
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Todos los ritmos con filtros avanzados por período y función.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 
            className="text-2xl mb-6"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Hipótesis
          </h2>
          <p 
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Los ritmos no son abstractos — nacen de{" "}
            <strong style={{ color: "var(--color-text)" }}>condiciones materiales</strong>. 
            La síncopa de la clave cubana, el compás flamenco, el dembow... 
            cada uno cuenta una historia de{" "}
            <strong style={{ color: "var(--color-text)" }}>resistencia</strong>, 
            migración y transformación.
          </p>
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
        Rhythms Atlas — 2026
      </footer>
    </div>
  );
}
