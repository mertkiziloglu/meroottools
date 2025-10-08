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
  Select,
  Tabs,
} from "@mantine/core";
import { FaCopy, FaDownload, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Layout from "../layout/PageLayout";
import { SEO } from "../constants/seo";

const FormatPage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("json");

  const formatXML = (xmlString: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");
      
      // Check for parsing errors
      const parserError = xmlDoc.querySelector("parsererror");
      if (parserError) {
        throw new Error("Invalid XML format");
      }

      // Better XML formatting function
      const formatXMLNode = (node: Node, indent: number = 0): string => {
        const indentStr = '  '.repeat(indent);
        
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          return text ? text : '';
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const tagName = element.tagName;
          const attributes = Array.from(element.attributes)
            .map(attr => ` ${attr.name}="${attr.value}"`)
            .join('');
          
          const children = Array.from(element.childNodes);
          
          // Check if element has only text content
          const hasOnlyText = children.length === 1 && 
            children[0].nodeType === Node.TEXT_NODE && 
            children[0].textContent?.trim();
          
          if (hasOnlyText) {
            return `${indentStr}<${tagName}${attributes}>${children[0].textContent?.trim()}</${tagName}>`;
          }
          
          // Handle elements with child elements
          if (children.length === 0) {
            return `${indentStr}<${tagName}${attributes}/>`;
          }
          
          const formattedChildren = children
            .map(child => formatXMLNode(child, indent + 1))
            .filter(child => child.trim().length > 0)
            .join('\n');
          
          if (formattedChildren) {
            return `${indentStr}<${tagName}${attributes}>\n${formattedChildren}\n${indentStr}</${tagName}>`;
          } else {
            return `${indentStr}<${tagName}${attributes}></${tagName}>`;
          }
        }
        
        return '';
      };

      // Format the document
      let result = '';
      
      // Add XML declaration if it exists
      if (xmlString.trim().startsWith('<?xml')) {
        const declarationMatch = xmlString.match(/<\?xml[^>]*\?>/);
        if (declarationMatch) {
          result += declarationMatch[0] + '\n';
        }
      }
      
      // Format each root element
      Array.from(xmlDoc.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          result += formatXMLNode(node, 0);
        }
      });
      
      return result;
    } catch (err) {
      throw new Error("Invalid XML format. Please check your input.");
    }
  };

  const formatData = () => {
    try {
      setError("");
      if (!input.trim()) {
        setError(`Please enter ${selectedFormat.toUpperCase()} data to format`);
        return;
      }

      if (selectedFormat === "json") {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        setOutput(formatted);
        toast.success("JSON formatted successfully!");
      } else if (selectedFormat === "xml") {
        const formatted = formatXML(input);
        setOutput(formatted);
        toast.success("XML formatted successfully!");
      }
    } catch (err) {
      setError(`Invalid ${selectedFormat.toUpperCase()} format. Please check your input.`);
      setOutput("");
    }
  };

  const minifyData = () => {
    try {
      setError("");
      if (!input.trim()) {
        setError(`Please enter ${selectedFormat.toUpperCase()} data to minify`);
        return;
      }

      if (selectedFormat === "json") {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        setOutput(minified);
        toast.success("JSON minified successfully!");
      } else if (selectedFormat === "xml") {
        // Parse and minify XML properly
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(input, "application/xml");
        
        // Check for parsing errors
        const parserError = xmlDoc.querySelector("parsererror");
        if (parserError) {
          throw new Error("Invalid XML format");
        }
        
        const serializer = new XMLSerializer();
        let minified = serializer.serializeToString(xmlDoc);
        
        // Remove extra whitespace between elements
        minified = minified
          .replace(/>\s+</g, '><')
          .replace(/\s+/g, ' ')
          .trim();
        
        setOutput(minified);
        toast.success("XML minified successfully!");
      }
    } catch (err) {
      setError(`Invalid ${selectedFormat.toUpperCase()} format. Please check your input.`);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    }
  };

  const downloadFile = () => {
    if (output) {
      const mimeType = selectedFormat === "json" ? "application/json" : "application/xml";
      const extension = selectedFormat === "json" ? "json" : "xml";
      const blob = new Blob([output], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `formatted.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`${selectedFormat.toUpperCase()} file downloaded!`);
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
        title="JSON & XML Formatter | Tools"
        description="Format, beautify and minify JSON and XML data online. Clean up messy data with proper indentation and structure."
        canonical="http://localhost:3000/format"
      />
      <Container size="xl" my={40}>
        <Stack gap="xl">
          <Stack gap="md" ta="center">
            <Title order={1} c="dark">
              JSON & XML Formatter
            </Title>
            <Text c="dimmed" fz="lg">
              Format messy JSON and XML data with proper indentation or minify for production use
            </Text>
          </Stack>

          <Paper shadow="sm" p="xl" radius="md">
            <Stack gap="lg">
              <Group justify="space-between" align="end">
                <div>
                  <Text fw={500} mb="sm">
                    Input Data
                  </Text>
                </div>
                <Select
                  label="Format"
                  value={selectedFormat}
                  onChange={(value) => {
                    setSelectedFormat(value || "json");
                    setInput("");
                    setOutput("");
                    setError("");
                  }}
                  data={[
                    { value: "json", label: "JSON" },
                    { value: "xml", label: "XML" },
                  ]}
                  w={120}
                />
              </Group>
              
              <div>
                <Textarea
                  placeholder={`Paste your messy ${selectedFormat.toUpperCase()} here...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  minRows={20}
                  maxRows={50}
                  autosize
                  styles={{
                    input: {
                      fontFamily: "monospace",
                      fontSize: "14px",
                    },
                  }}
                />
              </div>

              <Group justify="center">
                <Button
                  onClick={formatData}
                  size="md"
                  radius="md"
                  color="blue"
                  disabled={!input.trim()}
                >
                  Format & Beautify
                </Button>
                <Button
                  onClick={minifyData}
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
                        <Tooltip label={`Download ${selectedFormat.toUpperCase()} file`}>
                          <ActionIcon
                            onClick={downloadFile}
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
                      maxRows={50}
                      autosize
                      styles={{
                        input: {
                          fontFamily: "monospace",
                          fontSize: "14px",
                          backgroundColor: "#f8f9fa",
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
                  <strong>1. Select Format:</strong> Choose between JSON or XML format from the dropdown
                </Text>
                <Text>
                  <strong>2. Paste Data:</strong> Copy your messy or unformatted data into the input area
                </Text>
                <Text>
                  <strong>3. Format:</strong> Click "Format & Beautify" to add proper indentation and structure
                </Text>
                <Text>
                  <strong>4. Minify:</strong> Click "Minify" to remove all whitespace for production use
                </Text>
                <Text>
                  <strong>5. Copy or Download:</strong> Use the copy button or download the formatted file
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
