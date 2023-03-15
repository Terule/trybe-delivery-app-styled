const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Sale } = require('../../../database/models')
const app = require('../../../api/app');
const jwt = require('jsonwebtoken');

const { tokenMock, jwtVerifyMock } = require('../../unit/mocks/token.mock');
const { newSaleMock, productsOfNewSaleMock, newSaleSuccessfulRes, getSaleByIdSuccessfulRes, getAllSalesMock } = require('../../unit/mocks/sale.mock');


const { expect } = chai;
chai.use(chaiHttp);

describe('Testes de integração que utilizam Sale', () => {
  afterEach(sinon.restore);

  describe('Teste de integração para criar uma nova venda', () => {
    beforeEach(sinon.restore)

    it('É possível criar uma nova venda com sucesso', async () => {
      sinon.stub(Sale, 'create').resolves(newSaleSuccessfulRes);
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);

      const { body, status } = await await chai.request(app).post('/sales').send({ saleData: newSaleMock, products: productsOfNewSaleMock }).set({ authorization: tokenMock});

      expect(body).to.deep.equal(7);
      expect(status).to.equal(201);
    });

    it('Não é possível É possível criar uma nova venda', async () => {
      sinon.stub(Sale, 'create').resolves(null);
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);

      const { body, status } = await await chai.request(app).post('/sales').send({ saleData: newSaleMock, products: productsOfNewSaleMock }).set({ authorization: tokenMock});

      expect(body).to.deep.equal({ message: 'Server internal error' });
      expect(status).to.equal(500);
    });
  });

  describe('Teste de integração para buscar uma venda pelo id', () => {
    beforeEach(sinon.restore)

    it('É possível buscar uma venda pelo id com sucesso', async () => {
      sinon.stub(Sale, 'findOne').resolves(getSaleByIdSuccessfulRes);
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);

      const { body, status } = await chai.request(app).get('/sales/7').set({ authorization: tokenMock});
      
      expect(body).to.deep.equal(getSaleByIdSuccessfulRes.dataValues);
      expect(status).to.equal(200);
    });

    it('Não é possível buscar uma venda pelo id que não exista', async () => {
      sinon.stub(Sale, 'findOne').resolves(null);
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);

      const { body, status } = await chai.request(app).get('/sales/15').set({ authorization: tokenMock});
      
      expect(body).to.deep.equal({ message: "Not Found" });
      expect(status).to.equal(404);
    });
  });

  describe('Teste de integração para buscar todas as vendas', () => {
    beforeEach(sinon.restore)

    it('É possível buscar de todas as vendas com sucesso', async () => {
      sinon.stub(Sale, 'findAll').resolves(getAllSalesMock);
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);

      const { body, status } = await chai.request(app).get('/customer/orders').set({ authorization: tokenMock});
      
      expect(body).to.deep.equal(getAllSalesMock);
      expect(status).to.equal(200);
    });

    it('Não é possível buscar uma venda pelo id que não exista', async () => {
      sinon.stub(Sale, 'findAll').resolves(null);

      const { body, status } = await chai.request(app).get('/customer/orders').set({ authorization: tokenMock});
      
      expect(body).to.deep.equal({ message: 'Server internal error' });
      expect(status).to.equal(500);
    });
  });

  describe('Teste de integração para buscar todas as vendas', () => {
    beforeEach(sinon.restore)

    it('É possível buscar de todas as vendas com sucesso', async () => {
      sinon.stub(Sale, 'findOne').resolves(getSaleByIdSuccessfulRes);
      sinon.stub(Sale, 'update').resolves();
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);

      const { body, status } = await chai.request(app).put('/sales/7').set({ authorization: tokenMock}).send({ status: 'Preparando' });
      
      expect(body).to.deep.equal({ message: "Status atualizado com sucesso!" });
      expect(status).to.equal(200);
    });

    it('Não é possível buscar uma venda pelo id que não exista', async () => {
      sinon.stub(Sale, 'findOne').resolves(null);
      sinon.stub(Sale, 'update').resolves();
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);

      const { body, status } = await chai.request(app).put('/sales/15').set({ authorization: tokenMock}).send({ status: 'Preparando' });
      
      expect(body).to.deep.equal({ message: "Not Found" });
      expect(status).to.equal(404);
    });
  });
});