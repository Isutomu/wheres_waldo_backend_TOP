module.exports.photos = [{ id: "id1", url: "url1" }];

module.exports.characters = [
  {
    id: "id1",
    name: "Odlaw",
    url: "url",
  },
  {
    id: "id2",
    name: "Woof",
    url: "url",
  },
];

module.exports.charactersInPicture = [
  {
    id: "id1",
    positionX: "1",
    positionY: "1",
    photoId: "id1",
    characterId: "id1",
  },
  {
    id: "id2",
    positionX: "2",
    positionY: "2",
    photoId: "id1",
    characterId: "id2",
  },
];

module.exports.sessions = [
  {
    id: "id1",
    sid: "id1",
    data: '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}',
    expiresAt: "2025-02-16T21:02:30Z",
    photoId: "id1",
    startTime: "2025-02-14T19:00:00Z",
    endTime: "2025-02-14T19:02:30Z",
  },
];

module.exports.scores = [
  {
    username: "isutomu",
    photoId: "id1",
    time: "00:02:30",
  },
];
