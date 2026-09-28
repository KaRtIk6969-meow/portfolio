"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { CONTACT_INFO } from "../constants/contact";

export default function ContactInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="md:col-span-2 glass-panel p-5 sm:p-6 rounded-2xl w-full min-w-0"
    >
      <h3 className="text-lg font-sans font-bold text-white mb-3 sm:mb-4">
        {CONTACT_INFO.hubTitle}
      </h3>
      <p className="text-sm font-sans text-text-secondary leading-relaxed mb-6">
        {CONTACT_INFO.hubDescription}
      </p>

      <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-white">
        <div className="w-9 h-9 shrink-0 rounded-full bg-surface-elevated border border-border-line flex items-center justify-center">
          <Mail className="w-4 h-4 text-secondary" />
        </div>
        <span className="break-all sm:break-normal">{CONTACT_INFO.email}</span>
      </div>
    </motion.div>
  );
}
