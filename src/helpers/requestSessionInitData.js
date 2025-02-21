// Local Modules
const prismaClientSelector = require("../config/prismaClientSelector");

const requestSessionInitData = async () => {
  const prisma = prismaClientSelector();

  const photos = await prisma.photo.findMany({
    select: {
      id: true,
      url: true,
      charactersInPicture: { select: { id: true } },
    },
  });
  const i = Math.floor(Math.random() * photos.length);
  const selectedPhoto = photos[i];

  const charactersInPictureId = selectedPhoto.charactersInPicture.map(
    (character) => character.id,
  );
  const characters = [];
  for (const id of charactersInPictureId) {
    const character = await prisma.characterInPicture.findUnique({
      where: { id: id },
      include: {
        character: true,
      },
    });
    characters.push({
      name: character.character.name,
      url: character.character.url,
    });
  }

  return { selectedPhoto, characters };
};

module.exports = requestSessionInitData;
