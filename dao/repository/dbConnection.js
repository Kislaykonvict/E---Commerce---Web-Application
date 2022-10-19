const { Sequelize, DataTypes } = require("sequelize");
const config = require("../../configs/dbconfig");

const connection = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        HOST : config.HOST,
        dialect : config.dialect,
        pool : {
            max : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }
);


module.exports = {
    connection : connection,
    DataTypes : DataTypes
}