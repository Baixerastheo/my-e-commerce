import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking database...');

  const existingProducts = await prisma.product.count();
  const existingEvents = await prisma.analyticsEvent.count();

  if (existingProducts > 0 || existingEvents > 0) {
    console.log(`Database already contains data:`);
    console.log(`   - ${existingProducts} products`);
    console.log(`   - ${existingEvents} analytics events`);
    console.log(`No seed needed - using existing database data`);
    return;
  }

  console.log('Database is empty. Seed is only needed for initial setup.');
  console.log('To populate the database, add your data via the API or directly in MySQL.');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

