const pool = require('../database/db');

class Order {
  static async create({ order_reference, product_id, customer_name, phone, email, wilaya, commune, address, quantity, total_price }) {
    const query = `
      INSERT INTO orders (order_reference, product_id, customer_name, phone, email, wilaya, commune, address, quantity, total_price) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
    `;
    const { rows } = await pool.query(query, [
      order_reference, product_id, customer_name, phone, email || null, 
      wilaya, commune, address, quantity || 1, total_price
    ]);
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    await pool.query('UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [status, id]);
  }

  static async getOrders({ limit = 10, offset = 0, status, wilaya, search }) {
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }
    if (wilaya) {
      query += ` AND wilaya = $${paramIndex++}`;
      params.push(wilaya);
    }
    if (search) {
      query += ` AND (customer_name ILIKE $${paramIndex} OR order_reference ILIKE $${paramIndex} OR phone ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countQuery = `SELECT COUNT(*) FROM (${query}) as count_query`;
    const { rows: countRows } = await pool.query(countQuery, params);
    
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);
    
    const { rows } = await pool.query(query, params);
    return { data: rows, total: parseInt(countRows[0].count) };
  }

  static async getStatistics() {
    const { rows } = await pool.query(`
      SELECT status, COUNT(*) as count, SUM(total_price) as total_revenue
      FROM orders
      GROUP BY status
    `);
    return rows;
  }

  static async delete(id) {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
  }
}

module.exports = Order;
