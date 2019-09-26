/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('get/ flagged articles ', () => {
  it('Admin should view all flagged articles(200) ', (done) => {
    const user = {
      id: 1,
      firstName: 'Brown',
      lastName: 'chris',
      email: 'brown@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'CEO',
      department: 'SE',
      address: 'Kigali',
      isAdmin: true,
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .get('/api/v1/flags')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
describe('post/ flag any article ', () => {
  it('Admin should not be allowed to flag any article(401) ', (done) => {
    const user = {
      id: 1,
      firstName: 'Brown',
      lastName: 'chris',
      email: 'brown@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'CEO',
      department: 'SE',
      address: 'Kigali',
      isAdmin: true,
    };
    const addFlag = {
      reason: 'it is fake',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/flags/4')
      .set('user_token', token)
      .send(addFlag)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('It should check an empty field(422) ', (done) => {
    const user = {
      id: 2,
      firstName: 'chris',
      lastName: 'martin',
      email: 'martin@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: 'SE',
      address: 'kigali',
      isAdmin: false,
    };
    const addFlag = {
      reason: '',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/flags/4')
      .set('user_token', token)
      .send(addFlag)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });
  it('It should return article not found when a user flag for non existing article(404) ', (done) => {
    const user = {
      id: 2,
      firstName: 'chris',
      lastName: 'martin',
      email: 'martin@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: 'SE',
      address: 'kigali',
      isAdmin: false,
    };
    const addFlag = {
      reason: 'it is meaningless',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/flags/111')
      .set('user_token', token)
      .send(addFlag)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('It should return flag added(201) ', (done) => {
    const user = {
      id: 2,
      firstName: 'chris',
      lastName: 'martin',
      email: 'martin@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: 'SE',
      address: 'kigali',
      isAdmin: false,
    };
    const addFlag = {
      reason: 'it is not relating to our goals',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/flags/4')
      .set('user_token', token)
      .send(addFlag)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
});
describe('Delete/ flagged articles ', () => {
  it('It should return article not found when admin delete non existing flag(404) ', (done) => {
    const user = {
      id: 1,
      firstName: 'Brown',
      lastName: 'chris',
      email: 'brown@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'CEO',
      department: 'SE',
      address: 'Kigali',
      isAdmin: true,
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .delete('/api/v1/flags/111')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('It should return a flag successfully deleted(200) ', (done) => {
    const user = {
      id: 1,
      firstName: 'Brown',
      lastName: 'chris',
      email: 'brown@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'CEO',
      department: 'SE',
      address: 'Kigali',
      isAdmin: true,
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .delete('/api/v1/flags/1')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('It should return not found it is already deleted(404) ', (done) => {
    const user = {
      id: 1,
      firstName: 'Brown',
      lastName: 'chris',
      email: 'brown@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'CEO',
      department: 'SE',
      address: 'Kigali',
      isAdmin: true,
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .delete('/api/v1/flags/1')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});