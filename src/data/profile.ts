/**
 * Personal details used across the site.
 * Edit this file to update your name, links, contact details and CV.
 */
export const profile = {
  name: "Vanessa Konso",
  fullName: "Konso Vanessa Rebecca",
  firstName: "Vanessa",
  lastName: "Konso",
  initials: "VK",
  role: "Software Engineer",
  location: "Kampala, Uganda",
  timeZone: "Africa/Kampala",
  timeZoneLabel: "EAT",

  email: "rebeccakonso256@gmail.com",
  phones: ["+256 778 667 124", "+256 742 792 762"],
  /** Set to true to show phone numbers in the contact section. */
  showPhone: false,

  /** Combined CV (software + AI/ML). Source lives in /cv/cv.html. */
  cvUrl: "/cv/Vanessa-Konso-CV.pdf",

  /** TODO: set NEXT_PUBLIC_SITE_URL to your deployed domain (e.g. https://vanessakonso.dev) */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  socials: {
    github: "https://github.com/Vanessa-Rebecca",
    linkedin: "https://www.linkedin.com/in/vanessa-rebecca-konso-59210b226/",
  },

  availability: "Open to new opportunities",

  hero: {
    headline: "I build software that makes complex work feel simple.",
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
