process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models/user');
let Zone = require('../models/timezone');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let userToken = '';
let userId = '';
let adminId = '';
let adminToken = '',
  zoneId;

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
  /*
   * Test the signup
   */
  describe('/POST signup', () => {
    it('it should create a user', (done) => {
      User.remove({}, (err) => {
        //done();
      });
      chai.request(server)
        .post('/users/register')
        .type('form')
        .send({
          username: 'test',
          password: 'test',
          role: 2
        })
        .end((err, res) => {
          adminToken = res.body.token;
          adminId = res.body.user._id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should fail signup with existing username', (done) => {
      chai.request(server)
        .post('/users/register')
        .type('form')
        .send({
          username: 'test',
          password: 'test',
          role: 2
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  /*
   * Test the login
   */
  describe('/POST login', () => {
    it('it should login a user', (done) => {
      chai.request(server)
        .post('/users/login')
        .type('form')
        .send({
          username: 'test',
          password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Change user password
   */

  describe('/PUT users', () => {
    it('it should change user password', (done) => {
      chai.request(server)
        .put('/users/' + adminId)
        .send({password: 'newPass'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  /*
   * Add 3 users and then get all users
   */

  describe('/GET users', () => {
    it('it should get all users', (done) => {
      chai.request(server)
        .post('/users/register')
        .type('form')
        .send({
          username: 'test1',
          password: 'test1',
          role: 0
        })
        .end((err, res) => {
          userToken = res.body.token;
          userId = res.body.user._id;
          res.should.have.status(200);
          chai.request(server)
            .post('/users/register')
            .type('form')
            .send({
              username: 'test2',
              password: 'test2',
              role: 2
            })
            .end((err, res) => {
              res.should.have.status(200);
              userId_3 = res.body.user._id;
              chai.request(server)
                .post('/users/register')
                .type('form')
                .send({
                  username: 'test3',
                  password: 'test3',
                  role: 2
                })
                .end((err, res) => {
                  res.should.have.status(200);
                  chai.request(server)
                    .get('/users/')
                    .set('x-access-token', adminToken)
                    .send()
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('array');
                      res.body.should.have.length(4);
                      done();
                    });
                });
            });
        });
    });
    it('it shouldn\'t get all users for a regular user token', (done) => {
      chai.request(server)
        .get('/users/')
        .set('x-access-token', userToken)
        .send()
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  /*
   * Delete a user, and check that it doesn't exist
   */
  describe('/DELETE users', () => {
    it('it should delete user', (done) => {
      chai.request(server)
        .delete('/users/' + userId_3)
        .send({password: 'newPass'})
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(server)
            .get('/users/' + userId_3)
            .send()
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
    });
  });
});

describe('Timezones', () => {
  /*
   * Add a zone
   */
  describe('/POST /', () => {
    it('it should create a timezone', (done) => {
      Zone.remove({}, (err) => {
        //done();
      });
      chai.request(server)
        .post('/zones/')
        .type('form')
        .set('x-access-token', adminToken)
        .send({
          name: 'test',
          city: 'someCity',
          offset: 2
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          zoneId = res.body._id;
          done();
        });
    });
  });

  describe('/GET /', () => {
    it('it should read all timezones', (done) => {
      chai.request(server)
        .get('/zones/')
        .set('x-access-token', adminToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(1);
          done();
        });
    });
  });

  describe('/GET /zoneId', () => {
    it('it should read one timezones', (done) => {
      chai.request(server)
        .get('/zones/'+zoneId)
        //.set('x-access-token', adminToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/PUT /zoneId', () => {
    it('it should change a timezone', (done) => {
      chai.request(server)
        .put('/zones/' + zoneId)
        .send({offset: 5})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('offset').eql(5);
          done();
        });
    });
  });

  describe('/GET /zones/filter/query', () => {
    it('it should show timezones based on query', (done) => {
      let zone = new Zone({owner: userId, name:'test 2', city: 'Boston', offset: 7});
      zone.save((err, zone) => {});
      zone = new Zone({owner: userId, name:'another test', city: 'Boston', offset: 3});
      zone.save((err, zone) => {});
      zone = new Zone({owner: userId, name:'other stuff', city: 'Boston', offset: 2});
      zone.save((err, zone) => {});
      let query = 'test';
      chai.request(server)
        .get('/zones/filter/'+query)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(3);
          done();
        });
    });
  });

  describe('/GET /zones/byUser', () => {
    it('it should show timezones by specific user', (done) => {
      let ownerId = 'bogusIdForTesting';
      let zone = new Zone({owner: ownerId, name:'test 2', city: 'Boston', offset: 7});
      zone.save((err, zone) => {});
      zone = new Zone({owner: ownerId, name:'another test', city: 'Boston', offset: 3});
      zone.save((err, zone) => {});
      chai.request(server)
        .get('/zones/byUser?id='+ownerId)
        .set('x-access-token', adminToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(2);
          done();
        });
    });
  });

  describe('/DELETE /zoneId', () => {
    it('it should delete a timezone', (done) => {
      chai.request(server)
        .delete('/zones/'+zoneId)
        .send({offset: 5})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });


}); // Timezones end
