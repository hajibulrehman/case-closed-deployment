require('dotenv').config();
const { PrismaClient } = require('.prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  // Render's PostgreSQL requires SSL
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
