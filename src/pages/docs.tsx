import React from "react";
import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import styled from "styled-components";
import { NextSeo } from "next-seo";
import { SEO } from "../constants/seo";
import Layout from "../layout/PageLayout";

const StyledFrame = styled.iframe`
  border: none;
  width: 80%;
  flex: 500px;
  margin: 3% auto;
`;

const StyledContentBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  line-height: 1.8;
  overflow-x: auto;
`;

const StyledHighlight = styled.span<{ $link?: boolean; $alert?: boolean }>`
  display: inline-block;
  text-align: left;
  color: ${({ theme, $link, $alert }) =>
    $alert ? theme.DANGER : $link ? theme.BLURPLE : theme.TEXT_POSITIVE};
  background: ${({ theme }) => theme.BACKGROUND_TERTIARY};
  border-radius: 4px;
  font-weight: 500;
  padding: 2px 4px;
  font-size: 14px;
  margin: ${({ $alert }) => ($alert ? "8px 0" : "1px")};
`;

const Docs = () => {
  return (
    <Layout>
      <NextSeo
        {...SEO}
        title="User Guide - MEROOT Tools"
        description="Complete user guide for MEROOT data visualization and conversion tools."
        canonical="https://meroot.com/docs"
      />
      <Stack mx="auto" maw="90%">
        <Group mb="lg" mt={40}>
          <Title order={1} c="dark">
            MEROOT User Guide
          </Title>
        </Group>
        <Paper bg="white" c="black" p="md" radius="md" withBorder>
          <Title mb="sm" order={3} c="dark">
            # Getting Started with MEROOT
          </Title>
          <Text mb="sm" c="gray.7">
            Welcome to MEROOT! This comprehensive guide will help you get started with our data visualization and conversion tools.
          </Text>

          <Title mb="sm" order={4} c="dark">
            ## Data Visualizer
          </Title>
          <Text mb="sm" c="gray.7">
            The Data Visualizer is our main tool for visualizing JSON, YAML, CSV, and XML data as interactive graphs.
          </Text>
          <Text mb="sm" c="gray.7">
            <strong>How to use:</strong>
          </Text>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Paste your data directly into the editor</li>
            <li>Upload a file using the file menu</li>
            <li>Fetch data from a URL</li>
            <li>Use the toolbar to format, validate, and transform your data</li>
          </ul>

          <Title mb="sm" order={4} c="dark">
            ## File Comparison Tool
          </Title>
          <Text mb="sm" c="gray.7">
            Compare two text or JSON files side-by-side with visual highlighting of differences.
          </Text>
          <Text mb="sm" c="gray.7">
            <strong>Features:</strong>
          </Text>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Side-by-side comparison view</li>
            <li>Unified diff view</li>
            <li>Split view for better analysis</li>
            <li>Automatic file type detection</li>
          </ul>

          <Title mb="sm" order={4} c="dark">
            ## Data Converters
          </Title>
          <Text mb="sm" c="gray.7">
            Convert between different data formats seamlessly.
          </Text>
          <Text mb="sm" c="gray.7">
            <strong>Supported formats:</strong> JSON, YAML, CSV, XML
          </Text>

          <Title mb="sm" order={4} c="dark">
            ## Type Generators
          </Title>
          <Text mb="sm" c="gray.7">
            Generate TypeScript interfaces, Java classes, and other type definitions from your data.
          </Text>

          <Title mb="sm" order={4} c="dark">
            ## Keyboard Shortcuts
          </Title>
          <Text mb="sm" c="gray.7">
            <strong>Editor shortcuts:</strong>
          </Text>
          <ul style={{ paddingLeft: '20px' }}>
            <li><kbd>Ctrl/Cmd + S</kbd> - Save file</li>
            <li><kbd>Ctrl/Cmd + F</kbd> - Search</li>
            <li><kbd>Ctrl/Cmd + Z</kbd> - Undo</li>
            <li><kbd>Ctrl/Cmd + Y</kbd> - Redo</li>
            <li><kbd>F11</kbd> - Toggle fullscreen</li>
          </ul>

          <Title mb="sm" order={4} c="dark">
            ## Tips & Best Practices
          </Title>
          <Text mb="sm" c="gray.7">
            <strong>For better performance:</strong>
          </Text>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Keep your data files under 80,000 characters for optimal performance</li>
            <li>Use the live transform feature for real-time updates</li>
            <li>Save your work frequently using the file menu</li>
            <li>Use the search feature to quickly find specific data</li>
          </ul>

          <Title mb="sm" order={4} c="dark">
            ## Troubleshooting
          </Title>
          <Text mb="sm" c="gray.7">
            <strong>Common issues:</strong>
          </Text>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Invalid JSON format - Check for syntax errors</li>
            <li>Large files - Consider breaking into smaller chunks</li>
            <li>Network issues - Ensure stable internet connection for URL fetching</li>
            <li>Browser compatibility - Use modern browsers for best experience</li>
          </ul>

          <Title mb="sm" order={4} c="dark">
            ## Support
          </Title>
          <Text mb="sm" c="gray.7">
            Need help? Contact us at <strong>mert.kiziloglu@ing.com.tr</strong> for support and bug reports.
          </Text>
        </Paper>
        <Paper bg="white" c="black" p="md" radius="md" withBorder>
          <Title mb="sm" order={3} c="dark">
            # Communicating with API
          </Title>
          <Title order={4}>◼︎ Post Message to Embed</Title>
          <StyledContentBody>
            <Text>
              Communicating with the embed is possible with{" "}
              <StyledHighlight
                as="a"
                href="https://developer.mozilla.org/en-US/docs/Web/API/MessagePort/postMessage"
                $link
              >
                MessagePort
              </StyledHighlight>
              , you should pass an object consist of &quot;json&quot; and &quot;options&quot; key
              where json is a string and options is an object that may contain the following:
              <CodeHighlight
                w={500}
                language="json"
                code={
                  '{\n  theme: "light" | "dark",\n  direction: "TOP" | "RIGHT" | "DOWN" | "LEFT"\n}'
                }
                withCopyButton={false}
              />
            </Text>

            <StyledFrame
              scrolling="no"
              title="Untitled"
              src="https://codepen.io/mertkiziloglu/embed/rNrVyWP?default-tab=html%2Cresult"
              loading="lazy"
            >
              See the Pen <a href="https://codepen.io/mertkiziloglu/pen/rNrVyWP">Untitled</a> by Mert
              Kiziloglu (<a href="https://codepen.io/mertkiziloglu">@mertkiziloglu</a>) on{" "}
              <a href="https://codepen.io">CodePen</a>.
            </StyledFrame>
          </StyledContentBody>
        </Paper>
        <Paper bg="white" c="black" p="md" radius="md" withBorder>
          <Title order={4}>◼︎ On Page Load</Title>
          <StyledContentBody>
            <Text>
              <Text>
                ⚠️ <b>Important!</b> - iframe should be defined before the script tag
              </Text>
              <Text>
                ⚠️ <b>Note</b> - Widget is not loaded immediately with the parent page. The widget
                sends its <b>id</b> attribute so you can listen for it as in the example below to
                ensure its loaded and ready to listen for messages.
              </Text>
            </Text>
            <StyledFrame
              title="Untitled"
              src="https://codepen.io/mertkiziloglu/embed/QWBbpqx?default-tab=html%2Cresult"
              loading="lazy"
            >
              See the Pen <a href="https://codepen.io/mertkiziloglu/pen/QWBbpqx">Untitled</a> by Mert
              Kiziloglu (<a href="https://codepen.io/mertkiziloglu">@mertkiziloglu</a>) on{" "}
              <a href="https://codepen.io">CodePen</a>.
            </StyledFrame>
          </StyledContentBody>
        </Paper>
      </Stack>
    </Layout>
  );
};

export default Docs;
