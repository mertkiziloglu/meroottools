import React from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Container, Stack, Title, Text, Button, Group, Card } from "@mantine/core";
import { FaCode, FaExchangeAlt, FaCogs, FaPaintBrush, FaBook } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import Layout from "../layout/PageLayout";

const HomePage = () => {
  return (
    <Layout>
      <NextSeo 
        title="Tools - Data Visualization Tool"
        description="Transform your JSON, YAML, CSV, and XML data into interactive visualizations. Convert between formats and generate types."
        canonical="https://meroot.com" 
      />
      
      <Container size="lg" py={100}>
        <Stack align="center" gap="xl">
          {/* Hero Section */}
          <Stack align="center" gap="md" ta="center">
            <Text size="lg" c="dimmed" maw={600}>
              For requests and bug reports, you can contact mert.kiziloglu@ing.com.tr.
            </Text>
          </Stack>

          {/* Main Action Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '1200px',
            marginTop: 'var(--mantine-spacing-xl)'
          }}>

            <Card 
              shadow="md" 
              padding="xl" 
              radius="md" 
              withBorder
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Stack align="center" gap="md" style={{ flex: 1, justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <FaExchangeAlt size={48} color="#40C057" style={{ marginBottom: '1rem' }} />
                  <Title order={3} size="1.5rem" mb="sm">Converter</Title>
                  <Text ta="center" c="dimmed" size="sm">
                    Convert between JSON, YAML, CSV, and XML formats seamlessly.
                  </Text>
                </div>
                <Button 
                  component={Link} 
                  href="/converter/json-to-yaml" 
                  size="lg" 
                  radius="md"
                  color="green"
                  fullWidth
                  mt="auto"
                >
                  Convert Data
                </Button>
              </Stack>
            </Card>

            <Card 
              shadow="md" 
              padding="xl" 
              radius="md" 
              withBorder
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Stack align="center" gap="md" style={{ flex: 1, justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <FaCogs size={48} color="#FA5252" style={{ marginBottom: '1rem' }} />
                  <Title order={3} size="1.5rem" mb="sm">Generate Types</Title>
                  <Text ta="center" c="dimmed" size="sm">
                    Generate Java POJO classes from your JSON, YAML, CSV, and XML data.
                  </Text>
                </div>
                <Button 
                  component={Link} 
                  href="/type/json-to-java" 
                  size="lg" 
                  radius="md"
                  color="red"
                  fullWidth
                  mt="auto"
                >
                  Generate Types
                </Button>
              </Stack>
            </Card>

            <Card 
              shadow="md" 
              padding="xl" 
              radius="md" 
              withBorder
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Stack align="center" gap="md" style={{ flex: 1, justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <FaPaintBrush size={48} color="#9C88FF" style={{ marginBottom: '1rem' }} />
                  <Title order={3} size="1.5rem" mb="sm">ingDraw</Title>
                  <Text ta="center" c="dimmed" size="sm">
                    Professional drawing and design tool for creating beautiful diagrams and illustrations.
                  </Text>
                </div>
                <Button 
                  component="a" 
                  href="https://ingdraw" 
                  target="_blank"
                  rel="noopener"
                  size="lg" 
                  radius="md"
                  color="violet"
                  fullWidth
                  mt="auto"
                >
                  Open ingDraw
                </Button>
              </Stack>
            </Card>

            <Card 
              shadow="md" 
              padding="xl" 
              radius="md" 
              withBorder
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Stack align="center" gap="md" style={{ flex: 1, justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <FaCode size={48} color="#228BE6" style={{ marginBottom: '1rem' }} />
                  <Title order={3} size="1.5rem" mb="sm">Data Visualizer</Title>
                  <Text ta="center" c="dimmed" size="sm">
                    Visualize and edit your JSON, YAML, CSV, and XML data with our interactive editor.
                  </Text>
                </div>
                <Button 
                  component={Link} 
                  href="/editor" 
                  size="lg" 
                  radius="md"
                  color="blue"
                  fullWidth
                  mt="auto"
                >
                  Open Data Visualizer
                </Button>
              </Stack>
            </Card>

            <Card 
              shadow="md" 
              padding="xl" 
              radius="md" 
              withBorder
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Stack align="center" gap="md" style={{ flex: 1, justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <MdCompareArrows size={48} color="#5F3DC4" style={{ marginBottom: '1rem' }} />
                  <Title order={3} size="1.5rem" mb="sm">File Comparison</Title>
                  <Text ta="center" c="dimmed" size="sm">
                    Compare text and JSON files. Visualize and analyze differences between files.
                  </Text>
                </div>
                <Button 
                  component={Link} 
                  href="/tools/diff" 
                  size="lg" 
                  radius="md"
                  color="indigo"
                  fullWidth
                  mt="auto"
                >
                  Open Diff Tool
                </Button>
              </Stack>
            </Card>

            <Card 
              shadow="md" 
              padding="xl" 
              radius="md" 
              withBorder
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Stack align="center" gap="md" style={{ flex: 1, justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <FaBook size={48} color="#FF6B35" style={{ marginBottom: '1rem' }} />
                  <Title order={3} size="1.5rem" mb="sm">User Guide</Title>
                </div>
                <Button 
                  component="a" 
                  href="https://iknow.domain.bankanet.com.tr" 
                  target="_blank"
                  rel="noopener"
                  size="lg" 
                  radius="md"
                  color="orange"
                  fullWidth
                  mt="auto"
                >
                  View User Guide
                </Button>
              </Stack>
            </Card>

          </div>
        </Stack>
      </Container>
    </Layout>
  );
};

export default HomePage;
