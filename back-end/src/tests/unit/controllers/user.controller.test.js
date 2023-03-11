const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const tokenHandler = require('../../../utils/jwt');

const { expect } = chai;
chai.use(sinonChai);

const userController = require('../../../api/Controller/user.controller');
const userService = require('../../../api/Service/user.service');
const { productsMock } = require('../mocks/product.mock');
const { tokenMock } = require('../mocks/token.mock');
const InvalidToken = require('../../../utils/errors/invalidToken');
const { customerEmail, customerPassword, loginUserServiceSuccessfulRes, customerWrongEmail, registerUserSuccessfulReq, getSellerSuccessfulModelRes } = require('../mocks/user.mock');
const NotFoundError = require('../../../utils/errors/notFoundError');

describe('User Controller', async function () {
  describe('Testes de login', function () {

    afterEach(sinon.restore);

    it('Faz um login com sucesso', async function () {
      const req = { body: { email: customerEmail, password: customerPassword } };
      const res = {};
      const next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(userService, 'loginUser').resolves(loginUserServiceSuccessfulRes);

      await userController.login(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(loginUserServiceSuccessfulRes);
    });
  });

  describe('Testes de registro de um usuário', function () {

    afterEach(sinon.restore);

    it('Faz um cadastro com sucesso', async function () {
      const req = { body: registerUserSuccessfulReq };
      const res = {};
      const next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(userService, 'registerUser').resolves({ token: tokenMock });

      await userController.register(req, res, next);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ token: tokenMock });
    });
  });

  describe('Testes para um usuário que é vendedor', function () {

    afterEach(sinon.restore);

    it('Recupera os vendedores com sucesso', async function () {
      const req = { };
      const res = {};
      const next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()

      sinon.stub(userService, 'getSeller').resolves(getSellerSuccessfulModelRes);

      await userController.getSeller(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getSellerSuccessfulModelRes);
    });
  });
});