// const { DataTypes } = require("../repository/dbConnection");
// const dbConnection = require("../repository/dbConnection");
/*
Stores details related to the user
userName, firstName, lastName, password, phoneNumber
*/
exports.defineUser = (dbConnection, DataTypes) => {
    const User = dbConnection.define('user', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        emailId : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        phoneNumber : {
            type : DataTypes.STRING(10),
            unique : true,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        permission : {
            type : DataTypes.STRING,
            allowNull : false,
            defaultValue : "NORMAL_USER"
        }
    });
    return User;   
}