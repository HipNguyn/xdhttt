const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { vietnamesePhoneRegex } = require('../utils/validationRules');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Họ tên là bắt buộc'], trim: true },
  email: { type: String, required: [true, 'Email là bắt buộc'], unique: true, lowercase: true, trim: true },
  phone: { type: String, required: [true, 'Số điện thoại là bắt buộc'], trim: true, match: [vietnamesePhoneRegex, 'Số điện thoại Việt Nam không hợp lệ'] },
  password: { type: String, required: true, select: false, minlength: 8 },
  role: { type: String, enum: ['admin', 'shipper'], required: true },
  isApproved: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  areaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', default: null },
}, { timestamps: { createdAt: true, updatedAt: true } });

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.set('toJSON', { transform: (_doc, ret) => { delete ret.password; return ret; } });
module.exports = mongoose.model('User', userSchema);