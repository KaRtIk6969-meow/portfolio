import { SITE_CONFIG } from "@/shared/constants/site";

export const COSMOS_ASCII_ART = `
      .---.
     /     \\
    | () () |     COSMOS OS v2.0
     \\  ^  /      Deep Space Developer Environment
      |||||       Kernel: x86_64 Next.js 16.3-turbo
      '|||'
`;

export interface SystemInfoItem {
  label: string;
  value: string;
}

export function getSystemInfo(): SystemInfoItem[] {
  return [
    { label: "OS", value: "COSMOS Deep Space Kernel v2.0" },
    { label: "Host", value: "Next.js 16.3 (Turbopack) & React 19" },
    { label: "Developer", value: `${SITE_CONFIG.name} (${SITE_CONFIG.jobTitle})` },
    { label: "Affiliation", value: SITE_CONFIG.company },
    { label: "Shell", value: "cosmos-sh (WebAssembly + React v19)" },
    { label: "Motion Engine", value: "Framer Motion 13 + Lenis Smooth Scroll" },
    { label: "Theme Palette", value: "Deep Space Dark (Cyan #06B6D4 / Violet #8B5CF6)" },
    { label: "Telemetry", value: "GitHub Live API + Vercel Analytics" },
    { label: "Security", value: "Client Sandboxed (No Host Shell Privileges)" },
  ];
}
