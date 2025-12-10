// src/app/raga/page.tsx
"use client";
import styled from "styled-components";
// import Card from "@/components/Card"; // Assuming this Card uses the new theme styles

/* --------------------------
    DESIGN TOKENS - CALM, EARTHY LIGHT THEME
--------------------------- */
const BG = "#F8FDFE";
const CARD = "#FFFFFF";
const TEXT = "#2C3E50";
const SUB = "#6C839F";
const ACCENT = "#3A98B9";
const ACCENT2 = "#64A77C";
const BORDER = "#E0E9F0";

/* --------------------------
    SIMULATED STYLED COMPONENTS (Replacing simple Card/Page styles)
--------------------------- */

const Page = styled.div`
  padding: 40px 24px; /* Increased padding */
  min-height: 100vh;
  background: ${BG};
  display: flex;
  justify-content: center;
`;

// Placeholder for the imported Card component's styles
const StyledCard = styled.div`
  background: ${CARD};
  border-radius: 20px;
  padding: 30px;
  border: 1px solid ${BORDER};
  box-shadow: 0 20px 50px rgba(44, 62, 80, 0.08);
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h2`
  color: ${SUB};
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const RāgaName = styled.h3`
  margin: 6px 0 16px 0;
  font-size: 28px;
  font-weight: 800;
  color: ${ACCENT}; /* Highlight the raga name with primary accent */
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlayButton = styled.button`
  background: ${ACCENT2}; /* Using secondary accent (Sage Green) for Play action */
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 14px; /* Softer corners */
  font-weight: 700;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 15px ${ACCENT2}40;

  &:hover {
    box-shadow: 0 10px 20px ${ACCENT2}60;
    transform: translateY(-2px);
    background: #509769; /* Slightly darker green on hover */
  }
`;

export default function RagaPage() {
  const mock = {
    ragaName: "Bhimpalasi",
    mood: "Soothing Dusk Rāga",
    instructions:
      "Listen for 10 minutes in a quiet, dim space. Focus on slow, intentional breathing to calm the nervous system.",
    timeOfDay: "Evening",
  };

  return (
    <Page>
      <StyledCard>
        {" "}
        {/* Using StyledCard placeholder */}
        <Title>Your Healing Prescription</Title>
        <RāgaName>
          <span style={{ fontSize: 32, fontWeight: 900 }}>🎶</span>{" "}
          {mock.ragaName}
        </RāgaName>
        <p style={{ color: TEXT, fontWeight: 600, fontSize: 18, marginTop: 0 }}>
          {mock.mood}
        </p>
        <p
          style={{
            color: SUB,
            fontSize: 15,
            borderLeft: `4px solid ${ACCENT2}80`,
            paddingLeft: 12,
            margin: "20px 0",
          }}
        >
          **Instructions:** {mock.instructions}
        </p>
        <p style={{ color: SUB, fontSize: 14 }}>
          **Recommended Time:** {mock.timeOfDay}
        </p>
        <PlayButton>Play Rāga (mock)</PlayButton>
      </StyledCard>
    </Page>
  );
}
