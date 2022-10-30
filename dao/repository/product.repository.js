// 1. define the table, create, retrieve By productId, listAllProducts, list ProductsByCategoryId
// 2. update and delete.

const defineCategory = require("../models/category.model");
const { defineProduct } = require("../models/product.model");
const dbConnection = require("./dbConnection");

// we need DB connection and DataType

const Product = defineProduct(dbConnection.connection, dbConnection.DataTypes);

//because we have a foriegn key relationship, we need the other table also

const createProductTable = async (forceCreation) => {
    const category = defineCategory(dbConnection.connection, dbConnection.DataTypes);
    Product.belongsTo(category, {
        foreignKey : "categoryId",
        targetKey : "id",
    });
    await Product.sync({ force : forceCreation});
}

const createProduct = async(product) => {
    return await Product.create({
        name : product.name,
        description : product.description,
        imageUrl : product.imageUrl,
        price : product.price,
        categoryId : product.categoryId
    });
}

const  createMultipleProducts = async (products) => {
    const validProducts = new Array();
    for(let product of products) {
        validProducts.push({
            name : product.name,
            description : product.description,
            imageUrl : product.imageUrl,
            price : product.price,
            categoryId : product.categoryId
        })
    }
    return await Product.bulkCreate(validProducts);
}
const fetchProductById = async (id) => {
    return await Product.findByPk(id)
}

const fetchAllProducts = async () => {
    return await Product.findAll();
}

const fetchProductsByCriteria = async (criteria) => {
    return await Product.findAll(criteria);
}


module.exports = {
    createProductTable : createProductTable,
    createProduct : createProduct,
    fetchAllProducts : fetchAllProducts,
    fetchProductsByCriteria : fetchProductsByCriteria,
    fetchProductById : fetchProductById,
    createMultipleProducts : createMultipleProducts
}