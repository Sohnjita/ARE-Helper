// Core content schema for the ARE study app.
// All question content (hand-authored JSON banks) must conform to these types.

export type Division = "PcM" | "PjM" | "PA" | "PPD" | "PDD" | "CE";

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionType = "single" | "multi" | "hotspot" | "quant";

export interface BaseQuestion {
  /** Unique id, format `${division}-${contentAreaCode}-${3-digit-number}`, e.g. "PcM-BO-014" */
  id: string;
  division: Division;
  /** Content area code, e.g. "BO" for Business Operations. Must match a code in divisions.ts for the division. */
  contentAreaCode: string;
  difficulty: Difficulty;
  type: QuestionType;
  /** The question stem / scenario. */
  prompt: string;
  /** Shown after the user answers, regardless of correctness. Should teach the underlying concept. */
  explanation: string;
  /** Optional freeform keywords for search/filter. */
  tags?: string[];
  /** Optional general reference, e.g. "IBC Ch. 10 - Egress" or "AIA A201 - General Conditions". Conceptual reference only, never quoted text. */
  reference?: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single";
  /** 4-5 answer options. */
  options: string[];
  correctIndex: number;
}

export interface MultiChoiceQuestion extends BaseQuestion {
  type: "multi";
  /** 5-7 answer options. */
  options: string[];
  /** Indexes of all correct options. length must equal selectCount. */
  correctIndexes: number[];
  /** Number of options the user must select (matches real ARE "check all that apply (n)" format). */
  selectCount: number;
}

export interface HotspotRegion {
  shape: "circle" | "rect";
  /** circle center x, in 0-100 normalized diagram units */
  cx?: number;
  cy?: number;
  r?: number;
  /** rect top-left x/y and width/height, in 0-100 normalized diagram units */
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  /** optional short label shown on the diagram during review */
  label?: string;
}

export interface HotspotQuestion extends BaseQuestion {
  type: "hotspot";
  /** id of a diagram registered in content/diagrams/index.ts */
  diagramId: string;
  correctRegion: HotspotRegion;
}

export interface QuantQuestion extends BaseQuestion {
  type: "quant";
  correctValue: number;
  /** absolute +/- tolerance for an answer to be accepted as correct */
  tolerance: number;
  unit?: string;
}

export type Question =
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | HotspotQuestion
  | QuantQuestion;

export interface ContentAreaMeta {
  code: string;
  name: string;
}

export interface DivisionMeta {
  code: Division;
  name: string;
  shortDescription: string;
  color: string;
  contentAreas: ContentAreaMeta[];
}
