"use client";
import { Mail, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { trackNewsletterSignup } from "@/app/lib/analytics";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Successfully subscribed! Check your email for confirmation."
        );

        // Track newsletter signup
        trackNewsletterSignup(email);

        setEmail("");

        // Reset after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
      console.error("Newsletter subscription error:", error);
    }
  };

  return (
    <div className="glass p-6 md:p-8 rounded-xl hover-glow transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Mail className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-zinc-100">Stay Updated</h3>
          <p className="text-sm text-zinc-400">
            Get safety tips and industry insights
          </p>
        </div>
      </div>

      <p className="text-zinc-400 text-sm mb-4">
        Join the newsletter to receive exclusive content about heavy equipment
        operations, safety management best practices, and industry updates.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-zinc-100 placeholder:text-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2 min-w-[140px]"
          >
            {status === "loading" && (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            )}
            {status === "success" && (
              <>
                <Check className="w-4 h-4" />
                <span>Subscribed!</span>
              </>
            )}
            {(status === "idle" || status === "error") && (
              <>
                <Mail className="w-4 h-4" />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              status === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {message}
          </div>
        )}

        <p className="text-xs text-zinc-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>

      {/* Stats (optional) */}
      <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xl font-bold text-green-400">500+</div>
          <div className="text-xs text-zinc-500">Subscribers</div>
        </div>
        <div>
          <div className="text-xl font-bold text-green-400">Weekly</div>
          <div className="text-xs text-zinc-500">Updates</div>
        </div>
        <div>
          <div className="text-xl font-bold text-green-400">100%</div>
          <div className="text-xs text-zinc-500">Free</div>
        </div>
      </div>
    </div>
  );
}
