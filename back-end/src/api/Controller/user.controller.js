const userService = require('../Service/user.service');
const { verifyToken } = require('../../utils/jwt');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);
        return res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const { email, password, role, name } = req.body;
        const { token } = await userService.registerUser({ email, password, role, name });
        return res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

const registerByAdmin = async (req, res, next) => {
    try {
        const adminToken = req.headers.authorization;
        verifyToken(adminToken);
        const { email, password, role, name } = req.body;
        const { token } = await userService.registerUser({ email, password, role, name });
        return res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

const getSeller = async (_req, res, next) => {
    try {
        const sellerList = await userService.getSeller();
        return res.status(200).json(sellerList);
    } catch (error) {
        next(error);
    }
};

const getUsers = async (_req, res, next) => {
    try {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    register,
    getSeller,
    registerByAdmin,
    getUsers,
};
