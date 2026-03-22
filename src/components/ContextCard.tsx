interface ContextItem {
  label: string;
  value: string;
}

interface ContextCardProps {
  items: ContextItem[];
}

export function ContextCard({ items }: ContextCardProps) {
  return (
    <div 
      className="rounded-xl p-6"
      style={{ background: "var(--color-surface)" }}
    >
      <h3 
        className="label mb-4"
        style={{ color: "var(--color-text-muted)" }}
      >
        Contexto
      </h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="flex justify-between items-start py-1 text-sm"
          >
            <span style={{ color: "var(--color-text-muted)" }}>
              {item.label}
            </span>
            <span 
              className="font-medium text-right ml-4"
              style={{ color: "var(--color-text)" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
