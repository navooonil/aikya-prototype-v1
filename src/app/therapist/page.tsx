"use client";

import styled from "styled-components";
import Link from "next/link";
import { ArrowRight, Clock, MessageSquare, AlertTriangle } from "lucide-react";

// --- WARM GOLD/SAFFRON AIKYA DARK THEME TOKENS ---
const BG = "#171F32"; // Main Background
const CARD = "#212F40"; // Card/Table Background
const TEXT_LIGHT = "#EBF2F7"; // Off-White Text
const SUB_DARK = "rgba(235, 242, 247, 0.6)"; // Muted subtext
const ACCENT = "#FFB800"; // NEW PRIMARY: Warm Gold/Saffron (Action/Highlight)
const PENDING_COLOR = "#FF8C00"; // Deep Orange (Pending/Status)
const HIGH_URGENCY = "#E57373"; // Soft Red for High Anxiety/Severity
const BORDER_DARK = "rgba(235, 242, 247, 0.1)"; // Soft border

// --- MOCK COMPONENTS (Updated with new ACCENT) ---

const TherapistSidebar = ({ active }: { active: string }) => (
  <aside
    style={{
      width: "260px",
      background: CARD,
      color: TEXT_LIGHT,
      padding: "24px 20px",
      borderRadius: "18px",
      height: "fit-content",
      position: "sticky",
      top: "24px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
    }}
  >
    <div
      style={{
        padding: "12px 16px",
        background: active === "pending" ? BG : "transparent",
        color: TEXT_LIGHT,
        borderRadius: "10px",
        fontWeight: active === "pending" ? 700 : 500,
        // Uses new ACCENT
        borderLeft: active === "pending" ? `3px solid ${ACCENT}` : "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Clock
        size={16}
        style={{
          marginRight: 8,
          color: ACCENT, // Uses new ACCENT
        }}
      />{" "}
      Pending Summaries
    </div>
  </aside>
);

// --- STYLED COMPONENTS (Updated ACCENT references) ---

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  background: ${BG};
  min-height: 100vh;
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: ${TEXT_LIGHT};
  margin: 0 0 4px 0;
`;

const SubText = styled.p`
  color: ${SUB_DARK};
  margin: 0 0 20px 0;
  font-size: 15px;
`;

const TableCard = styled.div`
  background: ${CARD};
  border-radius: 16px;
  padding: 20px;
  border: 1px solid ${BORDER_DARK};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
`;

// Define the grid structure for rows and headers
const TableGrid = styled.div`
  display: grid;
  /* Columns: Code, Emotion, Note, Status, Action */
  grid-template-columns: 1fr 1.2fr 1.5fr 80px 100px;
  gap: 16px;
  align-items: center;
`;

const TableHeader = styled(TableGrid)`
  font-weight: 600;
  color: ${SUB_DARK};
  padding: 0 16px 12px;
  border-bottom: 1px solid ${BORDER_DARK};
  font-size: 14px;
`;

const TableRow = styled(TableGrid)<{ $highSeverity: boolean }>`
  background: ${BG};
  border-radius: 10px;
  padding: 12px 16px;
  margin: 8px 0;
  /* High severity border uses HIGH_URGENCY (Red) */
  border: 1px solid ${(p) => (p.$highSeverity ? HIGH_URGENCY : BG)};
  transition: all 0.2s ease;
  font-size: 15px;

  /* Hover uses ACCENT (Gold) for non-urgent items, and HIGH_URGENCY (Red) for urgent ones */
  &:hover {
    border: 1px solid ${(p) => (p.$highSeverity ? HIGH_URGENCY : ACCENT)};
    background: ${CARD};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

const EmotionIndicator = styled.div<{ $highSeverity: boolean }>`
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  /* Color changes based on severity */
  color: ${(p) => (p.$highSeverity ? HIGH_URGENCY : PENDING_COLOR)};
`;

const StatusBadge = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(p) => p.$color};
  font-weight: 700;
  font-size: 14px;
`;

const ReviewLink = styled(Link)`
  display: inline-flex;
  gap: 6px;
  align-items: center;
  color: ${ACCENT}; // Uses new ACCENT
  font-weight: 700;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: ${PENDING_COLOR}; // Use PENDING_COLOR for a slight shift on hover
  }
`;

// --- COMPONENT LOGIC ---

export default function TherapistPending() {
  const assignments = [
    {
      code: "USR-4092",
      emotion: "Anxiety (High)",
      note: "Watch for night-time stress and rumination pattern.",
      id: "1",
      isUrgent: true, // Flag for visual distinction
    },
    {
      code: "USR-5821",
      emotion: "Emotional Numbness",
      note: "Journaling indicates signs of unresolved grief.",
      id: "2",
      isUrgent: false,
    },
    {
      code: "USR-1423",
      emotion: "Low Motivation",
      note: "Identified work burnout pattern and fatigue.",
      id: "3",
      isUrgent: false,
    },
  ];

  return (
    <Wrapper>
      {/* Sidebar */}
      <TherapistSidebar active="pending" />

      <MainContent>
        <SectionTitle>Pending Summaries ({assignments.length})</SectionTitle>
        <SubText>
          These are recent emotional summaries derived from client journaling
          data requiring your Rāga prescription.
        </SubText>

        <TableCard>
          <TableHeader>
            <div>User Code</div>
            <div>Dominant Emotion</div>
            <div>Psych Note</div>
            <div>Status</div>
            <div />
          </TableHeader>

          {assignments.map((a) => (
            <TableRow key={a.id} $highSeverity={a.isUrgent}>
              {/* User Code */}
              <div style={{ fontWeight: 700, color: TEXT_LIGHT }}>{a.code}</div>

              {/* Dominant Emotion */}
              <EmotionIndicator $highSeverity={a.isUrgent}>
                {a.isUrgent ? (
                  <AlertTriangle size={16} />
                ) : (
                  <MessageSquare size={16} />
                )}
                {a.emotion}
              </EmotionIndicator>

              {/* Psych Note */}
              <div
                style={{
                  color: SUB_DARK,
                  fontSize: "14px",
                  fontStyle: "italic",
                }}
              >
                {a.note}
              </div>

              {/* Status */}
              <StatusBadge $color={PENDING_COLOR}>
                <Clock size={14} /> Ready
              </StatusBadge>

              {/* Action Link */}
              <div>
                <ReviewLink href={`/therapist/review/${a.id}`}>
                  Review <ArrowRight size={16} />
                </ReviewLink>
              </div>
            </TableRow>
          ))}
        </TableCard>
      </MainContent>
    </Wrapper>
  );
}
