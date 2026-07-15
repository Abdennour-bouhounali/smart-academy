const pool = require('../database/db');

class AuthRepository {
  async findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  async findUserById(id) {
    const result = await pool.query('SELECT id, first_name, last_name, phone_number, address, school, email, role FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createUser(userData) {
    const { first_name, last_name, phone_number, address, school, email, password_hash } = userData;
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, phone_number, address, school, email, password_hash) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, first_name, last_name, phone_number, address, school, email, role',
      [first_name, last_name, phone_number, address, school, email, password_hash]
    );
    return result.rows[0];
  }
}

module.exports = new AuthRepository();
