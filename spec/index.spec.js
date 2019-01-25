process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const {expect} = require('chai');
const data = require('../seed/testData');
const seedDB = require('../seed/seed');


describe('/', () => {
    let groups, sessions, users;
  
    beforeEach(() => {
        return seedDB(data)
            .then(docs => {
                sessions = docs[0]
                users = docs[1]
                groups = docs[2]
            })
    });
    after(() => {
        return mongoose.disconnect();
    });

    it('GET returns 404 and error message when user enters an invalid route', () => {
        return request
            .get('/api/somethingInvalid')
            .expect(404)
            .then(res => {
                expect(res.body).to.eql({ msg: 'Page not found' });
        })
    })

    describe('POST /users', () => {
        it('POST to api/users returns status 200 and the created users info', () => {
            return request
                .post('/api/users')
                .send({
                    username: 'BrettMills',
                    email: 'brettmils@yahoo.com',
                    password: 'dam4life',
                    screen_name: 'Chap'
                })
                .expect(201)
                .then(res => {
                    expect(res.body.createdUser).to.have.keys('_id', 'username', 'email', 'password', 'screen_name', '__v', 'joined')
                })
        })
    })

    describe('GET /sessions/:groupId', () => {
        it('GET returns the sessions for the group', () => {
            return request
                .get(`/api/sessions/${groups[0]._id}`)
                .expect(200)
                .then(res => {
                    expect(res.body.sessions[0]).to.have.keys('_id', 'belongs_to', 'matches', 'created_at', '__v')
                })
        })
    })
    

})