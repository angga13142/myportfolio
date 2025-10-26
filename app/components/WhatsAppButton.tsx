"use client";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { trackWhatsAppClick } from "@/app/lib/analytics";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "6281234567890"; // Replace with actual WhatsApp number

  const predefinedMessages = [
    {
      title: "Job Inquiry",
      message: "Hi! I'm interested in discussing a job opportunity with you.",
    },
    {
      title: "Collaboration",
      message: "Hello! I'd like to discuss a potential collaboration.",
    },
    {
      title: "General Question",
      message: "Hi! I have a question about your services and experience.",
    },
  ];

  const handleQuickMessage = (message: string, title: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
    trackWhatsAppClick(title);
    setIsOpen(false);
  };

  const handleCustomMessage = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
    trackWhatsAppClick("Custom Message");
    setIsOpen(false);
  };

  return (
    <>
      {/* Quick Message Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 glass rounded-2xl p-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-zinc-100">Quick Contact</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-zinc-400 mb-4">
            Choose a quick message or start a custom chat:
          </p>

          {/* Predefined Messages */}
          <div className="space-y-2 mb-4">
            {predefinedMessages.map((msg, i) => (
              <button
                key={i}
                onClick={() => handleQuickMessage(msg.message, msg.title)}
                className="w-full text-left p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors group"
              >
                <div className="text-sm font-medium text-zinc-200 group-hover:text-white">
                  {msg.title}
                </div>
                <div className="text-xs text-zinc-500 mt-1 line-clamp-1">
                  {msg.message}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Message Button */}
          <button
            onClick={handleCustomMessage}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Start Custom Chat</span>
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 hover:scale-110 active-press transition-transform group"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white transition-transform group-hover:rotate-90" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white animate-pulse" />
        )}
      </button>

      {/* Tooltip on hover (only when closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-24 z-50 glass px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-sm text-zinc-100 whitespace-nowrap">
            Chat with me on WhatsApp
          </span>
        </div>
      )}
    </>
  );
}
