require('should');
const request = require('supertest');
const app = require('../src/app.js');


describe('Account', () => {
    describe('#init()', () => {
        it('should return -1 when the value is not present', (done) => {
            request(app.app)
                .get('/hello')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.text.should.be.exactly('Hello World');
                    done();
                });
        });
    });
});

