const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const communityController = require('../controllers/community.controller');
const verifyAdmin = require('../middleware/auth');

router.post('/login', adminController.login);

router.get('/orders', verifyAdmin, adminController.getOrders);
router.get('/orders/:id', verifyAdmin, adminController.getOrderDetails);
router.patch('/orders/:id/status', verifyAdmin, adminController.updateOrderStatus);
router.delete('/orders/:id', verifyAdmin, adminController.deleteOrder);
router.get('/statistics', verifyAdmin, adminController.getStatistics);

// Community Routes
router.get('/contacts/statistics', verifyAdmin, communityController.getStatistics);
router.get('/contacts', verifyAdmin, communityController.getContacts);
router.get('/contacts/:id', verifyAdmin, communityController.getContactDetails);
router.patch('/contacts/:id/status', verifyAdmin, communityController.updateStatus);
router.patch('/contacts/:id/assign', verifyAdmin, communityController.assignAdmin);
router.patch('/contacts/:id/notes', verifyAdmin, communityController.updateNotes);
router.delete('/contacts/:id', verifyAdmin, communityController.deleteContact);

module.exports = router;
