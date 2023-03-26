const supertest = require("supertest");

const { sequelize } = require("../utils/db");
const app = require("../app");

const api = supertest(app);

test("journeys are returned as json", async () => {
  await api
    .get("/api/journeys")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await sequelize.close();
});
