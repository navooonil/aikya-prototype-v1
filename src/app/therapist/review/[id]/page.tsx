"use client";

import styled from "styled-components";
import Link from "next/link";
import { ArrowLeft, Check, Heart, Music, CornerUpLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------
   🎨 AIKYA THERAPIST THEME — DARK + SAFFRON HIGHLIGHTS
-------------------------------------------------------- */

const BG = "#141B29"; // Slightly softer than #171F32 for eye comfort
const CARD = "#1C2636"; // Dark card but less harsh
const CARD_ELEVATED = "#202C3D"; // Slight elevation
const TEXT = "#EEF3F7";
const SUB = "rgba(238, 243, 247, 0.65)";
const BORDER = "rgba(238, 243, 247, 0.08)";

const ACCENT = "#FFC043"; // Softer gold (more premium)
const ACCENT_DEEP = "#FFB800"; // Saffron glow
const DANGER = "#E57373";

/* -------------------------------------------------------
   SIDEBAR — Clean, Calm, Minimal
-------------------------------------------------------- */

const Sidebar = styled.aside`
  width: 260px;
  background: linear-gradient(180deg, #151d2a, #101624);
  padding: 24px 20px;
  border-radius: 18px;
  height: fit-content;
  position: sticky;
  top: 24px;
  color: ${TEXT};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
`;

const SidebarLabel = styled.div`
  color: ${SUB};
  font-size: 13px;
`;

const SidebarCode = styled.div`
  margin-top: 4px;
  font-weight: 800;
  font-size: 18px;
  color: ${ACCENT};
`;

/* -------------------------------------------------------
   MAIN WRAPPER
-------------------------------------------------------- */

const Wrapper = styled.div`
  display: flex;
  gap: 28px;
  padding: 28px;
  background: ${BG};
  min-height: 100vh;
  max-width: 1380px;
  margin: 0 auto;
`;

/* -------------------------------------------------------
   HEADER
-------------------------------------------------------- */

const HeaderTop = styled.div`
  margin-bottom: 24px;
`;

const Back = styled(Link)`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: ${ACCENT};
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    opacity: 0.85;
  }
`;

const Title = styled.h1`
  margin: 12px 0 0;
  color: ${TEXT};
  font-size: 28px;
  font-weight: 800;
`;

/* -------------------------------------------------------
   EMOTION SUMMARY CARD
-------------------------------------------------------- */

const SummaryCard = styled.div`
  background: ${CARD};
  border-radius: 18px;
  padding: 24px;
  border: 1px solid ${BORDER};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  height: fit-content;
`;

const SummaryHeader = styled.h2`
  font-size: 18px;
  color: ${TEXT};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
`;

const SummaryItem = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${BORDER};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SummaryLabel = styled.div`
  font-size: 13px;
  color: ${SUB};
  margin-bottom: 4px;
`;

const SummaryValue = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${TEXT};
`;

/* -------------------------------------------------------
   RAGA SELECTION
-------------------------------------------------------- */

const RagaCard = styled(motion.div)`
  padding: 20px;
  background: ${CARD_ELEVATED};
  border-radius: 16px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);

  border: 2px solid ${(p) => (p.$active ? p.$color : BORDER)};

  &:hover {
    transform: translateY(-2px);
  }
`;

const RagaTitle = styled.div`
  color: ${TEXT};
  font-weight: 700;
  font-size: 17px;
  margin-bottom: 6px;
`;

const RagaSubtitle = styled.div`
  font-size: 14px;
  color: ${SUB};
`;

/* -------------------------------------------------------
   FORM SECTION
-------------------------------------------------------- */

const FormSection = styled(motion.form)`
  background: ${CARD};
  padding: 26px;
  border-radius: 18px;
  border: 1px solid ${BORDER};
  margin-top: 32px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.3);
`;

const Label = styled.label`
  color: ${SUB};
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 10px;
  background: ${BG};
  border: 1px solid ${BORDER};
  color: ${TEXT};

  &:focus {
    border-color: ${ACCENT_DEEP};
  }
`;

const Select = styled(Input).attrs({ as: "select" })`
  cursor: pointer;
`;

const TextArea = styled(Input).attrs({ as: "textarea" })`
  min-height: 110px;
  resize: vertical;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 22px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background: ${(p) => (p.$primary ? ACCENT_DEEP : DANGER)};
  color: ${BG};
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

/* -------------------------------------------------------
   MOCK RAGA DATA — Now more premium
-------------------------------------------------------- */

const ragaList = [
  {
    id: "r1",
    emoji: "🌙",
    name: "Darbari Kanada",
    subtitle: "Deep anxiety healing",
    color: "#9BB4F0",
  },
  {
    id: "r2",
    emoji: "🌄",
    name: "Bhairavi",
    subtitle: "Emotional release",
    color: "#FFC043",
  },
  {
    id: "r3",
    emoji: "✨",
    name: "Yaman",
    subtitle: "Evening calm & uplift",
    color: "#FFD75E",
  },
  {
    id: "r4",
    emoji: "🌱",
    name: "Bhupali",
    subtitle: "Grounding & clarity",
    color: "#6AD68F",
  },
];

/* -------------------------------------------------------
   MAIN COMPONENT
-------------------------------------------------------- */

export default function TherapistReviewPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({
    duration: "20",
    timing: "Night (9 PM - 12 AM)",
    type: "Active listening",
    notes: "",
  });

  const chosen = useMemo(
    () => ragaList.find((r) => r.id === selected),
    [selected]
  );

  return (
    <Wrapper>
      <Sidebar>
        <SidebarLabel>Reviewing Assignment</SidebarLabel>
        <SidebarCode>USR-4092</SidebarCode>
      </Sidebar>

      <div style={{ flex: 1 }}>
        {/* HEADER */}
        <HeaderTop>
          <Back href="/therapist">
            <ArrowLeft size={16} /> Back to Assignments
          </Back>
          <Title>Reviewing Assignment: USR-4092</Title>
        </HeaderTop>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 24,
          }}
        >
          {/* LEFT — Emotion Summary */}
          <SummaryCard>
            <SummaryHeader>
              <Heart size={20} color="#FF8C4A" /> User Emotional Pattern
            </SummaryHeader>

            <SummaryItem>
              <SummaryLabel>Dominant Emotion</SummaryLabel>
              <SummaryValue>Anxiety & Rumination</SummaryValue>
            </SummaryItem>

            <SummaryItem>
              <SummaryLabel>Intensity</SummaryLabel>
              <SummaryValue style={{ color: "#FF8C4A" }}>
                High (75%)
              </SummaryValue>
            </SummaryItem>

            <SummaryItem>
              <SummaryLabel>Primary Triggers</SummaryLabel>
              <SummaryValue style={{ color: SUB }}>
                Night-time stress • Work pressure
              </SummaryValue>
            </SummaryItem>

            <SummaryItem>
              <SummaryLabel>Logged On</SummaryLabel>
              <SummaryValue>Feb 20, 2024</SummaryValue>
            </SummaryItem>
          </SummaryCard>

          {/* RIGHT — Raga Selection */}
          <div>
            <h2
              style={{
                color: TEXT,
                fontSize: 18,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Music size={20} color={ACCENT} /> Select Rāga Prescription
            </h2>

            <p style={{ color: SUB, marginBottom: 18 }}>
              Choose the rāga that best counterbalances the emotional signature.
            </p>

            <div
              style={{
                display: "grid",
                gap: 18,
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              }}
            >
              {ragaList.map((r) => (
                <RagaCard
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  $active={selected === r.id}
                  $color={r.color}
                >
                  <div style={{ fontSize: 28 }}>{r.emoji}</div>
                  <RagaTitle>{r.name}</RagaTitle>
                  <RagaSubtitle>{r.subtitle}</RagaSubtitle>
                </RagaCard>
              ))}
            </div>
          </div>
        </div>

        {/* FORM */}
        {chosen && (
          <FormSection
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Assigned ${chosen.name} successfully.`);
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2
              style={{
                color: TEXT,
                fontSize: 18,
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Check size={20} color={ACCENT} /> Finalize Prescription:
              {chosen.name}
            </h2>

            <FormGrid>
              <InputGroup>
                <Label>Duration (Minutes)</Label>
                <Input
                  type="number"
                  min="5"
                  max="60"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup>
                <Label>Optimal Timing</Label>
                <Select
                  value={form.timing}
                  onChange={(e) => setForm({ ...form, timing: e.target.value })}
                >
                  <option>Dawn (4–7 AM)</option>
                  <option>Morning (7–12 PM)</option>
                  <option>Evening (4–8 PM)</option>
                  <option>Night (9–12 AM)</option>
                </Select>
              </InputGroup>

              <InputGroup>
                <Label>Listening Type</Label>
                <Select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option>Active listening</option>
                  <option>Passive ambient listening</option>
                  <option>Focused meditation</option>
                </Select>
              </InputGroup>
            </FormGrid>

            <InputGroup>
              <Label>Therapist Notes (Optional)</Label>
              <TextArea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g. Focus on the vilambit intro to settle racing thoughts…"
              />
            </InputGroup>

            <Actions>
              <Button onClick={() => setSelected(null)}>
                <CornerUpLeft size={18} /> Change Rāga
              </Button>

              <Button $primary type="submit">
                <Check size={18} /> Assign Rāga to User
              </Button>
            </Actions>
          </FormSection>
        )}
      </div>
    </Wrapper>
  );
}
