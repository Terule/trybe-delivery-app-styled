const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main() {
  await prisma.user.upsert({
    where: { email: 'adm@deliveryapp.com' },
    update: {},
    create: {
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04', // --adm2@21!!--
      role: 'administrator',
    },
  });

  await prisma.user.upsert({
    where: { email: 'fulana@deliveryapp.com' },
    update: {},
    create: {
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6', // fulana@123
      role: 'seller',
    },
  });

  await prisma.user.upsert({
    where: { email: 'zebirita@email.com' },
    update: {},
    create: {
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925', // $#zebirita#$
      role: 'customer',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Skol Lata 250ml' },
    update: {},
    create: {
      name: 'Skol Lata 250ml',
      price: 2.20,
      url_image: 'https://breja-back-end.onrender.com/images/skol_lata_350ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Heineken 600ml' },
    update: {},
    create: {
      name: 'Heineken 600ml',
      price: 7.50,
      url_image: 'https://breja-back-end.onrender.com/images/heineken_600ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Antarctica Pilsen 300ml' },
    update: {},
    create: {
      name: 'Antarctica Pilsen 300ml',
      price: 2.49,
      url_image: 'https://breja-back-end.onrender.com/images/antarctica_pilsen_300ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Brahma 600ml' },
    update: {},
    create: {
      name: 'Brahma 600ml',
      price: 7.50,
      url_image: 'https://breja-back-end.onrender.com/images/brahma_600ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Skol 269ml' },
    update: {},
    create: {
      name: 'Skol 269ml',
      price: 2.19,
      url_image: 'https://breja-back-end.onrender.com/images/skol_269ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Skol Beats Senses 313ml' },
    update: {},
    create: {
      name: 'Skol Beats Senses 313ml',
      price: 4.49,
      url_image: 'https://breja-back-end.onrender.com/images/skol_beats_senses_313ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Becks 330ml' },
    update: {},
    create: {
      name: 'Becks 330ml',
      price: 4.99,
      url_image: 'https://breja-back-end.onrender.com/images/becks_330ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Brahma Duplo Malte 350ml' },
    update: {},
    create: {
      name: 'Brahma Duplo Malte 350ml',
      price: 2.79,
      url_image: 'https://breja-back-end.onrender.com/images/brahma_duplo_malte_350ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Becks 600ml' },
    update: {},
    create: {
      name: 'Becks 600ml',
      price: 8.89,
      url_image: 'https://breja-back-end.onrender.com/images/becks_600ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Skol Beats Senses 269ml' },
    update: {},
    create: {
      name: 'Skol Beats Senses 269ml',
      price: 3.57,
      url_image: 'https://breja-back-end.onrender.com/images/skol_beats_senses_269ml.jpg',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Stella Artois 275ml' },
    update: {},
    create: {
      name: 'Stella Artois 275ml',
      price: 3.49,
      url_image: 'https://breja-back-end.onrender.com/images/stella_artois_275ml.jpg',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
