const Order = require('../models/Order');
const Product = require('../models/Product');
const wilayas = require('../utils/wilayas');

exports.getWilayas = (req, res) => {
  res.json(wilayas);
};

exports.createOrder = async (req, res) => {
  try {
    const { customer_name, phone, email, wilaya, commune, address, quantity } = req.body;
    
    if (!customer_name || !phone || !wilaya || !commune || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = await Product.getFirst();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    const price = product.price;
    const total_price = price * (quantity || 1);
    const order_reference = `SMART-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    await Order.create({
      order_reference, 
      product_id: product.id, 
      customer_name, 
      phone, 
      email, 
      wilaya, 
      commune, 
      address, 
      quantity, 
      total_price
    });

    res.status(201).json({ success: true, order_reference });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
