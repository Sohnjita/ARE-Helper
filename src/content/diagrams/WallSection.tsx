import { LINE, FILL_ROOM, FILL_ACCENT, TEXT } from "./style";

/** Schematic exterior wall section (parapet to grade) for envelope/materials hotspot questions. ViewBox: 0 0 100 100. */
export default function WallSection() {
  const weeps = [65, 67.5, 70].map((x) => (
    <line key={x} x1={x} y1={67} x2={x} y2={70} stroke={LINE} strokeWidth={0.6} />
  ));

  return (
    <g>
      {/* ground line */}
      <line x1={10} y1={70} x2={90} y2={70} stroke={LINE} strokeWidth={1} />
      <text x={20} y={75} fontSize={3.5} fill={TEXT}>GRADE</text>

      {/* foundation wall + footing below grade */}
      <rect x={42} y={70} width={16} height={15} fill={FILL_ROOM} stroke={LINE} strokeWidth={1} />
      <rect x={38} y={85} width={24} height={5} fill={FILL_ROOM} stroke={LINE} strokeWidth={1} />

      {/* parapet / coping at top */}
      <rect x={38} y={8} width={26} height={6} fill={FILL_ROOM} stroke={LINE} strokeWidth={1} />
      <text x={51} y={6} fontSize={3} fill={TEXT} textAnchor="middle">COPING</text>

      {/* roof membrane line */}
      <line x1={42} y1={20} x2={58} y2={20} stroke={FILL_ACCENT} strokeWidth={1} />

      {/* stud wall cavity w/ insulation hatch */}
      <rect x={44} y={20} width={12} height={48} fill="#fde68a" stroke={LINE} strokeWidth={0.8} />
      <text x={50} y={45} fontSize={3} fill={TEXT} textAnchor="middle" transform="rotate(-90 50 45)">INSULATION</text>

      {/* exterior sheathing */}
      <rect x={56} y={20} width={3} height={48} fill="#d6d3d1" stroke={LINE} strokeWidth={0.5} />

      {/* water-resistive barrier */}
      <rect x={59} y={20} width={2} height={48} fill={FILL_ACCENT} stroke="none" />

      {/* drainage airspace */}
      <rect x={61} y={20} width={3} height={46} fill="#ffffff" stroke={LINE} strokeWidth={0.3} strokeDasharray="0.8,0.8" />

      {/* brick veneer */}
      <rect x={64} y={20} width={8} height={48} fill="#fca5a5" stroke={LINE} strokeWidth={0.8} />
      <text x={68} y={45} fontSize={3} fill={TEXT} textAnchor="middle" transform="rotate(-90 68 45)">VENEER</text>

      {/* flashing kink at base of veneer */}
      <path d="M 56 66 L 72 66 L 72 70 L 56 70 Z" fill="none" stroke="#16a34a" strokeWidth={1.2} />

      {/* weep holes */}
      {weeps}

      {/* interior face stud line */}
      <line x1={44} y1={20} x2={44} y2={68} stroke={LINE} strokeWidth={1} />
      <text x={20} y={45} fontSize={3.5} fill={TEXT}>INTERIOR</text>
    </g>
  );
}
