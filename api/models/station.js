const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Station extends Model {}

Station.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stationId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    xCoordinate: {
      type: DataTypes.STRING,
    },
    yCoordinate: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "station",
  }
);

module.exports = Station;
