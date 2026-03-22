interface HypothesisProps {
  text: string;
  color?: "cuba" | "spain" | "shared";
}

export function Hypothesis({ text, color = "cuba" }: HypothesisProps) {
  const colors = {
    cuba: "var(--color-cuba)",
    spain: "var(--color-spain)",
    shared: "var(--color-shared)",
  };

  return (
    <div 
      className="rounded-lg p-4"
      style={{ 
        background: "var(--color-bg)",
        borderLeft: `3px solid ${colors[color]}`,
      }}
    >
      <p 
        className="text-sm italic leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        "{text}"
      </p>
    </div>
  );
}
