const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Sale } = require('../../../database/models')
const app = require('../../../api/app');

const { tokenMock } = require('../../unit/mocks/token.mock');
const { newSaleMock, productsOfNewSaleMock, newSaleSuccessfulRes } = require('../../unit/mocks/sale.mock');


const { expect } = chai;
chai.use(chaiHttp);

describe('Testes de integração que utilizam Sale', () => {
  afterEach(sinon.restore);

  describe('Teste de integração para criar uma nova venda', () => {
    beforeEach(sinon.restore)

    it('É possível criar uma nova venda com sucesso', async () => {
      sinon.stub(Sale, 'create').resolves(newSaleSuccessfulRes);

      const { body, status } = await await chai.request(app).post('/sales').send({ saleData: newSaleMock, products: productsOfNewSaleMock }).set({ authorization: tokenMock});
      console.log(body);
      expect(body).to.deep.equal(7);
      expect(status).to.equal(201);
    });

    it('Não é possível É possível criar uma nova venda', async () => {
      sinon.stub(Sale, 'create').resolves(null);

      const { body, status } = await await chai.request(app).post('/sales').send({ saleData: newSaleMock, products: productsOfNewSaleMock }).set({ authorization: tokenMock});
      console.log(body);
      expect(body).to.deep.equal({ message: 'Server internal error' });
      expect(status).to.equal(500);
    });
  });
});