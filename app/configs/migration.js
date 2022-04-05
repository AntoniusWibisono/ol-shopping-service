const config = require('../../config');

const migrationConfig = {
    username: config.get('DB_USER'),
    password: config.get('DB_PASS'),
    database: config.get('DB_NAME'),
    host: config.get('DB_HOST'),
    dialect: 'mysql'
};

module.exports = migrationConfig;