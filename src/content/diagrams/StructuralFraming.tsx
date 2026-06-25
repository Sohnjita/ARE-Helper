import { LINE, FILL_ACCENT, TEXT } from "./style";

/** Schematic structural framing plan for structural-systems hotspot questions. ViewBox: 0 0 100 100. */
export default function StructuralFraming() {
  const grid = [20, 50, 80];

  const columns = grid.flatMap((x) =>
    grid.map((y) => (
      <rect key={`col-${x}-${y}`} x={x - 1.5} y={y - 1.5} width={3} height={3} fill={LINE} />
    ))
  );

  const beamsH = grid.map((y) => (
    <line key={`bh-${y}`} x1={20} y1={y} x2={80} y2={y} stroke={LINE} strokeWidth={1} />
  ));
  const beamsV = grid.map((x) => (
    <line key={`bv-${x}`} x1={x} y1={20} x2={x} y2={80} stroke={LINE} strokeWidth={1} />
  ));

  // joists in the A-B / 1-2 bay, spanning vertically
  const joists = [25, 30, 35, 40, 45].map((x) => (
    <line key={`j-${x}`} x1={x} y1={20} x2={x} y2={50} stroke={FILL_ACCENT} strokeWidth={0.4} />
  ));

  return (
    <g>
      {/* grid labels */}
      <text x={20} y={14} fontSize={4} fill={TEXT} textAnchor="middle">A</text>
      <text x={50} y={14} fontSize={4} fill={TEXT} textAnchor="middle">B</text>
      <text x={80} y={14} fontSize={4} fill={TEXT} textAnchor="middle">C</text>
      <text x={14} y={21} fontSize={4} fill={TEXT} textAnchor="middle">1</text>
      <text x={14} y={51} fontSize={4} fill={TEXT} textAnchor="middle">2</text>
      <text x={14} y={81} fontSize={4} fill={TEXT} textAnchor="middle">3</text>

      {joists}
      {beamsH}
      {beamsV}
      {columns}

      {/* shear wall along grid A between rows 2-3 */}
      <rect x={17} y={48} width={5} height={34} fill="#475569" />
      <text x={11} y={66} fontSize={3} fill={TEXT} textAnchor="middle" transform="rotate(-90 11 66)">SHEAR WALL</text>
    </g>
  );
}
