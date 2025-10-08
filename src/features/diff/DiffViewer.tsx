import React from "react";
import { Box, Text, Flex, Paper, ScrollArea, Code } from "@mantine/core";
import { DiffResult, DiffLine, CharDiff } from "./utils/diffUtils";
import styled from "styled-components";

interface DiffViewerProps {
  diffResult: DiffResult;
  mode: 'side-by-side' | 'unified' | 'split';
  leftFileName: string;
  rightFileName: string;
}

const DiffLineContainer = styled.div<{ type: DiffLine['type'] }>`
  display: flex;
  align-items: flex-start;
  padding: 2px 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.4;
  border-left: 3px solid transparent;
  
  background-color: ${props => {
    switch (props.type) {
      case 'added': return '#e6ffec';
      case 'removed': return '#ffeaea';
      case 'modified': return '#fff3cd';
      case 'unchanged': return 'transparent';
      default: return 'transparent';
    }
  }};
  
  border-left-color: ${props => {
    switch (props.type) {
      case 'added': return '#28a745';
      case 'removed': return '#dc3545';
      case 'modified': return '#ffc107';
      case 'unchanged': return 'transparent';
      default: return 'transparent';
    }
  }};

  &:hover {
    background-color: ${props => {
      switch (props.type) {
        case 'added': return '#d4edda';
        case 'removed': return '#f8d7da';
        case 'modified': return '#ffeaa7';
        case 'unchanged': return '#f8f9fa';
        default: return '#f8f9fa';
      }
    }};
  }
`;

const LineNumber = styled.span`
  display: inline-block;
  width: 50px;
  color: #6c757d;
  text-align: right;
  margin-right: 16px;
  user-select: none;
  flex-shrink: 0;
`;

const LineContent = styled.span`
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;
`;

const DiffPrefix = styled.span<{ type: DiffLine['type'] }>`
  display: inline-block;
  width: 20px;
  color: ${props => {
    switch (props.type) {
      case 'added': return '#28a745';
      case 'removed': return '#dc3545';
      case 'modified': return '#ffc107';
      default: return 'transparent';
    }
  }};
  font-weight: bold;
  flex-shrink: 0;
`;

const CharSpan = styled.span<{ type: CharDiff['type'] }>`
  background-color: ${props => {
    switch (props.type) {
      case 'added': return '#acf2bd';
      case 'removed': return '#fdb8c0';
      case 'unchanged': return 'transparent';
      default: return 'transparent';
    }
  }};
  
  ${props => props.type !== 'unchanged' && `
    padding: 1px 2px;
    border-radius: 2px;
    font-weight: 500;
  `}
`;

// Component to render character-level diffs
const CharacterDiffContent: React.FC<{ charDiffs: CharDiff[] }> = ({ charDiffs }) => {
  return (
    <>
      {charDiffs.map((charDiff, index) => (
        <CharSpan key={index} type={charDiff.type}>
          {charDiff.text}
        </CharSpan>
      ))}
    </>
  );
};

export const DiffViewer: React.FC<DiffViewerProps> = ({
  diffResult,
  mode,
  leftFileName,
  rightFileName
}) => {
  if (mode === 'unified') {
    return (
      <Paper withBorder>
        <Box p="xs" bg="gray.1">
          <Text size="sm" fw={500}>
            {leftFileName} ↔ {rightFileName}
          </Text>
        </Box>
        <ScrollArea h={500}>
          <Box>
            {diffResult.lines.map((line, index) => (
              <DiffLineContainer key={index} type={line.type}>
                <DiffPrefix type={line.type}>
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : line.type === 'modified' ? '~' : ' '}
                </DiffPrefix>
                <LineNumber>
                  {line.type === 'added' ? line.lineNumber : line.originalLineNumber}
                </LineNumber>
                <LineContent>
                  {line.charDiffs ? (
                    <CharacterDiffContent charDiffs={line.charDiffs} />
                  ) : (
                    line.content
                  )}
                </LineContent>
              </DiffLineContainer>
            ))}
          </Box>
        </ScrollArea>
      </Paper>
    );
  }

  if (mode === 'side-by-side') {
    // Group lines by their position for side-by-side view
    const groupedLines: Array<{
      left?: DiffLine;
      right?: DiffLine;
      lineNumber: number;
    }> = [];

    let leftIndex = 0;
    let rightIndex = 0;
    let lineNumber = 1;

    while (leftIndex < diffResult.lines.length || rightIndex < diffResult.lines.length) {
      const leftLine = diffResult.lines[leftIndex];
      const rightLine = diffResult.lines[rightIndex];

      if (leftLine?.type === 'unchanged' && rightLine?.type === 'unchanged' && leftLine.content === rightLine.content) {
        groupedLines.push({
          left: leftLine,
          right: rightLine,
          lineNumber
        });
        leftIndex++;
        rightIndex++;
      } else if (leftLine?.type === 'removed') {
        groupedLines.push({
          left: leftLine,
          lineNumber
        });
        leftIndex++;
      } else if (rightLine?.type === 'added') {
        groupedLines.push({
          right: rightLine,
          lineNumber
        });
        rightIndex++;
      } else {
        // Handle other cases
        groupedLines.push({
          left: leftLine,
          right: rightLine,
          lineNumber
        });
        if (leftLine) leftIndex++;
        if (rightLine) rightIndex++;
      }
      lineNumber++;
    }

    return (
      <Flex gap="md">
        <Paper flex="1" withBorder>
          <Box p="xs" bg="gray.1">
            <Text size="sm" fw={500}>{leftFileName}</Text>
          </Box>
          <ScrollArea h={500}>
            <Box>
              {groupedLines.map((group, index) => (
                <DiffLineContainer 
                  key={`left-${index}`} 
                  type={group.left?.type || 'unchanged'}
                >
                  <LineNumber>{group.left?.originalLineNumber || ''}</LineNumber>
                  <LineContent>
                    {group.left?.charDiffs ? (
                      <CharacterDiffContent charDiffs={group.left.charDiffs} />
                    ) : (
                      group.left?.content || ''
                    )}
                  </LineContent>
                </DiffLineContainer>
              ))}
            </Box>
          </ScrollArea>
        </Paper>

        <Paper flex="1" withBorder>
          <Box p="xs" bg="gray.1">
            <Text size="sm" fw={500}>{rightFileName}</Text>
          </Box>
          <ScrollArea h={500}>
            <Box>
              {groupedLines.map((group, index) => (
                <DiffLineContainer 
                  key={`right-${index}`} 
                  type={group.right?.type || 'unchanged'}
                >
                  <LineNumber>{group.right?.lineNumber || ''}</LineNumber>
                  <LineContent>
                    {group.right?.charDiffs ? (
                      <CharacterDiffContent charDiffs={group.right.charDiffs} />
                    ) : (
                      group.right?.content || ''
                    )}
                  </LineContent>
                </DiffLineContainer>
              ))}
            </Box>
          </ScrollArea>
        </Paper>
      </Flex>
    );
  }

  // Split mode - show only differences
  const changedLines = diffResult.lines.filter(line => line.type !== 'unchanged');

  return (
    <Paper withBorder>
      <Box p="xs" bg="gray.1">
        <Text size="sm" fw={500}>
          Changes Only - {leftFileName} ↔ {rightFileName}
        </Text>
      </Box>
      <ScrollArea h={500}>
        <Box>
          {changedLines.length === 0 ? (
            <Box p="md" ta="center">
              <Text c="dimmed">No differences found between files</Text>
            </Box>
          ) : (
            changedLines.map((line, index) => (
              <DiffLineContainer key={index} type={line.type}>
                <DiffPrefix type={line.type}>
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : line.type === 'modified' ? '~' : ' '}
                </DiffPrefix>
                <LineNumber>
                  {line.type === 'added' ? line.lineNumber : line.originalLineNumber}
                </LineNumber>
                <LineContent>
                  {line.charDiffs ? (
                    <CharacterDiffContent charDiffs={line.charDiffs} />
                  ) : (
                    line.content
                  )}
                </LineContent>
              </DiffLineContainer>
            ))
          )}
        </Box>
      </ScrollArea>
    </Paper>
  );
};
