const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NotFoundError = require('../../utils/errors/notFoundError');

const newSale = async (
  { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }, products) => {
  const sale = await prisma.sale.create({
    data: {
      user_id: userId,
      seller_id: sellerId,
      total_price: totalPrice,
      delivery_address: deliveryAddress,
      delivery_number: deliveryNumber,
      status: 'Pendente',
    }
  });
  if (!sale) throw new Error('Server internal error');
  products.forEach(async (product) => {
    await prisma.saleProduct.create({
      data: {
        saleId: sale.id, productId: product.id, quantity: product.quantity,
      }
    },
    );
  });
  return sale.id;
};

const getSaleById = async (id) => {
  const sale = await prisma.sale.findUnique({
    where: { id: +id },
    include: {
      products: {
        select: {
          id: true,
          quantity: true,
        }
      },
      seller: {
        select: {

          name: true,
        }
      },
    }
  });

  if (!sale) {
    throw new NotFoundError('Not Found');
  }
  return sale;
};

const getAllSales = async () => {
  const sales = await prisma.sale.findMany({
    include: {
      products: {
        select: {
          id: true,
          quantity: true,
        }
      },
      seller: {
        select: {
          name: true,
        }
      },
      user: {
        select: {
          name: true,
        }
      }
    }
  });
  return sales;
};

// const getSaleBySellerId = async (sellerId) => {
//   const sale = await Sale.findOne({
//     where: { sellerId },
//     include: [
//       { model: Product, as: 'products', attributes: ['name', 'price', 'url_image'] },
//     ],
//   });
//   return sale;
// };

const updateSaleStatus = async (id, status) => {
  const sale = await prisma.sale.findOne({
    where: { id: +id },
  });
  if (!sale) throw new NotFoundError('Not Found');
  await prisma.sale.update({ status }, { where: { id: +id } });
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
  updateSaleStatus,
};
