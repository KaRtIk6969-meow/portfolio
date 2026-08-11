"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    // Mock API post request duration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-4xl mx-auto w-full min-w-0 select-none">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-secondary font-mono tracking-widest text-xs uppercase mb-2"
        >
          Get In Touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white"
        >
          CONTACT ME
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start w-full min-w-0">
        {/* Contact info panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 glass-panel p-6 rounded-2xl w-full min-w-0"
        >
          <h3 className="text-lg font-sans font-bold text-white mb-4">
            Connection Hub
          </h3>
          <p className="text-sm font-sans text-text-secondary leading-relaxed mb-6">
            Feel free to reach out if you want to collaborate on open source projects, discuss full stack engineering opportunities, or simply say hello.
          </p>

          <div className="flex items-center gap-3 text-sm font-mono text-white">
            <div className="w-9 h-9 rounded-full bg-surface-elevated border border-border-line flex items-center justify-center">
              <Mail className="w-4 h-4 text-secondary" />
            </div>
            <span>alex.mercer@cosmos.dev</span>
          </div>
        </motion.div>

        {/* Interactive form block */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-3 glass-panel p-8 rounded-2xl w-full min-w-0"
        >
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 w-full min-w-0"
              >
                <div>
                  <label htmlFor="name" className="block text-[11px] font-mono text-text-secondary uppercase tracking-widest mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "submitting"}
                    className="w-full bg-surface-main border border-border-line rounded-xl px-4 py-3 text-sm font-sans text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-mono text-text-secondary uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "submitting"}
                    className="w-full bg-surface-main border border-border-line rounded-xl px-4 py-3 text-sm font-sans text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-mono text-text-secondary uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "submitting"}
                    className="w-full bg-surface-main border border-border-line rounded-xl px-4 py-3 text-sm font-sans text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all duration-300 disabled:opacity-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-xl font-sans font-bold text-sm tracking-wide shadow-lg cursor-pointer transition-all duration-300 hover:bg-opacity-90 disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-8 w-full min-w-0"
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-surface-elevated border border-secondary flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle2 className="w-8 h-8 text-secondary" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-sans font-bold text-white mb-2">
                  Transmission Received
                </h3>
                <p className="text-sm font-sans text-text-secondary max-w-md mx-auto leading-relaxed mb-6">
                  Thank you for reaching out. Your message has been sent successfully through the cosmic communication streams. I will connect with you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 bg-surface-elevated text-secondary border border-border-line rounded-full font-mono text-xs cursor-pointer hover:border-secondary hover:text-white transition-all duration-300"
                >
                  Send Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
