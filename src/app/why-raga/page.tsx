// src/app/why-raga/page.tsx
"use client";

import styled from "styled-components";
import { Zap, Heart, Moon, Wind, Music, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
    MOCK DATA (Consistent with Dashboard)
--------------------------- */
const RAGA_DATA = {
  ragaName: "Darbari Kanada",
  mood: "Night Rāga for calming the mind",
  emotionalNeed: "To alleviate restlessness and promote deep relaxation.",
  traditionalEffect:
    "Vairagya (Detachment) and Shanti (Peace). Historically played in royal courts late at night to calm the mind after a long day.",
  whyYouNeedIt:
    "Your recent journal entries showed signs of high cognitive load and difficulty unwinding in the evening. This rāga is specifically chosen to slow down beta brain waves and encourage a meditative state, improving sleep onset.",
  chakra: "Ajna (Third Eye)",
};

/* --------------------------
    STYLED COMPONENTS
--------------------------- */

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${BG};
  display: flex;
  justify-content: center;
  padding: 40px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${ACCENT};
  font-weight: 600;
  margin-bottom: 20px;
`;

const MainCard = styled(motion.div)`
  background: ${CARD};
  border-radius: 20px;
  padding: 35px;
  border: 1px solid ${BORDER};
  box-shadow: 0 20px 50px rgba(44, 62, 80, 0.08);
`;

const TitleBlock = styled.div`
  border-bottom: 1px solid ${BORDER};
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const RagaHeading = styled.h1`
  font-size: 36px;
  font-weight: 900;
  color: ${ACCENT};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${TEXT};
  margin: 30px 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const FactItem = styled.div`
  background: #e8f5ff; /* Light blue tint */
  padding: 18px;
  border-radius: 12px;
  border: 1px solid ${ACCENT}20;
`;

const FactIcon = styled.div`
  color: ${ACCENT};
  margin-bottom: 8px;
`;

const FactLabel = styled.p`
  font-weight: 700;
  color: ${TEXT};
  margin: 0 0 4px 0;
  font-size: 15px;
`;

const FactValue = styled.p`
  color: ${SUB};
  margin: 0;
  font-size: 14px;
`;

export default function WhyRagaPage() {
  return (
    <Page>
      <Container>
        <BackLink href="/dashboard">
          <ArrowLeft size={18} /> Back to Dashboard
        </BackLink>
        <MainCard
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <TitleBlock>
            <RagaHeading>
              <Music size={36} /> {RAGA_DATA.ragaName}
            </RagaHeading>
            <p style={{ color: SUB, marginTop: 8, fontSize: 18 }}>
              Understanding your therapeutic musical prescription.
            </p>
          </TitleBlock>

          {/* Section 1: The Prescription */}
          <SectionTitle>
            <Zap color={ACCENT} size={24} /> Why This Rāga Was Chosen For You
          </SectionTitle>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: TEXT }}>
            Based on your recent journal entries and emotional data profile,
            your system identified a need to **downregulate the nervous system**
            and address **cognitive overload**.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: ACCENT2,
              fontWeight: 700,
              borderLeft: `4px solid ${ACCENT2}`,
              paddingLeft: 15,
            }}
          >
            **Therapeutic Goal:** {RAGA_DATA.emotionalNeed}
          </p>
          <p
            style={{ fontSize: 16, lineHeight: 1.6, color: SUB, marginTop: 20 }}
          >
            {RAGA_DATA.whyYouNeedIt}
          </p>

          {/* Section 2: Rāga Properties */}
          <SectionTitle>
            <Heart color={ACCENT2} size={24} /> The Science of Darbari Kanada
          </SectionTitle>

          <FactGrid>
            <FactItem>
              <FactIcon>
                <Moon size={24} />
              </FactIcon>
              <FactLabel>Traditional Time</FactLabel>
              <FactValue>Late Night (10 PM – 2 AM)</FactValue>
            </FactItem>
            <FactItem>
              <FactIcon>
                <Wind size={24} />
              </FactIcon>
              <FactLabel>Key Emotion (Rasa)</FactLabel>
              {/* CORRECTED LINE 178 */}
              <FactValue>Karuna (Pathos/Compassion)</FactValue>
            </FactItem>
            <FactItem>
              <FactIcon>
                <Music size={24} />
              </FactIcon>
              <FactLabel>Signature Movement</FactLabel>
              <FactValue>
                Andolan (Oscillations) on key notes, creating a profound, heavy,
                and calming effect.
              </FactValue>
            </FactItem>
            <FactItem>
              <FactIcon>
                <Zap size={24} />
              </FactIcon>
              <FactLabel>Associated Chakra</FactLabel>
              <FactValue>
                {RAGA_DATA.chakra} (Promotes intuition and insight)
              </FactValue>
            </FactItem>
          </FactGrid>

          <SectionTitle>💡 Your Guided Practice</SectionTitle>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: TEXT }}>
            {RAGA_DATA.traditionalEffect}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: SUB }}>
            Find a comfortable, distraction-free space. You don't need to
            'listen' actively, just allow the music to wash over you. The effect
            is cumulative.
          </p>
        </MainCard>
      </Container>
    </Page>
  );
}
