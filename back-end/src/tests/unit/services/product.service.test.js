const { expect } = require('chai');
const sinon = require('sinon');
const { Product } = require('../../../database/models');
const productService = require('../../../api/Service/product.service');
const { productsMock } = require('../mocks/product.mock');

describe('Product Service', function () {
  describe('Testes de produto', function () {

    afterEach(sinon.restore);

    it('Recupera todos os produtos existentes no Db', async function () {
      sinon.stub(Product, 'findAll').resolves(productsMock);
      

      const response = await productService.findAllProducts();

      expect(response).to.be.deep.equal(productsMock);
    });
  
  });
});
