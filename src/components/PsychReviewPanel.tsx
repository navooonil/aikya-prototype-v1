// src/components/PsychReviewPanel.tsx
"use client";

import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  CheckCircle,
  CornerUpLeft,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

/**
 * PsychReviewPanel
 *
 * Props:
 * - summary: WeeklySummary (see page mock)
 * - onApprove(id)
 * - onSendBack(id, note)
 * - onFlagHighRisk(id)
 *
 * Shows:
 * - top user header (week, status)
 * - AI Draft (editable area)
 * - Journals list (expandable)
 * - Psych notes area
 * - Decision buttons (Approve / Send back / Flag)
 */

const SURFACE = "#FFFFFF";
const BORDER = "#E5EEF0";
const TEXT = "#1E3A40";
const SUB = "#476B7F";
const ACCENT = "#6BC5C5";
const ACCENT2 = "#7DB0FF";

const PanelRoot = styled(motion.div)`
  margin: 20px auto 40px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 1), #fbfdff);
  border: 1px solid ${BORDER};
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 18px 40px rgba(12, 18, 22, 0.06);
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 18px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 20px;
  color: ${TEXT};
`;

const Meta = styled.div`
  color: ${SUB};
  font-size: 13px;
`;

const Section = styled.div`
  background: ${SURFACE};
  border-radius: 12px;
  padding: 12px;
  border: 1px solid ${BORDER};
  margin-bottom: 12px;
`;

const JournalRow = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #fbfdff;
  border: 1px solid ${BORDER};
  margin-bottom: 8px;
`;

const Button = styled.button<{ primary?: boolean }>`
  background: ${(p) => (p.primary ? ACCENT : "transparent")};
  color: ${(p) => (p.primary ? "white" : TEXT)};
  border: ${(p) => (p.primary ? "none" : `1px solid ${BORDER}`)};
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
`;

/* PsychReviewPanel props types (mirrors page) */
type JournalEntry = {
  id: string;
  date: string;
  content: string;
  sentiment?: string;
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

type Props = {
  summary: WeeklySummary;
  onApprove: (id: string) => void;
  onSendBack: (id: string, note?: string) => void;
  onFlagHighRisk: (id: string) => void;
};

export default function PsychReviewPanel({
  summary,
  onApprove,
  onSendBack,
  onFlagHighRisk,
}: Props) {
  const [aiText, setAiText] = useState<string>(summary.aiDraft || "");
  const [psychNotes, setPsychNotes] = useState<string>("");
  const [showAllJournals, setShowAllJournals] = useState<boolean>(false);
  const [flag, setFlag] = useState<"none" | "low" | "checkin" | "high">("none");

  const recentJournals = useMemo(
    () =>
      summary.journals.slice(0, showAllJournals ? summary.journals.length : 7),
    [summary, showAllJournals]
  );

  function handleApprove() {
    onApprove(summary.id);
  }

  function handleSendBack() {
    onSendBack(summary.id, psychNotes || "Please refine empathy / context.");
  }

  function handleFlagHigh() {
    setFlag("high");
    onFlagHigh(summary.id);
  }

  return (
    <PanelRoot
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* LEFT: content */}
      <div>
        <Header>
          <div>
            <Title>{summary.userName}</Title>
            <Meta>
              {summary.weekRange} • Dominant: {summary.dominantEmotion} (
              {summary.emotionScore}%)
            </Meta>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: SUB }}>Status</div>
              <div style={{ fontWeight: 800 }}>
                {summary.status.toUpperCase()}
              </div>
            </div>
          </div>
        </Header>

        {/* AI Draft */}
        <Section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 800 }}>AI Summary Draft</div>
            <div style={{ color: SUB, fontSize: 13 }}>
              {summary.journals.length} journal(s) analyzed
            </div>
          </div>

          <textarea
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
            rows={6}
            style={{
              width: "100%",
              marginTop: 10,
              padding: 12,
              borderRadius: 10,
              border: `1px solid ${BORDER}`,
              fontSize: 14,
              color: TEXT,
            }}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <Button
              onClick={() => {
                setAiText(summary.aiDraft);
              }}
            >
              Reset
            </Button>
            <Button onClick={handleSendBack}>
              <CornerUpLeft size={14} /> Send back to AI
            </Button>
            <Button primary onClick={handleApprove}>
              <CheckCircle size={14} /> Approve
            </Button>
          </div>
        </Section>

        {/* Journals list */}
        <Section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 800 }}>Journals (last 7 days)</div>
            <div style={{ color: SUB, fontSize: 13 }}>
              {summary.journals.length}
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            {recentJournals.map((j) => (
              <JournalRow key={j.id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{j.date}</div>
                    <div style={{ color: SUB, fontSize: 14, marginTop: 6 }}>
                      {j.content}
                    </div>
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                      <span
                        style={{
                          background: "#EFF8F7",
                          color: "#0E3634",
                          padding: "4px 8px",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      >
                        {j.shortTag ?? "note"}
                      </span>
                      <span style={{ fontSize: 12, color: SUB }}>
                        {j.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              </JournalRow>
            ))}

            {summary.journals.length > recentJournals.length && (
              <div style={{ marginTop: 8 }}>
                <button
                  onClick={() => setShowAllJournals((s) => !s)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: ACCENT,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {showAllJournals
                    ? "Show less"
                    : `Show all (${summary.journals.length})`}
                </button>
              </div>
            )}
          </div>
        </Section>

        {/* Psych Notes */}
        <Section>
          <div style={{ fontWeight: 800 }}>Psychologist Notes</div>
          <div style={{ color: SUB, fontSize: 13, marginTop: 8 }}>
            Add your clinical context, edits, and safety planning. These notes
            are private to clinicians.
          </div>

          <textarea
            value={psychNotes}
            onChange={(e) => setPsychNotes(e.target.value)}
            rows={4}
            placeholder="Refine the wording, add guidance, or flag anything concerning..."
            style={{
              width: "100%",
              marginTop: 10,
              padding: 12,
              borderRadius: 10,
              border: `1px solid ${BORDER}`,
              fontSize: 14,
              color: TEXT,
            }}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <Button
              onClick={() => {
                setPsychNotes("");
              }}
            >
              Clear
            </Button>
            <Button onClick={() => onSendBack(summary.id, psychNotes)}>
              Send Feedback to AI
            </Button>
            <Button
              primary
              onClick={() => {
                onApprove(summary.id);
              }}
            >
              Approve Summary
            </Button>
            <Button
              onClick={() => {
                setFlag("checkin");
              }}
            >
              Recommend Check-in
            </Button>
            <Button
              style={{ background: "#FF8A87", color: "#fff" }}
              onClick={() => {
                handleFlagHigh();
              }}
            >
              <AlertTriangle size={14} /> Flag High
            </Button>
          </div>
        </Section>
      </div>

      {/* RIGHT: compact summary, tasks, raga */}
      <div>
        <Section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 800 }}>Quick Snapshot</div>
            <div style={{ color: SUB, fontSize: 13 }}>{summary.status}</div>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 14, color: SUB }}>Dominant emotion</div>
            <div style={{ fontWeight: 800, marginTop: 6 }}>
              {summary.dominantEmotion} • {summary.emotionScore}%
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 14, color: SUB }}>
                Suggested micro-tasks
              </div>
              <ul style={{ marginTop: 8 }}>
                {summary.microTasks.map((m, idx) => (
                  <li key={idx} style={{ marginTop: 6, color: TEXT }}>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {summary.ragaSuggestion && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 14, color: SUB }}>Rāga suggestion</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>
                  {summary.ragaSuggestion.name}
                </div>
                <div style={{ color: SUB, marginTop: 6 }}>
                  Best time: {summary.ragaSuggestion.time} • Duration:{" "}
                  {summary.ragaSuggestion.duration}
                </div>
                <div style={{ marginTop: 8 }}>
                  <Button
                    primary
                    onClick={() => {
                      alert("Open raga player (placeholder)");
                    }}
                  >
                    <MessageSquare size={14} /> Listen now
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Section>

        <Section>
          <div style={{ fontWeight: 800 }}>Risk & Triage</div>
          <div style={{ color: SUB, marginTop: 8 }}>
            Mark any immediate concerns below. High-risk triggers an alert to
            triage team (demo only).
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                setFlag("low");
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: `1px solid ${BORDER}`,
                background: flag === "low" ? "#FFF8E6" : "transparent",
                cursor: "pointer",
              }}
            >
              Low
            </button>
            <button
              onClick={() => {
                setFlag("checkin");
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: `1px solid ${BORDER}`,
                background: flag === "checkin" ? "#FFF6F0" : "transparent",
                cursor: "pointer",
              }}
            >
              Check-in
            </button>
            <button
              onClick={() => {
                handleFlagHigh();
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: `1px solid ${BORDER}`,
                background: flag === "high" ? "#ffecec" : "transparent",
                cursor: "pointer",
                color: "#b62b2b",
              }}
            >
              High Risk
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <Button
              onClick={() => onFlagHigh(summary.id)}
              style={{ background: "#FF8A87", color: "#fff" }}
            >
              Send urgent alert
            </Button>
          </div>
        </Section>

        <Section>
          <div style={{ fontWeight: 800 }}>Audit</div>
          <div style={{ color: SUB, marginTop: 8, fontSize: 13 }}>
            You can save this review as part of the clinician audit trail (not
            implemented in demo).
          </div>
          <div style={{ marginTop: 10 }}>
            <Button
              onClick={() => {
                alert("Saved to audit (placeholder)");
              }}
            >
              Save review
            </Button>
          </div>
        </Section>
      </div>
    </PanelRoot>
  );
}
