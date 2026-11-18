export type Credential = {
  title: string;
  issuer: string;
  date: string;
  note?: string;
};

export const education = {
  degree: "BSc Software Engineering",
  school: "Makerere University",
  period: "2020 — 2024",
  graduated: "Graduated 2025",
  honours: "Second Class Upper",
};

export const aiTraining: Credential[] = [
  {
    title: "AI & Machine Learning Certificate",
    issuer: "Refactory Academy",
    date: "Aug 2026",
    note: "10X full-tuition scholarship. Python for AI, data analytics, ML foundations, deep learning and applied ML.",
  },
  {
    title: "AI & Machine Learning Certificate",
    issuer: "Tech SkillUp Program, Lift Horizon Foundation",
    date: "Jul 2026",
    note: "Applied projects in clustering, regression, neural networks and model deployment.",
  },
];

export const otherCredentials: Credential[] = [
  {
    title: "Soft Skills Certificate",
    issuer: "BrighterMonday Uganda × Mastercard Foundation",
    date: "Mar 2026",
  },
  {
    title: "Internship Training Certificate — Web Application Development",
    issuer: "Stratcom Communications",
    date: "Aug 2023",
  },
];

/** The ML workflow shown as a pinned, scroll-driven pipeline. Techniques come from real projects. */
export const pipeline = [
  {
    step: "Data",
    title: "Collect & understand",
    techniques: ["Kaggle & UCI datasets", "Image labelling in Roboflow", "Structured & unstructured data"],
  },
  {
    step: "Prepare",
    title: "Clean & explore",
    techniques: ["Imputing invalid zeros", "One-hot & label encoding", "Leakage-safe scaling", "EDA"],
  },
  {
    step: "Features",
    title: "Engineer signal",
    techniques: ["RFM features", "Category affinity", "PCA"],
  },
  {
    step: "Model",
    title: "Train & compare",
    techniques: ["Logistic Regression", "Random Forest & XGBoost", "ANNs & ResNet18", "YOLOv8", "K-Means"],
  },
  {
    step: "Evaluate",
    title: "Measure what matters",
    techniques: ["Recall-first metrics", "Threshold tuning", "GridSearchCV", "Cross-validation", "Silhouette score"],
  },
  {
    step: "Ship",
    title: "Deploy & explain",
    techniques: ["Gradio apps", "Hugging Face Spaces", "Findings for non-technical audiences"],
  },
];
