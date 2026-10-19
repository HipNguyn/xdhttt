const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;
  if (!token) throw new ApiError(401, 'Vui lòng đăng nhập để tiếp tục');
  let payload;
  try { payload = jwt.verify(token, process.env.JWT_SECRET); } catch { throw new ApiError(401, 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn'); }
  const user = await User.findById(payload.userId);
  if (!user) throw new ApiError(401, 'Tài khoản không tồn tại');
  if (!user.isActive) throw new ApiError(403, 'Tài khoản đã bị khóa hoặc ngừng hoạt động');
  req.user = user;
  next();
});
module.exports = { authenticate };