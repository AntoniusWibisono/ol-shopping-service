const Product = require("../../models/product");
const ProductImage = require('../../models/product_image');

const createProduct = async (req,res) => {
    try {
        const { arrayImage } = req.body;
        if (arrayImage.length < 3) throw new Error('image product must be at least 3')
        delete req.body[arrayImage];
        const productResult = await Product.create(req.body);
        const { id, title } = productResult;
        const bulkImageInput = arrayImage.map((eachImage, i) => {
            return {
                name: `${title} ${i+1}`,
                index: i+1,
                url: eachImage,
                product_id : id,
            }
        })
        const imageResult = await ProductImage.bulkCreate(bulkImageInput, { returning: true });

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
        const result = await Product.findOne({
            where: { id },
            include: [{ model: ProductImage }],
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
        await Product.update(
            data,
            {
                where: {
                    id
                }
            }
        )
        const result = await Product.findOne({
            where: { id },
            include: [{ model: ProductImage }]
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
        await ProductImage.update(
            data,
            {
                where: {
                    product_id:id,
                    index,
                }
            }
        )
        const result = await ProductImage.findAll({
            where: { product_id:id },
        })
        return res.status(200).json({ result })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = (router) => {
    router.post('/', createProduct);
    router.get('/:id', getProductById);
    router.put('/:id', updateProductById);
    router.put('/image/:id/:index', updateProductImageById);
}