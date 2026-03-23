import { GlobeSearch } from "@/components/GlobeSearch";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero with Globe Search */}
      <section 
        className="relative"
        style={{ background: "var(--color-bg)" }}
      >
        {/* Title overlay */}
        <div className="absolute top-20 left-0 right-0 z-10 text-center pointer-events-none">
          <h1 
            className="text-5xl md:text-6xl mb-2 opacity-90"
            style={{ 
              fontFamily: "var(--font-fraunces), Georgia, serif",
              color: "var(--color-text)",
            }}
          >
            Rhythms Atlas
          </h1>
          <p 
            className="text-lg opacity-70"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Las rutas del ritmo a través de la historia
          </p>
        </div>

        <GlobeSearch />
      </section>

      {/* Quick links */}
      <section 
        className="px-6 py-12"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/laboratorio"
              className="p-6 rounded-xl transition-all hover:translate-y-[-2px]"
              style={{ 
                background: "var(--color-bg)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              <span className="text-2xl mb-2 block">🎹</span>
              <h3 
                className="font-medium mb-1"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Laboratorio
              </h3>
              <p 
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Escucha las capas de cada ritmo
              </p>
            </Link>

            <Link
              href="/comparador"
              className="p-6 rounded-xl transition-all hover:translate-y-[-2px]"
              style={{ 
                background: "var(--color-bg)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              <span className="text-2xl mb-2 block">⚖️</span>
              <h3 
                className="font-medium mb-1"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Comparador
              </h3>
              <p 
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Clave vs Flamenco lado a lado
              </p>
            </Link>

            <Link
              href="/explorar"
              className="p-6 rounded-xl transition-all hover:translate-y-[-2px]"
              style={{ 
                background: "var(--color-bg)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              <span className="text-2xl mb-2 block">📚</span>
              <h3 
                className="font-medium mb-1"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Explorar
              </h3>
              <p 
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Todos los ritmos con filtros
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
            Los ritmos no son abstractos — nacen de <strong style={{ color: "var(--color-text)" }}>condiciones materiales</strong>. 
            La síncopa de la clave cubana, el compás flamenco, el dembow del reggaetón... 
            cada uno cuenta una historia de <strong style={{ color: "var(--color-text)" }}>resistencia</strong>, 
            migración y transformación cultural.
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
        Rhythms Atlas — Conectando ritmos con su historia · 2026
      </footer>
    </div>
  );
}
