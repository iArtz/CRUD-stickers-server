const express = require('express')

const route = express.Router()

const queries = require('../db/queires')

route.get('/', (req, res) => {
    queries.getAll().then(stickers => {
        res.json(stickers)
    })
})

module.exports = route