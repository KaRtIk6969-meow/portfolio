import React from "react";
import {
  Home,
  User,
  Briefcase,
  Code,
  FolderGit2,
  Mail,
  Orbit,
  MessageSquare,
  Activity,
  ShoppingBag,
  Terminal,
} from "lucide-react";
import { CommandItemData } from "../types";

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-text-primary"
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);


export const COMMANDS: CommandItemData[] = [
  // --- Navigation Section ---
  {
    id: "nav-home",
    label: "Home",
    subtitle: "Back to cosmic hero & start",
    keywords: ["home", "top", "hero", "intro", "start"],
    icon: <Home className="w-4 h-4 text-cyan-400" />,
    group: "Navigation",
    actionType: "navigation",
    target: "hero",
    shortcut: "H",
  },
  {
    id: "nav-projects",
    label: "Projects",
    subtitle: "Explore selected engineering creations",
    keywords: ["projects", "creations", "apps", "portfolio", "work"],
    icon: <FolderGit2 className="w-4 h-4 text-violet-400" />,
    group: "Navigation",
    actionType: "navigation",
    target: "projects",
    shortcut: "P",
  },
  {
    id: "nav-skills",
    label: "Skills & Stack",
    subtitle: "Technical competencies and proficiencies",
    keywords: ["skills", "stack", "frontend", "backend", "technologies", "tools"],
    icon: <Code className="w-4 h-4 text-emerald-400" />,
    group: "Navigation",
    actionType: "navigation",
    target: "skills",
    shortcut: "S",
  },
  {
    id: "nav-about",
    label: "About Me",
    subtitle: "Developer philosophy & narrative",
    keywords: ["about", "bio", "journey", "profile", "kartik"],
    icon: <User className="w-4 h-4 text-amber-400" />,
    group: "Navigation",
    actionType: "navigation",
    target: "about",
    shortcut: "A",
  },
  {
    id: "nav-experience",
    label: "Experience Timeline",
    subtitle: "Career trajectory & milestones",
    keywords: ["experience", "timeline", "career", "history", "milestones", "work"],
    icon: <Briefcase className="w-4 h-4 text-cyan-400" />,
    group: "Navigation",
    actionType: "navigation",
    target: "about",
    shortcut: "E",
  },
  {
    id: "nav-contact",
    label: "Contact",
    subtitle: "Send a transmission or start collaboration",
    keywords: ["contact", "email", "message", "hire", "collaborate", "chat"],
    icon: <Mail className="w-4 h-4 text-violet-400" />,
    group: "Navigation",
    actionType: "navigation",
    target: "contact",
    shortcut: "C",
  },

  // --- Projects Section ---
  {
    id: "proj-novalabsai",
    label: "NovaLabsAI",
    subtitle: "AI Agency Platform • Next.js & Framer Motion",
    keywords: ["novalabs", "ai", "agency", "platform", "nextjs", "fluid"],
    icon: <Orbit className="w-4 h-4 text-violet-400" />,
    group: "Projects",
    actionType: "navigation",
    target: "projects",
  },
  {
    id: "proj-mindbloomm",
    label: "MindBloomm",
    subtitle: "Mental Wellness Sanctuary • React & Firebase",
    keywords: ["mindbloom", "wellness", "sanctuary", "mental", "health", "react"],
    icon: <MessageSquare className="w-4 h-4 text-cyan-400" />,
    group: "Projects",
    actionType: "navigation",
    target: "projects",
  },
  {
    id: "proj-klickonn",
    label: "Klickonn",
    subtitle: "Full-Stack Media SaaS • Neon Postgres & Drizzle",
    keywords: ["klickonn", "media", "saas", "neon", "postgres", "drizzle"],
    icon: <Activity className="w-4 h-4 text-emerald-400" />,
    group: "Projects",
    actionType: "navigation",
    target: "projects",
  },
  {
    id: "proj-sms",
    label: "Student Management System",
    subtitle: "Academic Records System • Python 3 OOP",
    keywords: ["student", "management", "system", "python", "oop", "records"],
    icon: <ShoppingBag className="w-4 h-4 text-amber-400" />,
    group: "Projects",
    actionType: "navigation",
    target: "projects",
  },

  // --- External Links Section ---
  {
    id: "ext-github",
    label: "GitHub Profile",
    subtitle: "github.com/KaRtIk6969-meow • Open Source Repositories",
    keywords: ["github", "profile", "git", "repositories", "code", "kartik"],
    icon: <GitHubIcon />,
    group: "Social & External",
    actionType: "external",
    target: "https://github.com/KaRtIk6969-meow",
    shortcut: "G",
  },

  {
    id: "ext-email",
    label: "Send Email",
    subtitle: "kartiksharmaa2066@gmail.com",
    keywords: ["email", "gmail", "mail", "send", "transmission"],
    icon: <Mail className="w-4 h-4 text-secondary" />,
    group: "Social & External",
    actionType: "external",
    target: "mailto:kartiksharmaa2066@gmail.com",
  },

  // --- Tools & System Section ---
  {
    id: "tool-terminal",
    label: "Developer Terminal",
    subtitle: "Interactive CLI environment • help, neofetch, skills",
    keywords: ["terminal", "cli", "shell", "console", "command", "bash", "zsh", "neofetch"],
    icon: <Terminal className="w-4 h-4 text-cyan-400" />,
    group: "System & Tools",
    actionType: "action",
    shortcut: "`",
    onSelect: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cosmos:open-terminal"));
      }
    },
  },
];
