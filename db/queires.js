const knex = require('./knex') // the connection

module.exports = {
  getAll(query) {
    const knexQuery = knex('sticker')
    if (query.title) knexQuery.orWhere('Title', 'like', `%${query.title}%`)
    if (query.description) knexQuery.orWhere('Description', 'like', `%${query.description}%`)
    return knexQuery
  },
  getOne(id) {
    return knex('sticker').where('Id', id).first()
  },
  create(sticker) {
    return knex('sticker').insert(sticker, '*')
  },
  update(id, sticker) {
    return knex('sticker').where('Id', id).update(sticker, '*')
  },
  delete(id) {
    return knex('sticker').where('Id', id).del()
  },
}
