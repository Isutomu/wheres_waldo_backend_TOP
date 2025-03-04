// 3rd Party Modules
require("dotenv/config");
const express = require("express");
const request = require("supertest");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

// Local Modules
const routes = require("../../src/routes");
const prismaClientSelector = require("../../src/config/prismaClientSelector");
const cleanDatabase = require("../helpers/cleanDatabase");
const addEntries = require("../helpers/addMultipleEntries");
const singleTestData = require("../mockData/singleMockDataForDb");
const testData = require("../mockData/mockDataForDb");

// Server Initialization
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/", routes);

// Populate db with necessary entries for tests
beforeEach(async () => {
  await cleanDatabase();

  await addEntries(singleTestData.photos, "photos");
  await addEntries(singleTestData.characters, "characters");
  await addEntries(singleTestData.charactersInPicture, "charactersInPicture");
  await addEntries(singleTestData.sessions, "sessions");
});

// Clean db
afterEach(cleanDatabase);

// Tests
// Test get photo route
test("Get photo route works", (done) => {
  // Add session on request
  const sessionId = testData.sessions[0].id;
  const injectUser = async (req, res, next) => {
    req.session = { id: sessionId };
    res.cookie("sid", sessionId, { httpOnly: true });
    next();
  };
  const routesWithSession = express().use(injectUser).use(routes);

  const data = {
    url: "url1",
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
  };

  request(routesWithSession)
    .get("/photos")
    .expect("Content-Type", /json/)
    .expect({ data })
    .expect("set-cookie", `sid=${sessionId}; Path=/; HttpOnly`)
    .expect(200)
    .end((err, res) => {
      if (err) {
        console.error(res.error);
      }
      done(err);
    });
});

// Test adding new score route
test("Post new score route works", (done) => {
  const data = {
    username: testData.scores[0].username,
    photoId: testData.scores[0].photoId,
    time: testData.scores[0].time,
  };
  const reqData = {
    username: "isutomu",
  };
  const sessionId = testData.sessions[0].id;
  const injectUser = async (req, res, next) => {
    req.session = { id: sessionId };
    req.body = reqData;
    res.cookie("sid", sessionId, { httpOnly: true });
    next();
  };
  const routesWithSession = express().use(injectUser).use(routes);

  request(routesWithSession)
    .post("/scores")
    .expect("Content-Type", /json/)
    .expect((res) =>
      expect(res.body.data).toEqual(expect.objectContaining(data)),
    )
    .expect(201)
    .end((err, res) => {
      if (err) {
        console.error(res.error);
      }
      done(err);
    });
});

/**
 * Test position guess route
 */
test("Post position guess(correct) route works", (done) => {
  const data = {
    check: true,
  };
  const reqData = {
    characterId: testData.charactersInPicture[0].characterId,
    positionX: testData.charactersInPicture[0].positionX,
    positionY: testData.charactersInPicture[0].positionY,
  };

  const sessionId = testData.sessions[0].id;
  const injectUser = async (req, res, next) => {
    req.session = { id: sessionId };
    req.body = reqData;
    res.cookie("sid", sessionId, { httpOnly: true });
    next();
  };
  const routesWithSession = express().use(injectUser).use(routes);

  request(routesWithSession)
    .post("/guesses")
    .expect("Content-Type", /json/)
    .expect({ data })
    .expect(200)
    .end((err, res) => {
      if (err) {
        console.error(res.error);
      }
      done(err);
    });
});
test("Post position guess(incorrect) route works", (done) => {
  const data = {
    check: false,
  };
  const reqData = {
    characterId: testData.charactersInPicture[0].characterId,
    positionX: testData.charactersInPicture[0].positionX + "error",
    positionY: testData.charactersInPicture[0].positionY + "error",
  };

  const sessionId = testData.sessions[0].id;
  const injectUser = async (req, res, next) => {
    req.session = { id: sessionId };
    req.body = reqData;
    res.cookie("sid", sessionId, { httpOnly: true });
    next();
  };
  const routesWithSession = express().use(injectUser).use(routes);

  request(routesWithSession)
    .post("/guesses")
    .expect("Content-Type", /json/)
    .expect({ data })
    .expect(200, done);
});
describe("full mock data tests", () => {
  // Populate db with necessary entries for tests
  beforeEach(async () => {
    await cleanDatabase();

    await addEntries(testData.photos, "photos");
    await addEntries(testData.characters, "characters");
    await addEntries(testData.charactersInPicture, "charactersInPicture");
    await addEntries(testData.sessions, "sessions");
  });

  // Clean db
  afterEach(cleanDatabase);

  test("Post position guess(correct and end) route works", (done) => {
    const data = {
      check: true,
      end: true,
    };
    const reqData = {
      characterId: testData.charactersInPicture[2].characterId,
      positionX: testData.charactersInPicture[2].positionX,
      positionY: testData.charactersInPicture[2].positionY,
    };

    const sessionId = testData.sessions[1].id;
    const injectUser = async (req, res, next) => {
      req.session = { id: sessionId };
      req.body = reqData;
      res.cookie("sid", sessionId, { httpOnly: true });
      next();
    };
    const routesWithSession = express().use(injectUser).use(routes);

    request(routesWithSession)
      .post("/guesses")
      .send(reqData)
      .expect("Content-Type", /json/)
      .expect({ data })
      .expect(200, done);
  });
});
