const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { addTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transaction.controller')

router.post('/', authMiddleware, addTransaction)
router.get('/', authMiddleware, getTransactions)
router.put('/:id', authMiddleware, updateTransaction)
router.delete('/:id', authMiddleware, deleteTransaction)

module.exports = router;