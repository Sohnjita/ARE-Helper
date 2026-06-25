import { LINE, LINE_LIGHT, FILL_ROOM, TEXT } from "./style";

/** Schematic single-occupant accessible toilet room plan for accessibility hotspot questions. ViewBox: 0 0 100 100. */
export default function AccessibleRestroom() {
  return (
    <g>
      {/* room outline */}
      <rect x={10} y={10} width={70} height={60} fill={FILL_ROOM} stroke={LINE} strokeWidth={1.2} />

      {/* door + swing */}
      <rect x={8} y={12} width={2} height={10} fill="none" stroke={LINE} strokeWidth={1} />
      <path d="M 10 22 A 12 12 0 0 0 22 10" fill="none" stroke={LINE_LIGHT} strokeDasharray="1,1" strokeWidth={0.5} />

      {/* water closet */}
      <rect x={58} y={22} width={10} height={6} rx={2} fill="#fff" stroke={LINE} strokeWidth={0.8} />
      <ellipse cx={63} cy={30} rx={6} ry={5} fill="#fff" stroke={LINE} strokeWidth={0.8} />
      <text x={63} y={40} fontSize={3} fill={TEXT} textAnchor="middle">WC</text>

      {/* rear grab bar */}
      <rect x={50} y={18} width={20} height={3} fill="#16a34a" stroke={LINE} strokeWidth={0.4} />
      {/* side grab bar */}
      <rect x={68} y={20} width={3} height={18} fill="#16a34a" stroke={LINE} strokeWidth={0.4} />

      {/* lavatory */}
      <rect x={12} y={45} width={14} height={8} rx={1} fill="#fff" stroke={LINE} strokeWidth={0.8} />
      <text x={19} y={58} fontSize={3} fill={TEXT} textAnchor="middle">LAV</text>

      {/* lav clear floor space (dashed) */}
      <rect x={12} y={45} width={20} height={14} fill="none" stroke={LINE_LIGHT} strokeDasharray="1,1" strokeWidth={0.5} />

      {/* 60-inch turning space */}
      <circle cx={40} cy={50} r={18} fill="none" stroke="#0ea5e9" strokeDasharray="1.5,1" strokeWidth={0.6} />
      <text x={40} y={50} fontSize={3} fill={TEXT} textAnchor="middle">60" CLR</text>
    </g>
  );
}
