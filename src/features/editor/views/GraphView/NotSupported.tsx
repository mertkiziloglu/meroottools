import React from "react";
import { Text, Stack } from "@mantine/core";
import useConfig from "../../../../store/useConfig";

export const NotSupported = () => {
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: darkmodeEnabled ? 'rgba(0,0,0,0.8)' : 'rgba(226, 240, 243, 0.8)',
      backdropFilter: 'blur(1.5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <Stack maw="60%" align="center" justify="center" gap="sm">
        <Text fz="48" fw={600} c="bright">
          File Too Large
        </Text>
        <Text ta="center" size="lg" fw={500} c="gray" maw="600">
          This file is too large to display. Try with a smaller file or increase the node limit in your environment variables.
          <br />
          Set NEXT_PUBLIC_NODE_LIMIT to a higher value in your .env file.
        </Text>
      </Stack>
    </div>
  );
};
