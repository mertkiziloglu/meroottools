import React from "react";
import { Container, Flex, Text } from "@mantine/core";

export const Footer = () => {
  return (
    <Container w="100%" py="md" fluid>
      <Flex justify="center" align="center">
        <Text fz="md" c="gray.6" fw={500}>
          Tools
        </Text>
      </Flex>
    </Container>
  );
};
