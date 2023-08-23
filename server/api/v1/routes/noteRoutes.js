const express = require('express');
const noteController = require('../controllers/noteController');
const router = express.Router();
const auth = require('../../../middleware/auth');

router.post('/new', auth,noteController.add);
router.get('/:id', auth,noteController.read);
router.get('/', auth,noteController.readAll);
router.patch('/:id', auth,noteController.update);
router.delete('/:id', auth,noteController.delete);

module.exports = router;