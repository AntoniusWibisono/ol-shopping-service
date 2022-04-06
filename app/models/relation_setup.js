function relationSetup(sequelize) {
	const { product, product_image, product_record } = sequelize.models;

	product.hasMany(product_image, { foreignKey: 'product_id', targetKey: 'id' });
	product.hasOne(product_record, { foreignKey: 'product_id', targetKey: 'id' });

	product_record.belongsTo(product, { foreignKey: 'product_id', targetKey: 'id' })
}

module.exports = { relationSetup };