import React from "react";
import { ColorSwatch } from "@mantine/core";
import styled from "styled-components";

const StyledRow = styled.span`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  gap: 4px;
  vertical-align: middle;
`;

const isURL = (word: string) => {
  const urlPattern =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

  return word?.match(urlPattern);
};

const Linkify = (text: string) => {
  const sanitizeUrl = (url: string) => {
    // URL sanitization - sadece güvenli protokoller
    const safeProtocols = ['http:', 'https:'];
    try {
      const urlObj = new URL(url);
      if (!safeProtocols.includes(urlObj.protocol)) {
        return null;
      }
      return urlObj.toString();
    } catch {
      return null;
    }
  };

  const words = text.split(" ");
  return (
    <span>
      {words.map((word, index) => {
        if (isURL(word)) {
          const safeUrl = sanitizeUrl(word);
          if (safeUrl) {
            return (
              <a
                key={index}
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', pointerEvents: 'all' }}
                onClick={(e) => e.stopPropagation()}
              >
                {word}
              </a>
            );
          }
        }
        return <span key={index}>{word} </span>;
      })}
    </span>
  );
};

export const TextRenderer = ({ children }: React.PropsWithChildren) => {
  if (typeof children === "string" && isURL(children)) return Linkify(children);

  if (typeof children === "string" && isColorFormat(children)) {
    return (
      <StyledRow>
        <ColorSwatch size={12} radius={4} mr={4} color={children} />
        {children}
      </StyledRow>
    );
  }

  return <>{`${children}`}</>;
};

function isColorFormat(colorString: string) {
  const hexCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbRegex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
  const rgbaRegex = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0|1|0\.\d+)\s*\)$/;

  return (
    hexCodeRegex.test(colorString) || rgbRegex.test(colorString) || rgbaRegex.test(colorString)
  );
}
