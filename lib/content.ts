// ─────────────────────────────────────────────────────────────
//  EDIT EVERYTHING HERE. This is the only file you need to touch
//  to make the site yours. Search for  TODO  to find the spots
//  that still need your input (demo/code links, case-study verification).
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Anant Verma",
  // A short, specific one-liner. This sits under your name in the hero.
  tagline: "Data scientist shipping production forecasting and GenAI systems.",
  // One or two sentences a recruiter reads in 5 seconds.
  blurb:
    "I build ML that businesses actually run on — demand and price forecasting in production, financial reconciliation pipelines, and applied GenAI. Currently a Data Analyst at Zingbus, looking for Data Scientist / ML Engineer roles.",
  location: "New Delhi, India",

  links: {
    email: "anantverma163@gmail.com",
    github: "https://github.com/anant7852",
    linkedin: "https://www.linkedin.com/in/anant-verma-/",
    // Drop your resume PDF into the /public folder with this EXACT filename
    // (case-sensitive), or change this string to match your PDF's filename.
    resume: "/AnantVerma_DS_Resume.pdf",
  },
};

// Headline numbers. Keep these to 3–4 that a recruiter can't ignore.
// Written in the mono "data" typeface on the site.
// TODO: confirm each of these is exactly accurate before publishing.
export const metrics = [
  { value: "11.2%", label: "MAPE, seat-demand model", sub: "Gradient Boosting, service-level" },
  { value: "8.3%", label: "MAPE, average-selling-price model", sub: "7-day rolling forecasts" },
  { value: "1", label: "production financial pipeline owned", sub: "GMV · GST · contribution margin" },
  { value: "3", label: "OTA partners reconciled", sub: "automated, daily" },
];

export type Project = {
  slug: string;
  title: string;
  kind: string; // short category label, mono
  summary: string; // one line for the card
  stack: string[];
  // Links shown on the card. Omit any you don't have yet.
  demo?: string; // TODO: live demo URL (yield-copilot, once deployed)
  code?: string; // TODO: GitHub repo URL for this project's code
  featured: boolean;
  // Long-form case study, shown at /work/<slug>. Written as a strong
  // first draft — VERIFY every claim before publishing (see Hard rule 2
  // in CLAUDE.md). Cut anything you can't defend in an interview.
  caseStudy: {
    problem: string;
    approach: string[];
    results: string[];
    learnings: string;
  };
};

export const projects: Project[] = [
  {
    slug: "demand-price-forecasting",
    title: "Demand & Price Forecasting",
    kind: "PRODUCTION ML",
    summary:
      "Gradient Boosting models that forecast seat demand and average selling price per service, pushed daily to an ops dashboard.",
    stack: ["Python", "Gradient Boosting", "scikit-learn", "PostgreSQL", "Google Sheets API"],
    demo: "", // TODO: paste yield-copilot's live Vercel URL here once deployed
    code: "", // TODO: your GitHub repo link for this project
    featured: true,
    caseStudy: {
      problem:
        "Operations needed to price and allocate seats before demand was known. Static rules over- and under-priced routes, leaving revenue on the table and seats empty. The team needed per-service, forward-looking estimates they could act on each morning.",
      approach: [
        "Framed two targets — seat demand and average selling price (ASP) — as separate regression problems, since they respond to different signals (lead time and seasonality drive demand; competition and route mix drive ASP).",
        "Engineered features from booking curves, lead time, day-of-week and seasonal effects, route and operator attributes.",
        "Trained Gradient Boosting models, tuned for error on the metrics ops cared about rather than raw R², and validated on a rolling time-based split to avoid leakage.",
        "Wrapped inference in a pipeline that writes 7-day, service-level forecasts to a Google Sheets dashboard the ops team already lived in.",
      ],
      results: [
        "~11.2% MAPE (≈3.54 MAE) on seat demand and ~8.3% MAPE (≈₹93) on ASP.",
        "Forecasts delivered per service, 7 days out, refreshed automatically.",
        "Gave ops a single forward-looking view instead of reacting after the fact.",
      ],
      learnings:
        "The modelling was the easy 20%. The hard, valuable 80% was getting clean features out of messy operational data and delivering the output somewhere people would actually use it. A model nobody opens has zero MAPE that matters.",
    },
  },
  {
    slug: "dsr-financial-pipeline",
    title: "DSR — Financial Reporting Pipeline",
    kind: "DATA ENGINEERING",
    summary:
      "Production pipeline reconciling GMV, GST and contribution margin across OTA partners — refactored from a monolith notebook into deployable services.",
    stack: ["Python", "Flask", "PostgreSQL", "MongoDB", "Redash API"],
    demo: "",
    code: "", // TODO: your GitHub repo link for this project
    featured: true,
    caseStudy: {
      problem:
        "Daily revenue reporting ran as one fragile monolithic notebook. It reconciled money across multiple online travel agency partners, but it was hard to trust, hard to change, and impossible to deploy as a service.",
      approach: [
        "Mapped the reconciliation logic end to end — GMV, GST, contribution margin, per-partner rules — and found where numbers silently diverged between notebook versions.",
        "Broke the monolith into modular, testable components and wrapped them as Flask services so the pipeline could be deployed and scheduled rather than run by hand.",
        "Rebuilt revenue-sharing logic with bracket-based, per-trip contract parsing, plus overrides for cases the old code got wrong.",
        "Pulled from PostgreSQL and MongoDB with Redash API integration to source the underlying data reliably.",
      ],
      results: [
        "A reporting pipeline that can be deployed and scheduled instead of manually executed.",
        "Reconciliation across multiple OTA partners with the per-partner and per-contract edge cases handled explicitly.",
        "Revenue mismatches between versions traced and closed.",
      ],
      learnings:
        "Financial code has to be correct before it's elegant — one wrong GST edge case is a real rupee mismatch someone has to explain. Refactoring here meant proving the new path matched the old one number-for-number before switching over.",
    },
  },
  {
    slug: "medcam",
    title: "MedCam",
    kind: "SHIPPED PRODUCT",
    summary:
      "Android app that reads medical documents with on-device OCR and turns them into structured, plain-language explanations via an LLM.",
    stack: ["Android", "Java", "Google ML Kit", "LLM API", "OCR"],
    demo: "",
    code: "", // TODO: your GitHub repo link for this project
    featured: true,
    caseStudy: {
      problem:
        "Medical documents — prescriptions, reports — are dense and hard for patients to read. The goal was a phone app that could photograph a document and return something a normal person understands.",
      approach: [
        "Used Google ML Kit for on-device OCR so text extraction was fast and worked without shipping images to a server.",
        "Passed the extracted text to an LLM API with prompting that structured and explained the content in plain language.",
        "Built the whole flow as a native Android app — capture, extract, explain — end to end.",
      ],
      results: [
        "A working end-to-end product, not a notebook: camera in, understandable explanation out.",
        "On-device OCR keeps extraction responsive and privacy-friendly.",
      ],
      learnings:
        "Shipping a real app forces decisions notebooks let you dodge — latency, error states, what happens when OCR returns garbage. Those constraints are exactly what production ML work is about.",
    },
  },
  // ── Add your GenAI / RAG project here when it's ready. The 2026 market
  //    rewards one strong LLM project heavily. Copy the shape above.
  //    Suggested: RAG over a domain corpus with real chunking + eval.
];

export const approach = {
  eyebrow: "HOW I WORK",
  heading: "Models are the easy part. Shipping them is the job.",
  body: [
    "Most of my work lives in the unglamorous 80% — getting clean signal out of messy operational data, making pipelines deployable, and putting output where people will actually use it.",
    "I care about the metric the business feels, not the one that looks good in a notebook. Rolling time-based validation over inflated R². Correct before clever, especially where money is involved.",
    "I'm comfortable across the stack: feature engineering and modelling, the SQL and pipelines underneath, and the deployment that turns a model into something a team runs on every morning.",
  ],
};
