# ⚡ HustleSpark

AI-powered hustle idea generator for teens — built with Next.js.

## Stack

- **Next.js 14** (App Router) — frontend + backend in one
- **NextAuth.js** — Google OAuth
- **OpenRouter AI** — hustle idea generation
- **Stripe** — payments

## Local Setup

```bash
npm install
cp .env.example .env.local
# Fill in your keys in .env.local
npm run dev
```

## Environment Variables

| Variable | Where to get it |
|---|---|
| `OPENROUTER_API_KEY` | [openrouter.ai/keys](https://openrouter.ai/keys) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `GOOGLE_CLIENT_ID` | [Google Cloud Console](https://console.cloud.google.com) → APIs → Credentials |
| `GOOGLE_CLIENT_SECRET` | Same as above |
| `NEXTAUTH_SECRET` | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your deployed URL (e.g. https://hustlespark.onrender.com) |

## Deploy to Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add all env variables in the Environment tab
6. Deploy!

> No separate frontend/backend services needed — Next.js handles everything in one deployment.
