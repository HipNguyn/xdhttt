require('dotenv').config();

const mongoose = require('mongoose');
const connectDatabase = require('../server/config/db');
const Area = require('../server/models/Area');

const quyNhonAreas = [
  ['Bùi Thị Xuân', 'Phường thuộc thành phố Quy Nhơn'],
  ['Đống Đa', 'Phường thuộc thành phố Quy Nhơn'],
  ['Ghềnh Ráng', 'Phường thuộc thành phố Quy Nhơn'],
  ['Hải Cảng', 'Phường thuộc thành phố Quy Nhơn'],
  ['Lê Hồng Phong', 'Phường thuộc thành phố Quy Nhơn'],
  ['Lý Thường Kiệt', 'Phường thuộc thành phố Quy Nhơn'],
  ['Ngô Mây', 'Phường thuộc thành phố Quy Nhơn'],
  ['Ngô Quyền', 'Phường thuộc thành phố Quy Nhơn'],
  ['Nguyễn Văn Cừ', 'Phường thuộc thành phố Quy Nhơn'],
  ['Nhơn Bình', 'Phường thuộc thành phố Quy Nhơn'],
  ['Nhơn Phú', 'Phường thuộc thành phố Quy Nhơn'],
  ['Quang Trung', 'Phường thuộc thành phố Quy Nhơn'],
  ['Thị Nại', 'Phường thuộc thành phố Quy Nhơn'],
  ['Trần Hưng Đạo', 'Phường thuộc thành phố Quy Nhơn'],
  ['Trần Phú', 'Phường thuộc thành phố Quy Nhơn'],
  ['Trần Quang Diệu', 'Phường thuộc thành phố Quy Nhơn'],
  ['Nhơn Châu', 'Xã thuộc thành phố Quy Nhơn'],
  ['Nhơn Hải', 'Xã thuộc thành phố Quy Nhơn'],
  ['Nhơn Hội', 'Xã thuộc thành phố Quy Nhơn'],
  ['Nhơn Lý', 'Xã thuộc thành phố Quy Nhơn'],
  ['Phước Mỹ', 'Xã thuộc thành phố Quy Nhơn'],
];

async function upsertAreas() {
  await connectDatabase();

  const result = await Area.bulkWrite(
    quyNhonAreas.map(([name, description]) => ({
      updateOne: {
        filter: { name },
        update: { $setOnInsert: { name, description, isActive: true } },
        upsert: true,
      },
    })),
  );

  const areas = await Area.find({ name: { $in: quyNhonAreas.map(([name]) => name) } })
    .sort({ name: 1 })
    .lean();

  console.log(`Đã thêm mới: ${result.upsertedCount}; đã tồn tại: ${result.matchedCount}; tổng khu vực Quy Nhơn: ${areas.length}.`);
  console.table(areas.map((area) => ({ name: area.name, description: area.description, isActive: area.isActive })));
}

upsertAreas()
  .catch((error) => {
    console.error('Không thể cập nhật khu vực:', error);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());