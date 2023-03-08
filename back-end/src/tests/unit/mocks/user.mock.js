const findUserSuccessfulRes = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
  dataValues: {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer'},
};

const loginUserSuccessfulRes = {
    "id": 3,
    "name": "Cliente Zé Birita",
    "email": "zebirita@email.com",
    "role": "customer"
}

const registerUserSuccessfulReq = {
  name: "Cliente Maria",
  email: "maria@email.com",
  password: '$#maria#$',
}

const registerUserSuccessfulModelRes = {
  id: 4,
  name: "Cliente Maria",
  email: "maria@email.com",
  password: '99b7d4e3163e087f3a9c45dd776a103f',
  role: 'client',
  dataValues: {
  id: 4,
  name: "Cliente Maria",
  email: "maria@email.com",
  password: '99b7d4e3163e087f3a9c45dd776a103f',
  role: 'client'},
}

const getSellerSuccessfulModelRes = [
  {
    "id": 2,
    "name": "Fulana Pereira",
    "email": "fulana@deliveryapp.com",
    "password": "3c28d2b0881bf46457a853e0b07531c6",
    "role": "seller"
  }
]

const customerEmail = 'customer@email.com';
const customerPassword = '$#zebirita#$';

const customerWrongEmail = 'customer@email.com';
const customerWrongPassword = '$#zebiri#$';

module.exports = { 
  findUserSuccessfulRes, loginUserSuccessfulRes, customerEmail, 
  customerPassword, customerWrongEmail, customerWrongPassword, 
  registerUserSuccessfulReq, registerUserSuccessfulModelRes, getSellerSuccessfulModelRes };