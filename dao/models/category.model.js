const defineCategory = (connection, DataTypes) => {
    const Category = connection.define("category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        },
    });
    return Category;
}

module.exports = defineCategory;