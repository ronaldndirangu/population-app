import request from 'supertest';
import mongoose from 'mongoose';
import User from '../models/user';
import Location from '../models/location';
import app from '../index';
import dotenv from 'dotenv';

dotenv.config();

describe('Test cases for the user authentication and locations', () => {
  let token;
  beforeAll(function (done) {
    function clearDB() {
      const promises = [
        User.remove().exec(),
        Location.remove().exec()
      ];

      Promise.all(promises)
        .then(function () {
          done();
        })
    }

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(process.env.DB_URL_TEST, function (err) {
        if (err) {
          throw err;
        }
        return clearDB();
      });
    } else {
      return clearDB();
    }
  });

  afterAll(() => mongoose.disconnect());

  const dummyUser = {
    "name": "Ronald Ndirangu",
    "email": "ronny@gmail.com",
    "password": "Ron1234",
  }

  const dummyLocation = {
    "name": "Kiambu",
    "females": "500",
    "males": "200"
  }

  it("should create a user successfully", done => {
    return request(app)
      .post("/api/v1/auth/signup")
      .send(dummyUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });

  it("should not create a user with same email", done => {
    return request(app)
      .post("/api/v1/auth/signup")
      .send(dummyUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, {
        error: 'User already exists!'
      })
      .end(err => {
        if (err) return done(err);
        done();
      });
  });


  it("should login a user successfully", done => {
    return request(app)
      .post("/api/v1/auth/signin")
      .send(dummyUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        token = res.body.token;
        done();
      });
  });

  it('should create a location successfully', done => {
    return request(app)
      .post('/api/v1/locations')
      .send(dummyLocation)
      .set('authorization', token)
      .expect(201)
      .end(err => {
        if(err) return done(err);
        done();
      })
  });

  it('should not create same location twice', done => {
    return request(app)
      .post('/api/v1/locations')
      .send(dummyLocation)
      .set('authorization', token)
      .expect(400, {
        error: 'Location already exists!'
      })
      .end(err => {
        if (err) return done(err);
        done();
      })
  });
});