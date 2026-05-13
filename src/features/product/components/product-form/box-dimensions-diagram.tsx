import { cn } from "@/lib/utils"

/**
 * Decorative isometric box illustrating the product dimension fields:
 * A = altura, L = largura, C = comprimento.
 */
export function BoxDimensionsDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 400"
      role="img"
      aria-label="Ilustração de uma caixa indicando altura (A), largura (L) e comprimento (C)"
      className={cn("text-muted-foreground", className)}
    >
      {/* faces */}
      <polygon
        points="55,125 180,170 180,330 55,285"
        fill="currentColor"
        fillOpacity={0.04}
        stroke="currentColor"
        strokeOpacity={0.5}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <polygon
        points="180,170 350,100 350,260 180,330"
        fill="currentColor"
        fillOpacity={0.07}
        stroke="currentColor"
        strokeOpacity={0.5}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <polygon
        points="55,125 225,55 350,100 180,170"
        fill="currentColor"
        fillOpacity={0.02}
        stroke="currentColor"
        strokeOpacity={0.5}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* dimension lines */}
      <g
        stroke="currentColor"
        strokeOpacity={0.4}
        strokeWidth={1}
        strokeLinecap="round"
      >
        {/* A — altura */}
        <line x1="34" y1="125" x2="34" y2="285" />
        <line x1="27" y1="125" x2="41" y2="125" />
        <line x1="27" y1="285" x2="41" y2="285" />
        {/* L — largura */}
        <line x1="49" y1="307" x2="174" y2="352" />
        <line x1="47" y1="300" x2="51" y2="314" />
        <line x1="172" y1="345" x2="176" y2="359" />
        {/* C — comprimento */}
        <line x1="180" y1="354" x2="350" y2="284" />
        <line x1="177" y1="348" x2="183" y2="360" />
        <line x1="347" y1="278" x2="353" y2="290" />
      </g>

      {/* labels */}
      <g
        fill="currentColor"
        fillOpacity={0.75}
        fontSize={18}
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <text x="16" y="207">
          A
        </text>
        <text x="100" y="345">
          L
        </text>
        <text x="270" y="340">
          C
        </text>
      </g>
    </svg>
  )
}
