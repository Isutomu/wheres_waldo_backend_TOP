// Local Modules
const prismaClientSelector = require("../../config/prismaClientSelector");

// Method to be exported
const guessesCheckCorrect = async (reqBody, sessionId) => {
  const { characterId, positionX, positionY } = reqBody;
  const prisma = prismaClientSelector();

  const sessionInfo = await prisma.session.findFirst({
    where: { id: sessionId },
  });
  const charactersInPicture = await prisma.characterInPicture.findMany({
    where: { photoId: sessionInfo.photoId },
  });

  const isCorrect = charactersInPicture.reduce((correct, character) => {
    let check = false;
    if (character.id === characterId) {
      check =
        character.positionX === positionX && character.positionY === positionY;
    }

    return correct || check;
  }, false);
  return isCorrect;
};

module.exports = guessesCheckCorrect;
