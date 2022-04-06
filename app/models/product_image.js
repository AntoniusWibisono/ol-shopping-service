const Sequelize = require('sequelize');
const databaseConfig = require('../configs/database');
const Product = require('./product');

const ProductImage = databaseConfig.define('product_image', {
    id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
    name: Sequelize.STRING,
    index: Sequelize.INTEGER,
    url: Sequelize.STRING,
    product_id: Sequelize.INTEGER
}, {
    tableName: 'product_image',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
});

module.exports = ProductImage;