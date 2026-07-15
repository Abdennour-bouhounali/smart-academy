const pool = require('../database/db');

class Admin {
  static async findByUsername(username) {
    const { rows } = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    return rows[0];
  }
}

module.exports = Admin;
