// ─────────────────────────────────────────────────────────────
//  EDIT EVERYTHING HERE. This is the only file you need to touch
//  to make the site yours.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Anant Verma",
  // A short, specific one-liner. This sits under your name in the hero.
  tagline: "Data scientist shipping production forecasting and GenAI systems.",
  // One or two sentences a recruiter reads in 5 seconds.
  blurb:
    "I build ML that businesses actually run on — demand and price forecasting in production, financial reconciliation pipelines, and a grounded RAG system over biomedical literature. Currently a Data Analyst at Zingbus, looking for Data Scientist / ML Engineer roles.",
  location: "New Delhi, India",

  links: {
    email: "anantverma163@gmail.com",
    github: "https://github.com/anant7852",
    linkedin: "https://www.linkedin.com/in/anant-verma-/",
    // Drop your REAL resume PDF into /public with this EXACT filename
    // (case-sensitive). It is currently a placeholder stub — replace it.
    resume: "/Anant_resume.pdf",
  },
};

// Headline numbers. Keep these to 3–4 that a recruiter can't ignore.
export const metrics = [
  { value: "11.2%", label: "MAPE, seat-demand model", sub: "Gradient Boosting, service-level" },
  { value: "8.3%", label: "MAPE, average-selling-price model", sub: "7-day rolling forecasts" },
  { value: "96%", label: "retrieval recall, Evidentia RAG", sub: "100% grounded · 71% abstention" },
  { value: "3", label: "OTA partners reconciled", sub: "automated, daily" },
];

export type Project = {
  slug: string;
  title: string;
  kind: string; // short category label, mono
  summary: string; // one line for the card
  stack: string[];
  demo?: string;
  code?: string;
  featured: boolean;
  caseStudy: {
    problem: string;
    approach: string[];
    results: string[];
    learnings: string;
  };
};

export const projects: Project[] = [
  {
    slug: "evidentia-rag",
    title: "Evidentia — Grounded Biomedical RAG",
    kind: "GENAI / RAG",
    summary:
      "A retrieval-augmented Q&A system over 400 vaccine-efficacy papers that cites every claim and refuses to answer what the evidence doesn't support.",
    stack: ["RAG", "Hybrid Retrieval (BM25 + dense)", "Gemini", "Next.js", "TypeScript"],
    demo: "https://evidentia-eight.vercel.app/",
    code: "https://github.com/anant7852/evidentia",
    featured: true,
    caseStudy: {
      problem:
        "A raw LLM will confidently state a medical 'fact' it never learned — an unacceptable failure mode in a clinical context. The goal was a question-answering system over real research that only makes claims it can trace to a source, and that declines when the evidence isn't there rather than guessing.",
      approach: [
        "Filtered ~400 COVID-19 vaccine-efficacy papers from the public CORD-19 corpus (~1.06M rows), fixing two real data bugs along the way: off-topic keyword matches, and a recency cap that collapsed the corpus into a two-month window.",
        "Chunked and embedded the papers, then built hybrid retrieval — dense embeddings for meaning plus BM25 for exact biomedical terms (drug and vaccine names), fused with a weighting — since keyword matching genuinely outperforms pure vector search on this vocabulary.",
        "Added query decomposition so multi-part clinical questions are split, retrieved separately, and synthesized.",
        "Constrained generation to cite every factual sentence back to a retrieved chunk, and to abstain when the evidence doesn't cover the question.",
        "Built an evaluation harness of 35 hand-written questions — answerable, multi-part, and deliberately unanswerable — and measured the pipeline against it.",
      ],
      results: [
        "96% retrieval recall and 100% of answers fully grounded in cited sources.",
        "71% correct abstention on unanswerable questions — most RAG systems never refuse at all, so measuring and getting this right is the hard part.",
        "Interactive citations: every [n] marker in an answer links to its source paper.",
        "Deployed serverless on Vercel — the committed index plus a Gemini call means no model server to host.",
      ],
      learnings:
        "The headline feature isn't the chatbot, it's the refusal. A system that knows what it doesn't know is worth far more in a real deployment than one that always answers. Building the eval to measure abstention — and reporting 71% honestly rather than hiding it — taught me more than pushing any single metric higher would have.",
    },
  },
  {
    slug: "demand-price-forecasting",
    title: "Yield Copilot — Demand & Price Forecasting",
    kind: "PRODUCTION ML",
    summary:
      "Gradient Boosting models for seat demand and price, with an in-browser explorer that finds the revenue-maximising fare per departure — no model server.",
    stack: ["Python", "Gradient Boosting", "scikit-learn", "Next.js", "TypeScript"],
    demo: "https://yield-copilot-three.vercel.app/",
    code: "https://github.com/anant7852/yield-copilot",
    featured: true,
    caseStudy: {
      problem:
        "Operations needed to price and allocate seats before demand was known. Static rules over- and under-priced routes, leaving revenue on the table and seats empty. The team needed per-service, forward-looking estimates they could act on.",
      approach: [
        "Framed two targets — seat demand and average selling price (ASP) — as separate regression problems, since they respond to different signals (lead time and seasonality drive demand; competition and route mix drive ASP).",
        "Engineered features from booking curves, lead time, day-of-week and seasonal effects, route and operator attributes.",
        "Trained Gradient Boosting models and validated on a time-based split to avoid leakage.",
        "For the public demo, exported the fitted trees to JSON and evaluated them client-side in TypeScript — verified to match scikit-learn's own predictions to 1e-6 — so the whole thing runs with no model server.",
      ],
      results: [
        "~11.2% MAPE on seat demand and ~8.3% MAPE on ASP in the production work.",
        "An interactive explorer that recomputes forecasts live and surfaces the revenue-maximising fare per departure.",
        "Zero-latency, zero-cost inference: a static Vercel deploy with no backend.",
      ],
      learnings:
        "Demand alone doesn't set price — revenue does, and it peaks somewhere you can't eyeball. Matching the deployment to the model mattered too: tree ensembles are small enough to ship to the browser, which a transformer wouldn't be. Picking the right architecture for the model is part of the job.",
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
    code: "",
    featured: true,
    caseStudy: {
      problem:
        "Daily revenue reporting ran as one fragile monolithic notebook. It reconciled money across multiple online travel agency partners, but it was hard to trust, hard to change, and impossible to deploy as a service.",
      approach: [
        "Mapped the reconciliation logic end to end — GMV, GST, contribution margin, per-partner rules — and found where numbers silently diverged between notebook versions.",
        "Broke the monolith into modular components and wrapped them as Flask services so the pipeline could be deployed and scheduled rather than run by hand.",
        "Rebuilt revenue-sharing logic with bracket-based, per-trip contract parsing, plus overrides for cases the old code got wrong.",
        "Pulled from PostgreSQL and MongoDB with Redash API integration to source the underlying data reliably.",
      ],
      results: [
        "A reporting pipeline that can be deployed and scheduled instead of manually executed.",
        "Reconciliation across 4+ OTA partners with per-partner and per-contract edge cases handled explicitly.",
        "Revenue mismatches between versions traced and closed.",
      ],
      learnings:
        "Financial code has to be correct before it's elegant — one wrong GST edge case is a real rupee mismatch someone has to explain. Refactoring here meant proving the new path matched the old one number-for-number before switching over.",
    },
  },
  {
    slug: "medcam",
    title: "Med-Cam",
    kind: "SHIPPED PRODUCT",
    summary:
      "Android app that reads medical labels with on-device OCR and turns them into structured, plain-language explanations via an LLM.",
    stack: ["Android", "Java", "Google ML Kit", "LLM API", "OCR"],
    demo: "",
    code: "https://github.com/anant7852/Med-Cam",
    featured: true,
    caseStudy: {
      problem:
        "Medical labels and documents are dense and hard for patients to read. The goal was a phone app that could photograph a label and return something a normal person understands.",
      approach: [
        "Used Google ML Kit for on-device OCR so text extraction was fast and worked without shipping images to a server.",
        "Passed the extracted text to an LLM API with prompting that structured and explained the content in plain language — uses, dosage, side effects.",
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
];

export const approach = {
  eyebrow: "HOW I WORK",
  heading: "Models are the easy part. Shipping them is the job.",
  body: [
    "Most of my work lives in the unglamorous 80% — getting clean signal out of messy operational data, making pipelines deployable, and putting output where people will actually use it.",
    "I care about the metric the business feels, not the one that looks good in a notebook. Rolling time-based validation over inflated R². Correct before clever, especially where money is involved.",
    "I'm comfortable across the stack: feature engineering and modelling, the SQL and pipelines underneath, the RAG and LLM systems on top, and the deployment that turns a model into something a team runs on every morning.",
  ],
};
