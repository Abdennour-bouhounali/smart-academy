const { body } = require('express-validator');

const registerValidation = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('الاسم الأول مطلوب')
    .isLength({ max: 50 }).withMessage('الاسم الأول يجب أن لا يتجاوز 50 حرف'),
  body('last_name')
    .trim()
    .notEmpty().withMessage('اللقب مطلوب')
    .isLength({ max: 50 }).withMessage('اللقب يجب أن لا يتجاوز 50 حرف'),
  body('phone_number')
    .trim()
    .notEmpty().withMessage('رقم الهاتف مطلوب'),
  body('address')
    .trim()
    .notEmpty().withMessage('العنوان مطلوب'),
  body('school')
    .trim()
    .notEmpty().withMessage('المدرسة / الثانوية مطلوبة'),
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
