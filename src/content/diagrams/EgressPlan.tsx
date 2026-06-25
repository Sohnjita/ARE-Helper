import { LINE, LINE_LIGHT, FILL_ROOM, FILL_CORRIDOR, FILL_WARN, TEXT } from "./style";

/** Schematic office floor plan used for egress / life-safety hotspot questions. ViewBox: 0 0 100 100. */
export default function EgressPlan() {
  return (
    <g>
      {/* outer building wall */}
      <rect x={5} y={10} width={90} height={70} fill={FILL_ROOM} stroke={LINE} strokeWidth={1.2} />

      {/* corridor band */}
      <rect x={10} y={42} width={80} height={12} fill={FILL_CORRIDOR} stroke={LINE} strokeWidth={0.8} />

      {/* top room partitions */}
      <line x1={35} y1={10} x2={35} y2={42} stroke={LINE} strokeWidth={1} />
      <line x1={65} y1={10} x2={65} y2={42} stroke={LINE} strokeWidth={1} />
      {/* bottom room partitions */}
      <line x1={35} y1={54} x2={35} y2={80} stroke={LINE} strokeWidth={1} />
      <line x1={65} y1={54} x2={65} y2={80} stroke={LINE} strokeWidth={1} />

      {/* room labels */}
      <text x={20} y={28} fontSize={4} fill={TEXT} textAnchor="middle">ROOM A</text>
      <text x={50} y={28} fontSize={4} fill={TEXT} textAnchor="middle">ROOM B</text>
      <text x={78} y={28} fontSize={4} fill={TEXT} textAnchor="middle">ROOM C</text>
      <text x={20} y={68} fontSize={4} fill={TEXT} textAnchor="middle">ROOM D</text>
      <text x={50} y={66} fontSize={4} fill={TEXT} textAnchor="middle">ROOM E</text>
      <text x={78} y={68} fontSize={4} fill={TEXT} textAnchor="middle">ROOM F</text>

      {/* dead-end corridor stub, no exit at terminus */}
      <rect x={76} y={54} width={8} height={26} fill={FILL_CORRIDOR} stroke={LINE} strokeWidth={0.8} />
      <line x1={76} y1={80} x2={84} y2={80} stroke={LINE} strokeWidth={1.4} />

      {/* door from Room E into corridor, swinging up into the corridor */}
      <line x1={50} y1={54} x2={50} y2={46} stroke={LINE} strokeWidth={0.8} />
      <path d="M 50 54 A 8 8 0 0 1 58 54" fill="none" stroke={FILL_WARN} strokeDasharray="1.5,1" strokeWidth={0.7} />

      {/* exit doors */}
      <rect x={8} y={44} width={4} height={8} fill="none" stroke={LINE} strokeWidth={1} />
      <text x={10} y={40} fontSize={3.5} fill={TEXT} textAnchor="middle">EXIT</text>
      <rect x={88} y={44} width={4} height={8} fill="none" stroke={LINE} strokeWidth={1} />
      <text x={90} y={40} fontSize={3.5} fill={TEXT} textAnchor="middle">EXIT</text>

      {/* corridor centerline dimension hint */}
      <line x1={30} y1={48} x2={50} y2={48} stroke={LINE_LIGHT} strokeWidth={0.4} strokeDasharray="1,1" />
    </g>
  );
}
