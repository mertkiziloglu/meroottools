export interface CharDiff {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  content: string;
  lineNumber?: number;
  originalLineNumber?: number;
  charDiffs?: CharDiff[];
}

export interface DiffResult {
  lines: DiffLine[];
  hasChanges: boolean;
  addedLines: number;
  removedLines: number;
  modifiedLines: number;
}

/**
 * Character-level diff algorithm using dynamic programming
 */
export function getCharacterDiff(str1: string, str2: string): CharDiff[] {
  const m = str1.length;
  const n = str2.length;
  
  // Create a DP table to store the length of LCS
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find the actual diff
  const result: CharDiff[] = [];
  let i = m, j = n;
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && str1[i - 1] === str2[j - 1]) {
      result.unshift({ type: 'unchanged', text: str1[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', text: str2[j - 1] });
      j--;
    } else if (i > 0) {
      result.unshift({ type: 'removed', text: str1[i - 1] });
      i--;
    }
  }
  
  return result;
}

/**
 * Simple line-by-line diff implementation
 */
export function diffText(original: string, modified: string): DiffResult {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');
  
  const lines: DiffLine[] = [];
  let addedLines = 0;
  let removedLines = 0;
  let modifiedLinesCount = 0;
  
  const maxLength = Math.max(originalLines.length, modifiedLines.length);
  
  for (let i = 0; i < maxLength; i++) {
    const originalLine = originalLines[i];
    const modifiedLine = modifiedLines[i];
    
    if (originalLine === undefined) {
      // Line added in modified
      lines.push({
        type: 'added',
        content: modifiedLine,
        lineNumber: i + 1
      });
      addedLines++;
    } else if (modifiedLine === undefined) {
      // Line removed from original
      lines.push({
        type: 'removed',
        content: originalLine,
        originalLineNumber: i + 1
      });
      removedLines++;
    } else if (originalLine === modifiedLine) {
      // Line unchanged
      lines.push({
        type: 'unchanged',
        content: originalLine,
        lineNumber: i + 1,
        originalLineNumber: i + 1
      });
    } else {
      // Line modified - add character-level diff
      const charDiffs = getCharacterDiff(originalLine, modifiedLine);
      lines.push({
        type: 'modified',
        content: originalLine,
        originalLineNumber: i + 1,
        lineNumber: i + 1,
        charDiffs: charDiffs
      });
      modifiedLinesCount++;
    }
  }
  
  const hasChanges = addedLines > 0 || removedLines > 0 || modifiedLinesCount > 0;
  
  return {
    lines,
    hasChanges,
    addedLines,
    removedLines,
    modifiedLines: modifiedLinesCount
  };
}

/**
 * JSON-aware diff that formats and compares JSON objects
 */
export function diffJSON(original: string, modified: string): DiffResult {
  try {
    // Try to parse and format both JSON strings
    const originalParsed = JSON.parse(original);
    const modifiedParsed = JSON.parse(modified);
    
    const originalFormatted = JSON.stringify(originalParsed, null, 2);
    const modifiedFormatted = JSON.stringify(modifiedParsed, null, 2);
    
    return diffText(originalFormatted, modifiedFormatted);
  } catch (error) {
    // If JSON parsing fails, fall back to text diff
    return diffText(original, modified);
  }
}

/**
 * Deep object comparison for JSON objects
 */
export function deepCompareJSON(obj1: any, obj2: any, path: string = ''): string[] {
  const differences: string[] = [];
  
  if (typeof obj1 !== typeof obj2) {
    differences.push(`${path}: Type mismatch - ${typeof obj1} vs ${typeof obj2}`);
    return differences;
  }
  
  if (obj1 === null || obj2 === null) {
    if (obj1 !== obj2) {
      differences.push(`${path}: ${obj1} !== ${obj2}`);
    }
    return differences;
  }
  
  if (typeof obj1 !== 'object') {
    if (obj1 !== obj2) {
      differences.push(`${path}: ${obj1} !== ${obj2}`);
    }
    return differences;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = new Set([...keys1, ...keys2]);
  
  for (const key of allKeys) {
    const newPath = path ? `${path}.${key}` : key;
    
    if (!(key in obj1)) {
      differences.push(`${newPath}: Property added in second object`);
    } else if (!(key in obj2)) {
      differences.push(`${newPath}: Property removed in second object`);
    } else {
      differences.push(...deepCompareJSON(obj1[key], obj2[key], newPath));
    }
  }
  
  return differences;
}

/**
 * Get file type from content or filename
 */
export function detectFileType(content: string, filename?: string): 'json' | 'text' {
  if (filename) {
    const ext = filename.toLowerCase().split('.').pop();
    if (ext === 'json') return 'json';
  }
  
  try {
    JSON.parse(content);
    return 'json';
  } catch {
    return 'text';
  }
}
