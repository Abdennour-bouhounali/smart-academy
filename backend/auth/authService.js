const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('./authRepository');

class AuthService {
  async register(first_name, last_name, phone_number, address, school, email, password) {
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('EMAIL_EXISTS');
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await authRepository.createUser({ first_name, last_name, phone_number, address, school, email, password_hash });

    const token = this.generateToken(user);
    return { token, user };
  }

  async login(email, password) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const token = this.generateToken(user);
    
    // omit password_hash from the response
    const { password_hash, ...userWithoutPassword } = user;
    
    return { token, user: userWithoutPassword };
  }

  async getCurrentUser(id) {
    const user = await authRepository.findUserById(id);
    if (!user) throw new Error('USER_NOT_FOUND');
    
    return user;
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.STUDENT_JWT_SECRET || process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
}

module.exports = new AuthService();
