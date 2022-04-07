const { Op, col, where } = require('sequelize');
const { models } = require('../../models');


const getAllProduct = async (req, res) => {
    try {
        const limit = req.query.limit ? parseFloat(req.query.limit) : 10;
        const offset = parseFloat(limit) * ((parseFloat(req.query.page || 1) || 1) - 1);

        const { search, searchBy } = req.query;

        const findQuery = {
            subQuery: false,
            distinct: true,
            where: {},
            limit,
            offset
        }

        if (search && searchBy) {
            const searchCategory = searchBy.split(',');
            const arraySearch = []
            searchCategory.forEach(category => {
                const objCategory = {
                    category,
                }
                objCategory[category] = { [Op.like]: `%${search}%` };
                delete objCategory.category
                
                arraySearch.push(objCategory);

            })
            
            findQuery.where[Op.or] = arraySearch;
        }
        
        const result = await models.product.findAll(findQuery);
        
        return res.status(200).json({ result });
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const addProductToWishList = async (req, res) => {
    try {
        const { productId, userId } = req.params;

        const checkUserWishlist = await models.user_wishlist.findOne({
            where: {
                user_id: userId,
                product_id: productId,
            }
        })

        if (checkUserWishlist) throw new Error('User already wishlisted this product');
       
        await models.user_wishlist.create({
            user_id: userId,
            product_id: productId
        });
        
        await models.product_record.increment({wishlist_count: 1}, { where: { product_id: productId }});

        const result = await models.user.findOne({
            where: {
                id: userId
            },
            include: [
                {
                    model: models.product,
                    include: [
                        { model: models.product_image },
                        { model: models.product_record }
                    ]
                }
            ]
        })

        return res.status(200).json({result});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getWishListProduct = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishListResult = await models.user_wishlist.findAll({
            where: {
                user_id: userId
            },
            include: [
                { model: models.user },
                { model: models.product }
            ]
        });

        return res.status(200).json({wishListResult});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteWishListProduct = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        await models.user_wishlist.destroy({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        return res.status(200).json({ message: 'wishlist product removed '});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = (router) => {
    router.get('/', getAllProduct);
    router.post('/wishlist/:productId/:userId', addProductToWishList);
    router.get('/wishlist/:userId', getWishListProduct);
    router.delete('/wishlist/:productId/:userId', deleteWishListProduct);
}