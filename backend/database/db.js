const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { Pool, Client } = require('pg');

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || 'postgres'}${process.env.DB_PASSWORD ? ':' + process.env.DB_PASSWORD : ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'smart_store'}`;

const pool = new Pool({
  connectionString,
});

async function initDB() {
  try {
    // Only attempt to create database in local dev environments
    if (!process.env.DATABASE_URL || process.env.NODE_ENV !== 'production') {
      try {
        const client = new Client({
          connectionString: connectionString.replace(/\/[^/]+$/, '/postgres'),
        });
        await client.connect();
        const dbName = process.env.DB_NAME || 'smart_store';
        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`, [dbName]);
        if (res.rowCount === 0) {
          await client.query(`CREATE DATABASE "${dbName}"`);
        }
        await client.end();
      } catch (err) {
        console.warn('Skipped database creation (likely connecting to a cloud DB directly).');
      }
    }

    const db = await pool.connect();
    
    // 0. Users Table (Student Auth System)
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        address TEXT NOT NULL,
        school VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);

    // 1. Admins Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Products Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Orders Table with Foreign Key & Check Constraints
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_reference VARCHAR(50) NOT NULL UNIQUE,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        wilaya VARCHAR(255) NOT NULL,
        commune VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
        total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_way', 'delivered', 'returned', 'cancelled')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3.5. Contacts Table for Community & Mentorship
    await db.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        uuid UUID DEFAULT gen_random_uuid() UNIQUE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        country VARCHAR(100),
        role VARCHAR(50) NOT NULL,
        school VARCHAR(255),
        book_owner BOOLEAN DEFAULT false,
        wants_free_session BOOLEAN DEFAULT false,
        subject VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'NEW' CHECK (status IN ('NEW', 'IN_PROGRESS', 'REPLIED', 'CLOSED', 'ARCHIVED')),
        admin_notes TEXT,
        assigned_to INTEGER REFERENCES admins(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP
      )
    `);

    // 4. Create Indexes for admin filtering and fast lookups
    await db.query(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC)`);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_orders_wilaya ON orders(wilaya)`);

    // 5. Seed Default Product
    await db.query(`
      INSERT INTO products (name, description, price, image)
      SELECT 'كتاب SMART - منهجية التفكير الرياضي', 'الكتاب الشامل لتعلم بروتوكول SMART وحل تمارين الرياضيات بذكاء', 1400, '/images/book-cover.webp'
      WHERE NOT EXISTS (SELECT 1 FROM products)
    `);

    db.release();
    console.log('Database initialized successfully with advanced relational structures.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

initDB();

module.exports = pool;
