const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Journey extends Model {}

Journey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departureDate: {
      type: DataTypes.DATE,
    },
    returnDate: {
      type: DataTypes.DATE,
    },
    departureStationId: {
      type: DataTypes.INTEGER,
    },
    returnStationId: {
      type: DataTypes.INTEGER,
    },
    distance: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "journey",
  }
);

module.exports = Journey;
