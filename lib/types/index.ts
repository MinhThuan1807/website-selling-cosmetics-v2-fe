/**
 * Thông tin người dùng trong hệ thống
 * Bao gồm cả khách hàng và quản trị viên
 */
export interface User {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
  isActive: boolean;
  phone?: string;
  gender?: string;
  dob?: Date;
  avatar?: string;
  createdAt: Date;
}

/**
 * Thông tin sản phẩm mỹ phẩm
 * Bao gồm thông tin giá gốc và giá khuyến mãi
 */
export interface Cosmetic {
  _id: string;
  brand: string;
  nameCosmetic: string;
  description?: string;
  classify: string;
  image?: string;
  quantity: number;
  originalPrice: number;
  discountPrice: number;
  rating?: number;
  isNew?: boolean;
  isSaleOff?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Địa chỉ giao hàng của người dùng
 * Mỗi user có thể có nhiều địa chỉ, một địa chỉ mặc định
 */
export interface Address {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  addressDetail: string;
  isDefault: boolean;
  createdAt: Date;
}

/**
 * Mục trong giỏ hàng
 * Hỗ trợ cả trường hợp chỉ có ID và trường hợp đã populate đầy đủ
 */
export interface CartItem {
  /** ID sản phẩm - Backend trả về trường này */
  cosmeticId?: string;
  /** Đối tượng sản phẩm đầy đủ - Được populate từ cosmeticId */
  cosmetic?: Cosmetic;
  quantity: number;
  price?: number;
  subtotal: number;
  /** Trạng thái được chọn trong giỏ hàng */
  isSelected?: boolean;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  cosmetic: Cosmetic;
  quantity: number;
  price: number;
  subtotal: number;
  cosmeticName: string;
  cosmeticImage: string;
}

export interface Payment {
  status: "unpaid" | "paid" | "failed";
  method?: string;
  amount: number;
  paidAt?: Date;
}

export interface Order {
  _id: string;
  userId: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  orderNotes?: string;
  totalAmount: number;
  totalItems: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  items: OrderItem[];
  payment: Payment;
  createdAt: Date;
  updatedAt: Date;
}

// interface IOrder {
//   _id?: ObjectId
//   userId: ObjectId
//   receiverName: string
//   receiverPhone: string
//   receiverAddress: string
//   items: IOrderItem[]
//   totalAmount: number
//   totalItems: number
//   status: 'pending' | 'processing' | 'completed' | 'cancelled'
//   payment: IOrderPayment
//   createdAt: Date
//   updatedAt: Date | null
//   _destroy: boolean
// }

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  message: string;
  data: T;
  pagination?: Pagination;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
