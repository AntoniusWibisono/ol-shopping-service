function relationSetup(sequelize) {
	const { Product, ProductImage } = sequelize.models;

	ProductImage.belongsTo(Product);
}

module.exports = { relationSetup };