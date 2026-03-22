"use client";

import { useState } from "react";
import { LayeredPlayer } from "@/components/LayeredPlayer";
import { allPresets } from "@/lib/rhythmPatterns";
import Link from "next/link";

export default function LaboratorioPage() {
  const [currentPresetId, setCurrentPresetId] = useState(allPresets[0].id);
  
  const currentPreset = allPresets.find(p => p.id === currentPresetId) || allPresets[0];
  
  const presetOptions = allPresets.map(p => ({
    id: p.id,
    name: p.name,
    origin: p.origin,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="px-6 py-16"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl mb-4"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Laboratorio de Ritmos
          </h1>
          <p 
            className="text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Explora las capas que forman cada ritmo. Activa y desactiva instrumentos 
            para entender cómo dialogan entre sí.
          </p>
        </div>
      </section>

      {/* Player */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <LayeredPlayer 
            preset={currentPreset}
            onPresetChange={setCurrentPresetId}
            presetOptions={presetOptions}
          />
        </div>
      </section>

      {/* Explanation */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* How it works */}
            <div 
              className="p-6 rounded-xl"
              style={{ background: "var(--color-surface)" }}
            >
              <h2 
                className="text-xl mb-4"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Cómo funciona
              </h2>
              <div 
                className="space-y-3 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <p>
                  <strong style={{ color: "var(--color-text)" }}>La poliritmia</strong> es 
                  el corazón de la música afrocaribeña y flamenca. No es un solo ritmo — 
                  son múltiples patrones que conversan.
                </p>
                <p>
                  <strong style={{ color: "var(--color-text)" }}>La clave</strong> es 
                  la referencia, pero no suena sola. El bajo la anticipa, las congas 
                  la comentan, la campana la estabiliza.
                </p>
                <p>
                  <strong style={{ color: "var(--color-text)" }}>El flamenco</strong> funciona 
                  igual: las palmas marcan, el cajón responde, el zapateado improvisa.
                </p>
              </div>
            </div>

            {/* Try this */}
            <div 
              className="p-6 rounded-xl"
              style={{ background: "var(--color-indigo-light)" }}
            >
              <h2 
                className="text-xl mb-4"
                style={{ 
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  color: "var(--color-indigo)",
                }}
              >
                Prueba esto
              </h2>
              <ul 
                className="space-y-3 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <li>
                  <strong style={{ color: "var(--color-text)" }}>Solo la clave:</strong> Silencia 
                  todo menos la clave. Escucha cómo se siente "incompleta".
                </li>
                <li>
                  <strong style={{ color: "var(--color-text)" }}>Añade el bajo:</strong> Nota 
                  cómo el bajo llena los huecos y crea movimiento hacia adelante.
                </li>
                <li>
                  <strong style={{ color: "var(--color-text)" }}>Quita la clave:</strong> Con 
                  todo menos la clave, ¿sientes dónde "debería" estar?
                </li>
                <li>
                  <strong style={{ color: "var(--color-text)" }}>Cambia el tempo:</strong> Un 
                  mismo patrón se siente muy diferente a 80 vs 200 BPM.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Preset descriptions */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-2xl mb-8 text-center"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Los Ritmos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Son Cubano */}
            <div 
              className="p-6 rounded-xl"
              style={{ 
                background: "var(--color-surface)",
                borderLeft: "4px solid var(--color-cuba)",
              }}
            >
              <h3 
                className="font-medium mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Son Cubano
              </h3>
              <p 
                className="text-sm mb-3"
                style={{ color: "var(--color-text-secondary)" }}
              >
                El groove base de la música cubana. La clave 3-2, el tumbao del bajo 
                que anticipa el tiempo, y las congas que rellenan los huecos.
              </p>
              <ul 
                className="text-xs space-y-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                <li>• <strong>Clave:</strong> El patrón guía (3-2)</li>
                <li>• <strong>Bajo:</strong> Tumbao anticipado</li>
                <li>• <strong>Congas:</strong> Contratiempo</li>
                <li>• <strong>Campana:</strong> Pulso estable</li>
              </ul>
            </div>

            {/* Rumba */}
            <div 
              className="p-6 rounded-xl"
              style={{ 
                background: "var(--color-surface)",
                borderLeft: "4px solid var(--color-cuba)",
              }}
            >
              <h3 
                className="font-medium mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Rumba Guaguancó
              </h3>
              <p 
                className="text-sm mb-3"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Ritmo de los solares habaneros. La clave de rumba tiene el tercer 
                golpe desplazado. El quinto improvisa, el salidor mantiene el pulso.
              </p>
              <ul 
                className="text-xs space-y-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                <li>• <strong>Clave:</strong> Clave de rumba (3-2 desplazada)</li>
                <li>• <strong>Quinto:</strong> Tambor agudo, improvisa</li>
                <li>• <strong>Salidor:</strong> Tambor grave, mantiene</li>
              </ul>
            </div>

            {/* Soleá */}
            <div 
              className="p-6 rounded-xl"
              style={{ 
                background: "var(--color-surface)",
                borderLeft: "4px solid var(--color-spain)",
              }}
            >
              <h3 
                className="font-medium mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Soleá
              </h3>
              <p 
                className="text-sm mb-3"
                style={{ color: "var(--color-text-secondary)" }}
              >
                La madre del flamenco. Compás de 12 tiempos solemne y profundo. 
                Las palmas marcan los acentos, el cajón añade gravedad.
              </p>
              <ul 
                className="text-xs space-y-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                <li>• <strong>Palmas compás:</strong> Acentos 3, 6, 8, 10, 12</li>
                <li>• <strong>Palmas contratiempo:</strong> Rellena entre acentos</li>
                <li>• <strong>Cajón:</strong> Refuerza acentos principales</li>
              </ul>
            </div>

            {/* Bulería */}
            <div 
              className="p-6 rounded-xl"
              style={{ 
                background: "var(--color-surface)",
                borderLeft: "4px solid var(--color-spain)",
              }}
            >
              <h3 
                className="font-medium mb-2"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Bulería
              </h3>
              <p 
                className="text-sm mb-3"
                style={{ color: "var(--color-text-secondary)" }}
              >
                El palo más rápido y festivo. Mismo compás de 12, pero a velocidad 
                de vértigo. Espacio para virtuosismo e improvisación.
              </p>
              <ul 
                className="text-xs space-y-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                <li>• <strong>Palmas:</strong> Driving, casi continuas</li>
                <li>• <strong>Cajón:</strong> Sincopado, explosivo</li>
                <li>• <strong>Tempo:</strong> 200-280 BPM</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              href="/ritmos/clave"
              className="px-4 py-2 rounded-lg text-sm transition-all"
              style={{ 
                background: "var(--color-cuba-light)",
                color: "var(--color-cuba-dark)",
              }}
            >
              ← Análisis de la Clave
            </Link>
            <Link 
              href="/ritmos/flamenco"
              className="px-4 py-2 rounded-lg text-sm transition-all"
              style={{ 
                background: "var(--color-spain-light)",
                color: "var(--color-spain-dark)",
              }}
            >
              Análisis del Flamenco →
            </Link>
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
