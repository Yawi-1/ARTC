const { addBranch, getAllBranches } = require('../controllers/branch.controller')
const router = require('express').Router()

router.post('/', addBranch)
router.get('/', getAllBranches)

module.exports = router