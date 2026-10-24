export const SITE_CONFIG = {
  name: "Orvane Works",
  wordmark: "ORVANE WORKS",
  tagline: "Student-founded freelance studio crafting high-impact digital experiences.",
  description:
    "Engineering-driven freelance studio in Madurai, Tamil Nadu. We specialize in modern web design & development, high-retention video editing, and brand content creation for ambitious businesses.",
  locality: "Madurai",
  region: "Tamil Nadu",
  country: "India",
  address: "Madurai, Tamil Nadu 625020, India",
  email: "hello@orvane.studio", // Clearly labelled contact placeholder
  phone: "+91 98765 43210",    // Clearly labelled contact placeholder
  whatsappNumber: "919876543210", // Prefilled link target
  whatsappDefaultMessage: "Hi Orvane Works! I'd like to discuss a project for my business.",
  socials: {
    instagram: "https://instagram.com/orvane.studio",
    linkedin: "https://linkedin.com/company/orvane-studio",
    youtube: "https://youtube.com/@orvanestudio",
    github: "https://github.com/orvane-studio",
  },
  links: {
    home: "/",
    services: "/services",
    packages: "/packages",
    portfolio: "/portfolio",
    team: "/team",
    about: "/about",
    howWeWork: "/how-we-work",
    testimonials: "/testimonials",
    faq: "/faq",
    contact: "/contact",
    hardware: "/hardware",
    join: "/join",
    privacy: "/privacy",
    terms: "/terms",
    login: "/login",
    signup: "/signup",
    dashboard: "/dashboard",
    employee: "/employee",
    admin: "/admin",
  },
} as const;

export const MAIN_NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Work", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Hardware (IoT)", href: "/hardware", badge: "Soon" },
  { label: "Contact", href: "/contact" },
] as const;
