const router = require('express').Router()
const { login, signup, logout, getMe } = require('../controllers/user.controller')
const authMiddleWare = require('../middlewares/authMiddleware')
router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.get('/me', authMiddleWare, getMe)

module.exports = router