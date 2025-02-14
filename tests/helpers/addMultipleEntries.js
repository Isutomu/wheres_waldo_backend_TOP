// Local Modules
const prismaClientSelector = require("../../src/config/prismaClientSelector");
const prisma = prismaClientSelector();

const addEntries = async (data, type) => {
  let prismaFunction;
  switch (type) {
    case "photos":
      prismaFunction = prisma.photo.create;
      break;
    case "characters":
      prismaFunction = prisma.character.create;
      break;
    case "charactersInPicture":
      prismaFunction = prisma.characterInPicture.create;
      break;
    case "sessions":
      prismaFunction = prisma.session.create;
      break;
    case "scores":
      prismaFunction = prisma.score.create;
      break;
    default:
      throw new Error("No such datatype");
  }
  for (const entry of data) {
    await prismaFunction({ data: entry });
  }
};

module.exports = addEntries;
