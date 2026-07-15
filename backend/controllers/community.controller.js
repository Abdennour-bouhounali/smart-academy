const Contact = require('../models/Contact');
const { sendConfirmationEmail } = require('../utils/email');
const { validationResult, body } = require('express-validator');
const xss = require('xss');

exports.validateContact = [
  body('full_name').trim().notEmpty().withMessage('Full name is required').isLength({ max: 255 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 50 }),
  body('country').optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body('role').trim().notEmpty().isIn(['Student', 'Teacher', 'Parent', 'Other']).withMessage('Invalid role'),
  body('school').optional({ checkFalsy: true }).trim().isLength({ max: 255 }),
  body('book_owner').optional().isBoolean(),
  body('subject').trim().notEmpty().isIn(['General Question', 'Book Feedback', 'Technical Support', 'Mentoring Session', 'Teacher Collaboration', 'Bulk Purchase', 'Other']).withMessage('Invalid subject'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }).withMessage('Message too long'),
  body('consent').custom((value) => {
    if (value !== true && value !== 'true') {
      throw new Error('Consent is required');
    }
    return true;
  }),
];

exports.submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = {
      full_name: xss(req.body.full_name),
      email: req.body.email,
      phone: xss(req.body.phone),
      country: xss(req.body.country),
      role: req.body.role,
      school: xss(req.body.school),
      book_owner: req.body.book_owner === true || req.body.book_owner === 'true',
      wants_free_session: req.body.wants_free_session === true || req.body.wants_free_session === 'true',
      subject: req.body.subject,
      message: xss(req.body.message),
    };

    const contact = await Contact.create(data);
    
    // Fire and forget email
    sendConfirmationEmail(contact).catch(console.error);

    res.status(201).json({ success: true, message: 'Message received' });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ error: 'Server error while submitting message' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, role, country, book_owner, wants_free_session, search } = req.query;
    const offset = (page - 1) * limit;
    
    const result = await Contact.getContacts({ 
      limit, offset, status, role, country, book_owner, wants_free_session, search 
    });
    
    res.json({
      data: result.data,
      total: result.total,
      page: Number(page),
      totalPages: Math.ceil(result.total / limit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getContactDetails = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['NEW', 'IN_PROGRESS', 'REPLIED', 'CLOSED', 'ARCHIVED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    await Contact.updateStatus(req.params.id, status);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.assignAdmin = async (req, res) => {
  try {
    const { admin_id } = req.body; // In reality, we might take this from req.user
    await Contact.assignToAdmin(req.params.id, admin_id || req.user?.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    await Contact.updateAdminNotes(req.params.id, xss(notes));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.softDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const stats = await Contact.getStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};
