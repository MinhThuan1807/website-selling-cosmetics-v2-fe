import { Package, Truck, CheckCircle, XCircle } from "lucide-react";

export const ORDER_STATUS = {
  pending: {
    value: "pending",
    label: "Chờ xử lý",
    variant: "secondary" as const,
    icon: Package,
  },
  processing: {
    value: "processing",
    label: "Đang xử lý",
    variant: "default" as const,
    icon: Truck,
  },
  completed: {
    value: "completed",
    label: "Hoàn thành",
    variant: "outline" as const,
    icon: CheckCircle,
  },
  cancelled: {
    value: "cancelled",
    label: "Đã hủy",
    variant: "destructive" as const,
    icon: XCircle,
  },
} as const;

export const PAYMENT_STATUS = {
  paid: { value: "paid", label: "Đã thanh toán", variant: "outline" as const },
  unpaid: { value: "unpaid", label: "Chưa thanh toán", variant: "secondary" as const },
  failed: { value: "failed", label: "Thanh toán thất bại", variant: "destructive" as const },
} as const;

export const ORDER_STATUS_OPTIONS = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "processing", label: "Đang xử lý" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
] as const;

export const PAYMENT_STATUS_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "paid", label: "Đã thanh toán" },
  { value: "unpaid", label: "Chưa thanh toán" },
  { value: "failed", label: "Thất bại" },
] as const;

export const ORDER_PAGE_SIZE_OPTIONS = [8, 20, 50] as const;

// Type exports
export type OrderStatus = keyof typeof ORDER_STATUS;
export type PaymentStatus = keyof typeof PAYMENT_STATUS;