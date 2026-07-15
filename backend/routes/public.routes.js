const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const communityController = require('../controllers/community.controller');

router.get('/wilayas', orderController.getWilayas);
router.post('/orders', orderController.createOrder);

router.post('/contacts', communityController.validateContact, communityController.submitContact);

module.exports = router;
