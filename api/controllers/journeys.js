const { Op } = require("sequelize");
const router = require("express").Router();

const { Journey, Station } = require("../models");

const parseSortParam = (sort) => {
  const direction = sort.startsWith("-") ? "DESC" : "ASC";
  const field = sort.startsWith("-") ? sort.slice(1) : sort;

  if (field === "returnStation" || field === "departureStation") {
    return [[field, "name", direction]];
  }

  return [[field, direction]];
};

router.get("/", async (req, res) => {
  const {
    limit = 10,
    offset = 0,
    sort = "id",
    distance,
    duration,
    station,
  } = req.query;
  const order = parseSortParam(sort);

  let where = {};

  if (distance) {
    const [min, max] = distance.split(",").map(parseFloat);
    where.distance = { [Op.between]: [min, max] };
  }

  if (duration) {
    const [min, max] = duration.split(",").map(parseFloat);
    where.duration = { [Op.between]: [min, max] };
  }

  if (station) {
    where = {
      ...where,
      [Op.or]: [
        {
          "$departureStation.name$": {
            [Op.iLike]: `%${station}%`,
          },
        },
        {
          "$returnStation.name$": {
            [Op.iLike]: `%${station}%`,
          },
        },
      ],
    };
  }

  const journeys = await Journey.findAndCountAll({
    attributes: ["id", "distance", "duration"],
    include: [
      {
        model: Station,
        as: "departureStation",
        required: false,
      },
      {
        model: Station,
        as: "returnStation",
        required: false,
      },
    ],
    limit,
    offset,
    order,
    where,
  });
  res.json(journeys);
});

module.exports = router;
