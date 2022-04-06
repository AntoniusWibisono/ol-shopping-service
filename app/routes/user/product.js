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

module.exports = (router) => {
    router.get('/', getAllProduct);
}