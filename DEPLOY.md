# Deploying to Render

Everything runs as a single Web Service — Express builds and serves the React
frontend, so there's only one URL and no CORS configuration needed.

```
GitHub repo
    ↓
Render Blueprint (render.yaml)
    ├── case-closed-db   (free PostgreSQL)
    └── case-closed-app  (Node Web Service — API + React frontend)
```

---

## Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "chore: prepare for Render deployment"
git push
```

### 2. Deploy via Blueprint
1. [render.com](https://render.com) → **New +** → **Blueprint**
2. Connect your GitHub repo
3. Render detects `render.yaml` — confirm the two resources and click **Apply**
4. Wait ~5 minutes for the first build (it installs both frontend + backend deps)

### 3. Done
Visit the URL Render assigns to `case-closed-app` — the full app is live.

No env vars to manually set. `DATABASE_URL` and `JWT_SECRET` are auto-wired by Render.

---

## Build process (what happens on each deploy)
1. `npm install` — installs backend deps
2. `cd ../frontend && npm install && npm run build` — builds the React app into `frontend/dist`
3. `npx prisma generate` — generates the Prisma client
4. `npx prisma migrate deploy` — runs any pending DB migrations
5. `npm start` → `node src/index.js` — starts Express, which serves both `/api/*` and the React static files

---

## Notes

**Free tier sleep** — Render's free Web Service spins down after 15 min of inactivity.
First request after idle takes ~30s to wake up. Everything after that is instant.

**Uploaded files are ephemeral** — `backend/uploads/` is wiped on redeploy.
Fine for a personal project. For persistence use Render's persistent disk (paid)
or Cloudflare R2 (free).

---

## Local development (unchanged)
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```
