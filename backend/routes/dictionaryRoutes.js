const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/auth');
const dictionaryController = require('../controllers/dictionaryController');

// Public endpoints
router.get('/data', dictionaryController.getDictionaryData);

// Admin endpoints (require auth)
router.get('/chapters', verifyAdmin, dictionaryController.getChapters);
router.post('/chapters', verifyAdmin, dictionaryController.createChapter);
router.put('/chapters/:id', verifyAdmin, dictionaryController.updateChapter);
router.delete('/chapters/:id', verifyAdmin, dictionaryController.deleteChapter);

router.get('/cards', verifyAdmin, dictionaryController.getCards);
router.post('/cards', verifyAdmin, dictionaryController.createCard);
router.put('/cards/:id', verifyAdmin, dictionaryController.updateCard);
router.delete('/cards/:id', verifyAdmin, dictionaryController.deleteCard);

module.exports = router;
