function relationSetup(sequelize) {
	const { product, product_image, product_record, user, user_wishlist } = sequelize.models;

	product.hasMany(product_image, { foreignKey: 'product_id', targetKey: 'id' });
	product.hasOne(product_record, { foreignKey: 'product_id', targetKey: 'id' });

	product_record.belongsTo(product, { foreignKey: 'product_id', targetKey: 'id' });

	user.belongsToMany(product, { through: user_wishlist, foreignKey: 'user_id' });
	product.belongsToMany(user, { through: user_wishlist, foreignKey: 'product_id' });

	user_wishlist.belongsTo(user, { foreignKey: 'user_id' });
	user_wishlist.belongsTo(product, { foreignKey: 'product_id' });
}

module.exports = { relationSetup };