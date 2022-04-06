const { models } = require('../../models')

const createProduct = async (req,res) => {
    try {
        const { arrayImage } = req.body;
        if (arrayImage.length < 3) throw new Error('image product must be at least 3')
        delete req.body[arrayImage];
        const productResult = await models.product.create(req.body);
        const { id, title } = productResult;
        const bulkImageInput = arrayImage.map((eachImage, i) => {
            return {
                name: `${title} ${i+1}`,
                index: i+1,
                url: eachImage,
                product_id : id,
            }
        })
        const imageResult = await models.product_image.bulkCreate(bulkImageInput, { returning: true });

        return res.status(201).json({
            product: productResult,
            productImage: imageResult,
        })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await models.product.findOne({
            where: { id },
            include: [
                { model: models.product_image },
                { model: models.product_record }
            ],
        })
        const { price, discount } = result;
        const finalPrice = price - ( price * (discount/100) );
        
        return res.status(200).json({
            result, finalPrice
        }); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await models.product.update(
            data,
            {
                where: {
                    id
                }
            }
        )
        const result = await models.product.findOne({
            where: { id },
            include: [
                { model: models.product_image },
                { model: models.product_record }
            ]
        })
        return res.status(200).json({ result })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateProductImageById = async (req, res) => {
    try {
        const { id, index } = req.params;
        const data = req.body;
        await models.product_image.update(
            data,
            {
                where: {
                    product_id:id,
                    index,
                }
            }
        )
        const result = await models.product_image.findAll({
            where: { product_id:id },
        })
        return res.status(200).json({ result })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getHighestProductRecord = async (req, res) => {
    try {
        const { counter } = req.params;
        const result = await models.product_record.findAll({
            include: [
                { model: models.product }
            ],
            order: [[`${counter}_count`, 'DESC']],
            limit: 1
        })
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

module.exports = (router) => {
    router.post('/', createProduct);
    router.get('/highest/:counter', getHighestProductRecord);
    router.get('/:id', getProductById);
    router.put('/:id', updateProductById);
    router.put('/image/:id/:index', updateProductImageById);
}