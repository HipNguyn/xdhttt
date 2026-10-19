function notFound(req, _res, next) { const error = new Error(`Không tìm thấy endpoint ${req.method} ${req.originalUrl}`); error.statusCode = 404; next(error); }
function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || (error.name === 'CastError' ? 404 : error.code === 11000 ? 409 : 500);
  const message = error.code === 11000 ? 'Dữ liệu đã tồn tại' : error.message || 'Đã xảy ra lỗi máy chủ';
  if (statusCode >= 500) console.error(error);
  res.status(statusCode).json({ success: false, message, ...(error.errors?.length ? { errors: error.errors } : {}) });
}
module.exports = { notFound, errorHandler };