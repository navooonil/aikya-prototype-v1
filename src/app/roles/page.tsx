// src/app/roles/page.tsx
"use client";

import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Music, Brain, Sparkles } from "lucide-react";

/* BRAND TOKENS (Same as Landing Page) */
const ACCENT = "#6BC5C5";
const ACCENT2 = "#7DB0FF";
const TEXT = "#1E3A40";
const SUB = "#476B7F";
const LIGHT_BACKGROUND = "#F4F8F9";
const BORDER = "#E5EEF0";
const SURFACE = "#FFFFFF";

/* GLOBAL RESET */
const Global = createGlobalStyle`
  body {
    margin: 0;
    background: ${LIGHT_BACKGROUND};
    font-family: "Inter", sans-serif;
    color: ${TEXT};
  }
`;

/* LAYOUT */
const Root = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 760px;
  background: ${SURFACE};
  border-radius: 24px;
  border: 1px solid ${BORDER};
  padding: 48px;
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.06);

  @media (max-width: 600px) {
    padding: 28px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  font-family: "Fraunces", serif;
  margin: 0;
  font-weight: 800;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${SUB};
  font-size: 17px;
  margin: 14px auto 32px;
  max-width: 480px;
`;

const RolesWrap = styled.div`
  display: grid;
  gap: 22px;
  margin-top: 20px;
`;

const RoleButton = styled(motion(Link))`
  display: flex;
  align-items: center;
  gap: 18px;
  background: ${SURFACE};
  border: 1px solid ${BORDER};
  border-radius: 18px;
  padding: 22px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 38px rgba(0, 0, 0, 0.08);
  }
`;

const IconBox = styled.div<{ color: string }>`
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: ${(p) => p.color}22;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RoleTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${TEXT};
`;

const RoleDesc = styled.div`
  font-size: 14px;
  color: ${SUB};
  margin-top: 4px;
`;

const ArrowBox = styled.div`
  margin-left: auto;
  color: ${ACCENT};
`;

/* ANIMATION */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

/* PAGE COMPONENT */
export default function RolesPage() {
  return (
    <>
      <Global />
      <Root>
        <Card>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <Title>Choose your role</Title>
            <Subtitle>
              Aikya personalizes your experience based on your role. Select one
              to continue.
            </Subtitle>

            <RolesWrap>
              {/* USER */}
              <RoleButton
                href="/dashboard"
                variants={fadeUp}
                whileHover={{ scale: 1.01 }}
              >
                <IconBox color={ACCENT}>
                  <Heart color={ACCENT} size={26} />
                </IconBox>

                <div>
                  <RoleTitle>I want emotional healing</RoleTitle>
                  <RoleDesc>
                    Journaling, reflections, rāgas & emotional insights.
                  </RoleDesc>
                </div>

                <ArrowBox>
                  <ArrowRight size={18} />
                </ArrowBox>
              </RoleButton>

              {/* PSYCHOLOGIST */}
              <RoleButton
                href="psychologist"
                variants={fadeUp}
                whileHover={{ scale: 1.01 }}
              >
                <IconBox color="#8B65FF">
                  <Brain color="#8B65FF" size={26} />
                </IconBox>

                <div>
                  <RoleTitle>I am a psychologist</RoleTitle>
                  <RoleDesc>
                    Review summaries, insights & support user wellness.
                  </RoleDesc>
                </div>

                <ArrowBox>
                  <ArrowRight size={18} />
                </ArrowBox>
              </RoleButton>

              {/* MUSIC THERAPIST */}
              <RoleButton
                href="/therapist"
                variants={fadeUp}
                whileHover={{ scale: 1.01 }}
              >
                <IconBox color={ACCENT2}>
                  <Music color={ACCENT2} size={26} />
                </IconBox>

                <div>
                  <RoleTitle>I am a music therapist</RoleTitle>
                  <RoleDesc>
                    Assign rāgas, monitor emotional responses, collaborate.
                  </RoleDesc>
                </div>

                <ArrowBox>
                  <ArrowRight size={18} />
                </ArrowBox>
              </RoleButton>

              {/* RESEARCH */}
              <RoleButton
                href="/dashboard/research"
                variants={fadeUp}
                whileHover={{ scale: 1.01 }}
              >
                <IconBox color="#FFB84D">
                  <Sparkles color="#FFB84D" size={26} />
                </IconBox>

                <div>
                  <RoleTitle>I am a research collaborator</RoleTitle>
                  <RoleDesc>
                    AI × Psychology × Rāga research access & datasets.
                  </RoleDesc>
                </div>

                <ArrowBox>
                  <ArrowRight size={18} />
                </ArrowBox>
              </RoleButton>
            </RolesWrap>
          </motion.div>
        </Card>
      </Root>
    </>
  );
}
