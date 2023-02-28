const Users = require('../../database/models/Users')
const errorHandler = require('../../middleware/error.middleware')
const bcrypt = require('bcryptjs')
const { createToken } = require('../../utils/jwt')

 const loginUser = async (email, password) => {
        const user = await Users.findOne({
            where: { email }
        })  

        const decode = bcrypt.compareSync(password, user.password)
        
        if (!user || !decode) {
            throw new errorHandler(404, 'Not Found')
        }
        const token = createToken(email)
        return { user, token }
}

 const registerUser = async ( name, email, password, role ) => {
    const user = await Users.findOne({
        where: { email }
    })  
    if (user) {
        
    }
 }


module.exports = {
    loginUser
}