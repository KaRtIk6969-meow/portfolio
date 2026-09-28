"use client";

import React from "react";
import { motion } from "framer-motion";
import { CONTACT_INFO } from "../constants/contact";
import ContactInfoCard from "./ContactInfoCard";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 max-w-4xl mx-auto w-full min-w-0">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-secondary font-mono tracking-widest text-xs uppercase mb-2"
        >
          {CONTACT_INFO.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white"
        >
          {CONTACT_INFO.title}
        </motion.h2>
      </div>

      {/* Grid container with ContactInfoCard and ContactForm */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-start w-full min-w-0">
        <ContactInfoCard />
        <ContactForm />
      </div>
    </section>
  );
}
