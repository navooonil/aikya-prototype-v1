// src/app/reflection/page.tsx
"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { mockReflections, mockTasks } from "@/app/mock/reflectionData";
import Card from "@/components/Card";

const Page = styled.div`
  padding: 24px;
  min-height: calc(100vh - 72px);
  background: #f4f8f9;
`;

const Title = styled.h2`
  color: #1e3a40;
  margin-bottom: 12px;
`;

export default function ReflectionPage() {
  const [reflection, setReflection] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    // Pick a random reflection and task
    setReflection(
      mockReflections[Math.floor(Math.random() * mockReflections.length)]
    );
    setTask(mockTasks[Math.floor(Math.random() * mockTasks.length)]);
  }, []);

  return (
    <Page>
      <Card>
        <Title>Your Reflection 🌿</Title>
        <p style={{ color: "#1E3A40", lineHeight: 1.6 }}>{reflection}</p>
      </Card>

      <Card>
        <Title>Today's Micro-task</Title>
        <p style={{ color: "#476B7F", lineHeight: 1.5 }}>{task}</p>
      </Card>
    </Page>
  );
}
