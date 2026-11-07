require('dotenv').config();
const mongoose = require('mongoose');
const connectDatabase = require('../server/config/db');
const User = require('../server/models/User');
const Area = require('../server/models/Area');
const Order = require('../server/models/Order');
const { ORDER_STATUS: S } = require('../server/constants/orderConstants');

async function seed() {
  await connectDatabase();
  await Promise.all([Order.deleteMany({}), User.deleteMany({}), Area.deleteMany({})]);
  const [nhonBinh, leHongPhong] = await Area.create([
    // 16 phường và 5 xã thuộc thành phố Quy Nhơn (phạm vi dự án).
    { name: 'Bùi Thị Xuân', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Đống Đa', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Ghềnh Ráng', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Hải Cảng', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Lê Hồng Phong', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Lý Thường Kiệt', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Ngô Mây', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Ngô Quyền', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Nguyễn Văn Cừ', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Nhơn Bình', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Nhơn Phú', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Quang Trung', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Thị Nại', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Trần Hưng Đạo', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Trần Phú', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Trần Quang Diệu', description: 'Phường thuộc thành phố Quy Nhơn' },
    { name: 'Nhơn Châu', description: 'Xã thuộc thành phố Quy Nhơn' },
    { name: 'Nhơn Hải', description: 'Xã thuộc thành phố Quy Nhơn' },
    { name: 'Nhơn Hội', description: 'Xã thuộc thành phố Quy Nhơn' },
    { name: 'Nhơn Lý', description: 'Xã thuộc thành phố Quy Nhơn' },
    { name: 'Phước Mỹ', description: 'Xã thuộc thành phố Quy Nhơn' },
  ]);
  const admin = await User.create({ fullName: 'Quản trị viên', email: 'admin@quynhon.local', phone: '0901234567', password: 'Admin@123', role: 'admin', isApproved: true });
  const [shipperOne, shipperTwo] = await User.create([
    { fullName: 'Nguyễn Văn Giao', email: 'shipper1@quynhon.local', phone: '0912345678', password: 'Shipper@123', role: 'shipper', isApproved: true, areaId: nhonBinh._id },
    { fullName: 'Trần Thị Nhận', email: 'shipper2@quynhon.local', phone: '0987654321', password: 'Shipper@123', role: 'shipper', isApproved: true, areaId: leHongPhong._id },
  ]);
  await User.create({ fullName: 'Shipper Chờ Duyệt', email: 'pending@quynhon.local', phone: '0934567890', password: 'Shipper@123', role: 'shipper', isApproved: false });
  await Order.create([
    { orderCode: 'QNH-DEMO-0001', createdBy: admin._id, areaId: nhonBinh._id, senderName: 'Cửa hàng A', senderPhone: '0901111111', receiverName: 'Khách B', receiverPhone: '0902222222', deliveryAddress: 'Nhơn Bình, Quy Nhơn', productType: 'normal', weight: '0-2kg', codAmount: 150000, shippingFee: 20000, status: S.CREATED },
    { orderCode: 'QNH-DEMO-0002', createdBy: admin._id, areaId: nhonBinh._id, shipperId: shipperOne._id, senderName: 'Cửa hàng C', senderPhone: '0903333333', receiverName: 'Khách D', receiverPhone: '0904444444', deliveryAddress: 'Nhơn Bình, Quy Nhơn', productType: 'fragile', weight: '2-5kg', codAmount: 250000, shippingFee: 25000, status: S.ASSIGNED },
    { orderCode: 'QNH-DEMO-0003', createdBy: admin._id, areaId: leHongPhong._id, shipperId: shipperTwo._id, senderName: 'Cửa hàng E', senderPhone: '0905555555', receiverName: 'Khách F', receiverPhone: '0906666666', deliveryAddress: 'Lê Hồng Phong, Quy Nhơn', productType: 'heavy', weight: '5-10kg', codAmount: 0, shippingFee: 30000, status: S.SHIPPING },
  ]);
  console.log('Seed thành công. Admin: admin@quynhon.local / Admin@123');
  console.log('Shipper: shipper1@quynhon.local hoặc shipper2@quynhon.local / Shipper@123');
}
seed().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => mongoose.disconnect());