const dbConnection = require("./dbConnection");
const defineCart = require("../models/cart.model");
const { Product } = require("./product.repository");
const { User } = require("./user.repository");

const Cart = defineCart(dbConnection.connection, dbConnection.DataTypes);

const createCartTable = async (forceCreation) => {
    const CartProduct = dbConnection.connection.define('cart_product', {
        quantity : {
            type : dbConnection.DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 1
        }
    });
    Product.belongsToMany(Cart, {
        through : 'cart_product'
    });
    Cart.belongsToMany(Product, {
        through : 'cart_product'
    });
    Cart.belongsTo(User, {
        foreignKey : {
            name : 'username',
            unique : true
        },
        targetKey : 'username'
    });
    await Cart.sync({force : forceCreation});
    await Product.sync({force : forceCreation});
    await CartProduct.sync({force : forceCreation});
}

const createCart = async (cart) => {
    return await Cart.create(cart);
}

const updateCart = async (cart) => {
    return await Cart.update(cart);
}

const fetchCartById = async (id) => {
    return await Cart.findByPk(id);
}

module.exports = {
    createCartTable,
    createCart,
    updateCart,
    fetchCartById
}