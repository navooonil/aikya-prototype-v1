// src/app/dashboard/weekly-summary/page.tsx
"use client";

import React from "react";
import styled from "styled-components";
import { ArrowLeft, TrendingUp, Sparkles, Music, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BG = "#F4F8F9";
const CARD = "#FFFFFF";
const TEXT = "#1E3A40";
const SUB = "#476B7F";
const ACCENT = "#6BC5C5";
const BORDER = "#E5EEF0";

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${BG};
  padding: 40px 20px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Card = styled(motion.div)`
  background: ${CARD};
  border-radius: 20px;
  padding: 24px;
  border: 1px solid ${BORDER};
  box-shadow: 0 16px 40px rgba(15, 34, 46, 0.06);
`;

export default function WeeklySummary() {
  const router = useRouter();

  return (
    <Page>
      <Container>
        {/* Back */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            color: SUB,
            width: "max-content",
          }}
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </div>

        {/* Title */}
        <div>
          <h1 style={{ margin: "10px 0 0", color: TEXT }}>
            Your Weekly Emotional Summary
          </h1>
          <p style={{ color: SUB, marginTop: 4 }}>
            Feb 10 – Feb 16 • Reviewed by a psychologist
          </p>
        </div>

        {/* 1 — EMOTIONAL BREAKDOWN */}
        <Card>
          <h3 style={{ margin: 0, color: TEXT }}>Dominant Emotions</h3>

          <div style={{ marginTop: 16, display: "flex", gap: 20 }}>
            <div>
              <div style={{ fontSize: 28 }}>😟</div>
              <strong>Anxiety • 62%</strong>
            </div>
            <div>
              <div style={{ fontSize: 28 }}>🙂</div>
              <strong>Calm • 22%</strong>
            </div>
            <div>
              <div style={{ fontSize: 28 }}>😐</div>
              <strong>Neutral • 16%</strong>
            </div>
          </div>

          <p style={{ marginTop: 12, color: SUB }}>
            Your emotional landscape softened mid-week and stabilized by the
            weekend.
          </p>
        </Card>

        {/* 2 — TRENDS */}
        <Card>
          <h3 style={{ margin: 0, color: TEXT, display: "flex", gap: 8 }}>
            <TrendingUp /> Emotional Trend
          </h3>

          <div
            style={{
              height: 150,
              marginTop: 16,
              background: "#FBFDFE",
              borderRadius: 14,
              border: `1px solid ${BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Graph Mock */}
            <svg width="100%" height="100%" viewBox="0 0 100 50">
              <polyline
                points="0,40 20,32 40,34 60,20 80,28 100,18"
                fill="none"
                stroke={ACCENT}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Card>

        {/* 3 — TRIGGERS */}
        <Card>
          <h3 style={{ margin: 0, color: TEXT }}>Most Common Triggers</h3>

          <ul style={{ marginTop: 12, color: SUB, lineHeight: 1.6 }}>
            <li>📌 Work deadlines after 9 PM</li>
            <li>📌 Feeling behind peers</li>
            <li>📌 Overthinking future responsibilities</li>
          </ul>
        </Card>

        {/* 4 — BRIGHT SPOTS */}
        <Card>
          <h3
            style={{
              margin: 0,
              color: TEXT,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Sparkles /> Your Bright Spots
          </h3>

          <ul style={{ marginTop: 12, color: SUB, lineHeight: 1.6 }}>
            <li>You handled stress faster than previous weeks.</li>
            <li>You identified your triggers clearly in your writing.</li>
            <li>You took breaks before overwhelm hit — huge progress.</li>
          </ul>
        </Card>

        {/* 5 — WEEKLY AI SUMMARY */}
        <Card>
          <h3 style={{ margin: 0, color: TEXT }}>Your Weekly Reflection</h3>

          <p style={{ marginTop: 12, color: SUB, lineHeight: 1.7 }}>
            “This week shows a thoughtful effort toward emotional regulation.
            Even during moments of anxiety, you consistently showed awareness
            and made space for grounding yourself. Your patterns suggest
            fatigue-related stress, not lack of ability.”
          </p>
        </Card>

        {/* 6 — RAGA */}
        <Card>
          <h3
            style={{
              margin: 0,
              color: TEXT,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Music /> Your Healing Rāga
          </h3>

          <div style={{ marginTop: 12 }}>
            <strong>🎧 Darbari Kanada</strong>
            <p style={{ color: SUB, marginTop: 6 }}>
              A deep, night rāga crafted to reduce mental agitation and bring
              slow emotional decompression.
            </p>

            <p style={{ color: SUB }}>
              Best time: <strong>10 PM</strong>
              <br />
              Duration: <strong>10–20 minutes</strong>
            </p>

            <button
              style={{
                marginTop: 10,
                padding: "10px 20px",
                borderRadius: 999,
                border: "none",
                background: ACCENT,
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Listen Now →
            </button>
          </div>
        </Card>

        {/* 7 — PSYCHOLOGIST NOTES */}
        <Card>
          <h3 style={{ margin: 0, color: TEXT }}>
            Notes from Your Psychologist
          </h3>

          <p style={{ marginTop: 10, color: SUB, lineHeight: 1.6 }}>
            “Your progress is visible — especially the way you pause and check
            in with yourself. Continue anchoring yourself before taking on new
            tasks. You're building emotional muscle.”
          </p>
        </Card>
      </Container>
    </Page>
  );
}
