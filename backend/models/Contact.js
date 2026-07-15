const pool = require('../database/db');

class Contact {
  static async create({ full_name, email, phone, country, role, school, book_owner, wants_free_session, subject, message }) {
    const query = `
      INSERT INTO contacts (full_name, email, phone, country, role, school, book_owner, wants_free_session, subject, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
    `;
    const { rows } = await pool.query(query, [
      full_name, email, phone || null, country || null, role, school || null, 
      book_owner || false, wants_free_session || false, 
      subject, message
    ]);
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    await pool.query('UPDATE contacts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [status, id]);
  }

  static async updateAdminNotes(id, admin_notes) {
    await pool.query('UPDATE contacts SET admin_notes = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [admin_notes, id]);
  }
  
  static async assignToAdmin(id, admin_id) {
    await pool.query('UPDATE contacts SET assigned_to = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [admin_id, id]);
  }

  static async getContacts({ limit = 10, offset = 0, status, role, country, book_owner, wants_free_session, search }) {
    let query = 'SELECT c.*, a.username as assigned_admin_name FROM contacts c LEFT JOIN admins a ON c.assigned_to = a.id WHERE c.deleted_at IS NULL';
    const params = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND c.status = $${paramIndex++}`;
      params.push(status);
    }
    if (role) {
      query += ` AND c.role = $${paramIndex++}`;
      params.push(role);
    }
    if (country) {
      query += ` AND c.country = $${paramIndex++}`;
      params.push(country);
    }
    if (book_owner !== undefined && book_owner !== '') {
      query += ` AND c.book_owner = $${paramIndex++}`;
      params.push(book_owner === 'true');
    }
    if (wants_free_session !== undefined && wants_free_session !== '') {
      query += ` AND c.wants_free_session = $${paramIndex++}`;
      params.push(wants_free_session === 'true');
    }
    if (search) {
      query += ` AND (c.full_name ILIKE $${paramIndex} OR c.email ILIKE $${paramIndex} OR c.phone ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countQuery = `SELECT COUNT(*) FROM (${query}) as count_query`;
    const { rows: countRows } = await pool.query(countQuery, params);
    
    query += ` ORDER BY c.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);
    
    const { rows } = await pool.query(query, params);
    return { data: rows, total: parseInt(countRows[0].count) };
  }

  static async getStatistics() {
    const { rows } = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN wants_free_session = true THEN 1 END) as mentoring_requests,
        COUNT(CASE WHEN role = 'Teacher' THEN 1 END) as teachers,
        COUNT(CASE WHEN role = 'Student' THEN 1 END) as students,
        COUNT(CASE WHEN subject = 'Book Feedback' THEN 1 END) as feedback_messages,
        COUNT(CASE WHEN status IN ('NEW', 'IN_PROGRESS') THEN 1 END) as open_requests
      FROM contacts WHERE deleted_at IS NULL
    `);
    
    // Calculate average response time for REPLIED or CLOSED
    const { rows: avgRows } = await pool.query(`
      SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_response_seconds
      FROM contacts 
      WHERE status IN ('REPLIED', 'CLOSED') AND deleted_at IS NULL
    `);
    
    return {
      ...rows[0],
      avg_response_hours: avgRows[0].avg_response_seconds ? (avgRows[0].avg_response_seconds / 3600).toFixed(1) : 0
    };
  }

  static async softDelete(id) {
    await pool.query('UPDATE contacts SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  }
}

module.exports = Contact;
