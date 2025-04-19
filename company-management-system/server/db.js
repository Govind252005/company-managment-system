const {PrismaClient} = require("@prisma/client");
// const { PrismaClient } = pkg;

const prisma = new PrismaClient();

module.exports = prisma;
