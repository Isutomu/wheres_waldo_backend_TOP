// 3rd Party Modules
const { PrismaClient } = require("@prisma/client");

/**
 * Returns a PrismaClient instance with its database url properly
 * set according to how the application was run.
 *
 * @returns {Object} A PrismaClient instance.
 */
const prismaClientSelector = () => {
  let url;

  switch (process.env.NODE_ENV) {
    case "production":
      url = process.env.DATABASE_URL;
      break;
    case "development":
      url = process.env.DEV_DATABASE_URL;
      break;
    case "test":
      url = process.env.TEST_DATABASE_URL;
      break;
    default:
      throw new Error("Mode not disclosed");
  }

  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
};

module.exports = prismaClientSelector;
