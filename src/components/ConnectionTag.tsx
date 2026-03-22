interface ConnectionTagProps {
  label: string;
  type: "ancestor" | "descendant" | "parallel";
}

export function ConnectionTag({ label, type }: ConnectionTagProps) {
  const styles = {
    ancestor: {
      background: "oklch(92% 0.04 60)",
      color: "oklch(40% 0.08 60)",
      prefix: "←",
    },
    descendant: {
      background: "oklch(92% 0.04 30)",
      color: "oklch(40% 0.12 30)",
      prefix: "→",
    },
    parallel: {
      background: "var(--color-shared-light)",
      color: "oklch(45% 0.1 85)",
      prefix: "↔",
    },
  };

  const style = styles[type];

  return (
    <span 
      className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
      style={{ background: style.background, color: style.color }}
    >
      <span>{style.prefix}</span>
      <span>{label}</span>
    </span>
  );
}
