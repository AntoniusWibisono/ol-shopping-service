
module.exports = (databaseConfig, DataTypes) => {
    databaseConfig.define('user_wishlist', {
        id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
        user_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER
    }, {
        tableName: 'user_wishlist',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
    });
};