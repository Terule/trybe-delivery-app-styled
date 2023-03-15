const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const tokenHandler = require('../../../utils/jwt');

const { expect } = chai;
chai.use(sinonChai);

const jwt = require('jsonwebtoken');

const saleController = require('../../../api/Controller/sale.controller');
const saleService = require('../../../api/Service/sale.service');
const { newSaleMock, productsOfNewSaleMock, newSaleSuccessfulRes, getSaleByIdSuccessfulRes, getAllSalesMock } = require('../mocks/sale.mock');
const { tokenMock, jwtVerifyMock } = require('../mocks/token.mock');
// const InvalidToken = require('../../../utils/errors/invalidToken');

describe('Sale Controller', async function () {
  describe('Testes de registro de uma nova venda', function () {

    afterEach(sinon.restore);

    it('Cria uma nova venda com sucesso', async function () {
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);
      const req = { headers: { authorization: tokenMock }, body: { saleData: newSaleMock, productsOfNewSaleMock } };
      const res = {};
      const next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(saleService, 'newSale').resolves(newSaleSuccessfulRes);
      sinon.stub(tokenHandler, 'verifyToken').resolves(true);

      await saleController.newSale(req, res, next);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleSuccessfulRes);
    });


  });

  describe('Testes de busca de vendas pelo seu id', function () {

    afterEach(sinon.restore);

    it('Recupera uma nova venda pelo seu id com sucesso', async function () {
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);
      const req = { headers: { authorization: tokenMock }, params: { id: 7 } };
      const res = {};
      const next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(saleService, 'getSaleById').resolves(getSaleByIdSuccessfulRes.dataValues);
      sinon.stub(tokenHandler, 'verifyToken').resolves(true);

      await saleController.getSaleById(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getSaleByIdSuccessfulRes.dataValues);
    });


  });

  describe('Testes de busca de todas as vendas', function () {

    afterEach(sinon.restore);

    it('Recupera todas as vendas com sucesso', async function () {
      const req = {};
      const res = {};
      const next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(saleService, 'getAllSales').resolves(getAllSalesMock);
      sinon.stub(tokenHandler, 'verifyToken').resolves(true);

      await saleController.getAllSales(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getAllSalesMock);
    });


  });

  describe('Testes de atualização do status de uma venda pelo id', function () {

    afterEach(sinon.restore);

    it('Atualiza uma venda com sucesso', async function () {
      sinon.stub(jwt, 'verify').resolves(jwtVerifyMock);
      const req = { headers: { authorization: tokenMock }, params: { id: 1 }, body: { status: 'Preparando'} };
      const res = {};
      const next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(saleService, 'updateSaleStatus').resolves(getSaleByIdSuccessfulRes.dataValues);
      sinon.stub(tokenHandler, 'verifyToken').resolves(true);

      await saleController.updateSaleStatus(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Status atualizado com sucesso!' });
    });


  });
});