// Local Modules
const prismaClientSelector = require("../../config/prismaClientSelector");

// Method to be exported
const addCharacterFound = async (sessionId, characterId) => {
  const prisma = prismaClientSelector();
  const sessionInfo = await prisma.session.findFirst({
    where: { id: sessionId },
  });
  const characterInPicture = await prisma.characterInPicture.findFirst({
    where: { characterId, photoId: sessionInfo.photoId },
  });

  const created = !!(await prisma.session.update({
    where: { id: sessionId },
    data: { charactersFound: { connect: { id: characterInPicture.id } } },
  }));

  return created;
};

module.exports = addCharacterFound;
