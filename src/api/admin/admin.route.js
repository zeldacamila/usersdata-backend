const express = require('express')
const { signup, signin, listAdmins } = require('./admin.controller')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/admins', listAdmins)
//router.get('/:userId', findOneUser)
//router.delete('/:userId', destroy)

module.exports = router