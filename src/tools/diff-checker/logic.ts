/**
 * Pure logic functions for Text Diff Checker tool.
 * No UI dependencies — all functions are deterministic and side-effect free.
 */

import { diffLines, diffWords, type Change } from "diff";

export type { Change };

export interface DiffStats {
  additions: number;
  deletions: number;
  changes: number;
}

function computeStats(changes: Change[]): DiffStats {
  let additions = 0;
  let deletions = 0;

  for (const part of changes) {
    const lineCount = part.count ?? part.value.split("\n").filter(Boolean).length;
    if (part.added) {
      additions += lineCount;
    } else if (part.removed) {
      deletions += lineCount;
    }
  }

  return {
    additions,
    deletions,
    changes: additions + deletions,
  };
}

/**
 * Compute a line-by-line diff between two strings.
 */
export function computeLineDiff(
  original: string,
  modified: string
): { changes: Change[]; stats: DiffStats } {
  const changes = diffLines(original, modified);
  return { changes, stats: computeStats(changes) };
}

/**
 * Compute a word-by-word diff between two strings.
 */
export function computeWordDiff(
  original: string,
  modified: string
): { changes: Change[]; stats: DiffStats } {
  const changes = diffWords(original, modified);
  return { changes, stats: computeStats(changes) };
}
