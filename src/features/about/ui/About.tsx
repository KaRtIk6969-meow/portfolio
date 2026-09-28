"use client";

import React from "react";
import { motion } from "framer-motion";
import { ABOUT_BIO, TIMELINE_DATA } from "../constants/about";
import TimelineNode from "./TimelineNode";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 max-w-5xl mx-auto w-full min-w-0">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-secondary font-mono tracking-widest text-xs uppercase mb-2"
        >
          {ABOUT_BIO.narrativeEyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white"
        >
          {ABOUT_BIO.title}
        </motion.h2>
      </div>

      {/* Bio intro card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel p-6 sm:p-8 rounded-2xl mb-12 sm:mb-16 shadow-lg leading-relaxed text-text-secondary font-sans text-sm sm:text-base max-w-3xl mx-auto w-full min-w-0"
      >
        {ABOUT_BIO.paragraphs.map((paragraph, index) => (
          <p key={index} className={index < ABOUT_BIO.paragraphs.length - 1 ? "mb-4" : ""}>
            {paragraph}
          </p>
        ))}
      </motion.div>

      {/* Timeline pathway layout with mobile clipping protection */}
      <div className="relative border-l border-border-line ml-6 sm:ml-12 md:ml-28 py-4">
        {TIMELINE_DATA.map((item, index) => (
          <TimelineNode key={`${item.company}-${item.year}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
