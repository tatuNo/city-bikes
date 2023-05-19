const { Op, fn, col, literal } = require("sequelize");
const router = require("express").Router();

const { Station, Journey } = require("../models");

router.get("/", async (req, res) => {
  const { limit = 10, offset = 0, search, circle } = req.query;
  let where = {};

  if (search) {
    where = {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          address: {
            [Op.iLike]: `%${search}%`,
          },
        },
      ],
    };
  }

  if (circle) {
    const { lat, lng, radius } = circle;
    where = {
      ...where,
      [Op.and]: [
        literal(`ST_Distance(
          ST_MakePoint("x_coordinate", "y_coordinate")::geography,
          ST_MakePoint(${lng}, ${lat})::geography
        ) <= ${radius}`),
      ],
    };
  }

  const stations = await Station.findAndCountAll({
    attributes: ["id", "name", "address", "xCoordinate", "yCoordinate"],
    limit,
    offset,
    where,
  });

  res.json(stations);
});

router.get("/:id", async (req, res) => {
  const station = await Station.findByPk(req.params.id, {
    attributes: ["id", "name", "address", "xCoordinate", "yCoordinate"],
    raw: true,
  });

  if (!station) {
    res.status(404).send({ error: "Station not found" });
  }

  const departureCount = await Journey.count({
    where: { departureStationId: req.params.id },
  });

  const returnCount = await Journey.count({
    where: { returnStationId: req.params.id },
  });

  const departureAvgDistance = await Journey.findAll({
    where: { departureStationId: req.params.id },
    attributes: [[fn("AVG", col("distance")), "avgDepartureDistance"]],
    raw: true,
    plain: true,
  });

  const returnAvgDistance = await Journey.findAll({
    where: { returnStationId: req.params.id },
    attributes: [[fn("AVG", col("distance")), "avgReturnDistance"]],
    raw: true,
    plain: true,
  });

  const returns = await Journey.findAll({
    where: { departureStationId: req.params.id },
    include: [
      {
        model: Station,
        as: "returnStation",
        attributes: ["name", "address", "id", "yCoordinate", "xCoordinate"],
      },
    ],
    attributes: [[fn("COUNT", col("returnStation.id")), "journeyCount"]],
    group: ["returnStation.id"],
    order: [[fn("COUNT", col("returnStation.id")), "DESC"]],
    limit: 10,
  });

  const departures = await Journey.findAll({
    where: { returnStationId: req.params.id },
    include: [
      {
        model: Station,
        as: "departureStation",
        attributes: ["name", "address", "id", "yCoordinate", "xCoordinate"],
      },
    ],
    attributes: [[fn("COUNT", col("departureStation.id")), "journeyCount"]],
    group: ["departureStation.id"],
    order: [[fn("COUNT", col("departureStation.id")), "DESC"]],
    limit: 10,
  });

  res.json({
    ...station,
    departureCount,
    returnCount,
    ...departureAvgDistance,
    ...returnAvgDistance,
    returns,
    departures,
  });
});

module.exports = router;
