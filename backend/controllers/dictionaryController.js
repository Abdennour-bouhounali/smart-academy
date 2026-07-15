const pool = require('../database/db');

// --- PUBLIC ROUTES (Student) ---
exports.getDictionaryData = async (req, res) => {
  try {
    const chaptersResult = await pool.query('SELECT * FROM translation_chapters ORDER BY display_order ASC');
    const cardsResult = await pool.query('SELECT * FROM translation_cards ORDER BY display_order ASC');
    
    // Group cards by chapter
    const data = chaptersResult.rows.map(chapter => {
      return {
        ...chapter,
        items: cardsResult.rows.filter(card => card.chapter_id === chapter.id)
      };
    });
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

// --- ADMIN ROUTES ---
exports.getChapters = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM translation_chapters ORDER BY display_order ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.createChapter = async (req, res) => {
  try {
    const { name, slug, icon, description, display_order } = req.body;
    const result = await pool.query(
      'INSERT INTO translation_chapters (name, slug, icon, description, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, slug, icon, description, display_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, icon, description, display_order } = req.body;
    const result = await pool.query(
      'UPDATE translation_chapters SET name=$1, slug=$2, icon=$3, description=$4, display_order=$5 WHERE id=$6 RETURNING *',
      [name, slug, icon, description, display_order, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM translation_chapters WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getCards = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM translation_cards ORDER BY display_order ASC, id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.createCard = async (req, res) => {
  try {
    const { chapter_id, arabic_statement, mathematical_translation, meaning, example, keywords, difficulty, display_order } = req.body;
    const result = await pool.query(
      'INSERT INTO translation_cards (chapter_id, arabic_statement, mathematical_translation, meaning, example, keywords, difficulty, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [chapter_id, arabic_statement, mathematical_translation, meaning, example, keywords, difficulty || 'Beginner', display_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapter_id, arabic_statement, mathematical_translation, meaning, example, keywords, difficulty, display_order } = req.body;
    const result = await pool.query(
      'UPDATE translation_cards SET chapter_id=$1, arabic_statement=$2, mathematical_translation=$3, meaning=$4, example=$5, keywords=$6, difficulty=$7, display_order=$8, updated_at=CURRENT_TIMESTAMP WHERE id=$9 RETURNING *',
      [chapter_id, arabic_statement, mathematical_translation, meaning, example, keywords, difficulty, display_order, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM translation_cards WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};
