const { models } = require('../../models');
const { verifyPassword, hashPassword, jwtSigner } = require('../../helpers/util');
const { validateAuth } = require('../../middleware/authenticate');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const result = await models.user.create({
            name,
            email,
            password: hashPassword(password),
            role
        });
        return res.status(201).json({ result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const storedUser = await models.user.findOne({
            where: {
                email
            }
        });
        if (!storedUser) throw new Error('user is not registered');
        const { id, is_login, role } = storedUser;
        if (is_login) throw new Error('user still logged in');
        if (!verifyPassword(password, storedUser.password)) throw new Error('user/password is incorrect');

        await models.user.update(
            { is_login: true },
            { where: { email } },
        )

        const access_token = jwtSigner({
            user_id:id,
            role,
        });
        
        return res.status(200).json({
            message: 'login success',
            access_token,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const { user_id } = req.user;

        await models.user.update(
            { is_login: false },
            { where: { id: user_id } },
        )

        return res.status(200).json({ message: 'logout success' });
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

module.exports = (router) => {
    router.post('/register', registerUser);
    router.post('/login', loginUser);
    router.get('/logout',validateAuth, logoutUser);
}