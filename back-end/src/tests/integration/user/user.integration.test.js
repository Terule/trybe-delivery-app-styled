const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../../database/models')
const app = require('../../../api/app');

// const jwt = require('../../../utils/jwt');
const { findUserSuccessfulRes, customerEmail, customerPassword, registerUserSuccessfulReq, registerUserSuccessfulModelRes, registerUserAlreadyExistsReq, customerWrongEmail, getSellerSuccessfulModelRes} = require('../../unit/mocks/user.mock');
const { tokenMock } = require('../../unit/mocks/token.mock');


const { expect } = chai;
chai.use(chaiHttp);

describe('Testes de integração que utilizam User', () => {
  afterEach(sinon.restore);

  describe('Teste de integração para login', () => {
    beforeEach(sinon.restore)

    it('É possível realizar o login', async () => {
      sinon.stub(User, 'findOne').resolves(findUserSuccessfulRes);

      const { body, status } = await chai.request(app).post('/login').send({email: customerEmail, password: customerPassword});

      expect(body).to.haveOwnProperty('token');
      expect(body.user.id).to.deep.equal(3);
      expect(status).to.equal(200);
    });

    it('Não é possível realizar o login com um email inexistente no db', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const { body, status } = await chai.request(app).post('/login').send({email: customerEmail, password: customerPassword});

      expect(body).to.deep.equal({ message: 'Not Found' });
      expect(status).to.equal(404);
    });
  });

  describe('Teste de integração para register', () => {
    beforeEach(sinon.restore)

    it('É possível realizar o registro de um usuário', async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(registerUserSuccessfulModelRes)

      const { body, status } = await chai.request(app).post('/register').send(registerUserSuccessfulReq);

      expect(body).to.haveOwnProperty('token');
      expect(status).to.equal(201);
    });

    it('Não é possível realizar o registro de um usuário que já existe', async () => {
      sinon.stub(User, 'findOne').resolves(findUserSuccessfulRes);

      const { body, status } = await chai.request(app).post('/register').send(registerUserAlreadyExistsReq);

      expect(body).to.deep.equal({ message: 'Conflict' });
      expect(status).to.equal(409);
    });

    it('Não é possível realizar o registro de um usuário com email inválido', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const { body, status } = await chai.request(app).post('/register').send({ name: 'Debora Cliente', email: customerWrongEmail, password: customerPassword });

      expect(body).to.deep.equal({ message: "Invalid email, password or name" });
      expect(status).to.equal(409);
    });

    it('Não é possível realizar o registro de um usuário com senha inválida', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const { body, status } = await chai.request(app).post('/register').send({ name: "Debora Cliente", email: customerEmail, password: 'zebir' });

      expect(body).to.deep.equal({ message: "Invalid email, password or name" });
      expect(status).to.equal(409);
    });

    it('Não é possível realizar o registro de um usuário com nome inválido', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const { body, status } = await chai.request(app).post('/register').send({ name: "Debora", email: customerEmail, password: customerPassword });

      expect(body).to.deep.equal({ message: "Invalid email, password or name" });
      expect(status).to.equal(409);
    });
  });

  describe('Teste de integração para recuperar a lista de vendedores', () => {
    beforeEach(sinon.restore)

    it('É possível recuperar a lista de vendedores', async () => {
      sinon.stub(User, 'findAll').resolves(getSellerSuccessfulModelRes);

      const { body, status } = await chai.request(app).get('/seller').send();

      expect(body).to.deep.equal(getSellerSuccessfulModelRes);
      expect(status).to.equal(200);
    });

    it('Não é possível recuperar a lista de vendedores', async () => {
      sinon.stub(User, 'findAll').resolves(null);

      const { body, status } = await chai.request(app).get('/seller').send();

      expect(body).to.deep.equal({ message: 'Server internal error' });
      expect(status).to.equal(500);
    });
  });
});