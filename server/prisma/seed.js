const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const password = 'Admin123!';
  const hash = await bcrypt.hash(password, 10);
  // create admin if not exists
  await prisma.user.upsert({
    where: { email: 'admin@zzqstores.com' },
    update: {},
    create: { email: 'admin@zzqstores.com', passwordHash: hash, role: 'admin' }
  });

  // sample products
  const existing = await prisma.product.count();
  if (existing === 0) {
    await prisma.product.createMany({ data: [
      { title: 'Sample Shirt', description: 'Comfortable shirt', price: 29.99, images: '[]', stock: 10 },
      { title: 'Sample Pants', description: 'Stylish pants', price: 49.99, images: '[]', stock: 5 }
    ]});
  }

  console.log('Seed complete.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
