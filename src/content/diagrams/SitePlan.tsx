import { LINE, LINE_LIGHT, FILL_ROOM, TEXT } from "./style";

/** Schematic aerial site plan for site-analysis hotspot questions. ViewBox: 0 0 100 100. */
export default function SitePlan() {
  return (
    <g>
      {/* street */}
      <rect x={0} y={0} width={100} height={5} fill="#cbd5e1" />
      <text x={50} y={3.5} fontSize={3} fill={TEXT} textAnchor="middle">STREET</text>

      {/* property line */}
      <rect x={5} y={5} width={90} height={90} fill="none" stroke={LINE} strokeWidth={0.8} strokeDasharray="2,1" />

      {/* front setback line */}
      <line x1={5} y1={20} x2={95} y2={20} stroke={LINE_LIGHT} strokeWidth={0.5} strokeDasharray="1,1" />

      {/* side setback lines */}
      <line x1={20} y1={5} x2={20} y2={95} stroke={LINE_LIGHT} strokeWidth={0.5} strokeDasharray="1,1" />
      <line x1={80} y1={5} x2={80} y2={95} stroke={LINE_LIGHT} strokeWidth={0.5} strokeDasharray="1,1" />

      {/* rear setback line */}
      <line x1={5} y1={80} x2={95} y2={80} stroke={LINE_LIGHT} strokeWidth={0.5} strokeDasharray="1,1" />

      {/* fire lane along east side */}
      <rect x={82} y={5} width={8} height={90} fill="#fecaca" opacity={0.6} />
      <text x={86} y={50} fontSize={3} fill={TEXT} textAnchor="middle" transform="rotate(90 86 50)">FIRE LANE</text>

      {/* utility easement along rear */}
      <rect x={5} y={80} width={90} height={10} fill="#fde68a" opacity={0.6} />
      <text x={50} y={87} fontSize={3} fill={TEXT} textAnchor="middle">UTILITY EASEMENT</text>

      {/* building footprint */}
      <rect x={30} y={35} width={40} height={30} fill={FILL_ROOM} stroke={LINE} strokeWidth={1.2} />
      <text x={50} y={52} fontSize={3.5} fill={TEXT} textAnchor="middle">BUILDING</text>

      {/* accessible route from street to entrance */}
      <line x1={50} y1={5} x2={50} y2={35} stroke="#0ea5e9" strokeWidth={1.2} strokeDasharray="2,1" />
      <text x={54} y={15} fontSize={3} fill={TEXT}>ACCESSIBLE ROUTE</text>
    </g>
  );
}
