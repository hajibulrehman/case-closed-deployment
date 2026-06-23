require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');

const dbUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';
const dbFile = dbUrl.replace(/^file:/, '');
const dbPath = path.resolve(process.cwd(), dbFile);
const db = new Database(dbPath);

const migrations = [
  // Add section to Case
  `ALTER TABLE "Case" ADD COLUMN "section" TEXT NOT NULL DEFAULT 'cases'`,
  // Create Article table
  `CREATE TABLE IF NOT EXISTS "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "coverImage" TEXT,
    "tags" TEXT,
    "featured" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'published',
    "views" INTEGER NOT NULL DEFAULT 0,
    "relatedCases" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  // Create Quiz table
  `CREATE TABLE IF NOT EXISTS "Quiz" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "caseId" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "questions" TEXT NOT NULL,
    "coverImage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'published',
    "plays" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  // Create Theory table
  `CREATE TABLE IF NOT EXISTS "Theory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE,
    FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE
  )`,
];

let applied = 0;
for (const sql of migrations) {
  try {
    db.prepare(sql).run();
    applied++;
    console.log('✓', sql.split('\n')[0].trim().substring(0, 60));
  } catch (e) {
    if (e.message.includes('duplicate column') || e.message.includes('already exists')) {
      console.log('~ already exists:', sql.trim().split('\n')[0].substring(0, 60));
    } else {
      console.error('✗ Error:', e.message);
    }
  }
}

console.log(`\nDone. ${applied} migrations applied.`);
db.close();
