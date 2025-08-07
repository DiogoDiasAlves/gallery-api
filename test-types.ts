import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Teste para verificar os tipos
type UserType = typeof prisma.user;

console.log('Prisma User type:', typeof prisma.user);
