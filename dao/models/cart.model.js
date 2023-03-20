/*
1. cartId
2. ProductId, Quantity and Price
*/

const defineCart = (connection, DataTypes) => {
    const Cart = connection.define('cart', {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        cost : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        }
    });
    return Cart;
}

module.exports = defineCart