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

    // 3.6. Translation Dictionary Tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS translation_chapters (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        icon VARCHAR(255),
        description TEXT,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS translation_cards (
        id SERIAL PRIMARY KEY,
        chapter_id INTEGER NOT NULL REFERENCES translation_chapters(id) ON DELETE CASCADE,
        arabic_statement TEXT NOT NULL,
        mathematical_translation TEXT NOT NULL,
        meaning TEXT NOT NULL,
        example TEXT,
        keywords TEXT,
        difficulty VARCHAR(50) DEFAULT 'Beginner',
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

    // 6. Seed Translation Dictionary Chapters
    await db.query(`
      INSERT INTO translation_chapters (name, slug, icon, description, display_order)
      SELECT 'الدوال', 'functions', 'Activity', 'ترجمة العبارات المتعلقة بالدوال وتغيراتها', 1
      WHERE NOT EXISTS (SELECT 1 FROM translation_chapters WHERE slug = 'functions');

      INSERT INTO translation_chapters (name, slug, icon, description, display_order)
      SELECT 'المتتاليات', 'sequences', 'Layers', 'ترجمة العبارات المتعلقة بالمتتاليات', 2
      WHERE NOT EXISTS (SELECT 1 FROM translation_chapters WHERE slug = 'sequences');

      INSERT INTO translation_chapters (name, slug, icon, description, display_order)
      SELECT 'التكامل', 'integrals', 'Sigma', 'ترجمة العبارات المتعلقة بالتكاملات والمساحات', 3
      WHERE NOT EXISTS (SELECT 1 FROM translation_chapters WHERE slug = 'integrals');
    `);

    // 7. Seed Translation Dictionary Cards
    await db.query(`
      INSERT INTO translation_cards (chapter_id, arabic_statement, mathematical_translation, meaning, example, keywords)
      SELECT id, 'المماس أفقي', 'f''(a) = 0', 'هذا يعني أن ميل المماس يساوي صفراً.', 'أثبت أن المنحنى يقبل مماساً أفقياً عند النقطة ذات الفاصلة 2.', 'مماس, أفقي, ميل'
      FROM translation_chapters WHERE slug = 'functions'
      AND NOT EXISTS (SELECT 1 FROM translation_cards WHERE arabic_statement = 'المماس أفقي');

      INSERT INTO translation_cards (chapter_id, arabic_statement, mathematical_translation, meaning, example, keywords)
      SELECT id, 'الدالة متزايدة', 'f''(x) > 0', 'المشتقة موجبة تماماً على المجال.', 'بين أن الدالة متزايدة تماما على المجال المعطى.', 'متزايدة, إشارة, موجبة'
      FROM translation_chapters WHERE slug = 'functions'
      AND NOT EXISTS (SELECT 1 FROM translation_cards WHERE arabic_statement = 'الدالة متزايدة');

      INSERT INTO translation_cards (chapter_id, arabic_statement, mathematical_translation, meaning, example, keywords)
      SELECT id, 'متزايدة', 'U_{n+1} - U_n > 0', 'يمكن الآن دراسة إشارة الفرق.', 'ادرس اتجاه تغير المتتالية.', 'متتالية, متزايدة, فرق'
      FROM translation_chapters WHERE slug = 'sequences'
      AND NOT EXISTS (SELECT 1 FROM translation_cards WHERE arabic_statement = 'متزايدة');
    `);

    db.release();
    console.log('Database initialized successfully with advanced relational structures.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

initDB();

module.exports = pool;
