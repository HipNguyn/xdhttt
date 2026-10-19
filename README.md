# Hệ thống quản lý đơn giao hàng nội thành Quy Nhơn

## Trạng thái dự án

Dự án đã hoàn tất **Phase 3 – Backend nền tảng**: Express API, MongoDB/Mongoose models, JWT authentication, phân quyền Admin/Shipper, workflow đơn hàng, validation, error handling và seed data độc lập.

## Công nghệ

- Frontend: HTML5, CSS3, Bootstrap 5, JavaScript ES6+, Fetch API
- Backend: Node.js, Express.js, REST API JSON
- Database: MongoDB, Mongoose
- Authentication: JWT, bcrypt

## Cấu hình môi trường

1. Sao chép `.env.example` thành `.env`.
2. Bổ sung giá trị `MONGODB_URI` kết nối MongoDB của bạn.
3. Bổ sung `JWT_SECRET` mạnh và riêng tư.

> Dự án sử dụng MongoDB. Không có SQL schema, migration hoặc tệp `.sql` được tạo trong repository.

## Cài đặt và chạy Backend

```bash
npm install
Copy-Item .env.example .env
```

Sau đó điền `MONGODB_URI` và `JWT_SECRET` vào `.env`, rồi chạy:

```bash
npm run dev
# hoặc
npm start
```

Kiểm tra API:

```text
GET http://localhost:5000/api/health
```

## Seed dữ liệu demo (tùy chọn)

> Lệnh seed sẽ xóa toàn bộ dữ liệu hiện có trong collections `users`, `areas`, `orders`. Chỉ dùng cho môi trường phát triển/demo.

```bash
npm run seed
```

Tài khoản demo sau khi seed:

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | `admin@quynhon.local` | `Admin@123` |
| Shipper đã duyệt | `shipper1@quynhon.local` | `Shipper@123` |
| Shipper đã duyệt | `shipper2@quynhon.local` | `Shipper@123` |
| Shipper chờ duyệt | `pending@quynhon.local` | `Shipper@123` |

## Scripts

```bash
npm run dev     # Chạy server bằng nodemon
npm start       # Chạy server production-style
npm run seed    # Nạp dữ liệu demo MongoDB
npm run check   # Kiểm tra cú pháp JavaScript backend
```

## Cấu trúc chính

```text
server/     Backend Express/Mongoose
public/     HTML, CSS và JavaScript phía client
scripts/    Script tiện ích, gồm seed data ở phase sau
```
