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
    depatureDate: {
      type: DataTypes.DATE,
    },
    returnDate: {
      type: DataTypes.DATE,
    },
    depatureStationId: {
      type: DataTypes.INTEGER,
    },
    depatureStation: {
      type: DataTypes.TEXT,
    },
    returnStationId: {
      type: DataTypes.INTEGER,
    },
    returnStation: {
      type: DataTypes.TEXT,
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
