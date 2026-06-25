# Deploying to Render

This project deploys as two services on Render's free plan:
- **case-closed-backend** — Node/Express Web Service
- **case-closed-frontend** — React/Vite Static Site
- **case-closed-db** — Free PostgreSQL database

---

## 1. Push to GitHub

```bash
git add .
git commit -m "chore: prepare for Render deployment"
git push
```

Make sure your repo is public, or connect a private repo via Render's GitHub integration.

---

## 2. Deploy via Blueprint (render.yaml)

1. Go to [render.com](https://render.com) → **New → Blueprint**
2. Connect your GitHub repo
3. Render detects `render.yaml` and shows the three resources — confirm and deploy
4. Wait for the first build to finish (takes a few minutes)

---

## 3. Wire up the two env variables (one-time step)

Because the frontend and backend are on separate domains, you need to tell each one where the other lives.

### Get the URLs
After the first deploy, find:
- Backend URL: `https://case-closed-backend.onrender.com` (shown in the backend service dashboard)
- Frontend URL: `https://case-closed-frontend.onrender.com` (shown in the frontend service dashboard)

*(The exact subdomain Render assigns may differ slightly — use what appears in your dashboard.)*

### Set CORS_ORIGIN on the backend
1. Render Dashboard → **case-closed-backend** → **Environment**
2. Add: `CORS_ORIGIN` = `https://case-closed-frontend.onrender.com`
3. Save → backend redeploys automatically

### Set VITE_API_URL on the frontend
1. Render Dashboard → **case-closed-frontend** → **Environment**
2. Add: `VITE_API_URL` = `https://case-closed-backend.onrender.com`
3. Save → **manually trigger a redeploy** (Static Sites need a redeploy for Vite to bake the URL into the build)

---

## 4. Done

Visit your frontend URL — it should be fully functional.

---

## Notes

**Uploaded files are ephemeral** — the `backend/uploads/` folder is wiped on every redeploy on Render's free tier. For a personal project this is usually fine. If you need persistence, consider:
- Render persistent disk (paid, ~$1/mo)
- Cloudflare R2 (free 10 GB)
- Supabase Storage (free tier)

**Free tier sleep** — Render's free Web Services spin down after 15 minutes of inactivity and take ~30s to wake up on the next request. The Static Site always stays live.

---

## Local development

```bash
# Terminal 1 — backend
cd backend
npm install
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173 and proxies `/api` to the backend at port 5000.
