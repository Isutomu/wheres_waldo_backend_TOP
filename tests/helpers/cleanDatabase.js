// Local Modules
const prismaClientSelector = require("../../src/config/prismaClientSelector");

const cleanDatabase = async () => {
  const prisma = prismaClientSelector();
  await prisma.score.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.characterInPicture.deleteMany({});
  await prisma.character.deleteMany({});
  await prisma.photo.deleteMany({});
};

module.exports = cleanDatabase;
