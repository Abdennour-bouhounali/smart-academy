const pool = require('../database/db');

class Product {
  static async getFirst() {
    const { rows } = await pool.query('SELECT * FROM products LIMIT 1');
    return rows[0];
  }
}

module.exports = Product;
