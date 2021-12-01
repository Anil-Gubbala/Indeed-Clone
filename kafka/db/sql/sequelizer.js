const Sequelize = require("sequelize");
const { type } = require("../../redis/redisConfig");
const config = require("./config");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const types = Sequelize.DataTypes;

const reviews = sequelize.define("reviews", {
  _id: {
    // type: Sequelize.STRING,
    type: types.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  companyId: { type: types.STRING, allowNull: false },
  userId: { type: types.INTEGER, allowNull: false },
  date: { type: types.DATE, allowNull: false },
  upVotes: { type: types.INTEGER, allowNull: false },
  downVotes: { type: types.INTEGER, allowNull: false },
  rating: { type: types.INTEGER, allowNull: false },
  summary: { type: types.STRING, allowNull: false },
  review: { type: types.STRING, allowNull: false },
  pros: { type: types.STRING, allowNull: false },
  cons: { type: types.STRING, allowNull: false },
  approval: { type: types.STRING, allowNull: false },
  prep: { type: types.STRING, allowNull: false },
  status: { type: types.INTEGER, allowNull: false, default: 0 }, // 0: not reviewed, 1: pass, 2: fail
  featured: { type: types.STRING, allowNull: false, default: 0 },
});

db.reviews = reviews;

module.exports = db;
