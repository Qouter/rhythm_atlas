import { GlobeTimeline } from "@/components/GlobeTimeline";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Main: Globe Timeline */}
      <GlobeTimeline />

      {/* Thesis */}
      <section 
        className="px-6 py-16"
        style={{ background: "var(--color-surface)" }}
      >
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
