"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: "loading" });

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState({
          status: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setFormState({
        status: "error",
        message: "Failed to send message. Please try again or contact me directly.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          placeholder="Your name"
          disabled={formState.status === "loading"}
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          placeholder="your.email@example.com"
          disabled={formState.status === "loading"}
        />
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          placeholder="What is this about?"
          disabled={formState.status === "loading"}
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
          placeholder="Your message..."
          disabled={formState.status === "loading"}
        />
      </div>

      {/* Status Message */}
      {formState.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-start gap-3 ${
            formState.status === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20"
              : "bg-red-500/10 border border-red-500/20"
          }`}
        >
          {formState.status === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          )}
          <p
            className={`text-sm ${
              formState.status === "success" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {formState.message}
          </p>
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formState.status === "loading"}
        className="w-full px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {formState.status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
