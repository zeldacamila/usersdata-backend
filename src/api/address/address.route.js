const express = require('express')
const { create, listMarkers } = require('./address.controller')

const router = express.Router()

router.post('/markers', create)
router.get('/markers', listMarkers)

module.exports = router