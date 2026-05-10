const router = require('express').Router();
const {
    addClient,
    getClients,
    updateClient,
    deleteClient
} = require('../controllers/client.controller');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, addClient);

router.get('/', authMiddleware, getClients);

router.put('/:id', authMiddleware, updateClient);

router.delete('/:id', authMiddleware, deleteClient);

module.exports = router;