const { Op } = require("sequelize");
const router = require("express").Router();

const { Station } = require("../models");

router.get("/", async (req, res) => {
  const stations = await Station.findAndCountAll({});
  res.json(stations);
});

module.exports = router;
