const supertest = require("supertest");

const { sequelize } = require("../utils/db");
const app = require("../app");
const { Journey } = require("../models");
const initialJourneys = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
  await Journey.destroy({ where: {} });
  await Journey.bulkCreate(initialJourneys);
});

afterAll(async () => {
  await Journey.destroy({ where: {} });
  await sequelize.close();
});

describe("GET /journeys", () => {
  test("journeys are returned as json", async () => {
    await api
      .get("/api/journeys")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("should return 7 journeys with a limit of 7", async () => {
    const res = await api.get("/api/journeys?limit=7").expect(200);
    expect(res.body.rows.length).toBe(7);
  });

  test("should return the second page of journeys with a limit of 5 offset 5", async () => {
    const res = await api.get("/api/journeys?limit=5&offset=5").expect(200);
    expect(res.body.rows[0].depatureStation).toBe("Station 6");
  });

  test("should return all journeys when limit is greater than number of journeys", async () => {
    const res = await api.get("/api/journeys?limit=54").expect(200);
    expect(res.body.rows.length).toBe(10);
  });

  test("should return journeys in descending order based on distance", async () => {
    const res = await api.get("/api/journeys?sort=-distance").expect(200);

    const journeys = res.body.rows;
    for (let i = 0; i < journeys.length - 1; i += 1) {
      expect(journeys[i].distance >= journeys[i + 1].distance).toBeTruthy();
    }
  });

  test("should return journeys in ascending order based on distance", async () => {
    const res = await api.get("/api/journeys?sort=distance").expect(200);

    const journeys = res.body.rows;
    for (let i = 0; i < journeys.length - 1; i += 1) {
      expect(journeys[i].distance <= journeys[i + 1].distance).toBeTruthy();
    }
  });
});
