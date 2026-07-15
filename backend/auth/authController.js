const { validationResult } = require('express-validator');
const authService = require('./authService');

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { full_name, email, password } = req.body;
      const result = await authService.register(full_name, email, password);
      
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'EMAIL_EXISTS') {
        return res.status(409).json({ message: 'البريد الإلكتروني مسجل مسبقاً' });
      }
      console.error('Registration error:', error);
      res.status(500).json({ message: 'حدث خطأ في الخادم' });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.json(result);
    } catch (error) {
      if (error.message === 'INVALID_CREDENTIALS') {
        return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
      }
      console.error('Login error:', error);
      res.status(500).json({ message: 'حدث خطأ في الخادم' });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await authService.getCurrentUser(req.user.id);
      res.json({ user });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'حدث خطأ في الخادم' });
    }
  }
}

module.exports = new AuthController();
