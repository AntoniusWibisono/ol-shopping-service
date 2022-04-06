const { models } = require('../../models');


const getAllProduct = async (req, res) => {
    try {
        const limit = req.query.limit ? parseFloat(req.query.limit) : 10;
        const offset = parseFloat(limit) * ((parseFloat(req.query.page || 1) || 1) - 1);

        const result = await models.product.findAll({
            subQuery: false,
            distinct: true,
            limit,
            offset,
        });
        
        return res.status(200).json({ result });
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = (router) => {
    router.get('/', getAllProduct);
}