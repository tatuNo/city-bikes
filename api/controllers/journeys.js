const router = require("express").Router();
const { Journey } = require("../models");

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;
  const journeys = await Journey.findAndCountAll({ limit, offset });
  res.json(journeys);
});

module.exports = router;
