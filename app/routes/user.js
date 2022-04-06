const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await User.create({ name, email, password });
        return res.status(201).json({ result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }  
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findOne({ where: { id } })
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = (router) => {
    router.post('/', createUser);
    router.get('/:id', getUser);
}