const { Router } = require('express')
const { login } = require('../Controller/user.controller')

Router.post('/', login)

module.exports = Router;