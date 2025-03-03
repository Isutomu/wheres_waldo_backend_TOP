// 3rd Party Modules
const asyncHandler = require("express-async-handler");

// Local Modules
const prismaClientSelector = require("../config/prismaClientSelector");
const requestSessionInitData = require("../helpers/requestSessionInitData");

// Methods to be executed on routes
const photos = asyncHandler(async (req, res) => {
  const prisma = prismaClientSelector();
  const data = await requestSessionInitData();
  const dateNow = new Date();

  await prisma.session.update({
    where: { id: req.session.id },
    data: {
      startTime: dateNow,
      endTime: dateNow,
      photoId: data.selectedPhoto.id,
    },
  });

  return res.status(200).json({
    data: { url: data.selectedPhoto.url, characters: data.characters },
  });
});

// Exports of all methods as object
module.exports = {
  photos,
};
