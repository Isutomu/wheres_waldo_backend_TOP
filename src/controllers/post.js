// 3rd Party Modules
const asyncHandler = require("express-async-handler");

// Local Modules
const prismaClientSelector = require("../config/prismaClientSelector");

// Methods to be executed on routes
const scores = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const sessionId = req.session.id;
  const prisma = prismaClientSelector();

  const sessionInfo = await prisma.session.findFirst({
    where: { id: sessionId },
  });
  const scoreRecord = await prisma.score.create({
    data: {
      username: username,
      photoId: sessionInfo.photoId,
      time: new Date(sessionInfo.endTime - sessionInfo.startTime),
    },
  });

  return res.status(201).json({ data: scoreRecord });
});

// Export of all methods as object
module.exports = {
  scores,
};
