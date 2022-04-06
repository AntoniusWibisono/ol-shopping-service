const config  = require('../../config');
const Sequelize = require('sequelize');
const { relationSetup } = require('./relation_setup');

const databaseConfig = new Sequelize(
    config.get('DB_NAME'),
    config.get('DB_USER'),
    config.get('DB_PASS'),
    {
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        dialect: 'mysql',
        operatorAliases: Sequelize.Op,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

const modelDefiners = [
    require('./product'),
    require('./product_image'),
    require('./product_record'),
    require('./user')
]

for (const eachModel of modelDefiners) {
    eachModel(databaseConfig, Sequelize.DataTypes);
}

relationSetup(databaseConfig);

module.exports = databaseConfig;