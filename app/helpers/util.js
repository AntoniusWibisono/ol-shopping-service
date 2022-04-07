const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const verifyPassword = (inputPass, storedPass) => {
    return bcrypt.compareSync(inputPass, storedPass);
}

const hashPassword = (inputPassword) => {
    return bcrypt.hashSync(inputPassword, bcrypt.genSaltSync(6));
}

const jwtSigner = (payload) => {
    return jwt.sign(payload, config.get('JWT_SECRET'));
}

const jwtVerify = (token) => {
    return jwt.verify(token, config.get('JWT_SECRET'));
}

module.exports = {
    hashPassword,
    verifyPassword,
    jwtSigner,
    jwtVerify
}