const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { validate } = require('email-validator');
const md5 = require('md5');
const { createToken } = require('../../utils/jwt');
const NotFoundError = require('../../utils/errors/notFoundError');
const ConflictError = require('../../utils/errors/conflictError');

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
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
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

const registerUser = async ({ email, password, role = 'customer', name }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) throw new ConflictError('Conflict');

  if (!validate(email) || password.length < 6 || name.length < 12) {
    throw new ConflictError('Invalid email, password or name');
  }
  const encryptedPassword = md5(password);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: encryptedPassword,
      role,
    },
  });

  const { password: _, ...userWithoutPassword } = newUser;

  const token = createToken({ ...userWithoutPassword });
  return { userWithoutPassword, token };
};

const getSeller = async () => {
  const sellerList = await prisma.user.findMany({
    where: { role: 'seller' },
  });

  if (!sellerList) throw new Error('Server internal error');

  return sellerList;
};

const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { role: 'seller' },
        { role: 'customer' },
      ],
    },
  });

  if (!users) throw new Error('Server internal error');

  return users;
};

const deleteUser = async (id) => {
  const checkingUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!checkingUser) {
    throw new NotFoundError('Not Found');
  }
  await prisma.user.delete({
    where: { id },
  });
};

module.exports = {
  loginUser,
  registerUser,
  getSeller,
  getUsers,
  deleteUser,
};
