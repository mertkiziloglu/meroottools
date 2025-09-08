import React, { useState } from "react";
import { NextSeo } from "next-seo";
import {
  Container,
  Title,
  Text,
  Stack,
  Button,
  Textarea,
  Alert,
  Group,
  Paper,
  Divider,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { FaCopy, FaDownload, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Layout from "../layout/PageLayout";
import { SEO } from "../constants/seo";

const FormatPage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    try {
      setError("");
      if (!input.trim()) {
        setError("Please enter JSON data to format");
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      toast.success("JSON formatted successfully!");
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      setError("");
      if (!input.trim()) {
        setError("Please enter JSON data to minify");
        return;
      }

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      toast.success("JSON minified successfully!");
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    }
  };

  const downloadJSON = () => {
    if (output) {
      const blob = new Blob([output], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "formatted.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("JSON file downloaded!");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    toast.success("Cleared all data!");
  };

  return (
    <Layout>
      <NextSeo
        {...SEO}
        title="JSON Formatter & Beautifier | Meroot Tools"
        description="Format, beautify and minify JSON data online. Clean up messy JSON with proper indentation and structure."
        canonical="http://localhost:3000/format"
      />
      <Container size="xl" my={40}>
        <Stack gap="xl">
          <Stack gap="md" ta="center">
            <Title order={1} c="dark">
              JSON Formatter & Beautifier
            </Title>
            <Text c="dimmed" fz="lg">
              Format messy JSON data with proper indentation or minify for production use
            </Text>
          </Stack>

          <Paper shadow="sm" p="xl" radius="md">
            <Stack gap="lg">
              <div>
                <Text fw={500} mb="sm">
                  Input JSON
                </Text>
                <Textarea
                  placeholder="Paste your messy JSON here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  minRows={20}
                  autosize
                  styles={{
                    input: {
                      fontFamily: "monospace",
                      fontSize: "14px",
                      maxHeight: "70vh",
                      overflowY: "auto",
                    },
                  }}
                />
              </div>

              <Group justify="center">
                <Button
                  onClick={formatJSON}
                  size="md"
                  radius="md"
                  color="blue"
                  disabled={!input.trim()}
                >
                  Format & Beautify
                </Button>
                <Button
                  onClick={minifyJSON}
                  size="md"
                  radius="md"
                  variant="outline"
                  color="gray"
                  disabled={!input.trim()}
                >
                  Minify
                </Button>
                <Button
                  onClick={clearAll}
                  size="md"
                  radius="md"
                  variant="light"
                  color="red"
                  leftSection={<FaTrash />}
                >
                  Clear
                </Button>
              </Group>

              {error && (
                <Alert color="red" title="Error">
                  {error}
                </Alert>
              )}

              {output && (
                <>
                  <Divider />
                  <div>
                    <Group justify="space-between" mb="sm">
                      <Text fw={500}>Formatted Output</Text>
                      <Group gap="xs">
                        <Tooltip label="Copy to clipboard">
                          <ActionIcon
                            onClick={copyToClipboard}
                            variant="subtle"
                            color="blue"
                          >
                            <FaCopy />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Download JSON file">
                          <ActionIcon
                            onClick={downloadJSON}
                            variant="subtle"
                            color="green"
                          >
                            <FaDownload />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                    <Textarea
                      value={output}
                      readOnly
                      minRows={20}
                      autosize
                      styles={{
                        input: {
                          fontFamily: "monospace",
                          fontSize: "14px",
                          backgroundColor: "#f8f9fa",
                          maxHeight: "70vh",
                          overflowY: "auto",
                        },
                      }}
                    />
                  </div>
                </>
              )}
            </Stack>
          </Paper>

          <Paper shadow="sm" p="lg" radius="md" bg="gray.0">
            <Stack gap="md">
              <Title order={3} c="dark">
                How to Use
              </Title>
              <Stack gap="sm">
                <Text>
                  <strong>1. Paste JSON:</strong> Copy your messy or unformatted JSON data into the input area
                </Text>
                <Text>
                  <strong>2. Format:</strong> Click "Format & Beautify" to add proper indentation and structure
                </Text>
                <Text>
                  <strong>3. Minify:</strong> Click "Minify" to remove all whitespace for production use
                </Text>
                <Text>
                  <strong>4. Copy or Download:</strong> Use the copy button or download the formatted JSON file
                </Text>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default FormatPage;
