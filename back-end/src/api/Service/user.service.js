const { User } = require('../../database/models')
const errorHandler = require('../../middleware/error.middleware')
const bcrypt = require('bcryptjs')
const { createToken } = require('../../utils/jwt')
const  NotFoundError = require('../../utils/errors/notFoundError')
const ConflictError = require('../../utils/errors/conflictError')

 const loginUser = async (email, password) => {
        const user = await User.findOne({
            where: { email }
        })  
        if(!user) {
            throw new NotFoundError('Not Found')
        }

        const decode = bcrypt.compareSync(password, user.password)
        
        if (!decode) {
            throw new NotFoundError('Not Found')
        }
        const token = createToken(email)
        return { user, token }
}

 const registerUser = async (name, email, password, role = 'client' ) => {
     const user = await User.findOne({
         where: { email }
        })  
    if (user) {
        throw new ConflictError( 'Conflict')
    }
    const encryptedPassword = bcrypt.hashSync(password)

    await User.create({
        name,
        email,
        password: encryptedPassword,
        role
    })

    return 'user created'

 }


module.exports = {
    loginUser,
    registerUser
}