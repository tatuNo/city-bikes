const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, { logging: false });

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("database connected");
  } catch (err) {
    console.log("connecting database failed");
    console.log(err);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
