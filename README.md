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
| `NEXTAUTH_URL` | Your deployed URL (e.g. `https://yourdomain.com`) |

---

## Deploy to Firebase App Hosting + Cloudflare Domain

### Prerequisites

- Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)
- Domain purchased and managed via Cloudflare
- Firebase CLI installed: `npm install -g firebase-tools`

---

### Step 1 — Configure `.firebaserc`

Replace `YOUR_FIREBASE_PROJECT_ID` in `.firebaserc` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "hustlespark-abc12"
  }
}
```

---

### Step 2 — Store secrets in Google Secret Manager

Firebase App Hosting reads secrets from Google Secret Manager. Run these commands once:

```bash
firebase login
firebase use --add   # select your project

# Store each secret (paste the value when prompted)
firebase apphosting:secrets:set openrouter-api-key
firebase apphosting:secrets:set stripe-secret-key
firebase apphosting:secrets:set google-client-id
firebase apphosting:secrets:set google-client-secret
firebase apphosting:secrets:set nextauth-secret
```

---

### Step 3 — Update `apphosting.yaml`

Replace the placeholder values in `apphosting.yaml`:

```yaml
- variable: NEXTAUTH_URL
  value: https://yourdomain.com          # ← your actual domain

- variable: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  value: pk_live_xxxxxxxxxxxxxxxxxxxx    # ← your Stripe publishable key
```

---

### Step 4 — Create a Firebase App Hosting backend

1. Go to [Firebase Console](https://console.firebase.google.com) → your project
2. Click **App Hosting** in the left sidebar
3. Click **Get started**
4. Connect your **GitHub repository**
5. Set the **root directory** to `/` (project root)
6. Set the **live branch** to `main` (or your production branch)
7. Click **Finish and deploy**

Firebase will build and deploy automatically on every push to that branch.

---

### Step 5 — Add your Cloudflare domain

After the first deployment completes:

1. In Firebase Console → App Hosting → your backend → **Domains**
2. Click **Add custom domain**
3. Enter your domain (e.g. `hustlespark.com`)
4. Firebase will display DNS records to add — copy them

#### In Cloudflare Dashboard:

1. Go to your domain → **DNS** → **Records**
2. Add the records Firebase gave you:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| `A` | `@` | `199.36.158.100` *(Firebase IP)* | **DNS only** (grey cloud) |
| `CNAME` | `www` | `your-backend-id.web.app` | **DNS only** (grey cloud) |

> **Important:** Set Cloudflare proxy to **DNS only** (grey cloud, not orange) for the records Firebase requires. Firebase handles its own TLS/CDN.

3. Wait for DNS propagation (usually 5–30 minutes)
4. Firebase will automatically provision an SSL certificate

---

### Step 6 — Update Google OAuth authorized URLs

In [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → your OAuth client:

- **Authorized JavaScript origins:** add `https://yourdomain.com`
- **Authorized redirect URIs:** add `https://yourdomain.com/api/auth/callback/google`

---

### Automatic deploys

Once connected, every push to your live branch triggers a new Firebase App Hosting deployment automatically. No extra CI/CD setup needed.

---

## Deploy to Render (original)

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
