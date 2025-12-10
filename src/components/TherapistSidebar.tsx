"use client";

import styled from "styled-components";
import Link from "next/link";
import {
  ClipboardList,
  CheckCircle,
  Settings,
  LogOut,
  Users,
} from "lucide-react"; // All necessary icons imported

// --- AIKYA DARK THEME TOKENS ---
const BG_DARK = "#171F32"; // Darker background for active items and hover
const CARD_DARK = "#212F40"; // Sidebar container background
const TEXT_LIGHT = "#EBF2F7"; // Main text color
const TEXT_MUTED = "rgba(235, 242, 247, 0.6)"; // Muted text for default links
const ACCENT = "#6BC5C5"; // Teal accent for active icons/highlights
const BORDER_DARK = "rgba(235, 242, 247, 0.1)"; // Separator/border color

// --- STYLED COMPONENTS ---

const SidebarWrap = styled.aside`
  background: ${CARD_DARK}; /* Dark card background */
  width: 260px;
  padding: 24px 20px;
  border-radius: 18px;
  color: ${TEXT_LIGHT};
  height: fit-content;
  position: sticky;
  top: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4); /* Stronger shadow for depth */
`;

const Logo = styled.div`
  font-size: 22px;
  font-family: "Fraunces", serif; /* Optional: Use a serif font for brand name */
  font-weight: 800;
  margin-bottom: 24px;
  color: ${ACCENT}; /* Use accent color for brand prominence */
`;

const NavList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  gap: 12px;
  align-items: center;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 15px;
  white-space: nowrap;

  /* --- ACTIVE STATE --- */
  color: ${(p) => (p.$active ? TEXT_LIGHT : TEXT_MUTED)};
  background: ${(p) => (p.$active ? BG_DARK : "transparent")};
  font-weight: ${(p) => (p.$active ? 700 : 500)};
  /* Prominent border for active status */
  border-left: ${(p) => (p.$active ? `3px solid ${ACCENT}` : "none")};

  line-height: 1.5;

  /* Icon Color */
  svg {
    color: ${(p) => (p.$active ? ACCENT : TEXT_MUTED)};
    min-width: 18px;
    transition: color 0.2s ease;
  }

  /* --- HOVER STATE --- */
  &:hover {
    background: ${BG_DARK};
    color: ${TEXT_LIGHT};
    /* Change icon to light text color on non-active hover for better visual */
    svg {
      color: ${(p) => (p.$active ? ACCENT : TEXT_LIGHT)};
    }
  }
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid ${BORDER_DARK};
  margin: 16px 0;
`;

const ProfileInfo = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const ProfileName = styled.div`
  font-weight: 700;
  color: ${TEXT_LIGHT};
  margin-bottom: 2px;
`;

const ProfileRole = styled.span`
  color: ${TEXT_MUTED};
  font-size: 13px;
  font-style: italic;
`;

// --- MAIN COMPONENT ---

export default function TherapistSidebar({ active }: { active: string }) {
  return (
    <SidebarWrap>
      <Logo>Aikya</Logo>

      <ProfileInfo>
        <ProfileName>Dr. Priya Sharma</ProfileName>
        <ProfileRole>Clinical Psychologist (Rāga Specialist)</ProfileRole>
      </ProfileInfo>

      <NavList>
        <NavItem href="/therapist" $active={active === "summaries"}>
          <ClipboardList size={18} /> Review Summaries
        </NavItem>

        <NavItem href="/therapist/profiles" $active={active === "profiles"}>
          <Users size={18} /> Client Profiles
        </NavItem>

        <NavItem href="/therapist/completed" $active={active === "completed"}>
          <CheckCircle size={18} /> Completed Assignments
        </NavItem>

        <NavItem href="/therapist/settings" $active={active === "settings"}>
          <Settings size={18} /> Settings
        </NavItem>
      </NavList>

      <Separator />

      <NavList>
        <NavItem href="/logout" $active={active === "logout"}>
          <LogOut size={18} /> Logout
        </NavItem>
      </NavList>
    </SidebarWrap>
  );
}
