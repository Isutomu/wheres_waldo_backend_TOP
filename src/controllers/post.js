// 3rd Party Modules
const asyncHandler = require("express-async-handler");

// Local Modules
const prismaClientSelector = require("../config/prismaClientSelector");
const addCharacterFound = require("./helpers/postGuessesAddCharacterFound");
const guessesCheckCorrect = require("./helpers/postGuessesCheckCorrect");
const guessesCheckEnd = require("./helpers/postGuessesCheckEnd");
const setEndTime = require("./helpers/postGuessesSetEndTime");

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

const guesses = asyncHandler(async (req, res) => {
  const sessionId = req.session.id;

  const isCorrect = await guessesCheckCorrect(req.body, sessionId);
  if (isCorrect) await addCharacterFound(sessionId, req.body.characterId);
  const isEnd = await guessesCheckEnd(sessionId);
  if (isEnd) await setEndTime(sessionId);

  const data = isEnd ? { check: isCorrect, end: isEnd } : { check: isCorrect };
  return res.status(200).json({ data });
});

// Export of all methods as object
module.exports = {
  scores,
  guesses,
};
