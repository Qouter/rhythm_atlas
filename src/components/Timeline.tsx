interface TimelineEvent {
  period: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  color?: "cuba" | "spain" | "indigo";
}

export function Timeline({ events, color = "indigo" }: TimelineProps) {
  const colors = {
    cuba: "var(--color-cuba)",
    spain: "var(--color-spain)",
    indigo: "var(--color-indigo)",
  };

  const lightColors = {
    cuba: "var(--color-cuba-light)",
    spain: "var(--color-spain-light)",
    indigo: "var(--color-indigo-light)",
  };

  return (
    <div 
      className="relative pl-6"
      style={{ borderLeft: `2px solid ${lightColors[color]}` }}
    >
      {events.map((event, i) => (
        <div key={i} className="relative pb-6 last:pb-0">
          {/* Dot */}
          <div 
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: colors[color],
              left: "calc(-0.5rem - 5px - 1px)",
              top: "4px",
            }}
          />
          
          {/* Content */}
          <div 
            className="text-xs mb-1"
            style={{ 
              fontFamily: "var(--font-mono)",
              color: colors[color],
            }}
          >
            {event.period}
          </div>
          <div 
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            <strong>{event.title}</strong> {event.description}
          </div>
        </div>
      ))}
    </div>
  );
}
