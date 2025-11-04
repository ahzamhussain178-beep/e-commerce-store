const { PrismaClient } = require('@prisma/client');

// Create a single shared Prisma client instance
// In serverless or dev with hot reload you might want to attach it to global to avoid
// creating many clients during module reloads.
let prisma;
if (global.prisma) {
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
  global.prisma = prisma;
}

module.exports = prisma;
