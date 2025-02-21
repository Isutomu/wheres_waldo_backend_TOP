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

// /**
//  * Test position guess route
//  */
// test("Post position guess(correct) route works", (done) => {
//   const data = {
//     check: true,
//   };
//   const reqData = {
//     characterId: "id1",
//     positionX: "1",
//     positionY: "1",
//   };

//   request(app)
//     .post("/guesses")
//     .type("json")
//     .set("Cookie", "sessionId=id1")
//     .send(reqData)
//     .expect("Content-Type", /json/)
//     .expect({ data })
//     .expect(200, done);
// });
// test("Post position guess(incorrect) route works", (done) => {
//   const data = {
//     check: false,
//   };
//   const reqData = {
//     characterId: "id1",
//     positionX: "100",
//     positionY: "10000",
//   };

//   request(app)
//     .post("/guesses")
//     .type("json")
//     .set("Cookie", "sessionId=id1")
//     .send(reqData)
//     .expect("Content-Type", /json/)
//     .expect({ data })
//     .expect(200, done);
// });
// test("Post position guess(correct and end) route works", (done) => {
//   const data = {
//     check: false,
//     end: true,
//   };
//   const reqData = {
//     characterId: "id3",
//     positionX: "3",
//     positionY: "3",
//   };

//   request(app)
//     .post("/guesses")
//     .type("json")
//     .set("Cookie", "sessionId=id2")
//     .send(reqData)
//     .expect("Content-Type", /json/)
//     .expect({ data })
//     .expect(200, done);
// });

// // Test adding new score route
// describe("Test adding scores", () => {
//   // Add sessions to database
//   beforeEach(async () => {
//     await addEntries(testData.sessions, "sessions");
//   });

//   // Clean db
//   afterEach(cleanDatabase);

//   test("Post new score route works", (done) => {
//     const data = { username: "isutomu", photoId: "id1", time: "00:02:30" };
//     const reqData = {
//       username: "isutomu",
//     };

//     request(app)
//       .post("/scores")
//       .type("json")
//       .set("Cookie", "sessionId=id1")
//       .send(reqData)
//       .expect("Content-Type", /json/)
//       .expect((res) =>
//         expect(res.body.data).toEqual(expect.objectContaining(data)),
//       )
//       .expect(201, done);
//   });
// });
