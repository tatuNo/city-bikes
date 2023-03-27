const router = require("express").Router();

const { Journey } = require("../models");

router.get("/", async (req, res) => {
  const { limit = 10, offset = 0, sort = "id" } = req.query;
  const order = sort.startsWith("-")
    ? [[sort.slice(1), "DESC"]]
    : [[sort, "ASC"]];

  const journeys = await Journey.findAndCountAll({ limit, offset, order });
  res.json(journeys);
});

module.exports = router;
