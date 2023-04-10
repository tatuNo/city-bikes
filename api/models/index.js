const Journey = require("./journey");
const Station = require("./station");

Station.hasMany(Journey, {
  foreignKey: "departureStationId",
  as: "departures",
});
Station.hasMany(Journey, {
  foreignKey: "returnStationId",
  as: "returns",
});
Journey.belongsTo(Station, {
  foreignKey: "departureStationId",
  as: "departureStation",
});
Journey.belongsTo(Station, {
  foreignKey: "returnStationId",
  as: "returnStation",
});

module.exports = { Journey, Station };
