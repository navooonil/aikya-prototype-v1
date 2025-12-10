"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

// --- DARK THEME TOKENS ---
const BG_DARK = "#171F32"; // Used for the card interior background on hover/non-active
const CARD_DARK = "#212F40"; // Used for the card interior background
const TEXT_LIGHT = "#EBF2F7"; // Main text color
const SUB_DARK = "rgba(235, 242, 247, 0.6)"; // Muted subtext
const BORDER_DARK = "rgba(235, 242, 247, 0.1)"; // Default border color

const Card = styled(motion.div)<{ $active?: boolean; $color: string }>`
  padding: 20px;
  border-radius: 16px;
  /* Active state uses the accent color with 22% opacity over the CARD_DARK background.
     Non-active state uses the CARD_DARK color. */
  background: ${(p) => (p.$active ? CARD_DARK : CARD_DARK)};

  /* Active border uses the theme color. Non-active border is subtle. */
  border: 2px solid ${(p) => (p.$active ? p.$color : BORDER_DARK)};
  cursor: pointer;
  transition: 0.25s;

  /* Active shadow is stronger and colored. Non-active shadow is subtle dark theme shadow. */
  box-shadow: ${(p) =>
    p.$active ? `0 8px 22px ${p.$color}55` : "0 4px 12px rgba(0,0,0,0.2)"};

  &:hover {
    transform: translateY(-3px);
    /* Subtle background change on hover for better feedback */
    background: ${BG_DARK};
    border-color: ${(p) => (p.$active ? p.$color : SUB_DARK)};
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 17px;
  color: ${TEXT_LIGHT}; /* Light text color */
`;

const Subtitle = styled.div`
  font-size: 14px;
  margin-top: 6px;
  color: ${SUB_DARK}; /* Muted light subtext */
`;

export default function RagaSelectCard({
  emoji,
  name,
  subtitle,
  themeColor,
  active,
  onClick,
}: {
  emoji: string;
  name: string;
  subtitle: string;
  themeColor: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Card onClick={onClick} $active={active} $color={themeColor} layout>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>{" "}
      {/* Increased emoji size slightly */}
      <Title>{name}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Card>
  );
}
