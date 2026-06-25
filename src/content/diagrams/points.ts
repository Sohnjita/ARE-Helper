import type { HotspotRegion } from "../types";

/**
 * Each diagram exposes a fixed set of "named points of interest" with exact
 * coordinates (0-100 normalized viewBox units). Content authors must pick the
 * correctRegion for a hotspot question by copying one of these regions
 * verbatim (do not invent new coordinates) so the click target always lines
 * up with what's actually drawn on the diagram.
 */
export interface NamedPoint extends HotspotRegion {
  description: string;
}

export const DIAGRAM_POINTS: Record<string, Record<string, NamedPoint>> = {
  "egress-plan": {
    "exit-left": {
      shape: "rect", x: 8, y: 44, w: 4, h: 8,
      description: "the exit discharge door at the west end of the corridor",
    },
    "exit-right": {
      shape: "rect", x: 88, y: 44, w: 4, h: 8,
      description: "the exit discharge door at the east end of the corridor",
    },
    "door-swing-obstruction": {
      shape: "circle", cx: 50, cy: 54, r: 8,
      description: "the door swing from Room E that encroaches into the required clear width of the egress corridor",
    },
    "dead-end-corridor": {
      shape: "rect", x: 76, y: 54, w: 8, h: 26,
      description: "the dead-end corridor segment that does not lead to an exit",
    },
    "corridor-clear-width": {
      shape: "rect", x: 30, y: 42, w: 20, h: 12,
      description: "the corridor segment used to measure the required clear width of the egress path",
    },
  },
  "wall-section": {
    "flashing": {
      shape: "rect", x: 56, y: 66, w: 16, h: 4,
      description: "the through-wall flashing above grade that directs moisture out through the weep holes",
    },
    "weep-holes": {
      shape: "rect", x: 64, y: 67, w: 8, h: 3,
      description: "the weep holes spaced along the base of the brick veneer",
    },
    "wrb": {
      shape: "rect", x: 59, y: 20, w: 2, h: 48,
      description: "the water-resistive barrier layer",
    },
    "airspace": {
      shape: "rect", x: 60, y: 20, w: 4, h: 46,
      description: "the drainage airspace behind the veneer",
    },
    "insulation-cavity": {
      shape: "rect", x: 44, y: 20, w: 12, h: 48,
      description: "the insulated stud cavity",
    },
    "parapet-coping": {
      shape: "rect", x: 38, y: 8, w: 26, h: 6,
      description: "the parapet cap/coping at the top of the wall",
    },
  },
  "accessible-restroom": {
    "rear-grab-bar": {
      shape: "rect", x: 50, y: 18, w: 20, h: 3,
      description: "the rear grab bar behind the water closet",
    },
    "side-grab-bar": {
      shape: "rect", x: 68, y: 20, w: 3, h: 18,
      description: "the side wall grab bar beside the water closet",
    },
    "turning-space": {
      shape: "circle", cx: 40, cy: 50, r: 18,
      description: "the clear floor turning space",
    },
    "lav-clearance": {
      shape: "rect", x: 12, y: 45, w: 20, h: 14,
      description: "the clear floor space in front of the lavatory",
    },
    "door-clear-width": {
      shape: "rect", x: 8, y: 12, w: 4, h: 10,
      description: "the door's clear opening width",
    },
  },
  "site-plan": {
    "front-setback-zone": {
      shape: "rect", x: 5, y: 5, w: 90, h: 15,
      description: "the required front yard setback area between the property line and the building setback line",
    },
    "accessible-route": {
      shape: "rect", x: 47, y: 5, w: 6, h: 30,
      description: "the accessible route connecting the public way to the building entrance",
    },
    "fire-lane": {
      shape: "rect", x: 82, y: 5, w: 8, h: 90,
      description: "the dedicated fire apparatus access lane",
    },
    "utility-easement": {
      shape: "rect", x: 5, y: 80, w: 90, h: 10,
      description: "the utility easement along the rear of the site",
    },
    "building-footprint": {
      shape: "rect", x: 30, y: 35, w: 40, h: 30,
      description: "the building footprint",
    },
  },
  "structural-framing": {
    "shear-wall": {
      shape: "rect", x: 17, y: 48, w: 5, h: 34,
      description: "the shear wall providing lateral resistance along grid line A between gridlines 2 and 3",
    },
    "interior-column-b2": {
      shape: "circle", cx: 50, cy: 50, r: 5,
      description: "the interior column at grid intersection B-2, which carries the largest tributary floor area",
    },
    "joist-bay": {
      shape: "rect", x: 20, y: 20, w: 30, h: 30,
      description: "the joist bay spanning between grid lines A-B and 1-2",
    },
    "corner-column-a1": {
      shape: "circle", cx: 20, cy: 20, r: 5,
      description: "the corner column at grid intersection A-1",
    },
    "beam-line-b": {
      shape: "rect", x: 48, y: 20, w: 4, h: 60,
      description: "the beam line along grid line B",
    },
  },
};

export function getNamedPoint(diagramId: string, pointId: string): NamedPoint {
  const point = DIAGRAM_POINTS[diagramId]?.[pointId];
  if (!point) {
    throw new Error(`Unknown hotspot point "${pointId}" for diagram "${diagramId}"`);
  }
  return point;
}
