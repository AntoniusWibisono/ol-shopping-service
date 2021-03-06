
module.exports = (databaseConfig, DataTypes) => {
    databaseConfig.define('product_image', {
        id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
        name: DataTypes.STRING,
        index: DataTypes.INTEGER,
        url: DataTypes.STRING,
        product_id: DataTypes.INTEGER
    }, {
        tableName: 'product_image',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
    });
};