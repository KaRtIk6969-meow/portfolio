"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
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

export default function About() {
  return (
    <section id="about" className="py-24 px-4 max-w-5xl mx-auto w-full min-w-0 select-none">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-secondary font-mono tracking-widest text-xs uppercase mb-2"
        >
          My Narrative
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white"
        >
          ABOUT & TIMELINE
        </motion.h2>
      </div>

      {/* Brief bio intro card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel p-8 rounded-2xl mb-16 shadow-lg leading-relaxed text-text-secondary font-sans text-base max-w-3xl mx-auto w-full min-w-0"
      >
        <p className="mb-4">
          I am a passionate software engineer dedicated to building premium, high performance digital solutions. By combining robust backend logic with immersive, smooth frontend animations, I create applications that are both functional and visually stunning.
        </p>
        <p>
          My work is heavily guided by clean architecture principles, semantic structural syntax, and fluid design experiences. I love exploring new technologies and solving complex architectural bottlenecks.
        </p>
      </motion.div>

      {/* Timeline pathway layout */}
      <div className="relative border-l border-border-line ml-4 md:ml-32 py-4">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.1,
            }}
            className="relative pl-8 pb-12 last:pb-0"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Timeline node icon circles */}
            <div className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-surface-main border border-border-line flex items-center justify-center shadow-lg z-10">
              {item.icon}
            </div>

            {/* Content cards block */}
            <div className="glass-panel p-6 rounded-xl hover:border-secondary/40 transition-all duration-300 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono tracking-widest text-secondary flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.year}
                </span>
                <h4 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                  {item.company}
                </h4>
              </div>
              
              <h3 className="text-lg font-sans font-bold text-white mb-2">
                {item.role}
              </h3>
              
              <p className="text-sm font-sans text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
