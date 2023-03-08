const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('../../../database/models');
const jwtToken = require('../../../utils/jwt');
const userService = require('../../../api/Service/user.service');
const { findUserSuccessfulRes, loginUserSuccessfulRes, customerEmail, customerPassword, customerWrongEmail, customerWrongPassword, registerUserSuccessfulReq, registerUserSuccessfulModelRes, getSellerSuccessfulModelRes } = require('../mocks/user.mock');

describe('User Service', function () {
  describe('Testes de login', function () {

    afterEach(sinon.restore);

    it('Faz um login com sucesso', async function () {
      sinon.stub(User, 'findOne').resolves(findUserSuccessfulRes);
      

      const response = await userService.loginUser(customerEmail, customerPassword);

      expect(response.user).to.be.deep.equal(loginUserSuccessfulRes);
    });

    it('Não é possível fazer login com um usuário com email inválido', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      
      try {
        await userService.loginUser(customerWrongEmail, customerPassword);
      } catch (error) {
        expect(error.message).to.be.equal('Not Found')
        expect(error.statusCode).to.be.equal(404)
      }
    });

    it('Não é possível fazer login com um usuário com password inválido', async function () {
      sinon.stub(User, 'findOne').resolves(findUserSuccessfulRes);
      
      try {
        await userService.loginUser(customerEmail, customerWrongPassword);
      } catch (error) {
        expect(error.message).to.be.equal('Not Found')
        expect(error.statusCode).to.be.equal(404)
      }
    });
  
  });

  describe('Testes de registro de um usuário', function () {

    afterEach(sinon.restore);

    it('Faz um cadastro com sucesso', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(findUserSuccessfulRes)
      

      const response = await userService.registerUser(registerUserSuccessfulReq);

      expect(response.newUser.id).to.be.deep.equal(findUserSuccessfulRes.id);
    });

    it('Não é possível fazer cadastro com um email existente', async function () {
      sinon.stub(User, 'findOne').resolves(findUserSuccessfulRes);
      
      try {
        await userService.registerUser(registerUserSuccessfulReq);
      } catch (error) {
        expect(error.message).to.be.equal('Conflict')
        expect(error.statusCode).to.be.equal(409)
      }
    });

    it('Não é possível fazer cadastro com um email inválido', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      
      try {
        await userService.registerUser({
          name: "Cliente Maria",
          email: "maria@emailom",
          password: '$#maria#$',
        });
      } catch (error) {
        expect(error.message).to.be.equal('Invalid email, password or name')
        expect(error.statusCode).to.be.equal(409)
      }
    });

    it('Não é possível fazer cadastro com um name inválido', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      
      try {
        await userService.registerUser({
          name: "Client",
          email: "maria@emailom",
          password: '$#maria#$',
        });
      } catch (error) {
        expect(error.message).to.be.equal('Invalid email, password or name')
        expect(error.statusCode).to.be.equal(409)
      }
    });

    it('Não é possível fazer cadastro com uma password inválida', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      
      try {
        await userService.registerUser({
          name: "Client",
          email: "maria@emailom",
          password: 'mria#$',
        });
      } catch (error) {
        expect(error.message).to.be.equal('Invalid email, password or name')
        expect(error.statusCode).to.be.equal(409)
      }
    });
  
  });

  describe('Testes para um usuário que é vendedor', function () {

    afterEach(sinon.restore);

    it('Recupera os vendedores com sucesso', async function () {
      sinon.stub(User, 'findAll').resolves(getSellerSuccessfulModelRes);
      

      const response = await userService.getSeller();

      expect(response).to.be.deep.equal(getSellerSuccessfulModelRes);
    });
  
  });
});
