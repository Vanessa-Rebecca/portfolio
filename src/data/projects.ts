/**
 * Projects shown in "Selected work" and the AI/ML section.
 *
 * Links: use `null` when a link doesn't exist yet. The site never renders a
 * dead link — it shows the `availability` note instead.
 * Screenshots: drop an image in /public/projects and set `image` to its path
 * (e.g. "/projects/ems.png"). Until then a designed preview is shown.
 */

export type ProjectCategory = "product" | "ai";

export type PreviewVariant =
  | "ems"
  | "docs"
  | "jobs"
  | "ledger"
  | "ussd"
  | "websites"
  | "freelancer"
  | "fraud"
  | "heart"
  | "wilt"
  | "segments";

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  /** One-line descriptor shown above the title. */
  kind: string;
  category: ProjectCategory;
  featured?: boolean;
  summary: string;
  problem: string;
  contribution: string[];
  features: string[];
  stack: string[];
  links: {
    github: string | null;
    live: ProjectLink[];
  };
  /** Shown when there's no public repository. */
  availability?: string;
  status?: "In development";
  /** A real, verifiable result. Never estimated. */
  metric?: { value: string; label: string };
  preview: PreviewVariant;
  image?: string;
  /** AI/ML case-study copy, used in the AI/ML section. */
  caseStudy?: { challenge: string; learned: string };
};

export const projects: Project[] = [
  {
    slug: "employee-management-system",
    title: "Employee Management System",
    kind: "Enterprise system · AIBOS Uganda",
    category: "product",
    featured: true,
    summary:
      "An internal HR platform that brings leave, time tracking, projects and tasks into one place for the whole organisation.",
    problem:
      "An organisation needs one dependable system where employees request leave, log time and manage projects and tasks — and where managers can see what is happening across teams.",
    contribution: [
      "Built the leave management module end-to-end, frontend and backend.",
      "Built the project management module end-to-end, frontend and backend.",
      "Contributed to the time tracking and task management features.",
      "Designed and implemented UI/UX improvements for usability and accessibility.",
      "Maintain the deployed system: troubleshooting, improvements and new requirements from users.",
    ],
    features: [
      "Leave requests with approval workflows",
      "Project and task management",
      "Time tracking",
      "Employee records and reporting",
      "REST APIs over PostgreSQL",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Docker"],
    links: { github: null, live: [] },
    availability: "Private · company project",
    preview: "ems",
  },
  {
    slug: "software-document-generator",
    title: "Software Document Generator",
    kind: "Developer tool · AIBOS Uganda",
    category: "product",
    summary:
      "Generates structured software engineering documentation — Software Requirements Specifications (SRS) and Software Design Documents (SDD).",
    problem:
      "Writing an SRS or SDD by hand is slow, and the structure tends to vary from project to project. The generator produces both documents in a consistent, standard structure.",
    contribution: [
      "Led requirements gathering with stakeholders.",
      "Owned the UI/UX design of the product.",
      "Built the frontend and implemented features in Next.js.",
    ],
    features: [
      "Software Requirements Specification (SRS) generation",
      "Software Design Document (SDD) generation",
      "Consistent document structure",
      "Next.js frontend with a Python backend",
    ],
    stack: ["Next.js", "TypeScript", "Python", "UI/UX design"],
    links: { github: null, live: [] },
    availability: "Private · company project",
    preview: "docs",
  },
  {
    slug: "job-application-portal",
    title: "Internal Job Application Portal",
    kind: "Recruitment platform · AIBOS Uganda",
    category: "product",
    summary:
      "A recruitment platform for publishing jobs, receiving applications and tracking candidates from first application to decision.",
    problem:
      "Hiring needs one place to post roles, collect applications and see exactly where each candidate stands.",
    contribution: [
      "Developed job posting and candidate application features.",
      "Implemented authentication and CRUD operations.",
      "Built application tracking and integrated the API and database layers.",
    ],
    features: [
      "Authentication",
      "Job postings management",
      "Candidate applications",
      "Application status tracking",
      "Supabase / SQL data layer",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "SQL"],
    links: { github: null, live: [] },
    availability: "Private · company project",
    preview: "jobs",
  },
  {
    slug: "payment-webhook-ledger",
    title: "Payment Webhook & Immutable Ledger",
    kind: "Backend service",
    category: "product",
    summary:
      "A payment webhook API with signature verification, exactly-once processing and an append-only ledger that is never rewritten.",
    problem:
      "Payment providers retry webhooks, send duplicates and can be spoofed. Money records must never be silently edited, and must reconcile against the provider's own records.",
    contribution: [
      "Designed and built the whole service.",
      "Verified HMAC-SHA256 signatures against the raw request body to reject tampered requests.",
      "Made processing idempotent with PostgreSQL unique constraints and ON CONFLICT handling.",
      "Wrote a reconciliation CLI that inserts compensating entries instead of changing history.",
    ],
    features: [
      "HMAC-SHA256 signature verification",
      "Idempotent, concurrency-safe webhook handling",
      "Append-only ledger with indexed balance queries (checked with EXPLAIN ANALYZE)",
      "Reconciliation: matched, mismatched, missing and orphan entries",
      "NDJSON audit logs with PII masking",
      "Docker Compose setup",
    ],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
    links: { github: null, live: [] }, // TODO: add repository URL if you make it public
    availability: "Repository link coming soon",
    preview: "ledger",
  },
  {
    slug: "ussd-crime-reporting",
    title: "USSD Crime Reporting & Proximity Search",
    kind: "Civic tech system",
    category: "product",
    summary:
      "Lets people report crime from any phone over USSD, with an admin workflow and a fast \"what's near me\" search over a large dataset.",
    problem:
      "Not everyone has a smartphone or data. USSD works on every phone, but USSD menus quickly become tangled if-else code that is hard to change.",
    contribution: [
      "Built a stateful USSD menu engine driven by a configuration array, with sessions and reset-to-main-menu.",
      "Modelled the report lifecycle as a state machine with an admin CLI that blocks invalid status changes.",
      "Built a proximity search API on PostgreSQL with a spatial index and parameterised queries.",
      "Built a vanilla JavaScript dashboard for the results.",
    ],
    features: [
      "Config-driven USSD menus",
      "Report lifecycle: Submitted → Under Review → Resolved / Rejected",
      "Spatially indexed proximity search, ordered by distance",
      "Dashboard with loading, error and empty states and debounced inputs",
      "Defensive Bash log-cleanup script with dry-run mode",
    ],
    stack: ["PHP 8", "PostgreSQL", "JavaScript", "HTML", "Bash"],
    links: { github: null, live: [] }, // TODO: add repository URL if you make it public
    availability: "Repository link coming soon",
    preview: "ussd",
  },
  {
    slug: "client-websites",
    title: "Jamainus & Clinique HOV",
    kind: "Client websites",
    category: "product",
    summary:
      "Two responsive, mobile-first websites for real organisations, built with reusable React components and a Laravel backend.",
    problem:
      "Each organisation needed a clear, trustworthy web presence that works well on the phones most of their visitors use.",
    contribution: [
      "Built the responsive frontends with reusable React components.",
      "Implemented Laravel backend functionality and REST API integration.",
      "Focused on accessibility and clear layouts.",
    ],
    features: ["Mobile-first layouts", "Reusable component library", "Laravel backend", "REST API integration"],
    stack: ["React", "Laravel", "PHP", "REST APIs"],
    links: {
      github: null,
      live: [
        { label: "jamainus.com", href: "https://jamainus.com" },
        { label: "cliniquehov.org", href: "https://cliniquehov.org" },
      ],
    },
    preview: "websites",
  },
  {
    slug: "ai-freelancer-assistant",
    title: "AI Freelancer Assistant",
    kind: "AI web app",
    category: "product",
    status: "In development",
    summary:
      "An AI-powered web app that helps freelancers write proposals, cover letters, gig descriptions, client replies, invoices and contracts, and estimate project pricing.",
    problem:
      "Freelancers lose hours writing the same kinds of documents for every client. The app drafts them so the freelancer can focus on the work.",
    contribution: [
      "Wrote the technical delivery plan: architecture, milestones and security decisions.",
      "Building the React frontend and Node.js/Express API in a TypeScript monorepo.",
      "All AI calls go through the server behind a provider interface, so the browser never sees a key.",
    ],
    features: [
      "Proposal, cover letter and gig description generators",
      "Client reply drafts with tone selection",
      "Invoices and contracts with PDF export",
      "Pricing calculator with AI suggestions",
      "JWT auth with rotating refresh tokens",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Gemini API"],
    links: { github: "https://github.com/Vanessa-Rebecca/AI-freelancer-assistant", live: [] },
    preview: "freelancer",
  },
  {
    slug: "credit-card-fraud-detection",
    title: "Credit Card Fraud Detection",
    kind: "Machine learning · Refactory capstone",
    category: "ai",
    summary:
      "Compares classical and deep learning models for spotting fraudulent transactions in a heavily imbalanced dataset.",
    problem:
      "Fraud is a tiny fraction of all transactions. A model can be 99% \"accurate\" by never flagging anything — so accuracy is the wrong measure, and the decision threshold matters as much as the model.",
    contribution: [
      "Explored and preprocessed the Kaggle Credit Card Fraud dataset.",
      "Built and compared Logistic Regression, Random Forest, XGBoost and a PyTorch neural network.",
      "Handled class imbalance and tuned hyperparameters and the classification threshold to balance precision and recall.",
      "Deployed the final model as an interactive Gradio demo on Hugging Face Spaces.",
    ],
    features: [
      "Exploratory data analysis",
      "Class imbalance handling",
      "Hyperparameter tuning",
      "Threshold tuning for precision/recall trade-off",
      "Gradio demo",
    ],
    stack: ["Python", "Pandas", "scikit-learn", "XGBoost", "PyTorch", "Gradio"],
    links: {
      github: "https://github.com/Vanessa-Rebecca/credit-card-fraud-detection",
      live: [], // TODO: add the Hugging Face Spaces demo URL, e.g. { label: "Live demo", href: "https://huggingface.co/spaces/..." }
    },
    preview: "fraud",
    caseStudy: {
      challenge: "Severe class imbalance: fraud is a tiny fraction of transactions, so accuracy hides failure.",
      learned:
        "Choosing the threshold is a business decision. Tuning it trades missed fraud against false alarms, and that trade-off belongs in the conversation with whoever uses the model.",
    },
  },
  {
    slug: "heart-disease-classification",
    title: "Heart Disease Classification",
    kind: "Machine learning · Refactory Academy",
    category: "ai",
    summary:
      "Predicts whether a patient is likely to have heart disease from the UCI dataset, comparing three classifiers with recall as the priority.",
    problem:
      "In a health screening context, missing a patient who has heart disease is far worse than a false alarm — so the model has to be judged on recall, not accuracy.",
    contribution: [
      "Cleaned the data: dropped mostly-empty columns and median-imputed impossible zero values.",
      "One-hot encoded categorical features and scaled numerical ones.",
      "Trained Logistic Regression, Random Forest and Gradient Boosting, tuned with GridSearchCV.",
      "Evaluated with accuracy, precision, recall and F1, prioritising recall.",
    ],
    features: ["Data cleaning and imputation", "Feature encoding and scaling", "GridSearchCV tuning", "Recall-first evaluation"],
    stack: ["Python", "Pandas", "NumPy", "scikit-learn", "Matplotlib", "Google Colab"],
    links: { github: "https://github.com/Vanessa-Rebecca/heart-disease-classification", live: [] },
    metric: { value: "0.872", label: "Recall — Logistic Regression" },
    preview: "heart",
    caseStudy: {
      challenge: "Missing a sick patient costs far more than a false alarm, so the model is judged on recall.",
      learned:
        "The simplest model won. With careful preprocessing, Logistic Regression beat Random Forest and Gradient Boosting on recall — data preparation mattered more than the algorithm.",
    },
  },
  {
    slug: "wilt-guard",
    title: "Wilt Guard",
    kind: "Computer vision · Team project",
    category: "ai",
    summary:
      "An AI-powered mobile app that helps coffee farmers detect coffee wilt disease early, using object detection on photos of their plants.",
    problem:
      "Coffee wilt disease spreads fast and is hard to spot early. Farmers need a quick way to check plants with the phone already in their pocket.",
    contribution: [
      "Collected, labelled and preprocessed image datasets in Roboflow.",
      "Trained and evaluated a YOLOv8 object detection model as part of the team, from data preparation through evaluation.",
    ],
    features: ["Image collection and labelling", "YOLOv8 object detection", "Model training and evaluation", "Mobile app delivery"],
    stack: ["Python", "YOLOv8", "TensorFlow", "Roboflow"],
    links: { github: null, live: [] }, // TODO: add repository or app link if public
    availability: "Team project · link coming soon",
    preview: "wilt",
    caseStudy: {
      challenge: "Real field photos are messy — lighting, angles and backgrounds vary — and every label has to be drawn by hand.",
      learned:
        "Most of the work in computer vision is the dataset. Careful labelling and preprocessing in Roboflow shaped the model more than any training setting.",
    },
  },
  {
    slug: "customer-segmentation",
    title: "Customer Segmentation",
    kind: "Machine learning · Lift Horizon Foundation",
    category: "ai",
    summary:
      "Groups e-commerce customers by behaviour so marketing teams can target each group, and assigns new customers to a segment from signup data alone.",
    problem:
      "Sending every customer the same campaign wastes budget. Marketing teams need groups they can understand and act on — not just cluster numbers.",
    contribution: [
      "Engineered RFM (Recency, Frequency, Monetary) and category-affinity features in a scikit-learn pipeline.",
      "Applied K-Means, choosing the number of clusters with the elbow method and silhouette score, and visualised them with PCA.",
      "Translated clusters into business personas (book lovers, tech buyers, fashion shoppers) with tailored recommendations.",
      "Trained a Random Forest to segment new customers and deployed the pipeline as a Gradio app on Hugging Face Spaces.",
    ],
    features: ["RFM feature engineering", "K-Means clustering", "PCA visualisation", "New-customer classifier", "Gradio app"],
    stack: ["Python", "scikit-learn", "K-Means", "PCA", "Random Forest", "Gradio"],
    links: { github: null, live: [] }, // TODO: add repository and Hugging Face Spaces URLs
    availability: "Links coming soon",
    preview: "segments",
    caseStudy: {
      challenge: "Clusters are only useful if a marketing team can understand them and act on them.",
      learned:
        "Naming and explaining segments in business terms is as much a part of the work as the clustering itself.",
    },
  },
];

/**
 * The six projects shown as cards in "Selected work", in display order.
 * Projects not listed here are still reachable through the case-study dialog
 * (AI/ML section, "Also built" list, prev/next arrows).
 */
export const galleryOrder = [
  "employee-management-system",
  "software-document-generator",
  "job-application-portal",
  "payment-webhook-ledger",
  "ussd-crime-reporting",
  "credit-card-fraud-detection",
] as const;

export const galleryProjects = galleryOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

/** Smaller pieces of work listed under the main gallery. */
export type MiniProject = {
  title: string;
  detail: string;
  stack: string;
  href: string | null;
  /** Extra links (e.g. live sites). */
  links?: ProjectLink[];
  /** If set, the row also opens this project's case study. */
  slug?: string;
  status?: string;
};

export const otherWork: MiniProject[] = [
  {
    title: "Jamainus & Clinique HOV",
    detail: "Responsive, mobile-first client websites with React and a Laravel backend.",
    stack: "React · Laravel",
    href: null,
    links: [
      { label: "jamainus.com", href: "https://jamainus.com" },
      { label: "cliniquehov.org", href: "https://cliniquehov.org" },
    ],
    slug: "client-websites",
  },
  {
    title: "AI Freelancer Assistant",
    detail: "AI-powered app that drafts proposals, invoices and contracts for freelancers.",
    stack: "React · Node.js · PostgreSQL",
    href: "https://github.com/Vanessa-Rebecca/AI-freelancer-assistant",
    slug: "ai-freelancer-assistant",
    status: "In development",
  },
  {
    title: "Event Pass QR",
    detail: "Laravel app for generating and verifying event tickets with QR codes.",
    stack: "Laravel · PHP",
    href: "https://github.com/Vanessa-Rebecca/event-pass-qr",
  },
  {
    title: "Fees Management System",
    detail: "React frontend on a Django REST backend, built during my internship.",
    stack: "React · Django",
    href: null,
  },
];

/** Additional ML studies shown in the AI/ML section. */
export const mlStudies: MiniProject[] = [
  {
    title: "Bank Customer Churn (ANN)",
    detail: "Two-hidden-layer network optimised for recall on churners, with leakage-safe scaling.",
    stack: "TensorFlow · Keras",
    href: null,
  },
  {
    title: "Salary Prediction",
    detail: "Career advisory tool predicting salary by location, experience and education across 10 countries.",
    stack: "scikit-learn · Pandas",
    href: null,
  },
  {
    title: "STL-10 Transfer Learning",
    detail: "Fine-tuned a pretrained ResNet18 for 10-class image classification with augmentation.",
    stack: "PyTorch · torchvision",
    href: null,
  },
  {
    title: "Diabetes Prediction",
    detail: "Imputation, scaling and Logistic Regression in one pipeline, evaluated with 5-fold CV.",
    stack: "scikit-learn",
    href: null,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
