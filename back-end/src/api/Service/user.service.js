const { validate } = require('email-validator');
const md5 = require('md5');
const { User } = require('../../database/models');
const { createToken } = require('../../utils/jwt');
const NotFoundError = require('../../utils/errors/notFoundError');
const ConflictError = require('../../utils/errors/conflictError');

 const loginUser = async (email, password) => {
        const user = await User.findOne({
            where: { email },
        });
        if (!user) {
            throw new NotFoundError('Not Found');
        }

        const decryptPassword = md5(password);
        
        if (decryptPassword !== user.password) {
            throw new NotFoundError('Not Found');
        }
        const token = createToken({ email, role: user.role, name: user.name, id: user.id });
        const { password: _, ...userWithoutPassword } = user.dataValues;
        return { user: userWithoutPassword, token };
};

 const registerUser = async ({ email, password, role = 'client', name }) => {
     const user = await User.findOne({
         where: { email },
        });
    if (user) throw new ConflictError('Conflict');
    
    if (!validate(email) || password.length < 6 || name.length < 12) {
        throw new ConflictError('Invalid email, password or name');
      }
    const encryptedPassword = md5(password);

    const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
        role,
    });

    const { password: _, ...userWithoutPassword } = newUser.dataValues;

    const token = createToken({ ...userWithoutPassword });
    return { newUser, token };
 };

 const getSeller = async () => {
    const sellerList = await User.findAll({
        where: { role: 'seller' },
    });

    if (!sellerList) throw new Error('Server internal error');

    return sellerList;
 };

module.exports = {
    loginUser,
    registerUser,
    getSeller,
};
