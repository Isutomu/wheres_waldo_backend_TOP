// Local Modules

const prismaClientSelector = require("../../config/prismaClientSelector");

// Method to be exported
const setEndTime = async (sessionId) => {
  const prisma = prismaClientSelector();

  await prisma.session.update({
    where: { id: sessionId },
    data: { endTime: new Date() },
  });
};

module.exports = setEndTime;
