// src/therapist/completed/page.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  MessageSquare,
  ChevronDown,
  Clock,
  CornerUpLeft,
} from "lucide-react";

/**
 * Hybrid UI (Option C) — Dark Sidebar + Lighter Main
 * - Sidebar: deep midnight blue
 * - Main content: soft off-white / cool card backgrounds
 * - Accents: Aikya teal + lavender
 */

/* ===========================
   Design tokens (Hybrid)
   =========================== */
const SIDEBAR_BG = "#0F1724"; // deep midnight
const SIDEBAR_CARD = "#111827";
const MAIN_BG = "#F6F9FA"; // off-white, soft
const CARD = "#FFFFFF";
const TEXT_DARK = "#0B2B2B";
const MUTED = "#5C6E73";
const ACCENT = "#6BC5C5"; // teal
const ACCENT2 = "#B7B7F4"; // lavender
const BORDER = "rgba(11,43,43,0.06)";
const SOFT_SHADOW = "0 10px 30px rgba(12, 20, 26, 0.06)";

/* ===========================
   Helper small components
   =========================== */

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  gap: 28px;
  padding: 28px;
  background: ${MAIN_BG};
  box-sizing: border-box;
`;

/* Sidebar (dark) */
const Sidebar = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, ${SIDEBAR_BG}, ${SIDEBAR_CARD});
  border-radius: 16px;
  padding: 22px;
  color: #e6eef0;
  box-shadow: 0 8px 30px rgba(4, 6, 10, 0.25);
  position: sticky;
  top: 28px;
  height: fit-content;
`;

const SidebarTitle = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 18px;
`;

const Mark = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${ACCENT}, ${ACCENT2});
  display: grid;
  place-items: center;
  font-weight: 800;
  color: white;
  font-family: "Inter", system-ui, sans-serif;
  box-shadow: 0 8px 24px rgba(107, 197, 197, 0.12);
`;

const SidebarName = styled.div`
  font-weight: 800;
  font-size: 18px;
`;

const SidebarMuted = styled.div`
  color: rgba(230, 240, 242, 0.7);
  font-size: 13px;
  margin-top: 4px;
`;

/* Sidebar nav */
const SidebarNav = styled.nav`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  background: ${(p) => (p.active ? "rgba(107,197,197,0.08)" : "transparent")};
  color: ${(p) => (p.active ? "#e9fbfb" : "rgba(230,240,242,0.9)")};
  border-left: ${(p) =>
    p.active ? `4px solid ${ACCENT}` : "4px solid transparent"};
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

/* Main content */
const Main = styled.main`
  flex: 1;
  max-width: 980px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

/* Header */
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: ${TEXT_DARK};
  font-weight: 800;
`;

const TopRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StatPill = styled.div`
  background: linear-gradient(
    180deg,
    rgba(107, 197, 197, 0.08),
    rgba(183, 183, 244, 0.04)
  );
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(107, 197, 197, 0.12);
  color: ${TEXT_DARK};
  font-weight: 700;
`;

/* Table container (lighter cards) */
const TableCard = styled.div`
  background: ${CARD};
  border-radius: 14px;
  padding: 12px 14px;
  border: 1px solid ${BORDER};
  box-shadow: ${SOFT_SHADOW};
`;

/* Header row for the table */
const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.8fr 1fr 1fr 40px;
  gap: 12px;
  padding: 14px 12px;
  align-items: center;
  font-weight: 700;
  color: ${MUTED};
  border-bottom: 1px solid rgba(11, 43, 43, 0.04);
`;

/* Data row */
const DataRow = styled(motion.div)<{ active?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1.8fr 1fr 1fr 40px;
  gap: 12px;
  align-items: center;
  padding: 12px;
  margin-top: 12px;
  border-radius: 12px;
  background: ${(p) =>
    p.active
      ? "linear-gradient(180deg, rgba(107,197,197,0.04), rgba(183,183,244,0.02))"
      : "transparent"};
  border: 1px solid
    ${(p) => (p.active ? "rgba(107,197,197,0.12)" : "transparent")};
  cursor: pointer;
`;

/* small helper styles */
const CodeCol = styled.div`
  font-weight: 800;
  color: ${TEXT_DARK};
`;

const RagaCol = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${TEXT_DARK};
  font-weight: 700;
`;

const DateCol = styled.div`
  color: ${MUTED};
  font-weight: 600;
`;

const FeedbackCol = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Badge = styled.span<{ color: string }>`
  font-weight: 700;
  color: ${(p) => p.color};
  background: ${(p) => `${p.color}20`};
  padding: 6px 10px;
  border-radius: 12px;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
`;

/* Arrow wrapper */
const ArrowWrap = styled.div`
  display: grid;
  place-items: center;
`;

/* Expanded detail panel (lighter card under the row) */
const Expanded = styled(motion.div)`
  margin-top: 12px;
  background: linear-gradient(180deg, #fbfeff, #f6fbfb);
  border: 1px solid rgba(11, 43, 43, 0.04);
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 8px 20px rgba(20, 30, 35, 0.04);
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  color: ${TEXT_DARK};
`;

const DetailField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  strong {
    color: ${MUTED};
    font-weight: 700;
    font-size: 13px;
  }
  span {
    font-weight: 700;
  }
`;

const Notes = styled.div`
  margin-top: 12px;
  background: rgba(235, 245, 244, 0.8);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(107, 197, 197, 0.08);
  color: ${TEXT_DARK};
`;

/* Footer of Main with small help text */
const FooterHelp = styled.div`
  margin-top: 12px;
  color: ${MUTED};
  font-size: 13px;
`;

/* ===========================
   Helper functions
   =========================== */

const feedbackColor = (status) => {
  if (status === "Successful") return "#27AE60";
  if (status === "Neutral") return "#6F8EDC";
  return "#FF9F1C";
};

const ragaIcon = (name) => {
  if (name.includes("Darbari")) return <Clock size={18} color={ACCENT} />;
  if (name.includes("Bhairavi"))
    return <CornerUpLeft size={18} color={ACCENT} />;
  return <MessageSquare size={18} color={ACCENT} />;
};

/* ===========================
   Mock Data
   =========================== */

const completed = [
  {
    code: "USR-4092",
    raga: "Darbari Kanada",
    date: "Feb 16, 2024",
    feedbackText: "Helped a lot",
    feedbackEmoji: "❤️",
    status: "Successful",
    prescription: "Night • 20 min • Active listening",
    notes: "Focus on deep breathing during the ālap. Helps with sleep onset.",
  },
  {
    code: "USR-5821",
    raga: "Bhairavi",
    date: "Feb 14, 2024",
    feedbackText: "Somewhat helpful",
    feedbackEmoji: "🙂",
    status: "Neutral",
    prescription: "Dawn • 30 min • Active listening",
    notes: "Listen immediately upon waking to process emotional release.",
  },
  {
    code: "USR-3333",
    raga: "Yaman",
    date: "Feb 12, 2024",
    feedbackText: "Mild progress",
    feedbackEmoji: "👍",
    status: "Neutral",
    prescription: "Evening • 15 min • Passive listening",
    notes: "Play softly during final work session to transition to calm.",
  },
  {
    code: "USR-0010",
    raga: "Deshkar",
    date: "Feb 10, 2024",
    feedbackText: "Not much change",
    feedbackEmoji: "😐",
    status: "Low",
    prescription: "Morning • 25 min • Active listening",
    notes: "Re-evaluate dosage; consider a different rāga.",
  },
];

/* ===========================
   Component
   =========================== */

export default function CompletedAssignmentsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <PageWrapper>
      {/* Sidebar */}
      <Sidebar aria-label="Therapist navigation">
        <SidebarTitle>
          <Mark>Ak</Mark>
          <div>
            <SidebarName>Therapist</SidebarName>
            <SidebarMuted>Rāga assignments • Hybrid UI</SidebarMuted>
          </div>
        </SidebarTitle>

        <SidebarNav>
          <NavItem as={Link} href="/therapist/pending">
            📋 Pending Assignments
          </NavItem>
          <NavItem as={Link} href="/therapist/completed" active>
            <CheckCircle size={16} /> Completed Assignments
          </NavItem>
          <NavItem as={Link} href="/therapist/settings">
            ⚙️ Settings
          </NavItem>
        </SidebarNav>

        <div style={{ marginTop: 18 }}>
          <div style={{ color: "rgba(230,240,242,0.85)", fontWeight: 700 }}>
            Quick tip
          </div>
          <div
            style={{
              color: "rgba(230,240,242,0.7)",
              marginTop: 6,
              fontSize: 13,
            }}
          >
            Review the psych note before assigning. Keep prescriptions simple
            and time-of-day aligned.
          </div>
        </div>
      </Sidebar>

      {/* Main */}
      <Main>
        <Top>
          <div>
            <Title>Completed Assignments</Title>
            <div style={{ color: MUTED, marginTop: 4 }}>
              Completed rāga prescriptions with therapist feedback & user
              responses.
            </div>
          </div>

          <TopRight>
            <StatPill>{completed.length} completed</StatPill>
            <StatPill
              style={{ display: "flex", gap: 10, alignItems: "center" }}
            >
              Avg feedback:{" "}
              <strong style={{ marginLeft: 6, color: TEXT_DARK }}>84%</strong>
            </StatPill>
          </TopRight>
        </Top>

        {/* Table card */}
        <TableCard aria-live="polite">
          <HeaderRow>
            <div>User Code</div>
            <div>Rāga Assigned</div>
            <div>Date</div>
            <div>Feedback</div>
            <div />
          </HeaderRow>

          <div>
            {completed.map((row) => {
              const isOpen = expanded === row.code;
              return (
                <div key={row.code}>
                  <DataRow
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    whileHover={{ scale: 1.01 }}
                    active={isOpen}
                    onClick={() => setExpanded(isOpen ? null : row.code)}
                    role="button"
                    aria-expanded={isOpen}
                  >
                    <CodeCol>{row.code}</CodeCol>

                    <RagaCol>
                      {ragaIcon(row.raga)}
                      <div>{row.raga}</div>
                    </RagaCol>

                    <DateCol>{row.date}</DateCol>

                    <FeedbackCol>
                      <Badge color={feedbackColor(row.status)}>
                        <span aria-hidden>{row.feedbackEmoji}</span>
                        <span style={{ fontWeight: 700 }}>
                          {row.feedbackText}
                        </span>
                      </Badge>
                    </FeedbackCol>

                    <ArrowWrap>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.25s",
                          color: ACCENT,
                        }}
                        aria-hidden
                      />
                    </ArrowWrap>
                  </DataRow>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <Expanded
                        key={row.code + "-detail"}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <DetailGrid>
                          <DetailField>
                            <strong>Rāga</strong>
                            <span>{row.raga}</span>
                          </DetailField>

                          <DetailField>
                            <strong>Prescription</strong>
                            <span>{row.prescription}</span>
                          </DetailField>

                          <DetailField>
                            <strong>User Code</strong>
                            <span>{row.code}</span>
                          </DetailField>

                          <DetailField>
                            <strong>Date Completed</strong>
                            <span>{row.date}</span>
                          </DetailField>
                        </DetailGrid>

                        <Notes>
                          <strong>Therapist Notes:</strong> {row.notes}
                        </Notes>

                        <div
                          style={{ display: "flex", gap: 10, marginTop: 12 }}
                        >
                          <button
                            style={{
                              padding: "10px 14px",
                              borderRadius: 10,
                              background: ACCENT,
                              color: "white",
                              border: "none",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // placeholder: open playback or open details
                              alert(
                                `Opening playback / details for ${row.code}`
                              );
                            }}
                          >
                            ▶️ View Playback
                          </button>

                          <button
                            style={{
                              padding: "10px 14px",
                              borderRadius: 10,
                              background: "transparent",
                              border: "1px solid rgba(11,43,43,0.06)",
                              color: TEXT_DARK,
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // placeholder: open analytics / research export
                              alert(`Open research export for ${row.code}`);
                            }}
                          >
                            📊 Export Data
                          </button>
                        </div>
                      </Expanded>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </TableCard>

        <FooterHelp>
          These rows are privacy-preserving: users are identified by codes and
          personal data is withheld. Use the export tools for aggregated
          research reports.
        </FooterHelp>
      </Main>
    </PageWrapper>
  );
}
