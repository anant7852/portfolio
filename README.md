# Anant — Portfolio

A fast, single-page portfolio for Data Scientist / ML Engineer roles, built with
Next.js (App Router) + TypeScript. The hero features an animated "actual vs.
predicted" forecast chart — a nod to real production forecasting work — and each
featured project has its own case-study page.

## 1. Make it yours (5 minutes)

Open **`lib/content.ts`**. It's the only file you need to edit. Search for `TODO`:

- **Your full name** (recruiters need the real one).
- **Links**: email, GitHub, LinkedIn, résumé.
- **Live demo + code links** for each project (fill these in as they go live).
- Read each **case study** — they're written as strong first drafts from your
  actual work. Make sure every claim is true, then tighten the wording in your
  own voice.

Then drop your résumé PDF into **`public/`** and name it to match
`profile.links.resume` (default: `public/Anant_Sharma_Resume.pdf`).

## 2. Run it locally

```bash
npm install
npm run dev        # open http://localhost:3000
```

## 3. Deploy to Vercel (2 minutes)

1. Push this folder to a **new GitHub repo**:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. Go to **vercel.com** → **Add New… → Project** → import the repo.
3. Vercel auto-detects Next.js. Click **Deploy**. Done — you get a live URL.
4. (Optional) Add a custom domain in the Vercel project settings.

## Where to host live model demos

Vercel is perfect for this frontend, but **don't** try to host heavy ML models
in Vercel serverless functions (size/time limits). Instead:

- **Hugging Face Spaces** (Gradio/Streamlit) — easiest for an interactive model demo.
- **Render** / **Railway** — for a small FastAPI/Flask inference service.
- **Modal** — for heavier, on-demand GPU inference.

Host the model there, then paste that public URL into the project's `demo`
field in `lib/content.ts`. The "demo (soon)" label switches to a live link
automatically.

## Adding a 4th project (recommended: one GenAI/RAG project)

In `lib/content.ts`, copy any object in the `projects` array and edit it. Set
`featured: true` to surface it on the homepage. The case-study page is generated
automatically from the data — no new files needed.

## Structure

```
app/
  layout.tsx          fonts + metadata
  page.tsx            homepage (hero, metrics, work, approach, contact)
  globals.css         all styling / design tokens
  work/[slug]/page.tsx   per-project case study (data-driven)
components/
  ForecastChart.tsx   the animated hero chart
lib/
  content.ts          ← YOU EDIT THIS
public/                your résumé PDF, og image, etc.
```
