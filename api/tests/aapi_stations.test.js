const supertest = require("supertest");

const { sequelize } = require("../utils/db");
const app = require("../app");
const { Station } = require("../models");
const { initialStations } = require("./test_helper");

const api = supertest(app);

beforeAll(async () => {
  await Station.destroy({ where: {} });
  await Station.bulkCreate(initialStations);
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /stations", () => {
  test("stations are returned as json", async () => {
    await api
      .get("/api/stations")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("should return 5 stations with a limit of 5", async () => {
    const res = await api.get("/api/stations?limit=5").expect(200);
    expect(res.body.rows.length).toBe(5);
  });

  test("should return the second page of stations with a limit of 5 offset 5", async () => {
    const res = await api.get("/api/stations?limit=5&offset=5").expect(200);
    expect(res.body.rows.length).toBeGreaterThanOrEqual(0);
    expect(res.body.rows.length).toBeLessThanOrEqual(5);
  });

  test("should return stations whose name or address matches search parameter", async () => {
    const target = "lo";
    const res = await api.get(`/api/stations?search=${target}`).expect(200);

    const stations = res.body.rows;
    for (const station of stations) {
      const nameContainsTarget = station.name.includes(target);
      const addressContainsTarget = station.address.includes(target);
      expect(nameContainsTarget || addressContainsTarget).toBeTruthy();
    }
  });
});
