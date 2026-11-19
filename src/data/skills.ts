import {
  siCss,
  siDjango,
  siDocker,
  siGit,
  siGithub,
  siGithubactions,
  siGooglecolab,
  siHtml5,
  siJavascript,
  siJupyter,
  siKeras,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPhp,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRoboflow,
  siScikitlearn,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siUltralytics,
  siGradio,
  siHuggingface,
  type SimpleIcon,
} from "simple-icons";

/** Either a brand logo from Simple Icons or the name of a Lucide icon for concepts. */
export type SkillIcon = { brand: SimpleIcon } | { concept: ConceptIcon };
export type ConceptIcon =
  | "api"
  | "database"
  | "brain"
  | "gauge"
  | "layers"
  | "boxes"
  | "workflow"
  | "test"
  | "clipboard"
  | "users"
  | "tree";

export type Skill = {
  name: string;
  icon: SkillIcon;
  /** Short, honest note on where you've used it — shown on hover/focus. */
  note: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces that are fast, accessible and pleasant to use.",
    skills: [
      { name: "React", icon: { brand: siReact }, note: "EMS, Fees Management System, client websites" },
      { name: "Next.js", icon: { brand: siNextdotjs }, note: "EMS, Job Portal, Document Generator, this site" },
      { name: "TypeScript", icon: { brand: siTypescript }, note: "Default for production work at AIBOS" },
      { name: "JavaScript", icon: { brand: siJavascript }, note: "ES6+, including vanilla JS dashboards" },
      { name: "HTML", icon: { brand: siHtml5 }, note: "Semantic, accessible markup" },
      { name: "CSS", icon: { brand: siCss }, note: "Responsive, mobile-first layouts" },
      { name: "Tailwind CSS", icon: { brand: siTailwindcss }, note: "Design systems and rapid UI work" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs and application logic that hold up in production.",
    skills: [
      { name: "Node.js", icon: { brand: siNodedotjs }, note: "EMS services, payment webhook & ledger service" },
      { name: "Python", icon: { brand: siPython }, note: "Document Generator backend, all ML work" },
      { name: "PHP", icon: { brand: siPhp }, note: "USSD engine with PHP 8" },
      { name: "Laravel", icon: { brand: siLaravel }, note: "Client websites, Event Pass QR" },
      { name: "Django", icon: { brand: siDjango }, note: "Fees Management System backend (internship)" },
      { name: "REST APIs", icon: { concept: "api" }, note: "Design, integration, webhooks and validation" },
    ],
  },
  {
    id: "data",
    title: "Databases",
    blurb: "Relational data, modelled carefully and queried efficiently.",
    skills: [
      { name: "PostgreSQL", icon: { brand: siPostgresql }, note: "EMS data, append-only ledger, spatial search" },
      { name: "SQL", icon: { concept: "database" }, note: "Indexing, constraints, EXPLAIN ANALYZE" },
      { name: "Supabase", icon: { brand: siSupabase }, note: "Job Application Portal" },
      { name: "MySQL", icon: { brand: siMysql }, note: "Web application projects" },
      { name: "Relational design", icon: { concept: "layers" }, note: "Schemas, normalisation and data modelling" },
    ],
  },
  {
    id: "ai",
    title: "AI & ML",
    blurb: "Formal training and hands-on projects across the ML workflow.",
    skills: [
      { name: "scikit-learn", icon: { brand: siScikitlearn }, note: "Classification, clustering, pipelines" },
      { name: "PyTorch", icon: { brand: siPytorch }, note: "Fraud detection network, ResNet18 transfer learning" },
      { name: "TensorFlow", icon: { brand: siTensorflow }, note: "Wilt Guard, churn prediction" },
      { name: "Keras", icon: { brand: siKeras }, note: "Bank churn ANN" },
      { name: "XGBoost", icon: { concept: "tree" }, note: "Credit card fraud detection" },
      { name: "YOLOv8", icon: { brand: siUltralytics }, note: "Wilt Guard object detection" },
      { name: "Roboflow", icon: { brand: siRoboflow }, note: "Image labelling and preprocessing" },
      { name: "Pandas", icon: { brand: siPandas }, note: "Cleaning and exploratory analysis" },
      { name: "NumPy", icon: { brand: siNumpy }, note: "Numerical work behind every model" },
      { name: "Gradio", icon: { brand: siGradio }, note: "Interactive model demos" },
      { name: "Hugging Face", icon: { brand: siHuggingface }, note: "Publishing demos on Spaces" },
      { name: "Model evaluation", icon: { concept: "gauge" }, note: "Recall-first metrics, threshold tuning, CV" },
      { name: "Deep learning", icon: { concept: "brain" }, note: "Neural networks, CNNs, transfer learning" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Practice",
    blurb: "How I ship: version control, containers and a steady process.",
    skills: [
      { name: "Git", icon: { brand: siGit }, note: "Daily, across every project" },
      { name: "GitHub", icon: { brand: siGithub }, note: "Collaboration, reviews and releases" },
      { name: "Docker", icon: { brand: siDocker }, note: "Containerised setups with Docker Compose" },
      { name: "CI/CD", icon: { brand: siGithubactions }, note: "Automated build and deployment workflows" },
      { name: "Jupyter", icon: { brand: siJupyter }, note: "Notebooks for analysis and modelling" },
      { name: "Google Colab", icon: { brand: siGooglecolab }, note: "Notebooks for ML coursework and experiments" },
      { name: "Agile", icon: { concept: "workflow" }, note: "Scrum and Kanban in a 4-person team" },
      { name: "Software testing", icon: { concept: "test" }, note: "Testing features before they reach users" },
      { name: "Requirements analysis", icon: { concept: "clipboard" }, note: "Turning conversations into specs" },
      { name: "UAT", icon: { concept: "users" }, note: "User acceptance testing with real users" },
    ],
  },
];

/** Logos for the scrolling band above the skills section. */
export const marqueeIcons: { name: string; icon: SimpleIcon }[] = skillCategories
  .flatMap((c) => c.skills)
  .filter((s): s is Skill & { icon: { brand: SimpleIcon } } => "brand" in s.icon)
  .map((s) => ({ name: s.name, icon: s.icon.brand }));
