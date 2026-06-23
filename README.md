# CaseClosed — True Crime & Fiction Platform

A full-stack web app for real criminal case studies and user-written fiction.

## Quick Start

### 1. Start Backend
```
cd backend
npm run dev
```
Runs on http://localhost:5000

### 2. Start Frontend
```
cd frontend
npm run dev
```
Runs on http://localhost:5173

---

## Default Accounts

| Role  | Email                    | Password  |
|-------|--------------------------|-----------|
| Admin | hajibul@gmail.com        | hajibul  |
| User  | user@caseclosed.com      | user123   |

---

## Features

### Public
- Browse real criminal cases (murder, missing, genocide, police, etc.)
- Filter by category, search by keyword
- View case media (images, audio, video)
- Read user fiction stories based on real cases

### User Dashboard (/dashboard)
- Write fiction stories — published instantly
- Submit real-life account requests (requires admin approval)
- Track story status and admin feedback

### Admin Dashboard (/admin)
- Add/edit/delete real cases with media uploads
- Moderate fiction stories (approve/reject with notes)
- Review real-life story requests
- Manage users and roles

---

## Tech Stack
- Frontend: React + TypeScript + Tailwind CSS v4 + Vite
- Backend: Node.js + Express
- Database: SQLite (via Prisma 7 + better-sqlite3)
- Auth: JWT
