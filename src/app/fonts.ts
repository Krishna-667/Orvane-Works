import { Plus_Jakarta_Sans, Syne, Noto_Sans_Tamil } from "next/font/google";

export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const fontTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
  weight: ["400", "600", "700"],
});
