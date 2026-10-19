const ApiError = require('../utils/ApiError');

const allowRoles = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return next(new ApiError(403, 'Bạn không có quyền truy cập chức năng này'));
  next();
};
const requireApprovedShipper = (req, _res, next) => {
  if (req.user?.role !== 'shipper') return next(new ApiError(403, 'Chức năng này chỉ dành cho Shipper'));
  if (!req.user.isApproved) return next(new ApiError(403, 'Tài khoản đang chờ Admin phê duyệt'));
  next();
};
module.exports = { allowRoles, requireApprovedShipper };