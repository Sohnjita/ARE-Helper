import type { ComponentType } from "react";
import EgressPlan from "./EgressPlan";
import WallSection from "./WallSection";
import AccessibleRestroom from "./AccessibleRestroom";
import SitePlan from "./SitePlan";
import StructuralFraming from "./StructuralFraming";

export const DIAGRAMS: Record<string, ComponentType> = {
  "egress-plan": EgressPlan,
  "wall-section": WallSection,
  "accessible-restroom": AccessibleRestroom,
  "site-plan": SitePlan,
  "structural-framing": StructuralFraming,
};

export { DIAGRAM_POINTS, getNamedPoint } from "./points";
export type { NamedPoint } from "./points";
