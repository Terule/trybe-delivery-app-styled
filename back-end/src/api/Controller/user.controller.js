const loginUser = require('../Service/user.service')

const login = async (req, res) => {
    const { email, password } = req.body
    const { user } = await loginUser(email, password)
    return res.status(201).json(user)

}

module.exports = {
    login
}