const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { registerValidation, loginValidation } = require('./authValidation');
const { requireAuth } = require('./authMiddleware');

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/me', requireAuth, authController.getCurrentUser);
router.post('/logout', requireAuth, (req, res) => {
  res.json({ message: 'تم تسجيل الخروج بنجاح' });
});

module.exports = router;
