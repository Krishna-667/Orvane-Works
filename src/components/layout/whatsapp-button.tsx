"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants/site";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`;

  return (
    <aside aria-label="Quick WhatsApp contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all hover:bg-[#20ba59] hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        aria-label="Chat with Orvane on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-white" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
