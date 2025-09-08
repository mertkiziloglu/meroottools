import React from "react";
import { Accordion, Anchor, Code, Flex, FocusTrap, Group, Modal, Text } from "@mantine/core";

const ExternalMode = () => {
  const [isExternal, setExternal] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISABLE_EXTERNAL_MODE === "false") {
      if (typeof window !== "undefined") {
        if (window.location.pathname.includes("widget")) return setExternal(false);
        if (window.location.host !== "jsoncrack.com") return setExternal(true);
        return setExternal(false);
      }
    }
  }, []);

  if (!isExternal) return null;

  return (
    <Modal
      title="Thanks for using Meroot Tools"
      opened={isExternal}
      onClose={() => setExternal(false)}
      centered
      size="lg"
    >
      <FocusTrap.InitialFocus />
      <Group>
        <Accordion variant="separated" w="100%">
          <Accordion.Item value="1">
            <Accordion.Control>How can I change the file size limit?</Accordion.Control>
            <Accordion.Panel>
              The main reason for the file size limit is to prevent performance issues, not to push
              you to upgrade. You can increase the limit by setting{" "}
              <Code>NEXT_PUBLIC_NODE_LIMIT</Code> in your <Code>.env</Code> file.
              <br />
              <br />
              For larger files, you can increase the limit by setting a higher value for NEXT_PUBLIC_NODE_LIMIT.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="2">
            <Accordion.Control>How can I stop this dialog from appearing?</Accordion.Control>
            <Accordion.Panel>
              You can disable this dialog by setting <Code>NEXT_PUBLIC_DISABLE_EXTERNAL_MODE</Code>{" "}
              to <Code>true</Code> in your <Code>.env.development</Code> file.
              <br />
              <br />
              If you want to re-enable it, simply remove or set the value to <Code>false</Code>.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="3">
            <Accordion.Control>What are the license terms?</Accordion.Control>
            <Accordion.Panel>
              This project is licensed under the Apache 2.0 License.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="4">
            <Accordion.Control>How do I report a bug or request a feature?</Accordion.Control>
            <Accordion.Panel>
              Please provide feedback or report issues through the appropriate channels.
              <br />
              <br />
              Please provide as much detail as possible to help us address your feedback quickly.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="5">
            <Accordion.Control>How do I contribute to the project?</Accordion.Control>
            <Accordion.Panel>
              We welcome contributions! Please read the contributing guidelines to get started.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="6">
            <Accordion.Control>
              About Meroot Tools
            </Accordion.Control>
            <Accordion.Panel>
              Meroot Tools is a free and open-source tool for visualizing JSON data. It helps you understand complex JSON structures through interactive diagrams.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Group>
      <Flex justify="center" align="center" gap="sm" mt="md">
        <Text fz="sm" c="dimmed">
          Mert Kızıloğlu
        </Text>
      </Flex>
    </Modal>
  );
};

export default ExternalMode;
