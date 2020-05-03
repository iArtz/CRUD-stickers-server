const knex = require('./knex') // the connection

module.exports = {
  getAll() {
    return knex('sticker')
  },
  getOne(id) {
    return knex('sticker').where('Id', id).first()
  },
  create(sticker) {
    return knex('sticker').insert(sticker, '*')
  }
}
