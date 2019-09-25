/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();


describe('POST/signin user ', () => {
  it('it should return 401 for Invalid user email', (done) => {
    const user = {
      email: 'martin1110@gmail.com',
      password: '123456',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 401 for invalid password', (done) => {
    const user = {
      email: 'martin@gmail.com',
      password: '12345sopook',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 200 if email and password are correct', (done) => {
    const user = {
      email: 'martin@gmail.com',
      password: '123456',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it(' it should check if inputs required are correct', (done) => {
    const user = {
      email: 'martin@gmail.',
      password: '123456',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
  it(' it should check an empty field', (done) => {
    const user = {
      email: 'martin@gmail.com',
      password: '',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
});
