// src/app/analytics/page.tsx
"use client";
import styled from "styled-components";
import Card from "@/components/Card";

const Page = styled.div`
  padding: 24px;
  min-height: calc(100vh - 72px);
  background: #f4f8f9;
`;

export default function Analytics() {
  return (
    <Page>
      <h2 style={{ color: "#1E3A40" }}>Mood Analytics</h2>

      <Card style={{ marginTop: 12 }}>
        <p style={{ color: "#476B7F" }}>
          7-day average mood:{" "}
          <strong style={{ color: "#1E3A40" }}>0.18 (slightly positive)</strong>
        </p>
        <div
          style={{
            height: 160,
            background: "#F4F8F9",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#476B7F",
          }}
        >
          Mock chart area
        </div>
      </Card>
    </Page>
  );
}
