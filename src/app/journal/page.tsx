// src/app/journal/page.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Send, BookOpen, MessageCircle, Sparkles } from "lucide-react";

/* --------------------------
    DESIGN TOKENS - CALM, EARTHY LIGHT THEME
--------------------------- */
const BG = "#F8FDFE"; // Very Light Background
const CARD = "#FFFFFF"; // Card Surface
const TEXT = "#2C3E50"; // Dark Blue/Gray Text
const SUB = "#6C839F"; // Muted Blue-Gray Subtext
const ACCENT = "#3A98B9"; // Muted Sky Blue (Primary Action/Highlight)
const ACCENT2 = "#64A77C"; // Soft Sage Green (Secondary/Reflection)
const BORDER = "#E0E9F0"; // Subtle Border

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
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Card = styled(motion.div)`
  background: ${CARD};
  border-radius: 20px;
  padding: 28px; /* Increased padding */
  border: 1px solid ${BORDER};
  box-shadow: 0 20px 50px rgba(44, 62, 80, 0.08); /* Enhanced Shadow */
`;

const Title = styled.h2`
  margin: 0;
  font-size: 28px; /* Slightly larger title */
  font-weight: 800;
  color: ${TEXT};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 180px;
  margin-top: 20px; /* Increased margin */
  padding: 18px;
  font-size: 16px;
  border-radius: 14px; /* Softer corners */
  border: 1px solid ${BORDER};
  resize: none;
  outline: none;
  font-family: Inter, system-ui, sans-serif;
  color: ${TEXT};
  background: ${BG}; /* Use light BG for contrast against white card */
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${ACCENT};
    box-shadow: 0 0 0 3px ${ACCENT}30; /* Softer focus ring */
  }
`;

const PrimaryBtn = styled.button`
  background: ${ACCENT};
  color: white;
  padding: 12px 24px; /* Larger button */
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px; /* Increased margin */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 8px 15px ${ACCENT}40;

  &:hover {
    background: ${ACCENT};
    box-shadow: 0 10px 20px ${ACCENT}60;
    transform: translateY(-1px);
  }
`;

const ReflectionBox = styled(motion.div)`
  background: #f3fcf6; /* Light green tint using ACCENT2 for calm reflection */
  border: 1px solid ${ACCENT2}40;
  padding: 20px;
  border-radius: 14px;
  margin-top: 25px; /* Increased margin */
`;

const ChatBox = styled.div`
  background: ${BG}; /* Chat background uses BG for distinction */
  border-radius: 16px;
  border: 1px solid ${BORDER};
  padding: 16px;
  margin-top: 15px;
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ChatInputWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${BORDER};
  font-size: 15px;
  outline: none;
  color: ${TEXT};
  background: ${CARD}; /* Input uses white card background */
  transition: border-color 0.2s;
  &:focus {
    border-color: ${ACCENT};
    box-shadow: 0 0 0 2px ${ACCENT}30;
  }
`;

const ChatSend = styled.button`
  background: ${ACCENT};
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #2a7996;
  }
`;

const Message = styled.div<{ user?: boolean }>`
  padding: 12px 16px;
  border-radius: 18px; /* More modern, softer corners */
  max-width: 85%;
  margin-bottom: 10px;
  line-height: 1.4;
  font-size: 15px;

  /* User Message (ACCENT) */
  background: ${({ user }) => (user ? ACCENT : "#EEF4F6")};
  color: ${({ user }) => (user ? "white" : TEXT)};
  margin-left: ${({ user }) => (user ? "auto" : "0")};

  /* Ensure AI message has a distinct border-radius on the corners */
  border-bottom-left-radius: ${({ user }) => (user ? "18px" : "4px")};
  border-bottom-right-radius: ${({ user }) => (user ? "4px" : "18px")};
`;

const JournalHistoryEntry = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${BORDER};
  &:last-child {
    border-bottom: none;
  }
`;

/* --------------------------
    MOCK STATE
--------------------------- */

interface JournalEntry {
  text: string;
  timestamp: string;
}

export default function JournalPage() {
  const [journalText, setJournalText] = useState("");
  const [savedJournals, setSavedJournals] = useState<JournalEntry[]>([]);
  const [reflection, setReflection] = useState<string | null>(null);

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { from: "user" | "ai"; text: string }[]
  >([]);

  /* --------------------------
      SAVE JOURNAL
  --------------------------- */
  const saveJournal = () => {
    if (!journalText.trim()) return;

    const entry: JournalEntry = {
      text: journalText,
      timestamp: new Date().toLocaleString(),
    };

    setSavedJournals((prev) => [entry, ...prev]);
    setJournalText("");

    // Mock AI reflection
    setReflection(
      "Thank you for sharing. It sounds like you're holding a lot today, but also trying your best. Notice how your body feels right now—perhaps take a deep breath before moving on."
    );

    setChatMessages([
      {
        from: "ai",
        text: "I'm here with you. What part of your journal feels the heaviest today?",
      },
    ]);
  };

  /* --------------------------
      CHAT SEND
  --------------------------- */
  const sendChat = () => {
    if (!chatInput.trim()) return;

    const userMessage = { from: "user" as const, text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Mock AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "I hear you. What do you feel your mind is trying to tell you through this?",
        },
      ]);
    }, 600);
  };

  return (
    <Page>
      <Container>
        {/* ---------------- JOURNAL CARD ---------------- */}
        <Card>
          <Title>Write Your Journal</Title>
          <p style={{ color: SUB, marginTop: 6, fontSize: 15 }}>
            This space is just for you. Everything you write stays private.
          </p>

          <TextArea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write whatever is on your mind..."
          />

          <PrimaryBtn onClick={saveJournal}>
            <BookOpen size={18} /> Save Journal
          </PrimaryBtn>

          {/* ---------------- REFLECTION ---------------- */}
          {reflection && (
            <ReflectionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontWeight: 700,
                  color: ACCENT2, // Highlight title with green accent
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 18,
                }}
              >
                <Sparkles size={20} /> Your Reflection
              </h4>
              <p style={{ margin: 0, color: SUB, fontSize: 15 }}>
                {reflection}
              </p>
            </ReflectionBox>
          )}

          {/* ---------------- AI CHAT ---------------- */}
          {reflection && (
            <div style={{ marginTop: 20 }}>
              <h4
                style={{
                  margin: "0 0 10px",
                  fontWeight: 700,
                  color: TEXT,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 18,
                }}
              >
                <MessageCircle size={18} color={ACCENT} /> Continue Talking
              </h4>

              <ChatBox>
                {chatMessages.map((msg, idx) => (
                  <Message key={idx} user={msg.from === "user"}>
                    {msg.text}
                  </Message>
                ))}
              </ChatBox>

              <ChatInputWrap>
                <ChatInput
                  placeholder="Say anything that's on your mind..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendChat();
                  }}
                />
                <ChatSend onClick={sendChat}>
                  <Send size={18} />
                </ChatSend>
              </ChatInputWrap>
            </div>
          )}
        </Card>

        {/* ---------------- JOURNAL HISTORY ---------------- */}
        <Card>
          <h3 style={{ margin: 0, fontWeight: 700, fontSize: 22, color: TEXT }}>
            📝 Your Past Journals
          </h3>

          {savedJournals.length === 0 && (
            <p style={{ color: SUB, marginTop: 10, fontSize: 15 }}>
              You haven't written anything yet. Start your first journal above!
            </p>
          )}

          {savedJournals.map((entry, idx) => (
            <JournalHistoryEntry key={idx}>
              <p style={{ margin: "0 0 6px", color: TEXT, fontSize: 16 }}>
                {entry.text}
              </p>
              <p
                style={{ margin: 0, color: SUB, fontSize: 13, fontWeight: 500 }}
              >
                {entry.timestamp}
              </p>
            </JournalHistoryEntry>
          ))}
        </Card>
      </Container>
    </Page>
  );
}
