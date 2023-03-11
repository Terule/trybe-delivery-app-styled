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

const registerUserAlreadyExistsReq = {
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

const loginUserServiceSuccessfulRes = {
  "user": {
    "id": 3,
    "name": "Cliente Zé Birita",
    "email": "zebirita@email.com",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsIm5hbWUiOiJDbGllbnRlIFrDqSBCaXJpdGEiLCJpZCI6MywiaWF0IjoxNjc4NDkwOTI0LCJleHAiOjE2NzkwOTU3MjR9.wfLqmYeClDe-UrVEEb81wbuTiOnxecX-UwEtrnmxuxQ"
}

const customerEmail = 'zebirita@email.com';
const customerPassword = '$#zebirita#$';

const customerWrongEmail = 'zebiritaemail.com';
const customerWrongPassword = '$#zebiri#$';

module.exports = { 
  findUserSuccessfulRes, loginUserSuccessfulRes, customerEmail, 
  customerPassword, customerWrongEmail, customerWrongPassword, 
  registerUserSuccessfulReq, registerUserSuccessfulModelRes, getSellerSuccessfulModelRes, loginUserServiceSuccessfulRes, registerUserAlreadyExistsReq };