const express = require('express')

const router = express.Router()

const queries = require('../db/queires')

const isValidId = (req, res, next) => {
  if (!isNaN(req.params.id)) return next()
  next(new Error('Invalid ID'))
}

router.get('/', async (req, res) => {
  await queries.getAll().then((stickers) => {
    res.json(stickers)
  })
})

router.get('/:id', isValidId, async (req, res, next) => {
  await queries.getOne(req.params.id).then((sticker) => {
      if(sticker) {
          res.json(sticker)
      } else {
          next()
      }
  })
})

module.exports = router
