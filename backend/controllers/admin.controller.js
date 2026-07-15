const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Order = require('../models/Order');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-smart-store-key-2026';

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findByUsername(username);
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.password_hash);
    if (match) {
      const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, wilaya, search } = req.query;
    const offset = (page - 1) * limit;
    
    const result = await Order.getOrders({ limit, offset, status, wilaya, search });
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

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    const allowedTransitions = {
      'pending': ['in_way', 'cancelled'],
      'in_way': ['delivered', 'returned'],
      'delivered': [],
      'returned': [],
      'cancelled': []
    };
    
    if (order.status !== status && !allowedTransitions[order.status].includes(status)) {
      return res.status(400).json({ error: `Invalid transition from ${order.status} to ${status}` });
    }

    await Order.updateStatus(req.params.id, status);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    await Order.delete(req.params.id);
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const statusStats = await Order.getStatistics();
    
    const stats = {
      total_orders: 0, pending: 0, delivered: 0, returned: 0, in_way: 0, cancelled: 0,
      total_expected_revenue: 0, delivered_revenue: 0, returned_amount: 0
    };

    statusStats.forEach(row => {
      const count = Number(row.count);
      const revenue = Number(row.total_revenue || 0);
      
      stats.total_orders += count;
      stats.total_expected_revenue += revenue;

      if (row.status === 'pending') stats.pending = count;
      if (row.status === 'in_way') stats.in_way = count;
      if (row.status === 'cancelled') stats.cancelled = count;
      if (row.status === 'delivered') {
        stats.delivered = count;
        stats.delivered_revenue = revenue;
      }
      if (row.status === 'returned') {
        stats.returned = count;
        stats.returned_amount = revenue;
      }
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};
