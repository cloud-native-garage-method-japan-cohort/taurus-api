const chai = require('chai');
const request = require('supertest');
const should = chai.should();
const app = require('../../app');


describe('POST /discovery/search', () => {
  it('should return output text', async () => {
    const res = await request(app)
        .post('/discovery/search')
        .send({
          searchText: 'ショコラ',
        });

    res.status.should.equal(200);
    console.log(res);
    // should.exist(res.body.responseText);
  });
});
