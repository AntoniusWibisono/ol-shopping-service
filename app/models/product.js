
module.exports = (databaseConfig, DataTypes) => {
    databaseConfig.define('product', {
        id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        brand: DataTypes.STRING,
        type: DataTypes.STRING,
        price: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
    }, {
        tableName: 'product',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
    });
};