const Sequelize = require('sequelize');
const databaseConfig = require('../configs/database');

const User = databaseConfig.define('user', {
    id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    tableName: 'user',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
})

module.exports = User;