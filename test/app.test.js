const request = require('supertest')
const expect = require('chai').expect

const knex = require('../db/knex')

const app = require('../app')

const fixtures = require('../test/fixtures')

describe('CRUD Stickers', () => {
  before((done) => {
    // run migrations
    knex.migrate
      .latest()
      .then(() => {
        // run seeds
        return knex.seed.run()
      })
      .then(() => done())
  })

  it('Lists all Records', (done) => {
    request(app)
      .get('/api/v1/stickers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200).then((response) => {
        expect(response.body).to.be.a('array')
        expect(response.body).to.deep.equal(fixtures.stickers)
        done()
      })
  })

  it('Show one record by id', (done) => {
    request(app)
      .get('/api/v1/stickers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200).then((response) => {
        expect(response.body).to.be.a('object')
        expect(response.body).to.deep.equal(fixtures.stickers[0])
        done()
      })
  })
  
  it('Show one record by id', (done) => {
    request(app)
      .get('/api/v1/stickers/5')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200).then((response) => {
        expect(response.body).to.be.a('object')
        expect(response.body).to.deep.equal(fixtures.stickers[4])
        done()
      })
  })

  it('Create a record', (done) => {
    request(app)
    .post('/api/v1/stickers')
    .send(fixtures.sticker)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.a('object')
      fixtures.sticker.Id = response.body.Id
      expect(response.body).to.deep.equal(fixtures.sticker)
      done()
    })
  })
})
