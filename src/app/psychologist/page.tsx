// src/app/psychologist/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  User,
  CheckCircle,
  AlertTriangle,
  Music,
  BarChart2,
  Bell,
  Send,
  Loader,
} from "lucide-react";
import PsychReviewPanel from "@/components/PsychReviewPanel";

/**
 * Psych Dashboard — mixed UI (dark sidebar, light content area)
 *
 * This page shows:
 * - left dark sidebar with profile & nav
 * - center: summary queue & queue items
 * - right: review panel (opens selected user weekly summary)
 *
 * The code uses local mock data. Wire up APIs where needed.
 * FIX APPLIED: Sidebar component definition is moved above Container to resolve ReferenceError in media query.
 */

/* -------------------------
    Design tokens (PREMIUM/CLEAN)
    ------------------------- */
const BG = "#F7FAFC"; // page background (off-white/very light gray)
const TEXT = "#172A3A"; // Deep Navy Blue
const SUB = "#607489"; // Slate Gray
const ACCENT = "#54A0FF"; // Primary Blue (Calm, Trustworthy)
const ACCENT_GREEN = "#2ECC71"; // Success Green
const ACCENT_ORANGE = "#F39C12"; // Warning/Pending Orange
const DARK = "#1A2B3A"; // Sidebar Dark Blue-Gray
const CARD = "#FFFFFF";
const BORDER = "#E0E6EB";

/* Custom Shadows for Premium Feel */
const SOFT_SHADOW = "0 8px 16px rgba(23, 42, 58, 0.05)";
const DARK_SHADOW = "0 12px 24px rgba(0, 0, 0, 0.2)";

/* -------------------------
    Global styles for the page
    ------------------------- */
const Global = createGlobalStyle`
  html, body, #__next { height: 100%; }
  body { 
    margin: 0; 
    background: ${BG}; 
    font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
    color: ${TEXT}; 
    line-height: 1.5;
  }
  * { box-sizing: border-box; }
  /* Keyframe for Loader spin */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/* -------------------------
    Sidebar (dark) - DEFINED FIRST TO AVOID REFERENCE ERROR
    ------------------------- */

const Sidebar = styled.aside`
  background: ${DARK};
  color: #ebf2f7;
  border-radius: 18px;
  padding: 28px 20px;
  box-shadow: ${DARK_SHADOW};
  position: sticky;
  top: 24px;
  height: fit-content;
  overflow: hidden;
`;

const Profile = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  background: linear-gradient(135deg, ${ACCENT}, #8ebfff);
  box-shadow: 0 4px 10px rgba(84, 160, 255, 0.3);
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #fff;
  font-size: 20px;
  font-family: "Inter", sans-serif;
`;

const ProfileMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SidebarSmall = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  line-height: 1.3;
  font-weight: 500;
`;

const SidebarBig = styled.div`
  color: #fff;
  font-weight: 700;
  font-size: 24px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItem = styled(motion.li).attrs((props: { active?: boolean }) => ({
  whileHover: { scale: 1.01, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
}))<{ active?: boolean }>`
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  color: ${(p) => (p.active ? TEXT : "rgba(255,255,255,0.7)")};
  background: ${(p) =>
    p.active ? "linear-gradient(90deg, #F0F5F9, #E4EBF0)" : "transparent"};
  font-weight: ${(p) => (p.active ? 700 : 500)};
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    color: ${(p) => (p.active ? ACCENT : "rgba(255,255,255,0.6)")};
  }
`;

const NavSeparator = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 16px 0;
`;

/* -------------------------
    Layout components
    ------------------------- */

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: ${BG};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 280px 1fr 380px;
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    max-width: 800px;

    /* This reference is now safe */
    ${Sidebar} {
      position: static;
    }
  }
`;

/* -------------------------
    Shared Typography & Elements
    ------------------------- */

const Small = styled.div`
  color: ${SUB};
  font-size: 13px;
  line-height: 1.3;
`;

const Big = styled.div`
  color: ${TEXT};
  font-weight: 700;
  font-size: 17px;
`;

/* -------------------------
    Main (center) area
    ------------------------- */

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: ${TEXT};
`;

const QueueCard = styled.div`
  background: ${CARD};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${BORDER};
  box-shadow: ${SOFT_SHADOW};
`;

/* Queue item row */
const QueueRow = styled(motion.div).attrs((props: { active?: boolean }) => ({
  whileHover: {
    scale: 1.005,
    backgroundColor: props.active
      ? "rgba(84, 160, 255, 0.08)"
      : "rgba(84, 160, 255, 0.03)",
  },
  whileTap: { scale: 0.99 },
}))<{ active?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 12px;
  gap: 12px;
  margin-bottom: 12px;
  border: 2px solid ${(p) => (p.active ? ACCENT : "transparent")};
  background: ${(p) => (p.active ? "rgba(84, 160, 255, 0.05)" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }
`;

const QueueUser = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const QueueAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${ACCENT_GREEN}, #80ed99);
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #fff;
  font-size: 16px;
`;

const TinyChip = styled.span<{ tone?: "muted" | "warning" | "success" }>`
  background: ${(p) =>
    p.tone === "warning"
      ? "#FFF3E0"
      : p.tone === "success"
      ? "#E8F5E9"
      : "#F1F5F9"};
  color: ${(p) =>
    p.tone === "warning"
      ? ACCENT_ORANGE
      : p.tone === "success"
      ? ACCENT_GREEN
      : SUB};
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const StatusIcon = ({ status }: { status: WeeklySummary["status"] }) => {
  if (status === "pending")
    return (
      <Loader
        size={16}
        color={ACCENT_ORANGE}
        style={{ animation: "spin 2s linear infinite" }}
      />
    );
  if (status === "approved")
    return <CheckCircle size={16} color={ACCENT_GREEN} />;
  return <Send size={16} color={SUB} style={{ transform: "rotate(180deg)" }} />;
};

/* -------------------------
    Right column: helper widgets (light, card-stack)
    ------------------------- */

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/* small helper card reused */
const HelperCard = styled.div`
  background: ${CARD};
  border-radius: 16px;
  padding: 20px;
  border: 1px solid ${BORDER};
  box-shadow: ${SOFT_SHADOW};
`;

const HelperTitle = styled.div`
  font-weight: 800;
  font-size: 18px;
  color: ${TEXT};
  margin-bottom: 10px;
`;

const Button = styled(motion.button).attrs(
  (props: { $variant?: "primary" | "secondary" | "danger" }) => ({
    whileHover: {
      scale: 1.02,
      boxShadow:
        props.$variant === "primary"
          ? "0 6px 12px rgba(84, 160, 255, 0.25)"
          : "none",
    },
    whileTap: { scale: 0.98 },
  })
)<{ $variant?: "primary" | "secondary" | "danger" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${(p) =>
    p.$variant === "primary"
      ? ACCENT
      : p.$variant === "secondary"
      ? "#F0F5F9"
      : p.$variant === "danger"
      ? "#FF4757"
      : ACCENT};
  color: ${(p) =>
    p.$variant === "primary" || p.$variant === "danger" ? "white" : TEXT};
  border: ${(p) =>
    p.$variant === "secondary" ? `1px solid ${BORDER}` : "none"};
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  box-shadow: ${(p) =>
    p.$variant === "primary" ? "0 4px 8px rgba(84, 160, 255, 0.15)" : "none"};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const SecondaryActionLink = styled(Link)`
  color: ${ACCENT};
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

/* -------------------------
    Mock data & types (unchanged for logic)
    ------------------------- */

type JournalEntry = {
  id: string;
  date: string; // ISO or friendly
  content: string;
  sentiment: "positive" | "neutral" | "negative";
  shortTag?: string;
};

type WeeklySummary = {
  id: string;
  userName: string;
  weekRange: string;
  dominantEmotion: string;
  emotionScore: number;
  status: "pending" | "approved" | "sent_back";
  journals: JournalEntry[];
  aiDraft: string;
  microTasks: string[];
  ragaSuggestion?: { name: string; time: string; duration: string };
};

const mockQueue: WeeklySummary[] = [
  {
    id: "w1",
    userName: "Priya S.",
    weekRange: "Oct 6 - Oct 12",
    dominantEmotion: "Anxiety",
    emotionScore: 62,
    status: "pending",
    journals: [
      {
        id: "j1",
        date: "2025-10-06",
        content: "Felt anxious about deadlines.",
        sentiment: "negative",
        shortTag: "work",
      },
      {
        id: "j2",
        date: "2025-10-07",
        content: "Sleep poor, mind racing.",
        sentiment: "negative",
        shortTag: "sleep",
      },
      {
        id: "j3",
        date: "2025-10-09",
        content: "Managed a tough call better than expected.",
        sentiment: "positive",
        shortTag: "wins",
      },
    ],
    aiDraft:
      "This week Priya reported increased worry about work deadlines. Suggest practicing grounding breaths in the evenings and setting a 5PM cutoff for work notifications.",
    microTasks: ["5 minutes box-breathing before bed", "Set 5 PM work cutoff"],
    ragaSuggestion: {
      name: "Darbari Kanada",
      time: "Before sleep",
      duration: "10–20 min",
    },
  },
  {
    id: "w2",
    userName: "Arjun K.",
    weekRange: "Oct 6 - Oct 12",
    dominantEmotion: "Sadness",
    emotionScore: 54,
    status: "pending",
    journals: [
      {
        id: "j4",
        date: "2025-10-06",
        content: "Felt low after family call.",
        sentiment: "negative",
        shortTag: "family",
      },
      {
        id: "j5",
        date: "2025-10-10",
        content: "Tried walking, felt slightly better.",
        sentiment: "neutral",
        shortTag: "coping",
      },
    ],
    aiDraft:
      "Arjun experienced low mood tied to a family conflict. Recommend brief mood-checks each day and progressive scheduling of small pleasurable activities.",
    microTasks: ["Daily 10-min walk", "Write down 1 positive from the day"],
  },
  {
    id: "w3",
    userName: "Maya T.",
    weekRange: "Oct 6 - Oct 12",
    dominantEmotion: "Irritability",
    emotionScore: 45,
    status: "approved",
    journals: [
      {
        id: "j6",
        date: "2025-10-08",
        content: "Short temper at meetings today.",
        sentiment: "negative",
        shortTag: "work",
      },
    ],
    aiDraft:
      "Irritability linked with workload. Suggest short breaks and breath interventions.",
    microTasks: ["2-3 minute pause between meetings"],
  },
];

/* -------------------------
    Page component
    ------------------------- */

export default function PsychologistDashboardPage() {
  const [queue, setQueue] = useState<WeeklySummary[]>(mockQueue);
  const [selectedId, setSelectedId] = useState<string | null>(
    queue.find((q) => q.status === "pending")?.id ?? queue[0]?.id ?? null
  );
  const selected = useMemo(
    () => queue.find((q) => q.id === selectedId) ?? null,
    [queue, selectedId]
  );

  const pendingCount = useMemo(
    () => queue.filter((q) => q.status === "pending").length,
    [queue]
  );

  // simple handlers (update local state)
  function approveSummary(id: string) {
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "approved" } : q))
    );
    // Auto-select next pending after approval
    const nextPending = queue.find(
      (q) => q.status === "pending" && q.id !== id
    );
    setSelectedId(nextPending?.id ?? null);
  }
  function sendBackToAI(id: string, note?: string) {
    setQueue((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status: "sent_back",
              aiDraft:
                (q.aiDraft || "") +
                (`\n\n[SENT BACK: ${new Date().toLocaleDateString()}] ` +
                  (note ?? "Please review tone.")),
            }
          : q
      )
    );
  }
  function flagHighRisk(id: string) {
    // For demo, we'll mark by prefixing title and copy to console
    console.warn("FLAG HIGH RISK for", id);
    setQueue((prev) => prev.map((q) => (q.id === id ? { ...q } : q)));
    // In real app: notify triage, send urgent alert, etc.
  }

  return (
    <>
      <Global />
      <Root>
        <Container>
          {/* SIDEBAR */}
          <Sidebar aria-label="Navigation Sidebar">
            <Profile>
              <Avatar>DM</Avatar>
              <ProfileMeta>
                <SidebarBig>Dr. Mehta</SidebarBig>
                <SidebarSmall>Clinical Psychologist</SidebarSmall>
              </ProfileMeta>
            </Profile>

            <SidebarSmall style={{ marginTop: 8 }}>
              Pending Reviews
            </SidebarSmall>
            <SidebarBig
              style={{
                marginTop: 4,
                color: pendingCount > 0 ? ACCENT_ORANGE : ACCENT_GREEN,
              }}
            >
              {pendingCount}
            </SidebarBig>

            <NavList>
              <NavItem active>
                <Clock size={18} /> Summary Queue
              </NavItem>
              <NavItem>
                <User size={18} /> Patient Profiles
              </NavItem>
              <NavItem>
                <BarChart2 size={18} /> Analytics
              </NavItem>
              <NavItem>
                <Music size={18} /> Raga Assignments
              </NavItem>
              <NavSeparator />
              <NavItem>
                <ChevronLeft size={18} /> Settings
              </NavItem>
              <NavItem style={{ color: "#FF4757" }}>
                <AlertTriangle size={18} style={{ color: "#FF4757" }} /> Logout
              </NavItem>
            </NavList>
          </Sidebar>

          {/* CENTER: QUEUE & CONTENT */}
          <Main>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SectionTitle>Clinical Review Dashboard</SectionTitle>
              <Button $variant="secondary" style={{ padding: "8px 14px" }}>
                <Bell size={18} style={{ color: ACCENT }} /> Notifications
              </Button>
            </div>

            <QueueCard>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  borderBottom: `1px solid ${BORDER}`,
                  paddingBottom: 10,
                }}
              >
                <HelperTitle>Summary Queue</HelperTitle>
                <Button
                  $variant="primary"
                  onClick={() => {
                    const next = queue.find((q) => q.status === "pending");
                    if (next) setSelectedId(next.id);
                  }}
                  disabled={!queue.find((q) => q.status === "pending")}
                >
                  <ChevronRight size={18} /> Open Next Pending
                </Button>
              </div>

              <div>
                {queue.map((q) => (
                  <QueueRow
                    key={q.id}
                    onClick={() => setSelectedId(q.id)}
                    active={q.id === selectedId}
                    layout
                  >
                    <QueueUser>
                      <QueueAvatar>
                        {q.userName
                          .split(" ")
                          .map((s) => s[0])
                          .slice(0, 2)
                          .join("")}
                      </QueueAvatar>

                      <div>
                        <Big style={{ fontWeight: 700, fontSize: 16 }}>
                          {q.userName}
                        </Big>
                        <Small style={{ fontSize: 13, color: SUB }}>
                          {q.weekRange}
                        </Small>
                      </div>
                    </QueueUser>

                    <div
                      style={{ display: "flex", gap: 16, alignItems: "center" }}
                    >
                      <TinyChip
                        tone={
                          q.status === "pending"
                            ? "warning"
                            : q.status === "approved"
                            ? "success"
                            : "muted"
                        }
                      >
                        <StatusIcon status={q.status} />
                        <span style={{ marginLeft: "6px" }}>
                          {q.status.charAt(0).toUpperCase() +
                            q.status.slice(1).replace("_", " ")}
                        </span>
                      </TinyChip>

                      <TinyChip tone="muted">
                        {q.dominantEmotion} ({q.emotionScore}%)
                      </TinyChip>

                      {q.id !== selectedId && (
                        <Button
                          $variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(q.id);
                          }}
                          style={{ minWidth: "90px", padding: "6px 10px" }}
                        >
                          Review
                        </Button>
                      )}
                    </div>
                  </QueueRow>
                ))}
              </div>
            </QueueCard>

            {/* When no selection -> tiny guidance card */}
            {!selected && (
              <HelperCard>
                <HelperTitle>👋 Welcome to your Dashboard</HelperTitle>
                <Small style={{ marginTop: 4, color: SUB }}>
                  Click a user from the **Summary Queue** above or use the
                  **Open Next Pending** button to begin your clinical review of
                  the AI-generated weekly summaries and journals.
                </Small>
              </HelperCard>
            )}
          </Main>

          {/* RIGHT: Review Panel — passes handlers to PsychReviewPanel */}
          <RightCol>
            {/* Action Bar - Simplified and actionable */}
            <HelperCard style={{ padding: "24px" }}>
              <HelperTitle style={{ marginBottom: 16 }}>
                Review Actions
              </HelperTitle>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <Button
                  $variant="primary"
                  onClick={() => selected && approveSummary(selected.id)}
                  disabled={!selected || selected.status === "approved"}
                >
                  <CheckCircle size={18} />
                  {selected?.status === "approved"
                    ? "Approved"
                    : "Approve & Send Micro-Tasks"}
                </Button>
                <Button
                  $variant="secondary"
                  onClick={() => selected && sendBackToAI(selected.id)}
                  disabled={!selected || selected.status !== "pending"}
                >
                  <ChevronLeft size={18} style={{ color: SUB }} />
                  Send Back to AI for Re-draft
                </Button>
                <Button
                  $variant="danger"
                  onClick={() => selected && flagHighRisk(selected.id)}
                  disabled={!selected}
                >
                  <AlertTriangle size={18} />
                  Flag for High-Risk Triage
                </Button>
              </div>
            </HelperCard>

            {/* AI Micro-Tasks Preview */}
            <HelperCard>
              <HelperTitle>AI Micro-Tasks Preview</HelperTitle>
              <ul
                style={{
                  marginTop: 8,
                  color: SUB,
                  listStyleType: "none",
                  paddingLeft: 0,
                }}
              >
                {selected?.microTasks.length ? (
                  selected.microTasks.map((task, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <CheckCircle size={14} color={ACCENT_GREEN} />
                      <Small style={{ color: TEXT, fontWeight: 500 }}>
                        {task}
                      </Small>
                    </li>
                  ))
                ) : (
                  <Small>
                    No tasks currently generated by AI for this summary.
                  </Small>
                )}
              </ul>
            </HelperCard>

            {/* Raga Therapy Widget */}
            <HelperCard>
              <HelperTitle>Rāga Therapy</HelperTitle>
              {selected?.ragaSuggestion ? (
                <>
                  <Small
                    style={{ marginBottom: 8, fontWeight: 600, color: TEXT }}
                  >
                    Suggested Raga: {selected.ragaSuggestion.name}
                  </Small>
                  <Small style={{ marginBottom: 12 }}>
                    Use: {selected.ragaSuggestion.time} (
                    {selected.ragaSuggestion.duration})
                  </Small>
                  <Button
                    $variant="secondary"
                    style={{ width: "100%", justifyContent: "flex-start" }}
                  >
                    <Music size={16} style={{ color: ACCENT }} /> Assign to
                    Music Therapist
                  </Button>
                </>
              ) : (
                <>
                  <Small style={{ marginBottom: 12 }}>
                    No specific Raga suggestion generated this week.
                  </Small>
                  <SecondaryActionLink href="/raga-assign">
                    Manually Assign Rāga →
                  </SecondaryActionLink>
                </>
              )}
            </HelperCard>
          </RightCol>
        </Container>

        {/* Full-width review panel below container for smaller screens */}
        <div style={{ width: "100%", maxWidth: 1300, marginTop: 24 }}>
          {/* Render the review panel (if selected) — it is a full-featured component */}
          {selected ? (
            <PsychReviewPanel
              summary={selected}
              onApprove={(id) => approveSummary(id)}
              onSendBack={(id, note) => sendBackToAI(id, note)}
              onFlagHighRisk={(id) => flagHighRisk(id)}
            />
          ) : null}
        </div>
      </Root>
    </>
  );
}
