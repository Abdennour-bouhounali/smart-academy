const pool = require('../database/db');

class AuthRepository {
  async findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  async findUserById(id) {
    const result = await pool.query('SELECT id, full_name, email, role FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createUser(userData) {
    const { full_name, email, password_hash } = userData;
    const result = await pool.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email, role',
      [full_name, email, password_hash]
    );
    return result.rows[0];
  }
}

module.exports = new AuthRepository();
