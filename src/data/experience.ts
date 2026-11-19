export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Slugs from projects.ts — rendered as links that open the project. */
  projects?: string[];
};

export const experience: Experience[] = [
  {
    company: "AIBOS Uganda",
    role: "Software Engineer",
    period: "2024 — Present",
    location: "Kampala",
    summary:
      "I design, build, test and maintain internal business systems used every day in production, working across the frontend and backend in a small Agile team.",
    highlights: [
      "Built the leave management and project management modules of the Employee Management System end-to-end, and contributed to time tracking and task management.",
      "Developed features for a Job Application Portal: job postings, candidate applications, authentication, CRUD operations and application tracking.",
      "Lead requirements gathering, UI/UX design and frontend development for a Software Document Generator built with Next.js and Python.",
      "Translate business requirements into working features and take them through design, development, testing, UAT and deployment.",
      "Troubleshoot issues in live systems, work with structured data in PostgreSQL, and write the technical documentation new developers onboard with.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Docker", "Git"],
    projects: ["employee-management-system", "job-application-portal", "software-document-generator"],
  },
  {
    company: "Stratcom Communications",
    role: "Software Engineering Intern",
    period: "Jun 2023 — Aug 2023",
    location: "Kampala",
    summary:
      "My first experience shipping in a live production environment, alongside senior developers.",
    highlights: [
      "Built frontend interfaces for a Fees Management System in React, integrated with a Django REST backend.",
      "Took part in requirements analysis, implementation and testing.",
      "Supported user acceptance testing with the people who would use the system.",
    ],
    stack: ["React", "Python", "Django REST Framework", "REST APIs"],
  },
];

export type Milestone = { year: string; title: string; detail: string };

export const milestones: Milestone[] = [
  { year: "2020", title: "Makerere University", detail: "Began a BSc in Software Engineering" },
  { year: "2023", title: "Stratcom", detail: "Software engineering internship" },
  { year: "2024", title: "AIBOS Uganda", detail: "Joined as a Software Engineer" },
  { year: "2025", title: "Graduated", detail: "BSc Software Engineering, Second Class Upper" },
  { year: "2026", title: "AI & Machine Learning", detail: "Refactory Academy and Lift Horizon programmes" },
];
