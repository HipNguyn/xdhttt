const Order = require('../models/Order');

async function generateOrderCode() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const prefix = `QNH-${date}-`;
  const count = await Order.countDocuments({ orderCode: new RegExp(`^${prefix}`) });
  return `${prefix}${String(count + 1).padStart(4, '0')}`;
}

module.exports = generateOrderCode;