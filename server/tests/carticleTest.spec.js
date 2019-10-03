/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('post/ Create a new article ', () => {
  it('You must provide your Token(401) ', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: 'Teamwork is one of the most important aspects of the modern workplace.',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/article')
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('it should return an invalid Token(400) ', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: 'Teamwork is one of the most important aspects of the modern workplace.',
    };
    const token = jwt.sign(user, 'powapowa');
    chai
      .request(app)
      .post('/api/v1/article')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('new article is succesfully created(201) ', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: 'Teamwork is one of the most important aspects of the modern workplace.',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/article')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('It should check if all fields are fill as required(422)', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: 'x',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/article')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(422);
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: '',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/article')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });
  it('It should not allow admin to create an article(403) ', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: 'Teamwork is one of the most important aspects of the modern workplace.',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/article')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});

describe('patch/ Edit article', () => {
  it('It should not be edited when there is an empty field(422) ', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: '',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .patch('/api/v1/articles/2')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });
  it('It should return article not found when you edit uncreated article(404) ', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: 'The Benefits of Online Collaboration Tools The Benefits of Online Collaboration Tools',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .patch('/api/v1/articles/111')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Article successfully edited(200) ', (done) => {
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
    const newArticle = {
      title: 'Team Members Can Be Anywhere',
      article: 'As long as they have an Internet connection, team members can be working remotely',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .patch('/api/v1/articles/2')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should return only user author allowed to edit this article(403) ', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: 'Teamwork is one of the most important aspects of the modern workplace.',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .patch('/api/v1/articles/1')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('it should return only user author allowed to edit this article when admin try(403) ', (done) => {
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
    const newArticle = {
      title: 'The Benefits of Online Collaboration Tools',
      article: 'Teamwork is one of the most important aspects of the modern workplace.',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .patch('/api/v1/articles/1')
      .set('user_token', token)
      .send(newArticle)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});
describe('Get/ all articles', () => {
  it('It should return list of articles(200) ', (done) => {
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
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .get('/api/v1/feeds')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should return only users allowed to view the articles when admin try(403) ', (done) => {
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
      .get('/api/v1/feeds')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});

describe('Get/Display an article ', () => {
  it('It should return a specific article(200)   ', (done) => {
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
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .get('/api/v1/articles/3')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return article not found(404)  ', (done) => {
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
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .get('/api/v1/articles/1111')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('It should return only users allowed when admin try it(403)  ', (done) => {
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
      .get('/api/v1/articles/1')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});
describe('Get/ filter an article by category', () => {
  it('It should return only users allowed when admin try(403)  ', (done) => {
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
      .get('/api/v1/articles?article=Teamwork')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('It should return article when tag match(200)  ', (done) => {
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
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .get('/api/v1/articles?article=Teamwork')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('It should not return any article when tag does not match(404) ', (done) => {
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
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .get('/api/v1/articles?article=polepolepolepolepole')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
describe('Delete/ user delete it own article ', () => {
  it('It should not allow admin to delete an article that are not flagged(403) ', (done) => {
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
      .delete('/api/v1/articles/2')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('It should delete an article(200)  ', (done) => {
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
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .delete('/api/v1/articles/2')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('if article does not exist return not found(404)  ', (done) => {
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
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .delete('/api/v1/articles/111')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('It should not delete an article that belong to another user(403)  ', (done) => {
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
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .delete('/api/v1/articles/1')
      .set('user_token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});
describe('post/ user comment on any article ', () => {
  it('It should not allow admin to comment(403) ', (done) => {
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
    const addComment = {
      comment: 'keep it up buddy',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/articles/3/comments')
      .set('user_token', token)
      .send(addComment)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('It should not allow users to comment when field is empty(422) ', (done) => {
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
    const addComment = {
      comment: '',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/articles/3/comments')
      .set('user_token', token)
      .send(addComment)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });
  it('It should return article not found when a user comment for non existing article(404) ', (done) => {
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
    const addComment = {
      comment: 'great buddy',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/articles/111/comments')
      .set('user_token', token)
      .send(addComment)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('It should return comment added(201) ', (done) => {
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
    const addComment = {
      comment: 'great buddy',
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    chai
      .request(app)
      .post('/api/v1/articles/3/comments')
      .set('user_token', token)
      .send(addComment)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
});
