const dbConnection = require("./dbConnection");
const defineCategory = require("../models/category.model");

const Category = defineCategory(dbConnection.connection, dbConnection.DataTypes);

const createCategoryTable = async (forceCreation) => {
    await Category.sync({force : forceCreation})
}
//function to create a new row in the category table

const save = async (category) => {
    return await Category.create({
        name : category.name,
        description : category.description
    })
}

const fetchCategoryByID = async(id) => {
    return await Category.findByPk(id)
}

const fetchAllCategories = async() => {
    return await Category.findAll();
}

const fetchCategoriesByCriteria = async(criteria) => {
    return await Category.findAll(criteria);
}

module.exports = {
    createCategoryTable : createCategoryTable,
    addCategory : save,
    fetchCategoryByID : fetchCategoryByID,
    fetchAllCategories : fetchAllCategories,
    fetchCategoriesByCriteria : fetchCategoriesByCriteria
}