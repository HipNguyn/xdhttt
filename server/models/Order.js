const mongoose = require('mongoose');
const { ORDER_STATUS, PRODUCT_TYPES, WEIGHT_RANGES } = require('../constants/orderConstants');
const { vietnamesePhoneRegex } = require('../utils/validationRules');

const orderSchema = new mongoose.Schema({
  orderCode: { type: String, required: true, unique: true, index: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shipperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  areaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', default: null, index: true },
  senderName: { type: String, required: true, trim: true },
  senderPhone: { type: String, required: true, trim: true, match: [vietnamesePhoneRegex, 'Số điện thoại người gửi không hợp lệ'] },
  receiverName: { type: String, required: true, trim: true },
  receiverPhone: { type: String, required: true, trim: true, match: [vietnamesePhoneRegex, 'Số điện thoại người nhận không hợp lệ'] },
  deliveryAddress: { type: String, required: true, trim: true },
  productType: { type: String, required: true, enum: PRODUCT_TYPES },
  weight: { type: String, required: true, enum: WEIGHT_RANGES },
  note: { type: String, trim: true, default: '' },
  codAmount: { type: Number, default: 0, min: [0, 'COD không được âm'] },
  shippingFee: { type: Number, default: 0, min: [0, 'Phí giao hàng không được âm'] },
  status: { type: String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.CREATED, index: true },
  failureReason: { type: String, trim: true, default: null },
  adminNote: { type: String, trim: true, default: '' },
  completedAt: { type: Date, default: null },
}, { timestamps: { createdAt: true, updatedAt: true } });

orderSchema.pre('validate', function validateFailureReason(next) {
  if (this.status === ORDER_STATUS.FAILED && !this.failureReason?.trim()) return next(new Error('Lý do giao thất bại là bắt buộc'));
  next();
});

module.exports = mongoose.model('Order', orderSchema);