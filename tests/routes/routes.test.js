// 3rd Party Modules
require("dotenv/config");
const express = require("express");
const request = require("supertest");
const cookieParser = require("cookie-parser");

// Local Modules
const routes = require("../../src/routes");
const prismaClientSelector = require("../../src/config/prismaClientSelector");
const cleanDatabase = require("../helpers/cleanDatabase");
const addEntries = require("../helpers/addMultipleEntries");
const testData = require("../mockData/mockDataForDb");

// Server Initialization
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", routes);

// Populate db with necessary entries for tests
beforeEach(async () => {
  await cleanDatabase();

  await addEntries(testData.photos, "photos");
  await addEntries(testData.characters, "characters");
  await addEntries(testData.charactersInPicture, "charactersInPicture");
});

// Clean db
afterEach(cleanDatabase);

// Tests
// Test get photo route
test("Get photo route works", (done) => {
  const data = {
    url: "url",
    charactersInPicture: {
      characters: [
        {
          name: "Odlaw",
          url: "url",
        },
        {
          name: "Woof",
          url: "url",
        },
      ],
    },
  };

  request(app)
    .get("/photos")
    .expect("Content-Type", /json/)
    .expect({ data })
    .expect("set-cookie", "sessionId=id1")
    .expect(200, done);
});

/**
 * Test position guess route
 */
test("Post position guess(correct) route works", (done) => {
  const data = {
    check: true,
  };
  const reqData = {
    characterId: "id1",
    positionX: "1",
    positionY: "1",
  };

  request(app)
    .post("/guesses")
    .type("json")
    .set("Cookie", "sessionId=id1")
    .send(reqData)
    .expect("Content-Type", /json/)
    .expect({ data })
    .expect(200, done);
});
test("Post position guess(incorrect) route works", (done) => {
  const data = {
    check: false,
  };
  const reqData = {
    characterId: "id1",
    positionX: "100",
    positionY: "10000",
  };

  request(app)
    .post("/guesses")
    .type("json")
    .set("Cookie", "sessionId=id1")
    .send(reqData)
    .expect("Content-Type", /json/)
    .expect({ data })
    .expect(200, done);
});
test("Post position guess(correct and end) route works", (done) => {
  const data = {
    check: false,
    end: true,
  };
  const reqData = {
    characterId: "id3",
    positionX: "3",
    positionY: "3",
  };

  request(app)
    .post("/guesses")
    .type("json")
    .set("Cookie", "sessionId=id2")
    .send(reqData)
    .expect("Content-Type", /json/)
    .expect({ data })
    .expect(200, done);
});

// Test adding new score route
describe("Test adding scores", () => {
  // Add sessions to database
  beforeEach(async () => {
    await addEntries(testData.sessions, "sessions");
  });

  // Clean db
  afterEach(cleanDatabase);

  test("Post new score route works", (done) => {
    const data = { username: "isutomu", photoId: "id1", time: "00:02:30" };
    const reqData = {
      username: "isutomu",
    };

    request(app)
      .post("/scores")
      .type("json")
      .set("Cookie", "sessionId=id1")
      .send(reqData)
      .expect("Content-Type", /json/)
      .expect((res) =>
        expect(res.body.data).toEqual(expect.objectContaining(data))
      )
      .expect(201, done);
  });
});
