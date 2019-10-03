/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import user from './signupData';
import app from '../index';

chai.use(chaiHttp);
chai.should();


describe('POST/signup ', () => {
  it('User successfully created, it should return(201)', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user.user1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it(' it should check an empty field(422)', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user.user2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
  it('should not register an already registered user(409)', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user.user1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });
  it('should create non already user registered(201)', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user.user3)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
});
