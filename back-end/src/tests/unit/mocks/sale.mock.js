const newSaleMock = {
  deliveryAddress: 'a',
  deliveryNumber: 'a',
  userId: 3,
  totalPrice: 4.4,
  sellerId: 2
};

const newSaleSuccessfulRes = {
  id: 7,
  dataValues: {
    saleDate: '2023-03-08T18:45:55.116Z',
    id: 7,
    userId: 3,
    sellerId: 2,
    totalPrice: 4.4,
    deliveryAddress: 'aaaa',
    deliveryNumber: 'aaaaa',
    status: 'Pendente'
  }
};

const getSaleByIdSuccessfulRes = {
 dataValues: {
   "id": 7,
  "userId": 3,
  "sellerId": 2,
  "totalPrice": "4.40",
  "deliveryAddress": "aaaa",
  "deliveryNumber": "aaaaa",
  "status": "Pendente",
  "saleDate": "2023-03-08T18:45:55.000Z",
  "products": [
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg",
      "SaleProduct": {
        "quantity": 2
      }
    }
  ],
  "seller": {
    "name": "Fulana Pereira"
  }
 }
}

const getAllSalesMock = [
  {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "4.40",
    "deliveryAddress": "a",
    "deliveryNumber": "a",
    "status": "Pendente",
    "saleDate": "2023-03-08T18:36:37.000Z"
  },
  {
    "id": 2,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "4.40",
    "deliveryAddress": "a",
    "deliveryNumber": "a",
    "status": "Pendente",
    "saleDate": "2023-03-08T18:40:32.000Z"
  },
  {
    "id": 3,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "4.40",
    "deliveryAddress": "a",
    "deliveryNumber": "a",
    "status": "Pendente",
    "saleDate": "2023-03-08T18:40:39.000Z"
  },
  {
    "id": 4,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "4.40",
    "deliveryAddress": "a",
    "deliveryNumber": "a",
    "status": "Pendente",
    "saleDate": "2023-03-08T18:41:09.000Z"
  },
  {
    "id": 5,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "4.40",
    "deliveryAddress": "a",
    "deliveryNumber": "a",
    "status": "Pendente",
    "saleDate": "2023-03-08T18:42:53.000Z"
  },
  {
    "id": 6,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "4.40",
    "deliveryAddress": "a",
    "deliveryNumber": "a",
    "status": "Pendente",
    "saleDate": "2023-03-08T18:45:33.000Z"
  },
  {
    "id": 7,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "4.40",
    "deliveryAddress": "aaaa",
    "deliveryNumber": "aaaaa",
    "status": "Pendente",
    "saleDate": "2023-03-08T18:45:55.000Z"
  },
  {
    "id": 8,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "6.60",
    "deliveryAddress": "a",
    "deliveryNumber": "a",
    "status": "Pendente",
    "saleDate": "2023-03-08T19:33:53.000Z"
  }
]

const productsOfNewSaleMock =  [ { id: 1, quantity: 2 } ];

module.exports = { newSaleMock, productsOfNewSaleMock, newSaleSuccessfulRes, getSaleByIdSuccessfulRes, getAllSalesMock };