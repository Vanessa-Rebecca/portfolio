import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Vanessa Konso is a software engineer in Kampala, Uganda, building web applications and business systems with Next.js, TypeScript and PostgreSQL, with formal training in AI and machine learning.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: "Vanessa Konso — Software Engineer",
    template: "%s — Vanessa Konso",
  },
  description,
  keywords: [
    "Vanessa Konso",
    "Software Engineer",
    "Kampala",
    "Uganda",
    "Next.js",
    "React",
    "TypeScript",
    "Full-stack developer",
    "Machine learning",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.socials.github }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Vanessa Konso",
    title: "Vanessa Konso — Software Engineer",
    description,
    locale: "en_UG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanessa Konso — Software Engineer",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08070b" },
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint: restores the saved theme (dark by default) and
 * flags whether motion is allowed, so hero elements can start hidden without a flash.
 */
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("js-motion")}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.fullName,
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Makerere University" },
  worksFor: { "@type": "Organization", name: "AIBOS Uganda" },
  sameAs: [profile.socials.github, profile.socials.linkedin],
  url: profile.siteUrl,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
