const request = require('supertest');
const { assert } = require('console');
const server = require('../index');

const { connectDB, clearDatabase, closeDatabase } = require('../test/testdb');

describe('API tests', () => {
  beforeAll(async () => await connectDB());
  beforeEach(async () => await clearDatabase());
  afterAll(async () => {
    await closeDatabase();
    server.close();
  });

  describe('Patient API endpoints', () => {
    describe('Create patient', () => {
      it('Returns 201 status code for successful requests', async (done) => {
        request(server)
          .post('/api/patients')
          .send({
            username: 'user100',
            password: '88cF1231dc&&',
          })
          .expect(201)
          .end(done, (err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('Returns a token for successful requests.', async (done) => {
        request(server)
          .post('/api/patients')
          .send({
            username: 'user100',
            password: '88cF1231dc&&',
          })
          .expect(201)
          .expect((res) => {
            if (!('token' in res.body)) throw new Error('No token in body');
          })
          .end(done, (err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('Returns a token for successful requests.', async (done) => {
        request(server)
          .post('/api/patients')
          .send({
            username: 'user100',
            password: '12345',
          })
          .expect(400)
          .expect((res) => {
            if (!('errors' in res.body)) throw new Error('No Error message when sending 5 letter password');
          })
          .end(done, (err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('Returns 400 and error message for too short password', async (done) => {
        request(server)
          .post('/api/patients')
          .send({
            username: 'user100',
            password: '12345',
          })
          .expect(400)
          .expect((res) => {
            if (!('errors' in res.body)) throw new Error('No Error message when sending 5 letter password');
          })
          .end(done, (err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('Returns 400 and error message for invalid email.', async (done) => {
        request(server)
          .post('/api/patients')
          .send({
            username: 'user100',
            password: '12345',
            email: 'notanemail',
          })
          .expect(400)
          .expect((res) => {
            if (!('errors' in res.body)) throw new Error('No Error messages when email is invalid');
            const emailErr = res.body.errors.filter((item) => item.param === 'email');
            if (!emailErr[0]) throw new Error('No email errror when email is invalid.');
          })
          .end(done, (err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
    describe('Get patient info', () => {

    });
  });
});
