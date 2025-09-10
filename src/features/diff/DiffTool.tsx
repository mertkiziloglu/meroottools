import React, { useState, useCallback, useMemo } from "react";
import {
  Container,
  Title,
  Paper,
  Flex,
  Box,
  Text,
  Button,
  Group,
  Select,
  Badge,
  Textarea,
  FileInput,
  Tabs,
  Stack,
  Divider,
  Alert
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { Editor } from "@monaco-editor/react";
import { LuUpload, LuFileText, LuCode2, LuInfo } from "react-icons/lu";
import { diffText, diffJSON, detectFileType, deepCompareJSON, DiffResult } from "./utils/diffUtils";
import { DiffViewer } from "./DiffViewer";

type ComparisonMode = 'side-by-side' | 'unified' | 'split';
type FileType = 'json' | 'text';

export const DiffTool = () => {
  const [leftContent, setLeftContent] = useState("");
  const [rightContent, setRightContent] = useState("");
  const [leftFileName, setLeftFileName] = useState("Dosya 1");
  const [rightFileName, setRightFileName] = useState("Dosya 2");
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('side-by-side');
  const [fileType, setFileType] = useState<FileType>('text');
  const [autoDetectType, setAutoDetectType] = useState(true);

  // Handle file uploads
  const handleFileUpload = useCallback((file: File, side: 'left' | 'right') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (side === 'left') {
        setLeftContent(content);
        setLeftFileName(file.name);
      } else {
        setRightContent(content);
        setRightFileName(file.name);
      }
      
      if (autoDetectType) {
        const detectedType = detectFileType(content, file.name);
        setFileType(detectedType);
      }
    };
    reader.readAsText(file);
  }, [autoDetectType]);

  // Calculate diff results
  const diffResult = useMemo((): DiffResult | null => {
    if (!leftContent && !rightContent) return null;
    
    if (fileType === 'json') {
      return diffJSON(leftContent, rightContent);
    } else {
      return diffText(leftContent, rightContent);
    }
  }, [leftContent, rightContent, fileType]);

  // Calculate JSON differences for detailed analysis
  const jsonDifferences = useMemo(() => {
    if (fileType !== 'json' || !leftContent || !rightContent) return [];
    
    try {
      const obj1 = JSON.parse(leftContent);
      const obj2 = JSON.parse(rightContent);
      return deepCompareJSON(obj1, obj2);
    } catch {
      return [];
    }
  }, [leftContent, rightContent, fileType]);

  const clearAll = () => {
    setLeftContent("");
    setRightContent("");
    setLeftFileName("Dosya 1");
    setRightFileName("Dosya 2");
  };

  return (
    <Container size="xl" mt="xl">
      <Stack gap="lg">
        {/* Header */}
        <Box>
          <Title order={1} c="black" mb="sm">
            Dosya Karşılaştırma Aracı
          </Title>
          <Text c="dimmed" size="lg">
            İki farklı metin veya JSON dosyasını karşılaştırın ve aralarındaki farkları görselleştirin.
          </Text>
        </Box>

        {/* Controls */}
        <Paper p="md" withBorder>
          <Group justify="space-between">
            <Group>
              <Select
                label="Dosya Türü"
                value={fileType}
                onChange={(value) => setFileType(value as FileType)}
                data={[
                  { value: 'text', label: 'Metin' },
                  { value: 'json', label: 'JSON' }
                ]}
                disabled={autoDetectType}
              />
              <Select
                label="Görünüm Modu"
                value={comparisonMode}
                onChange={(value) => setComparisonMode(value as ComparisonMode)}
                data={[
                  { value: 'side-by-side', label: 'Yan Yana' },
                  { value: 'unified', label: 'Birleşik' },
                  { value: 'split', label: 'Bölünmüş' }
                ]}
              />
            </Group>
            <Group>
              <Button variant="outline" onClick={clearAll}>
                Temizle
              </Button>
            </Group>
          </Group>
        </Paper>

        {/* File Input Section */}
        <Tabs defaultValue="upload">
          <Tabs.List>
            <Tabs.Tab value="upload" leftSection={<LuUpload size={16} />}>
              Dosya Yükle
            </Tabs.Tab>
            <Tabs.Tab value="text" leftSection={<LuFileText size={16} />}>
              Metin Gir
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="upload" pt="md">
            <Flex gap="md">
              <Paper flex="1" p="md" withBorder>
                <Text size="sm" fw={500} mb="xs">{leftFileName}</Text>
                <Dropzone
                  onDrop={(files) => handleFileUpload(files[0], 'left')}
                  accept={['text/*', 'application/json']}
                  multiple={false}
                >
                  <Group justify="center" gap="xl" mih={100} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <LuUpload size={50} color="var(--mantine-color-blue-6)" />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <LuFileText size={50} color="var(--mantine-color-red-6)" />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <LuFileText size={50} color="var(--mantine-color-dimmed)" />
                    </Dropzone.Idle>
                    <div>
                      <Text size="xl" inline>
                        Sol dosyayı buraya sürükleyin
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        Metin veya JSON dosyası seçin
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
              </Paper>

              <Paper flex="1" p="md" withBorder>
                <Text size="sm" fw={500} mb="xs">{rightFileName}</Text>
                <Dropzone
                  onDrop={(files) => handleFileUpload(files[0], 'right')}
                  accept={['text/*', 'application/json']}
                  multiple={false}
                >
                  <Group justify="center" gap="xl" mih={100} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <LuUpload size={50} color="var(--mantine-color-blue-6)" />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <LuFileText size={50} color="var(--mantine-color-red-6)" />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <LuFileText size={50} color="var(--mantine-color-dimmed)" />
                    </Dropzone.Idle>
                    <div>
                      <Text size="xl" inline>
                        Sağ dosyayı buraya sürükleyin
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        Metin veya JSON dosyası seçin
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
              </Paper>
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="text" pt="md">
            <Flex gap="md">
              <Paper flex="1" withBorder>
                <Box p="xs" bg="gray.1">
                  <Text size="sm" fw={500}>{leftFileName}</Text>
                </Box>
                <Editor
                  value={leftContent}
                  onChange={(value) => setLeftContent(value || "")}
                  language={fileType}
                  height={400}
                  options={{
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    fontSize: 14,
                  }}
                />
              </Paper>

              <Paper flex="1" withBorder>
                <Box p="xs" bg="gray.1">
                  <Text size="sm" fw={500}>{rightFileName}</Text>
                </Box>
                <Editor
                  value={rightContent}
                  onChange={(value) => setRightContent(value || "")}
                  language={fileType}
                  height={400}
                  options={{
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    fontSize: 14,
                  }}
                />
              </Paper>
            </Flex>
          </Tabs.Panel>
        </Tabs>

        {/* Results Section */}
        {diffResult && (
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={3}>Karşılaştırma Sonucu</Title>
              <Group>
                {diffResult.addedLines > 0 && (
                  <Badge color="green" variant="light">
                    +{diffResult.addedLines} eklenen
                  </Badge>
                )}
                {diffResult.removedLines > 0 && (
                  <Badge color="red" variant="light">
                    -{diffResult.removedLines} silinen
                  </Badge>
                )}
                {!diffResult.hasChanges && (
                  <Badge color="blue" variant="light">
                    Dosyalar aynı
                  </Badge>
                )}
              </Group>
            </Group>

            {jsonDifferences.length > 0 && (
              <Alert icon={<LuInfo size={16} />} title="JSON Farkları" mb="md">
                <Stack gap="xs">
                  {jsonDifferences.slice(0, 10).map((diff, index) => (
                    <Text key={index} size="sm" c="dimmed">
                      {diff}
                    </Text>
                  ))}
                  {jsonDifferences.length > 10 && (
                    <Text size="sm" c="dimmed" fs="italic">
                      ... ve {jsonDifferences.length - 10} fark daha
                    </Text>
                  )}
                </Stack>
              </Alert>
            )}

            <DiffViewer
              diffResult={diffResult}
              mode={comparisonMode}
              leftFileName={leftFileName}
              rightFileName={rightFileName}
            />
          </Paper>
        )}
      </Stack>
    </Container>
  );
};
