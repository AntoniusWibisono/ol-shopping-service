
module.exports = (databaseConfig, DataTypes) => {
    databaseConfig.define('product_record', {
        id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
        wishlist_count: DataTypes.INTEGER,
        view_count: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER
    }, {
        tableName: 'product_record',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
    });
};