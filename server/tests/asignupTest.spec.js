/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();


describe('POST/signup ', () => {
  it('User successfully created, it should return(201)', (done) => {
    const user = {
      firstName: 'kali',
      lastName: 'yves',
      email: 'yves@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: 'SE',
      address: 'kigali',

    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });


  it('should not register an already registered user(409)', (done) => {
    const user = {
      firstName: 'chris',
      lastName: 'martin',
      email: 'martin@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: 'SE',
      address: 'kigali',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });

  it(' it should check if inputs required are correct(422)', (done) => {
    const user = {
      firstName: 'chris',
      lastName: 'martin',
      email: 'martin@gmail.',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: 'SE',
      address: 'kigali',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
  it(' it should check an empty field(422)', (done) => {
    const user = {
      firstName: 'chris',
      lastName: 'martin',
      email: 'martin@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: '',
      address: 'Kigali',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });

  it('should return a wrong  request(404)', (done) => {
    const user = {
      firstName: 'chris',
      lastName: 'martin',
      email: 'martin@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: 'SE',
      address: 'kigali',
    };

    chai
      .request(app)
      .delete('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});
