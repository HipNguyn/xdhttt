const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Tên khu vực là bắt buộc'], unique: true, trim: true },
  description: { type: String, trim: true, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = mongoose.model('Area', areaSchema);