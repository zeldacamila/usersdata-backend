const express = require('express')
const { createMarker, listMarkers } = require('./address.controller')

const router = express.Router()

router.post('/markers', createMarker)
router.get('/markers', listMarkers)

module.exports = router