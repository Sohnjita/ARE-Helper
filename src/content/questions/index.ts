import type { Division, Question } from "../types";
import { DIVISION_ORDER, DIVISIONS } from "../divisions";
import { DIAGRAMS } from "../diagrams";
import pcm from "./pcm.json";
import pjm from "./pjm.json";
import pa from "./pa.json";
import ppd from "./ppd.json";
import pdd from "./pdd.json";
import ce from "./ce.json";

const RAW_BANKS: Record<Division, unknown[]> = {
  PcM: pcm,
  PjM: pjm,
  PA: pa,
  PPD: ppd,
  PDD: pdd,
  CE: ce,
};

function validateQuestion(division: Division, q: Question, seenIds: Set<string>): string[] {
  const errors: string[] = [];
  const tag = `${division}/${q.id ?? "<no id>"}`;

  if (!q.id) errors.push(`${tag}: missing id`);
  else if (seenIds.has(q.id)) errors.push(`${tag}: duplicate id`);
  else seenIds.add(q.id);

  if (q.division !== division) errors.push(`${tag}: division mismatch (file=${division}, field=${q.division})`);

  const validAreaCodes = DIVISIONS[division].contentAreas.map((a) => a.code);
  if (!validAreaCodes.includes(q.contentAreaCode)) {
    errors.push(`${tag}: unknown contentAreaCode "${q.contentAreaCode}" for division ${division}`);
  }

  if (!q.prompt) errors.push(`${tag}: missing prompt`);
  if (!q.explanation) errors.push(`${tag}: missing explanation`);

  switch (q.type) {
    case "single": {
      if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${tag}: single needs >=2 options`);
      if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        errors.push(`${tag}: correctIndex out of range`);
      }
      break;
    }
    case "multi": {
      if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${tag}: multi needs >=2 options`);
      if (q.correctIndexes.length !== q.selectCount) {
        errors.push(`${tag}: correctIndexes length (${q.correctIndexes.length}) != selectCount (${q.selectCount})`);
      }
      if (q.correctIndexes.some((i) => i < 0 || i >= q.options.length)) {
        errors.push(`${tag}: correctIndexes has an out-of-range index`);
      }
      break;
    }
    case "quant": {
      if (typeof q.correctValue !== "number") errors.push(`${tag}: quant missing correctValue`);
      if (typeof q.tolerance !== "number") errors.push(`${tag}: quant missing tolerance`);
      break;
    }
    case "hotspot": {
      if (!DIAGRAMS[q.diagramId]) errors.push(`${tag}: unknown diagramId "${q.diagramId}"`);
      if (!q.correctRegion) errors.push(`${tag}: missing correctRegion`);
      else if (q.correctRegion.shape === "circle") {
        if (q.correctRegion.cx === undefined || q.correctRegion.cy === undefined || q.correctRegion.r === undefined) {
          errors.push(`${tag}: circle correctRegion missing cx/cy/r`);
        }
      } else if (q.correctRegion.shape === "rect") {
        if (
          q.correctRegion.x === undefined ||
          q.correctRegion.y === undefined ||
          q.correctRegion.w === undefined ||
          q.correctRegion.h === undefined
        ) {
          errors.push(`${tag}: rect correctRegion missing x/y/w/h`);
        }
      } else {
        errors.push(`${tag}: unknown correctRegion.shape`);
      }
      break;
    }
    default:
      errors.push(`${tag}: unknown question type`);
  }

  return errors;
}

const BANKS: Record<Division, Question[]> = {} as Record<Division, Question[]>;

const allErrors: string[] = [];
for (const division of DIVISION_ORDER) {
  const raw = (RAW_BANKS[division] ?? []) as Question[];
  const seenIds = new Set<string>();
  for (const q of raw) {
    allErrors.push(...validateQuestion(division, q, seenIds));
  }
  BANKS[division] = raw;
}

if (allErrors.length > 0 && import.meta.env.DEV) {
  console.error(`[content] ${allErrors.length} question bank validation error(s):\n${allErrors.join("\n")}`);
}

export function questionsForDivision(division: Division): Question[] {
  return BANKS[division];
}

export function allQuestions(): Question[] {
  return DIVISION_ORDER.flatMap((d) => BANKS[d]);
}

export function poolFor(key: Division | "ALL"): Question[] {
  return key === "ALL" ? allQuestions() : questionsForDivision(key);
}

export function questionCountByDivision(): Record<Division, number> {
  const counts = {} as Record<Division, number>;
  for (const d of DIVISION_ORDER) counts[d] = BANKS[d].length;
  return counts;
}
