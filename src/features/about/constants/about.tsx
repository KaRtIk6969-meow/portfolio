import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { AboutBio, TimelineItem } from "../types";

export const ABOUT_BIO: AboutBio = {
  narrativeEyebrow: "My Narrative",
  title: "ABOUT & TIMELINE",
  paragraphs: [
    "I am a passionate software engineer dedicated to building premium, high performance digital solutions. By combining robust backend logic with immersive, smooth frontend animations, I create applications that are both functional and visually stunning.",
    "My work is heavily guided by clean architecture principles, semantic structural syntax, and fluid design experiences. I love exploring new technologies and solving complex architectural bottlenecks.",
  ],
};

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2024 to Present",
    role: "Senior Full Stack Developer",
    company: "StellarTech",
    description: "Led frontend architecture migration to Next.js App Router, increasing web vitals scores and reducing core bundle sizes.",
    icon: <Briefcase className="w-4 h-4 text-secondary" />,
  },
  {
    year: "2021 to 2024",
    role: "Full Stack Engineer",
    company: "Nebula Systems",
    description: "Designed and optimized real time telemetry tools and high speed microservices using Node.js and PostgreSQL.",
    icon: <Briefcase className="w-4 h-4 text-secondary" />,
  },
  {
    year: "2019 to 2021",
    role: "Frontend Developer",
    company: "Nova Studio",
    description: "Implemented immersive animations, high fidelity design systems, and responsive layouts for client marketing platforms.",
    icon: <Briefcase className="w-4 h-4 text-secondary" />,
  },
  {
    year: "2015 to 2019",
    role: "Bachelor of Science in Computer Science",
    company: "Apex University",
    description: "Graduated with honors. Focused on software engineering, database design, and algorithmic optimization.",
    icon: <GraduationCap className="w-4 h-4 text-secondary" />,
  },
];
