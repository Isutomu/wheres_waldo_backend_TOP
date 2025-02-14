// 3rd Party Modules
require("dotenv/config");
const express = require("express");
const request = require("supertest");
const cookieParser = require("cookie-parser");

// Local Modules
const routes = require("../../src/routes");
const prismaClientSelector = require("../../src/config/prismaClientSelector");
const cleanDatabase = require("../helpers/cleanDatabase");

// Server Initialization
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", routes);

// Tests
describe("Get tests", () => {
  const testData = require("../mockData/mockData");
  const prisma = prismaClientSelector();

  // Populate db with necessary entries for tests
  beforeAll(async () => {
    cleanDatabase();
    await prisma.photo.create({ data: testData.photo });
    for (const character of testData.characters)
      await prisma.character.create({ data: character });
    for (const characterInPicture of testData.charactersInPicture)
      await prisma.characterInPicture.create({ data: characterInPicture });
  });

  // Clean db
  afterAll(cleanDatabase);

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
      .expect("set-cookie", "sessionId=id")
      .expect(200, done);
  });
});
