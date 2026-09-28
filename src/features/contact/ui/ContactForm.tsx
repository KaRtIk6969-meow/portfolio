"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ContactFormData, ContactStatus } from "../types";
import { INITIAL_FORM_DATA } from "../constants/contact";
import { sendContactMessage } from "../api/contact";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    setFeedbackMessage("");

    const response = await sendContactMessage(formData);

    if (response.success) {
      setStatus("success");
      setFeedbackMessage(response.message);
      setFormData(INITIAL_FORM_DATA);
    } else {
      setStatus("error");
      setFeedbackMessage(response.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="md:col-span-3 glass-panel p-5 sm:p-8 rounded-2xl w-full min-w-0"
    >
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 sm:space-y-6 w-full min-w-0"
          >
            {/* Honeypot field for bot suppression */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot || ""}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* Error notification banner */}
            {status === "error" && (
              <div
                role="alert"
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-semantic-danger/10 border border-semantic-danger/30 text-semantic-danger text-xs font-mono"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{feedbackMessage || "Transmission failed. Please check inputs and retry."}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-[11px] font-mono text-text-secondary uppercase tracking-widest mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                disabled={status === "submitting"}
                placeholder="Your name or organization"
                className="w-full bg-surface-main border border-border-line rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm font-sans text-white placeholder:text-text-muted focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-mono text-text-secondary uppercase tracking-widest mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={254}
                value={formData.email}
                onChange={handleChange}
                disabled={status === "submitting"}
                placeholder="name@example.com"
                className="w-full bg-surface-main border border-border-line rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm font-sans text-white placeholder:text-text-muted focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[11px] font-mono text-text-secondary uppercase tracking-widest mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={3000}
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={status === "submitting"}
                placeholder="Describe your project, ideas, or questions..."
                className="w-full bg-surface-main border border-border-line rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm font-sans text-white placeholder:text-text-muted focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200 disabled:opacity-50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-primary hover:bg-primary-hover active:scale-[0.98] text-white rounded-xl font-sans font-bold text-sm tracking-wide shadow-glow-violet cursor-pointer transition-all duration-300 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-main"
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
            className="text-center py-6 sm:py-8 w-full min-w-0"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-surface-elevated border border-secondary flex items-center justify-center shadow-lg"
              >
                <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8 text-secondary" />
              </motion.div>
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white mb-2">
              Transmission Received
            </h3>
            <p className="text-sm font-sans text-text-secondary max-w-md mx-auto leading-relaxed mb-6">
              {feedbackMessage || "Thank you for reaching out. Your message has been sent successfully through the cosmic communication streams. I will connect with you soon."}
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setFeedbackMessage("");
              }}
              className="px-6 py-2.5 bg-surface-elevated text-secondary border border-border-line hover:border-secondary hover:text-white rounded-full font-mono text-xs cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              Send Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
