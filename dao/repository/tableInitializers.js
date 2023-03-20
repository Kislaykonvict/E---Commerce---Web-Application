const { createCartTable } = require("./cart.repository");
const {createCategoryTable} = require("./category.repository");
const { createProductTable } = require("./product.repository");
const {createUserTable} = require("./user.repository");

exports.initializeTables = (forceCreation) => {
    createCategoryTable(forceCreation);
    createProductTable(forceCreation);
    createUserTable(forceCreation);
    createCartTable(forceCreation);
}   