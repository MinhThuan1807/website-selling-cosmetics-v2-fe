## 📋 Mục Lục

- [Giới thiệu](#-giới-thiệu)
- [Tech Stack](#-tech-stack)
- [Tính năng](#-tính-năng)
- [Cài đặt](#-cài-đặt)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Screenshots](#-screenshots)
- [Checklist](#-checklist-cải-thiện)

---

## 🎯 Giới Thiệu

**Beautify** là website thương mại điện tử bán mỹ phẩm với đầy đủ tính năng cho cả khách hàng và quản trị viên. Dự án được xây dựng với các công nghệ hiện đại nhất trong hệ sinh thái React/Next.js.

---

## 🛠 Tech Stack

| Category             | Technologies                   |
| -------------------- | ------------------------------ |
| **Framework**        | Next.js 15 (App Router)        |
| **Language**         | TypeScript                     |
| **State Management** | Redux Toolkit + TanStack Query |
| **Styling**          | Tailwind CSS + shadcn/ui       |
| **Animation**        | Framer Motion                  |
| **Real-time**        | Socket.io                      |
| **Authentication**   | JWT + HTTP-only Cookies        |
| **Charts**           | Recharts                       |
| **Form**             | React Hook Form                |
| **API**              | Axios                          |

---

## ✨ Tính Năng

### 🛒 Customer Side

- [x] Xem danh sách sản phẩm với filter/sort
- [x] Chi tiết sản phẩm với accordion
- [x] Giỏ hàng (thêm, sửa, xóa)
- [x] Checkout với form validation
- [x] Thanh toán QR Code (VietQR)
- [x] Chat real-time với admin
- [x] Quản lý profile & lịch sử đơn hàng
- [x] Email verification

### 👨‍💼 Admin Side

- [x] Dashboard với biểu đồ doanh thu
- [x] CRUD sản phẩm (với upload ảnh)
- [x] Quản lý đơn hàng (cập nhật trạng thái)
- [x] Quản lý người dùng
- [x] Chat support với khách hàng
- [x] Admin authentication riêng

---

## 🚀 Cài Đặt

### Prerequisites

- Node.js >= 18
- pnpm (recommended) hoặc npm

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/beautify-frontend.git
cd beautify-frontend

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

### Environment Variables

```env
# .env.example
NEXT_PUBLIC_API_URL=http://localhost:8080/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:8080
NEXT_PUBLIC_VIETQR_CLIENT_ID=your_client_id
NEXT_PUBLIC_VIETQR_API_KEY=your_api_key
```

---

## 📁 Cấu Trúc Dự Án

```
frontend/
├── app/
│   ├── (admin)/           # Admin protected routes
│   │   ├── dashboard/
│   │   ├── cosmetic/
│   │   ├── order/
│   │   ├── account/
│   │   └── chat/
│   ├── (shop)/            # Customer routes
│   │   ├── product/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── profile/
│   ├── admin/(auth)/      # Admin auth routes
│   └── users/             # User auth routes
├── components/
│   ├── ui/                # shadcn components
│   ├── layout/            # Header, Footer, etc.
│   ├── dashboard/         # Admin dashboard components
│   └── product/           # Product related components
├── lib/
│   ├── redux/             # Redux slices
│   ├── api/               # API functions
│   └── socket/            # Socket context
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

---

## 📸 Screenshots

### Customer Side

| Trang chủ                     | Sản phẩm                            | Giỏ hàng                        |
| ----------------------------- | ----------------------------------- | ------------------------------- |
| ![Home]![alt text](home.png) | ![Products]![alt text](products.png) | ![Cart]![alt text](cart.png) |

### Admin Side

| Dashboard                               | Quản lý SP                                  | Đơn hàng                          |
| --------------------------------------- | ------------------------------------------- | --------------------------------- |
| ![Dashboard](screenshots/dashboard.png) | ![Products](screenshots/admin-products.png) | ![Orders](screenshots/orders.png) |

---

## ✅ Checklist Cải Thiện

### 🔴 Ưu Tiên Cao (Cần làm trước khi apply)

- [X] **Refactor Component Lớn**

  - [X] Tách `cosmetic/page.tsx` thành components nhỏ
  - [X] Tách `order/page.tsx` thành components nhỏ
  - [X] Tách `account/page.tsx` thành components nhỏ
  - [X] Tách `cart/page.tsx` thành components nhỏ
  - [X] Tách `checkout/page.tsx` thành components nhỏ
  - [X] Tách `product/page.tsx` thành components nhỏ
  - [X] Tách `product/[slug]/page.tsx` thành components nhỏ
  - [X] Tách `profile/page.tsx` thành components nhỏ

- [X] **Tạo Constants**

  - [X] Tạo `lib/constants/categories.ts` cho SelectItems
  - [X] Tạo `lib/constants/orderStatus.ts`

- [ ] **Clean Code**

  - [X] Xóa tất cả `console.log`
  - [X] Xóa code commented không cần thiết

- [ ] **Error Handling**

  - [ ] Thêm Error Boundary component
  - [ ] Thêm 404 page
  - [ ] Thêm error.tsx cho từng route

- [X] **Environment**
  - [X] Tạo file `.env.example`
  - [X] Document tất cả env variables

### 🟠 State Management (Redux + TanStack Query)

- [ ] **Tối ưu Redux**

  - [ ] Xóa duplicate state (API data không lưu Redux)
  - [ ] Tạo selectors với `createSelector`
  - [ ] Chỉ dùng Redux cho: cart, UI state, auth session

- [ ] **Tối ưu TanStack Query**

  - [ ] Tạo `lib/api/queryKeys.ts` - Query Key Factory
  - [ ] Tạo `lib/api/queryClient.ts` - Optimized config
  - [ ] Tạo custom hooks trong `hooks/queries/`
    - [ ] `useCosmetics.ts`
    - [ ] `useOrders.ts`
    - [ ] `useAuth.ts`
    - [ ] `useUsers.ts`

- [ ] **Tối ưu Axios**
  - [ ] Refactor `lib/api/axios.ts` - Better interceptors
  - [ ] Tạo API services trong `lib/api/services/`
    - [ ] `cosmetic.api.ts`
    - [ ] `order.api.ts`
    - [ ] `auth.api.ts`
    - [ ] `user.api.ts`

### 🟡 Ưu Tiên Trung Bình

- [ ] **Testing**

  - [ ] Setup Jest + React Testing Library
  - [ ] Viết unit tests cho utility functions
  - [ ] Viết tests cho custom hooks
  - [ ] Viết component tests (ít nhất 5 tests)

- [ ] **Performance**

  - [ ] Thêm `React.memo` cho list items
  - [ ] Thêm `useMemo` cho filtered/sorted data
  - [ ] Thêm `useCallback` cho event handlers
  - [ ] Optimize images với `next/image`

- [ ] **Documentation**
  - [ ] Thêm JSDoc cho functions quan trọng
  - [ ] Cập nhật README với screenshots thực
  - [ ] Tạo CONTRIBUTING.md

### 🟢 Ưu Tiên Thấp (Nice to have)

- [ ] **Accessibility**

  - [ ] Thêm `aria-labels` cho buttons/icons
  - [ ] Kiểm tra keyboard navigation
  - [ ] Kiểm tra color contrast

- [ ] **Advanced Features**

  - [ ] Setup Storybook cho UI components
  - [ ] Đạt Lighthouse score > 90
  - [ ] Thêm PWA support
  - [ ] Thêm i18n (đa ngôn ngữ)

- [ ] **CI/CD**
  - [ ] Setup GitHub Actions
  - [ ] Auto deploy to Vercel
  - [ ] Add lint/test checks

---

## 🔗 Links
- **Original repository** [original-repo]()
- **Backend Repository**: [beautify-backend](https://github.com/QUANG221222/Website-Selling-Cosmetics-v2)
- **Live Demo**: [beautify.vercel.app](https://beautyst.click/)

---

## 👤 Author

**Your Name**

- GitHub: [MinhThuan1807](https://github.com/MinhThuan1807)
- Email: your.email@example.com

---
