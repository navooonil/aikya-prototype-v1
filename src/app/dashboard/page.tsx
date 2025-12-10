// src/app/dashboard/page.tsx
"use client";

import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  Hourglass,
  Lightbulb,
  Music,
  ArrowRight,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ------------------------------------------------
    DESIGN TOKENS - CALM, EARTHY LIGHT THEME
------------------------------------------------ */
const BG = "#F8FDFE"; // Very Light Background
const TEXT = "#2C3E50"; // Dark Blue/Gray Text
const SUB = "#6C839F"; // Muted Blue-Gray Subtext
const ACCENT = "#3A98B9"; // Muted Sky Blue (Primary Action/Highlight)
const ACCENT2 = "#64A77C"; // Soft Sage Green (Secondary Highlight)
const CARD = "#FFFFFF"; // Card Surface
const BORDER = "#E0E9F0"; // Subtle Border
const QUOTE_BG = "#F3FCF6"; // Slightly deeper background for the quote card

/* ------------------------------------------------
    GLOBAL
------------------------------------------------ */
const Global = createGlobalStyle`
  body {
    background: ${BG};
    margin: 0;
    font-family: 'Inter', sans-serif;
    color: ${TEXT};
    line-height: 1.5;
  }
  a {
      color: ${ACCENT};
      text-decoration: none;
      transition: color 0.2s;
  }
`;

/* ------------------------------------------------
    TYPOGRAPHY COMPONENTS
------------------------------------------------ */
const SectionHeading = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${TEXT};
  margin: 0 0 8px 0;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${TEXT};
  margin: 0;
`;

const CardSubtext = styled.p`
  color: ${SUB};
  font-size: 15px;
  margin: 6px 0 0 0;
`;

/* ------------------------------------------------
    LAYOUT
------------------------------------------------ */
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 48px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.div`
  font-family: "Fraunces", serif;
  font-size: 22px;
  font-weight: 800;
  color: ${ACCENT};
`;

const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${ACCENT}, ${ACCENT2});
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 0 0 2px ${CARD}, 0 0 0 4px ${ACCENT}50;
`;

const NameDropdown = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 15px;
  color: ${TEXT};
  &:hover {
    color: ${ACCENT};
  }
`;

/* ------------------------------------------------
    CARDS
------------------------------------------------ */
const Card = styled(motion.div)`
  background: ${CARD};
  border-radius: 20px;
  padding: 28px;
  border: 1px solid ${BORDER};
  box-shadow: 0 20px 50px rgba(44, 62, 80, 0.08);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Row2 = styled(Row)``;

/* BUTTONS */
const PrimaryBtn = styled(Link)`
  background: ${ACCENT};
  padding: 12px 24px;
  color: white;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-top: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 15px ${ACCENT}40;

  &:hover {
    box-shadow: 0 10px 20px ${ACCENT}60;
    transform: translateY(-2px);
  }
`;

const OutlineBtn = styled(Link)`
  padding: 12px 24px;
  border-radius: 999px;
  border: 1px solid ${ACCENT};
  color: ${ACCENT};
  font-weight: 600;
  display: inline-flex;
  gap: 8px;
  margin-top: 16px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${ACCENT}15;
    color: ${TEXT};
  }
`;

/* QUICK FEEL BUTTON */
const QuickFeelButton = styled.button`
  padding: 10px 16px;
  border-radius: 14px;
  background: ${BG};
  border: 1px solid ${BORDER};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: ${TEXT};
  transition: all 0.2s ease;

  &:hover {
    background: ${ACCENT}10;
    border-color: ${ACCENT}40;
  }

  &.active {
    background: ${ACCENT2};
    border-color: ${ACCENT2};
    color: ${CARD};
    box-shadow: 0 4px 10px ${ACCENT2}40;
  }
`;

/* Mood Trend Item */
const MoodItem = styled.div`
  width: 48px;
  height: 48px;
  background: #e8f5ff;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 22px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

/* ------------------------------------------------
    DUMMY DATA
------------------------------------------------ */
const HAS_WRITTEN_TODAY = false;
const STREAK = 3;
const JOURNALS_THIS_WEEK = 4;
const SUMMARY_STATE = "pending";
// "pending" | "not_enough" | "ready"

const RAGA_DATA = {
  ragaName: "Darbari Kanada",
  mood: "Night Rāga for calming the mind",
  instructions: "Crafted to calm restless thoughts and improve sleep.",
  bestTime: "10 PM",
  duration: "10–20 minutes",
};

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <Global />
      <Wrapper>
        <Container>
          {/* ----------- TOP BAR ----------- */}
          <TopBar>
            <Brand>Aikya</Brand>
            <AvatarWrap>
              <Avatar>NS</Avatar>
              <NameDropdown>
                Navonil <ChevronDown size={16} />
              </NameDropdown>
            </AvatarWrap>
          </TopBar>

          {/* ----------- ROW 1: Welcome & Streak ----------- */}
          <Row>
            {/* LEFT — WELCOME & ACTION */}
            <Card>
              <CardTitle>Hi, Navonil 👋</CardTitle>
              <CardSubtext>
                Ready for some self-reflection? How are you feeling today?
              </CardSubtext>

              {!HAS_WRITTEN_TODAY ? (
                <>
                  <p style={{ color: SUB, marginTop: 16, fontSize: 15 }}>
                    Your mind deserves a little space today.
                  </p>
                  <PrimaryBtn href="/journal">
                    ✍️ Start Today's Journal
                  </PrimaryBtn>
                </>
              ) : (
                <>
                  <p style={{ color: SUB, marginTop: 16, fontSize: 15 }}>
                    Thank you for showing up for yourself today.
                  </p>
                  <PrimaryBtn href="/journal/today">
                    💬 View Today's Reflection
                  </PrimaryBtn>
                </>
              )}
            </Card>

            {/* RIGHT — STREAK & QUICK FEEL */}
            <Card>
              <p
                style={{
                  color: SUB,
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Your Consistency
              </p>

              {STREAK > 0 ? (
                <SectionHeading style={{ fontSize: 28 }}>
                  🔥 {STREAK}-day streak
                </SectionHeading>
              ) : (
                <SectionHeading style={{ fontSize: 28, color: ACCENT2 }}>
                  🌱 Start your streak
                </SectionHeading>
              )}

              <p
                style={{
                  color: SUB,
                  fontSize: 14,
                  marginTop: 6,
                  marginBottom: 20,
                }}
              >
                Consistency rewires your brain. One day at a time.
              </p>

              <div>
                <p style={{ color: SUB, fontSize: 14, marginBottom: 10 }}>
                  Log a Quick Feel:
                </p>

                <div style={{ display: "flex", gap: 10 }}>
                  <QuickFeelButton className="active">😌 Calm</QuickFeelButton>
                  <QuickFeelButton>🙂 Okay</QuickFeelButton>
                  <QuickFeelButton>😟 Heavy</QuickFeelButton>
                </div>
              </div>
            </Card>
          </Row>

          {/* ----------- ROW 2: Mood Trend & Summary ----------- */}
          <Row2>
            {/* LEFT — MOOD TREND */}
            <Card>
              <SectionHeading>Your emotional rhythm this week</SectionHeading>
              <CardSubtext>
                Healing isn’t linear — and that’s okay. You wrote{" "}
                {JOURNALS_THIS_WEEK} times.
              </CardSubtext>

              {/* Mood Trend */}
              <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
                {["🙂", "😟", "😐", "😌", "🙂", "😕", "😌"].map((emo, i) => (
                  <MoodItem key={i}>{emo}</MoodItem>
                ))}
              </div>
            </Card>

            {/* RIGHT — WEEKLY SUMMARY CARD */}
            <Card
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 250 }}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 180,
              }}
              onClick={() => router.push("/weekly-summary")}
            >
              <SectionHeading>Your Weekly Summary</SectionHeading>

              {SUMMARY_STATE === "pending" && (
                <div>
                  <Hourglass size={32} color={ACCENT} />
                  <p style={{ color: SUB, marginTop: 10, fontSize: 15 }}>
                    We’re preparing your summary. A psychologist is reviewing
                    it.
                  </p>
                </div>
              )}

              {SUMMARY_STATE === "not_enough" && (
                <div>
                  <Calendar size={32} color={ACCENT} />
                  <p style={{ color: SUB, marginTop: 10, fontSize: 15 }}>
                    {JOURNALS_THIS_WEEK}/7 journals done. Keep writing to unlock
                    your summary.
                  </p>
                  <OutlineBtn href="/journal">
                    ✍️ Write Today's Journal
                  </OutlineBtn>
                </div>
              )}

              {SUMMARY_STATE === "ready" && (
                <div>
                  <Lightbulb size={32} color={ACCENT2} />
                  <p style={{ marginTop: 10, fontWeight: 700, color: TEXT }}>
                    Your weekly emotional story is ready
                  </p>
                  <PrimaryBtn href="/dashboard/weekly-summary">
                    View Summary <ArrowRight size={16} />
                  </PrimaryBtn>
                </div>
              )}
            </Card>
          </Row2>

          {/* ----------- ROW 3: Raga & Quote ----------- */}
          <Row2>
            {/* LEFT — RAGA CARD (UPDATED WITH NEW DATA/STYLE) */}
            <Card>
              <SectionHeading>Your healing rāga this week</SectionHeading>

              {/* Rāga Name and Icon using new style */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 10,
                }}
              >
                <Music size={32} color={ACCENT2} />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    margin: 0,
                    color: ACCENT,
                  }}
                >
                  🎧 {RAGA_DATA.ragaName}
                </p>
              </div>

              <p style={{ color: SUB, fontSize: 14, marginTop: 8 }}>
                **Prescription ({RAGA_DATA.mood}):** {RAGA_DATA.instructions}
              </p>

              <div style={{ color: SUB, fontSize: 14, marginTop: 12 }}>
                <strong>Best time:</strong> {RAGA_DATA.bestTime} |
                <strong> Duration:</strong> {RAGA_DATA.duration}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <PrimaryBtn href="/raga">
                  Listen Now <ArrowRight size={16} />
                </PrimaryBtn>
                <OutlineBtn href="/why-raga">Why this rāga?</OutlineBtn>
              </div>
            </Card>

            {/* RIGHT — QUOTE CARD (Unique Styling) */}
            <Card
              style={{ background: QUOTE_BG, border: `1px solid ${ACCENT2}30` }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Heart size={36} color={ACCENT2} style={{ marginBottom: 16 }} />
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    margin: 0,
                    fontStyle: "italic",
                    lineHeight: 1.4,
                    color: TEXT,
                  }}
                >
                  “Healing happens one honest moment at a time.”
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    margin: "20px 0 0 0",
                    color: SUB,
                  }}
                >
                  — Aikya Reflection
                </p>
              </div>
            </Card>
          </Row2>

          {/* FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 32,
              color: SUB,
              fontSize: 14,
              marginTop: 16,
            }}
          >
            <Link href="/history">📝 Journal History</Link>
            <Link href="/reflections">💬 Reflections</Link>
            <Link href="/raga">🎶 Rāga Therapy</Link>
            <Link href="/insights">📊 Insights</Link>
          </div>
        </Container>
      </Wrapper>
    </>
  );
}
