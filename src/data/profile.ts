/**
 * Personal details used across the site.
 * Edit this file to update your name, links, contact details and CV.
 */
export const profile = {
  name: "Vanessa Rebecca Konso",
  fullName: "Konso Vanessa Rebecca",
  firstName: "Vanessa",
  middleName: "Rebecca",
  lastName: "Konso",
  initials: "VRK",
  role: "Software Engineer",
  location: "Kampala, Uganda",
  timeZone: "Africa/Kampala",
  timeZoneLabel: "EAT",

  email: "rebeccakonso256@gmail.com",
  phones: ["+256 778 667 124", "+256 742 792 762"],
  /** Set to true to show phone numbers in the contact section. */
  showPhone: false,

  /** Portrait shown in the About section. Replace the file in /public/images to update it. */
  photo: {
    src: "/images/vanessa-rebecca-konso.jpg",
    width: 853,
    height: 1280,
    alt: "Portrait of Vanessa Rebecca Konso",
  },

  /** Combined CV (software + AI/ML). Source lives in /cv/cv.html. */
  cvUrl: "/cv/Vanessa-Rebecca-Konso-CV.pdf",
  cvFileName: "Vanessa-Rebecca-Konso-CV.pdf",

  /** TODO: set NEXT_PUBLIC_SITE_URL to your deployed domain (e.g. https://vanessakonso.dev) */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  socials: {
    github: "https://github.com/Vanessa-Rebecca",
    linkedin: "https://www.linkedin.com/in/vanessa-rebecca-konso-59210b226/",
  },

  availability: "Open to new opportunities",

  /** Shown on the "Currently learning" sticker in About. Keep it honest and current. */
  currentlyLearning: [
    "Deploying ML models people can actually use",
    "Building with LLM APIs — AI Freelancer Assistant",
    "Deep learning for computer vision",
  ],

  hero: {
    headline: "I build software that makes complex work feel simple.",
    /** Same headline, split so the last words can be emphasised in the hero. */
    headlineLead: "I build software that makes complex work",
    headlineEmphasis: "feel simple.",
    intro:
      "Software engineer in Kampala, building web applications and business systems with Next.js, TypeScript and PostgreSQL — and learning to make them smarter with machine learning.",
    roles: ["Software Engineer", "Full-stack Developer", "UI/UX-minded", "AI/ML Practitioner"],
  },
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "ai-ml", label: "AI/ML" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];
