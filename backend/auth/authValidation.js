const { body } = require('express-validator');

const registerValidation = [
  body('full_name')
    .trim()
    .notEmpty().withMessage('الاسم الكامل مطلوب')
    .isLength({ max: 100 }).withMessage('الاسم الكامل يجب أن لا يتجاوز 100 حرف'),
  body('email')
    .trim()
    .isEmail().withMessage('يجب إدخال بريد إلكتروني صحيح')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('كلمة المرور يجب أن تتكون من 8 أحرف على الأقل')
];

const loginValidation = [
  body('email')
    .trim()
    .isEmail().withMessage('يجب إدخال بريد إلكتروني صحيح')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('كلمة المرور مطلوبة')
];

module.exports = {
  registerValidation,
  loginValidation
};
