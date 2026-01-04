# 🌸 Beautify - Website Bán Mỹ Phẩm

## 📋 Mục Lục
- [Giới thiệu](#giới-thiệu)
- [Tech Stack](#tech-stack)
- [Tính năng](#tính-năng)
- [Cài đặt](#cài-đặt)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Screenshots](#screenshots)

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + TanStack Query
- **UI**: Tailwind CSS + shadcn/ui
- **Real-time**: Socket.io
- **Authentication**: JWT + HTTP-only Cookies

## ✨ Tính năng
### Customer
- [x] Xem danh sách sản phẩm với filter/sort
- [x] Giỏ hàng & Checkout
- [x] Thanh toán QR Code (VietQR)
- [x] Chat real-time với admin

### Admin
- [x] Dashboard với biểu đồ doanh thu
- [x] CRUD sản phẩm
- [x] Quản lý đơn hàng
- [x] Quản lý người dùng

## 📸 Screenshots
[Thêm ảnh demo]

## 🚀 Cài đặt
\```bash
pnpm install
cp .env.example .env.local
pnpm dev
\```

📝 Checklist Trước Khi Nộp CV
- [x]Task	                            Trạng thái
- [x]Tách component lớn thành nhỏ	    ⬜
- [x]Thêm constants cho SelectItems	  ⬜
- [x]Viết ít nhất 5 unit tests	      ⬜
- [x]Cập nhật README với screenshots	⬜
- [x]Xóa console.log trong code	      ⬜
- [x]Thêm Error Boundary	            ⬜
- [x]Tạo file .env.example	          ⬜