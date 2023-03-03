const userService = require('../Service/user.service');

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

module.exports = {
    login,
    register,
};
