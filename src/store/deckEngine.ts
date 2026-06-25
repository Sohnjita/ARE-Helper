import type { Question } from "../content/types";

export interface DeckState {
  seenIds: string[];
  cycles: number;
}

export const EMPTY_DECK: DeckState = { seenIds: [], cycles: 0 };

export function shuffle<T>(items: T[]): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Draws `count` questions from `pool` without repeating a question until every
 * question in the pool has been seen at least once ("cycle"). When the unseen
 * pool runs dry mid-draw, the cycle counter increments and a freshly shuffled
 * full pool is used to fill the remainder of the batch.
 */
export function drawQuestions(
  pool: Question[],
  deck: DeckState,
  count: number,
): { drawn: Question[]; nextDeck: DeckState } {
  if (pool.length === 0) return { drawn: [], nextDeck: deck };

  const seen = new Set(deck.seenIds);
  let cycles = deck.cycles;
  let queue = shuffle(pool.filter((q) => !seen.has(q.id)));
  const drawn: Question[] = [];

  while (drawn.length < count) {
    if (queue.length === 0) {
      cycles += 1;
      seen.clear();
      queue = shuffle(pool);
    }
    const next = queue.shift();
    if (!next) break;
    drawn.push(next);
    seen.add(next.id);
  }

  return { drawn, nextDeck: { seenIds: Array.from(seen), cycles } };
}

/** Stateless random sample without replacement, for exam simulations (full breadth, no cross-session dedupe). */
export function drawExamSimQuestions(pool: Question[], count: number): Question[] {
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}
