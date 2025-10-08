import React from "react";
import Link from "next/link";
import { Button, Menu, type MenuItemProps, Text, Stack } from "@mantine/core";
import styled from "styled-components";

const StyledNavbarWrapper = styled.div`
  z-index: 3;
  transition: background 0.2s ease-in-out;
`;

const StyledMenuItem = styled(Menu.Item)<MenuItemProps & any>`
  color: black;

  &[data-hovered] {
    background-color: #f7f7f7;
  }
`;

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  background: white;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  @media only screen and (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  white-space: nowrap;
`;

const Center = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  white-space: nowrap;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const Navbar = () => {
  return (
    <StyledNavbarWrapper className="navbar">
      <StyledNavbar>
        <Left>
          <Text component={Link} href="/" fw={600} fz="xl" c="black" td="none">
            Tools
          </Text>
        </Left>
        <Center>
          <Button
            component={Link}
            prefetch={false}
            href="/format"
            variant="subtle"
            color="black"
            size="md"
            radius="md"
          >
            Format
          </Button>
          <Button
            component="a"
            href="https://ingdraw"
            target="_blank"
            rel="noopener noreferrer"
            variant="subtle"
            color="black"
            size="md"
            radius="md"
          >
            IngDraw
          </Button>
          <Button
            component={Link}
            prefetch={false}
            href="/converter/json-to-yaml"
            variant="subtle"
            color="black"
            size="md"
            radius="md"
          >
            Converter
          </Button>
          <Button
            component={Link}
            prefetch={false}
            href="/type/json-to-java"
            variant="subtle"
            color="black"
            size="md"
            radius="md"
          >
            Generate Types
          </Button>
          <Button
            component={Link}
            prefetch={false}
            href="/tools/diff"
            variant="subtle"
            color="black"
            size="md"
            radius="md"
          >
            Diff Tool
          </Button>
        </Center>
        <Right>
          <Button
            radius="md"
            component="a"
            color="#202842"
            href="/editor"
            visibleFrom="sm"
            size="md"
          >
            Data Visualizer
          </Button>
        </Right>
      </StyledNavbar>
    </StyledNavbarWrapper>
  );
};
