// Local Modules
const prismaClientSelector = require("../../config/prismaClientSelector");

// Method to be exported
const guessesCheckEnd = async (sessionId) => {
  const prisma = prismaClientSelector();

  const sessionInfo = await prisma.session.findFirst({
    where: { id: sessionId },
    select: {
      photo: { select: { charactersInPicture: true } },
      charactersFound: true,
    },
  });

  return (
    sessionInfo["photo"]["charactersInPicture"].length ===
    sessionInfo["charactersFound"].length
  );
};

module.exports = guessesCheckEnd;
