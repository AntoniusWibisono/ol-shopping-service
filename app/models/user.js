
module.exports = (databaseConfig, DataTypes) => {
    databaseConfig.define('user', {
        id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        is_login: DataTypes.BOOLEAN,
        role: DataTypes.STRING,
    }, {
        tableName: 'user',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
    });
};