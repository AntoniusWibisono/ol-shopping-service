const Sequelize = require('sequelize');
const databaseConfig = require('../configs/database');
const ProductImage = require('./product_image');

const Product = databaseConfig.define('product', {
    id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    brand: Sequelize.STRING,
    type: Sequelize.STRING,
    price: Sequelize.INTEGER,
    discount: Sequelize.INTEGER,
}, {
    tableName: 'product',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
})

Product.hasMany(ProductImage, { foreignKey: 'product_id' });

module.exports = Product;