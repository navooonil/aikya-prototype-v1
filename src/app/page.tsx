// src/app/page.tsx
"use client";

import React, { useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  BookOpen,
  Zap,
  Music,
  Compass,
  CheckCircle,
} from "lucide-react";
// Assuming this file exists and contains the component code.
// Since I don't have the RagaHealingSection code,
// I will provide a simplified, self-contained version below for completeness.
// import RagaHealingSection from "@/components/RagaHealingSection";

/* ===========================
    Design tokens
    =========================== */
const ACCENT = "#6BC5C5"; // Primary Brand Color (Teal)
const ACCENT2 = "#7DB0FF"; // Secondary Accent (Blue)
const SURFACE = "#FFFFFF";
const TEXT = "#1E3A40"; // Dark Text
const SUB = "#476B7F"; // Subdued Text
const LIGHT_BACKGROUND = "#F4F8F9"; // Page Background
const BORDER = "#E5EEF0"; // Light Border

/* ===========================
    Global Fonts + Base Styles (Light Mode)
    =========================== */
const Global = createGlobalStyle`
  html, body, #__next { height: 100%; }
  html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

  body {
    margin: 0;
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: ${LIGHT_BACKGROUND};
    color: ${TEXT};
  }

  a { color: inherit; text-decoration: none; }
  * { box-sizing: border-box; }
`;

/* ===========================
    Motion variants
    =========================== */
const revealVariant = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ===========================
    Styled components 
    =========================== */

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 40px;
  background: ${LIGHT_BACKGROUND};
`;

const Frame = styled.div`
  width: 100%;
  max-width: 1280px;
  min-height: auto;
  background: ${SURFACE};
  border-radius: 24px;
  padding: 48px;
  border: 1px solid ${BORDER};
  box-shadow: 0 30px 80px rgba(12, 14, 16, 0.08);

  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 36px;

  margin: 0 auto;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  @media (max-width: 600px) {
    padding: 24px;
  }
`;

const TopBar = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 12px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 22px;

  .mark {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, ${ACCENT}, ${ACCENT2});
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: "Fraunces", serif;
    font-weight: 800;
    font-size: 22px;
    box-shadow: 0 10px 30px rgba(107, 197, 197, 0.15);
  }
`;

const NavActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Button = styled.a<{ $primary?: boolean; $secondary?: boolean }>`
  padding: 12px 20px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  ${(p) =>
    p.$primary
      ? css`
          background: linear-gradient(90deg, ${ACCENT}, ${ACCENT2});
          color: white;
          box-shadow: 0 12px 30px rgba(107, 197, 197, 0.3);
          &:hover {
            box-shadow: 0 16px 40px rgba(107, 197, 197, 0.4);
            transform: translateY(-1px);
          }
        `
      : css`
          background: transparent;
          color: ${TEXT};
          border: 1px solid ${BORDER};
          &:hover {
            background: ${LIGHT_BACKGROUND};
            border-color: #d8e5e8;
          }
        `}
  ${(p) =>
    p.$secondary &&
    css`
      padding: 10px 16px;
      font-size: 14px;
      color: ${SUB};
      border-color: transparent;
      &:hover {
        background: ${LIGHT_BACKGROUND};
      }
    `}
`;

const Eyebrow = styled.span`
  display: inline-block;
  background: rgba(107, 197, 197, 0.1);
  color: ${ACCENT};
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: fit-content;
`;

const HeroTitle = styled.h1`
  margin: 16px 0 0;
  font-size: 60px;
  line-height: 1.05;
  font-family: "Fraunces", serif;
  font-weight: 800;
  letter-spacing: -0.03em;

  @media (max-width: 600px) {
    font-size: 44px;
  }
`;

const HeroLead = styled.p`
  max-width: 720px;
  color: ${SUB};
  font-size: 18px;
  line-height: 1.7;
  margin-top: 18px;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  align-items: center;
`;

const ServicesWrap = styled.div`
  margin-top: 40px;
`;

const ServicesTitle = styled.h3`
  color: ${ACCENT};
  font-weight: 800;
  margin-bottom: 20px;
  font-size: 15px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const ServiceGrid = styled.div`
  display: grid;
  gap: 18px;
`;

const ServiceCard = styled(motion.button)<{ open?: boolean }>`
  width: 100%;
  background: ${(p) =>
    p.open
      ? "linear-gradient(180deg, rgba(107,197,197,0.08), rgba(183,183,244,0.04))"
      : SURFACE};
  border-radius: 16px;
  border: 1px solid ${(p) => (p.open ? ACCENT + "44" : BORDER)};
  padding: 18px;
  text-align: left;
  cursor: pointer;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }

  ${(p) =>
    p.open &&
    css`
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    `}
`;

const CardIconWrapper = styled.div`
  min-width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(107, 197, 197, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SideCard = styled.div`
  border-radius: 20px;
  padding: 24px;
  background: linear-gradient(
    180deg,
    rgba(107, 197, 197, 0.08),
    rgba(123, 123, 244, 0.04)
  );
  border: 1px solid rgba(107, 197, 197, 0.25);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const FloatingShape = styled.div<{
  x: string;
  y: string;
  size?: number;
  opacity?: number;
}>`
  position: absolute;
  left: ${(p) => p.x};
  top: ${(p) => p.y};
  width: ${(p) => (p.size ? p.size + "px" : "180px")};
  height: ${(p) => (p.size ? p.size + "px" : "180px")};
  border-radius: 50%;
  filter: blur(40px);
  opacity: ${(p) => p.opacity ?? 0.15};
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(107, 197, 197, 0.2),
    rgba(123, 176, 255, 0.15)
  );
`;

/* Helper */
const SmallMuted = styled.div`
  color: ${SUB};
  font-size: 14px;
`;

/* PanelInner */
const PanelInner = styled.div`
  margin-top: 15px;
  padding: 16px;
  background: #fbfdff;
  border-radius: 12px;
  border: 1px solid ${BORDER};
  color: ${SUB};
  font-size: 14px;
`;

/* Footer Styles */
const FooterContent = styled.footer`
  grid-column: 1 / -1;
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid ${BORDER};
  color: ${SUB};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FooterSectionTitle = styled.h4`
  font-weight: 700;
  font-size: 15px;
  color: ${TEXT};
  margin-top: 0;
  margin-bottom: 14px;
`;

const FooterLink = styled(Link)`
  display: block;
  font-size: 14px;
  color: ${SUB};
  margin-bottom: 10px;
  transition: color 0.2s ease;
  &:hover {
    color: ${ACCENT};
  }
`;

const FooterLogoSection = styled.div`
  .mark {
    /* Styles inherited from Logo */
  }
`;

const CopyrightBar = styled.div`
  padding: 20px 0;
  text-align: center;
  font-size: 13px;
  color: #889aad;
  border-top: 1px solid ${BORDER};
`;

/* ===========================
    RagaHealingSection Placeholder
    =========================== */
// Since the original component code is not provided, this is a placeholder
// for the component imported via '@/components/RagaHealingSection'
const RagaHealingSection = () => (
  <motion.div
    id="ragas"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    variants={revealVariant}
    style={{
      background: SURFACE,
      borderRadius: 16,
      padding: 30,
      border: `1px solid ${BORDER}`,
      textAlign: "center",
    }}
  >
    <Music size={36} color={ACCENT} style={{ marginBottom: 10 }} />
    <h2
      style={{
        fontSize: 32,
        margin: "0 0 10px",
        fontFamily: "Fraunces",
        fontWeight: 800,
        color: TEXT,
      }}
    >
      The Science of Rāga Therapy
    </h2>
    <p
      style={{ color: SUB, fontSize: 18, maxWidth: 800, margin: "0 auto 20px" }}
    >
      Dive deep into personalized prescriptions: specific rāgas matched to your
      current emotional state, with listening schedules for maximum
      neurochemical benefit.
    </p>
    <Button $primary as={Link} href="#">
      Explore Rāga Examples <ArrowRight size={14} />
    </Button>
  </motion.div>
);

/* ===========================
    In-component data
    =========================== */

const servicesData = [
  {
    id: "journ",
    title: "Daily AI Journaling",
    subtitle: "Gentle reflections & micro-tasks (2–5 mins).",
    panel:
      "Write freely. Aikya analyzes your entry, highlights emotions and patterns, then suggests a validated micro-practice to anchor your day.",
    icon: BookOpen,
  },
  {
    id: "ai",
    title: "AI Reflection & Micro-tasks",
    subtitle: "Immediate, warm, clinically informed responses.",
    panel:
      "AI generates a supportive reflection and a tiny task. Example: 'Take 5 deep breaths and name 3 things you can control right now.'",
    icon: Zap,
  },
  {
    id: "summary",
    title: "Psychologist-Reviewed Weekly Summary",
    subtitle: "Safety-first clinical oversight.",
    panel:
      "Every 7 days Aikya creates a summary that our psychologists review — ensuring accuracy and recommending next steps.",
    icon: Compass,
  },
  {
    id: "raga",
    title: "Rāga Therapy",
    subtitle: "Personalized music therapy by certified therapists.",
    panel:
      "Therapists assign rāgas matched to your emotional profile, with listening instructions and timing for maximum benefit.",
    icon: Music,
  },
];

/* ===========================
    Landing component
    =========================== */

export default function LandingPage(): JSX.Element {
  const [openId, setOpenId] = useState<string | null>("journ");

  return (
    <>
      <Global />
      <Root aria-live="polite">
        <FloatingShape
          x="calc(100% - 280px)"
          y="40px"
          size={300}
          opacity={0.15}
        />
        <FloatingShape x="-80px" y="300px" size={240} opacity={0.12} />

        <Frame>
          {/* Topbar (FULL WIDTH) */}
          <TopBar>
            <Logo>
              <div className="mark" aria-hidden>
                Ak
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800 }}>Aikya</div>
                <SmallMuted style={{ fontSize: 12, marginTop: 4 }}>
                  Emotional wellness • AI + Rāga
                </SmallMuted>
              </div>
            </Logo>

            <NavActions>
              <SmallMuted style={{ marginRight: 12, fontSize: 14 }}>
                Beta • Early Access
              </SmallMuted>

              <Button as={Link} href="#how" $secondary>
                How it works
              </Button>
              <Button as={Link} href="#ragas" $secondary>
                Rāgas
              </Button>

              <Button $primary as={Link} href="/roles">
                Start Free <ArrowRight size={14} />
              </Button>
            </NavActions>
          </TopBar>

          {/* Left Column: Hero Content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
          >
            <motion.div variants={revealVariant}>
              <Eyebrow>Phase 1 — Early Access</Eyebrow>
            </motion.div>

            <motion.div variants={revealVariant}>
              <HeroTitle>
                Understand your emotions. Heal with ancient music. Grow every
                day.
              </HeroTitle>
            </motion.div>

            <motion.div variants={revealVariant}>
              <HeroLead>
                Aikya blends daily AI journaling with psychologist-reviewed
                summaries and personalized rāga therapy — private, culturally
                sensitive, and evidence-based.
              </HeroLead>
            </motion.div>

            <motion.div variants={revealVariant}>
              <CTAGroup>
                <Button $primary as={Link} href="/roles">
                  Start your 7-day free journey <ArrowRight size={14} />
                </Button>
                <Button as={Link} href="#how" $secondary>
                  <Play size={14} /> Watch how Aikya works
                </Button>
              </CTAGroup>
            </motion.div>

            <motion.div variants={revealVariant}>
              <SmallMuted style={{ marginTop: 24, fontSize: 13 }}>
                Trusted by wellness labs & clinicians — privacy-first,
                HIPAA-ready prototype
              </SmallMuted>
            </motion.div>
          </motion.div>

          {/* Right column: Side Card */}
          <motion.aside
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SideCard>
              <div style={{ fontSize: 56, color: ACCENT }}>🎧</div>
              <div
                style={{
                  fontFamily: "Fraunces",
                  fontSize: 24,
                  fontWeight: 700,
                  color: TEXT,
                }}
              >
                Rāga Wave
              </div>
              <div
                style={{
                  color: SUB,
                  textAlign: "center",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                Personalized rāga prescriptions tuned to your emotional pattern
                — with listening guidelines and timing.
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: 12,
                  marginTop: 15,
                }}
              >
                <Button $primary as={Link} href="/roles" style={{ flex: 1 }}>
                  Begin Now
                </Button>
                <Button
                  as={Link}
                  href="#ragas"
                  $secondary
                  style={{ flex: 1, padding: "12px 16px" }}
                >
                  See Examples
                </Button>
              </div>

              <div style={{ width: "100%", marginTop: 18, marginBottom: 10 }}>
                <div
                  style={{
                    height: 80,
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: 14,
                    border: "1px solid rgba(220,230,235,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Wave Visualizer */}
                  <svg
                    width="100%"
                    height="50"
                    viewBox="0 0 180 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 24 C 30 10, 60 40, 90 24 C 120 8, 150 40, 180 24"
                      stroke={ACCENT2}
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 30 C 30 16, 60 46, 90 30 C 120 14, 150 46, 180 30"
                      stroke={ACCENT}
                      strokeWidth="1.8"
                      fill="none"
                      opacity="0.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </SideCard>
          </motion.aside>

          {/* NEW FULL WIDTH SECTION: Services and Analytics */}
          <div style={{ gridColumn: "1 / -1", marginTop: 24 }}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
            >
              {/* === ServicesWrap === */}
              <motion.div variants={revealVariant}>
                <ServicesWrap id="how">
                  <ServicesTitle>What Aikya does</ServicesTitle>
                  <ServiceGrid>
                    {servicesData.map((s) => {
                      const Icon = s.icon;
                      const open = openId === s.id;
                      return (
                        <div key={s.id}>
                          <ServiceCard
                            open={open}
                            onClick={() => setOpenId(open ? null : s.id)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.005 }}
                          >
                            <CardIconWrapper>
                              <Icon size={22} color={ACCENT} />
                            </CardIconWrapper>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, fontSize: 16 }}>
                                {s.title}
                              </div>
                              <div style={{ color: SUB, fontSize: 14 }}>
                                {s.subtitle}
                              </div>
                              {open && (
                                <PanelInner>
                                  <div style={{ color: SUB }}>{s.panel}</div>
                                  <div style={{ marginTop: 15 }}>
                                    <Button
                                      $primary
                                      as={Link}
                                      href="/roles"
                                      style={{
                                        padding: "8px 14px",
                                        fontSize: "13px",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Try it — get started{" "}
                                      <ArrowRight size={12} />
                                    </Button>
                                  </div>
                                </PanelInner>
                              )}
                            </div>
                          </ServiceCard>
                        </div>
                      );
                    })}
                  </ServiceGrid>
                </ServicesWrap>
              </motion.div>

              {/* === Emotional Analytics === */}
              <motion.div variants={revealVariant} style={{ marginTop: 30 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(123,176,255,0.06)",
                      padding: 16,
                      borderRadius: 14,
                      border: "1px solid rgba(123,176,255,0.12)",
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: 16 }}>
                      📈 Emotional Analytics
                    </div>
                    <div
                      style={{
                        color: SUB,
                        marginTop: 8,
                        maxWidth: 560,
                        fontSize: 14,
                      }}
                    >
                      Turn invisible emotions into visible patterns: mood
                      trends, trigger maps, and recovery markers.
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <CheckCircle size={20} color={ACCENT} />
                    <SmallMuted style={{ fontSize: 14, fontWeight: 600 }}>
                      Psychologist-reviewed weekly summaries
                    </SmallMuted>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RagaHealingSection (FULL WIDTH) */}
          <div style={{ gridColumn: "1 / -1", marginTop: 24 }}>
            <RagaHealingSection />
          </div>

          {/* Analytics / Why (FULL WIDTH) */}
          <div style={{ gridColumn: "1 / -1", marginTop: 30 }}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2
                variants={revealVariant}
                style={{
                  fontSize: 36,
                  margin: "24px 0 20px",
                  fontFamily: "Fraunces",
                  fontWeight: 800,
                  color: TEXT,
                }}
              >
                Actionable Insights, Clinically Vetted
              </motion.h2>

              <motion.div
                variants={revealVariant}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    background: SURFACE,
                    padding: 20,
                    borderRadius: 16,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      marginBottom: 10,
                      fontSize: 16,
                      color: TEXT,
                    }}
                  >
                    Weekly Mood Graph
                  </div>
                  <div
                    style={{
                      height: 140,
                      borderRadius: 12,
                      background: "#fbfdff",
                      border: `1px solid ${BORDER}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        points="0,80 20,60 40,75 60,45 80,58 100,30"
                        fill="none"
                        stroke={ACCENT2}
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div style={{ color: SUB, marginTop: 12, fontSize: 14 }}>
                    Turn invisible patterns into concrete, manageable data
                    points.
                  </div>
                </div>

                <div
                  style={{
                    background: SURFACE,
                    padding: 20,
                    borderRadius: 16,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        marginBottom: 10,
                        fontSize: 16,
                        color: TEXT,
                      }}
                    >
                      Psychologist Oversight
                    </div>
                    <div style={{ color: SUB, fontSize: 14, lineHeight: 1.6 }}>
                      Weekly summaries are reviewed by licensed clinicians to
                      ensure safety and clinical accuracy, providing a human
                      safety net for AI insights.
                    </div>
                  </div>
                  <Button
                    as={Link}
                    href="#"
                    $secondary
                    style={{ marginTop: "15px", alignSelf: "flex-start" }}
                  >
                    Meet Our Team
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer (FULL WIDTH) */}
          <FooterContent>
            <FooterGrid>
              {/* Column 1: Logo & Mission */}
              <FooterLogoSection>
                <Logo style={{ marginBottom: "10px" }}>
                  <div className="mark" aria-hidden>
                    Ak
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>Aikya</div>
                </Logo>
                <p style={{ fontSize: "14px", margin: "0 0 16px", color: SUB }}>
                  Bridging ancient wisdom and modern AI for personalized
                  emotional wellness.
                </p>
                <div
                  style={{ display: "flex", gap: "15px", marginTop: "10px" }}
                >
                  {/* Social Icons Placeholder - Using slightly larger icons */}
                  <a href="#" aria-label="LinkedIn" style={{ color: SUB }}>
                    <svg
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM4 9h4v12H4zM6 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"></path>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter" style={{ color: SUB }}>
                    <svg
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.256L22 21.75h-7.778l-5.694-6.38L2 21.75h3.308l6.155-7.014L5.19 2.25h-3.3l7.393 8.435L2.25 21.75z"></path>
                    </svg>
                  </a>
                </div>
              </FooterLogoSection>

              {/* Column 2: Product */}
              <div>
                <FooterSectionTitle>Product</FooterSectionTitle>
                <FooterLink href="#how">How it Works</FooterLink>
                <FooterLink href="#">AI Journaling</FooterLink>
                <FooterLink href="#ragas">Rāga Therapy</FooterLink>
                <FooterLink href="#">Pricing</FooterLink>
              </div>

              {/* Column 3: Company */}
              <div>
                <FooterSectionTitle>Company</FooterSectionTitle>
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Clinical Team</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
              </div>

              {/* Column 4: Support & Legal */}
              <div>
                <FooterSectionTitle>Support & Legal</FooterSectionTitle>
                <FooterLink href="#">Help Center</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </div>
            </FooterGrid>

            <CopyrightBar>
              © {new Date().getFullYear()} Aikya, Inc. All rights reserved. •
              The information provided is not a substitute for professional
              medical advice.
            </CopyrightBar>
          </FooterContent>
        </Frame>
      </Root>
    </>
  );
}
