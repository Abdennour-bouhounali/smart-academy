const bcrypt = require('bcrypt');
const pool = require('./database/db.js');

async function seedAdmin() {
  try {
    console.log('Waiting for database tables to initialize...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    const passwordHash = await bcrypt.hash('smart@2026', 10);
    // In PostgreSQL, to achieve INSERT IGNORE behavior we use ON CONFLICT DO NOTHING
    const result = await pool.query(
      'INSERT INTO admins (username, password_hash) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING RETURNING id',
      ['smartAdmin', passwordHash]
    );
    if (result.rowCount > 0) {
      console.log('Admin created: smartAdmin / smart@2026');
    } else {
      console.log('Admin already exists.');
    }
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    process.exit(0);
  }
}

seedAdmin();
