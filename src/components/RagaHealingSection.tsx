"use client";

import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { Leaf, Clock, Zap, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ===========================
    DARK THEME TOKENS
    =========================== */
const BG_DARK = "#171F32"; // Main Background
const CARD_DARK = "#212F40"; // Card Background
const TEXT_LIGHT = "#EBF2F7"; // Main Text
const SUB_DARK = "rgba(235, 242, 247, 0.6)"; // Subdued Text
const ACCENT = "#6BC5C5"; // Primary Brand Color (Teal)
const ACCENT2 = "#9BB4F0"; // Secondary Accent (Lighter, soft blue/purple for contrast)
const BORDER_DARK = "rgba(235, 242, 247, 0.1)"; // Dark Border
const SHADOW_DARK = "0 10px 30px rgba(0, 0, 0, 0.4)"; // Stronger dark shadow

/* ===========================
    Motion variants (Unchanged for logic)
    =========================== */
const revealVariant = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ===========================
    Styled Components (Dark Theme Applied)
    =========================== */

const SectionWrapper = styled(motion.section)`
  padding: 60px 0;
  /* Dark background gradient matching the theme */
  background: ${BG_DARK};
  border-radius: 20px;
  margin-top: 30px;
`;

const SectionContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 48px;

  @media (max-width: 600px) {
    padding: 0 24px;
  }
`;

const TitleGroup = styled(motion.div)`
  text-align: center;
  margin-bottom: 50px;
`;

const Eyebrow = styled.span`
  display: inline-block;
  color: ${ACCENT}; /* Use ACCENT for the main highlight */
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-family: "Fraunces", serif;
  font-weight: 800;
  font-size: 44px;
  line-height: 1.1;
  color: ${TEXT_LIGHT}; /* Light text */
  margin: 0 0 16px;
`;

const LeadText = styled.p`
  max-width: 700px;
  margin: 0 auto;
  color: ${SUB_DARK}; /* Muted light subtext */
  font-size: 18px;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${CARD_DARK}; /* Dark card background */
  border-radius: 18px;
  padding: 24px;
  border: 1px solid ${BORDER_DARK}; /* Dark theme border */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Dark theme shadow */
  min-height: 200px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${ACCENT};
  }
`;

const CardIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  /* Background based on ACCENT with lower opacity */
  background: ${ACCENT}20;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const CardTitle = styled.h4`
  font-weight: 700;
  font-size: 18px;
  color: ${TEXT_LIGHT}; /* Light text */
  margin: 0 0 8px;
`;

const CardDescription = styled.p`
  color: ${SUB_DARK}; /* Muted light subtext */
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
`;

const CTAContainer = styled(motion.div)`
  margin-top: 50px;
  text-align: center;
`;

const Button = styled(Link)<{ $primary?: boolean }>`
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-decoration: none;

  ${(p) =>
    p.$primary
      ? css`
          /* Primary button with solid ACCENT color */
          background: ${ACCENT};
          color: ${BG_DARK}; /* Dark text on bright button */
          box-shadow: 0 12px 30px ${ACCENT}30;

          &:hover {
            background: #50b2b2; /* Slightly darker teal on hover */
            box-shadow: 0 16px 40px ${ACCENT}40;
            transform: translateY(-2px);
          }
        `
      : css`
          /* Secondary Style (if needed in dark theme) */
          background: transparent;
          color: ${TEXT_LIGHT};
          border: 1px solid ${BORDER_DARK};
          &:hover {
            background: ${CARD_DARK};
            border-color: ${ACCENT};
          }
        `}
`;

/* ===========================
    Component Data (Icon colors changed to ACCENT/ACCENT2)
    =========================== */

const ragaFeatures = [
  {
    icon: Leaf,
    title: "Ancient Wisdom",
    description:
      "Utilizes the 5,000-year-old tradition of Indian classical rāgas, linked to specific emotional states and times of day.",
    color: ACCENT, // Teal
  },
  {
    icon: Target,
    title: "Personalized Match",
    description:
      "Rāgas are specifically chosen by human therapists based on your journaling data and identified emotional needs.",
    color: ACCENT2, // Soft Blue/Purple
  },
  {
    icon: Clock,
    title: "Optimized Timing",
    description:
      "We provide precise instructions on *when* to listen (prayers, morning, evening) for maximum therapeutic efficacy.",
    color: ACCENT, // Teal
  },
  {
    icon: Zap,
    title: "Non-Intrusive Healing",
    description:
      "Heal without conscious effort. Music works directly on the mind-body connection to restore emotional balance.",
    color: ACCENT2, // Soft Blue/Purple
  },
];

/* ===========================
    RagaHealingSection Component
    =========================== */

const RagaHealingSection: React.FC = () => {
  return (
    <SectionWrapper
      id="ragas"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionContainer>
        <TitleGroup variants={stagger}>
          <motion.div variants={revealVariant}>
            <Eyebrow>The Rāga Healing Edge</Eyebrow>
          </motion.div>
          <motion.div variants={revealVariant}>
            <Title>Music Therapy Rooted in Tradition</Title>
          </motion.div>
          <motion.div variants={revealVariant}>
            <LeadText>
              Rāga therapy is a powerful, non-pharmacological pathway to
              wellness. We pair clinical data with expert musical knowledge to
              deliver truly personalized healing.
            </LeadText>
          </motion.div>
        </TitleGroup>

        <Grid>
          {ragaFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FeatureCard
                key={index}
                variants={revealVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
              >
                <CardIconWrapper>
                  <Icon size={24} color={feature.color} />
                </CardIconWrapper>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </FeatureCard>
            );
          })}
        </Grid>

        <CTAContainer
          variants={revealVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Button $primary href="/roles">
            Explore Rāga Therapy now
            <ArrowRight size={16} />
          </Button>
        </CTAContainer>
      </SectionContainer>
    </SectionWrapper>
  );
};

export default RagaHealingSection;
