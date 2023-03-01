const userService = require('../Service/user.service');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token } = await userService.loginUser(email, password);
        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const { email, password, role, name } = req.body;
        await userService.registerUser(email, password, role, name);
        res.status(201).json({ message: 'Created' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    register,
};
