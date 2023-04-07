const { Op } = require("sequelize");
const router = require("express").Router();

const { Station } = require("../models");

router.get("/", async (req, res) => {
  const { limit = 10, offset = 0, search } = req.query;
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

  const stations = await Station.findAndCountAll({
    attributes: ["id", "name", "address", "xCoordinate", "yCoordinate"],
    limit,
    offset,
    where,
  });
  res.json(stations);
});

module.exports = router;
