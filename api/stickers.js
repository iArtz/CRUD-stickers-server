const express = require('express')

const router = express.Router()

const queries = require('../db/queires')

const isValidId = (req, res, next) => {
  if (!isNaN(req.params.id)) return next()
  next(new Error('Invalid ID'))
}

const vaildSticker = (sticker) => {
  const hasTitle =
    typeof sticker.Title == 'string' && sticker.Title.trim() != ''
  const hasURL = typeof sticker.URL == 'string' && sticker.URL.trim() != ''
  const hasDescription = typeof sticker.Description == 'string' && sticker.Description.trim() != ''
  const hasRating = !isNaN(sticker.Rating)
  return hasTitle && hasURL && hasDescription && hasRating
}

router.get('/', async (req, res) => {
  await queries.getAll().then((stickers) => {
    res.json(stickers)
  })
})

router.get('/:id', isValidId, async (req, res, next) => {
  await queries.getOne(req.params.id).then((sticker) => {
    if (sticker) {
      res.json(sticker)
    } else {
      next()
    }
  })
})

router.post('/', async (req, res, next) => {
  if (vaildSticker(req.body)) {
    await queries.create(req.body).then((stickers) => {
      res.json(stickers[0])
    })
  } else {
    next(new Error('Invalid sticker'))
  }
})

router.put('/:id', isValidId, async (req, res, next) => {
  if(vaildSticker(req.body)) {
    await queries.update(req.params.id, req.body).then(stickers => {
      res.json(stickers[0])
    })
  } else {
    next(new Error('Invalid sticker'))
  }
})

module.exports = router
