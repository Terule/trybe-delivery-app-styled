const { expect } = require('chai');
const sinon = require('sinon');
const { Sale } = require('../../../database/models');
const saleService = require('../../../api/Service/sale.service');
const { newSaleMock, productsOfNewSaleMock, newSaleSuccessfulRes, getSaleByIdSuccessfulRes, getAllSalesMock } = require('../mocks/sale.mock');

describe('Sale Service', function () {
  describe('Testes de registro de uma nova venda', function () {

    afterEach(sinon.restore);

    it('Cadastra uma nova venda com sucesso', async function () {
      sinon.stub(Sale, 'create').resolves(newSaleSuccessfulRes);
      

      const response = await saleService.newSale(newSaleMock, productsOfNewSaleMock)
      expect(response).to.be.deep.equal(7);
    });
  
  });

  describe('Testes de busca de vendas pelo seu id', function () {

    afterEach(sinon.restore);

    it('Recupera uma nova venda pelo seu id com sucesso', async function () {
      sinon.stub(Sale, 'findOne').resolves(getSaleByIdSuccessfulRes);
      

      const response = await saleService.getSaleById(7)
      expect(response).to.be.deep.equal(getSaleByIdSuccessfulRes.dataValues);
    });

    
    it('Retorna um erro ao não achar uma venda com o id', async function () {
      sinon.stub(Sale, 'findOne').resolves(null);
      
      try {
        await saleService.getSaleById(7)
      } catch (error) {
        expect(error.message).to.be.equal('Not Found')
        expect(error.statusCode).to.be.equal(404)
      }
    });
  
  });

  describe('Testes de busca de todas as vendas', function () {

    afterEach(sinon.restore);

    it('Recupera todas as vendas com sucesso', async function () {
      sinon.stub(Sale, 'findAll').resolves(getAllSalesMock);
      

      const response = await saleService.getAllSales();
      expect(response).to.be.deep.equal(getAllSalesMock);
    });
  
  });

  describe('Testes de atualização do status de uma venda pelo id', function () {

    afterEach(sinon.restore);

    it('Atualiza uma venda com sucesso', async function () {
      sinon.stub(Sale, 'findOne').resolves(getSaleByIdSuccessfulRes);
      sinon.stub(Sale, 'update').resolves();
      const status = 'Preparando'
      await saleService.updateSaleStatus('7', status);
    });
  });
});