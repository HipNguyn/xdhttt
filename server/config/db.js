const mongoose = require('mongoose');

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Thiếu MONGODB_URI. Hãy cấu hình trong file .env trước khi chạy server.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}

module.exports = connectDatabase;