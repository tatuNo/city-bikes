const router = require("express").Router();
const { Journey } = require("../models");

router.get("/", async (req, res) => {
  const journeys = await Journey.findAll({ limit: 10 });
  res.json(journeys);
});

module.exports = router;
