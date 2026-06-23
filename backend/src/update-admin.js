require('dotenv').config();
const prisma = require('./utils/prisma');
const bcrypt = require('bcryptjs');

async function main() {
  const hashed = await bcrypt.hash('hajibul', 10);
  const result = await prisma.user.updateMany({
    where: { role: 'admin' },
    data: { email: 'hajibul@gmail.com', password: hashed }
  });
  console.log(`✅ Updated ${result.count} admin account(s)`);
  console.log('   Email:    hajibul@gmail.com');
  console.log('   Password: hajibul');
}

main().catch(console.error).finally(() => prisma.$disconnect());
