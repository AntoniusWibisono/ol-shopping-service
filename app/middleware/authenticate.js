const { jwtVerify } = require('../helpers/util');

const validateAuth = (req, res, next) => {
    try {
        const decoded = jwtVerify(req.headers.access_token);
        const { user_id, role } = decoded;
        req.user = {
            user_id,
            role
        }
        next()
    } catch (error) {
        res.status(401).json({message:'unauthenticated user'});
    }
}

const validateAdmin = (req, res, next) => {
    try {
        const decoded = jwtVerify(req.headers.access_token);
        if (decoded.role !== 'admin') throw new Error('forbidden');
        next()
    } catch (error) {
        res.status(403).json({message:'forbidden'});
    }
}

module.exports = { validateAuth, validateAdmin };