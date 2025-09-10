export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  content: string;
  lineNumber?: number;
  originalLineNumber?: number;
}

export interface DiffResult {
  lines: DiffLine[];
  hasChanges: boolean;
  addedLines: number;
  removedLines: number;
  modifiedLines: number;
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
      // Line modified
      lines.push({
        type: 'removed',
        content: originalLine,
        originalLineNumber: i + 1
      });
      lines.push({
        type: 'added',
        content: modifiedLine,
        lineNumber: i + 1
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
