require('dotenv').config();
const prisma = require('./src/utils/prisma');

const BASE = 'http://localhost:5000/api/imgproxy?url=';
const IMGS = [
  'https://images.unsplash.com/photo-1587474260584-136574b1e43a?w=800&h=450&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=450&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=450&fit=crop&auto=format&q=80',
];

async function main() {
  const quizzes = await prisma.quiz.findMany({ orderBy: { createdAt: 'asc' } });
  for (let i = 0; i < quizzes.length; i++) {
    const url = BASE + encodeURIComponent(IMGS[i % IMGS.length]);
    await prisma.quiz.update({ where: { id: quizzes[i].id }, data: { coverImage: url } });
    console.log('Updated:', quizzes[i].title);
  }
  console.log('Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
