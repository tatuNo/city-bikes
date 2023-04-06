const Journey = require("./journey");
const Station = require("./station");

Journey.sync();
Station.sync();

module.exports = { Journey, Station };
