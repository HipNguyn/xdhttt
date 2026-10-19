const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');
function validate(req, _res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) return next(new ApiError(400, 'Dữ liệu không hợp lệ', result.array().map((e) => ({ field: e.path, message: e.msg }))));
  next();
}
module.exports = validate;