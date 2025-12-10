// src/components/ClientProviders.tsx  (Client Component)
"use client";

import { ReactNode } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "@/components/Nav";

const Global = createGlobalStyle`
  html, body, #__next { height: 100%; }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: #F4F8F9;
    color: #1E3A40;
  }
`;

const Main = styled.main`
  min-height: 100vh;
  padding-top: 72px; /* space for fixed nav */
`;

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <Global />
      <Nav />
      <Main>{children}</Main>
    </>
  );
}
