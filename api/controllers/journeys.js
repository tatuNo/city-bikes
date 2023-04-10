const { Op } = require("sequelize");
const router = require("express").Router();

const { Journey, Station } = require("../models");

router.get("/", async (req, res) => {
  const {
    limit = 10,
    offset = 0,
    sort = "id",
    distance,
    duration,
    station,
  } = req.query;

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
          returnStation: {
            [Op.iLike]: `%${station}%`,
          },
        },
        {
          departureStation: {
            [Op.iLike]: `%${station}%`,
          },
        },
      ],
    };
  }

  const order = sort.startsWith("-")
    ? [[sort.slice(1), "DESC"]]
    : [[sort, "ASC"]];

  const journeys = await Journey.findAndCountAll({
    attributes: ["id", "distance", "duration"],
    include: [
      { model: Station, as: "departureStation" },
      { model: Station, as: "returnStation" },
    ],
    limit,
    offset,
    order,
    where,
  });
  res.json(journeys);
});

module.exports = router;
