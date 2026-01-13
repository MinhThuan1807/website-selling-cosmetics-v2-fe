import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Order } from "./types";
import { CheckCircle, Package, Truck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
/**
 * Kết hợp các class CSS với Tailwind merge
 * Tự động xử lý xung đột giữa các class Tailwind
 * @param inputs - Danh sách các class cần kết hợp
 * @returns Chuỗi class đã được merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Định dạng số tiền theo chuẩn Việt Nam Đồng
 * @param amount - Số tiền cần định dạng
 * @returns Chuỗi đã định dạng với đơn vị VNĐ
 * @example formatCurrency(1000000) => "1.000.000 VNĐ"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
}

/**
 * Định dạng ngày tháng theo locale Việt Nam
 * @param date - Đối tượng Date cần định dạng
 * @returns Chuỗi ngày tháng theo định dạng dd/mm/yyyy
 */
export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

/**
 * Tạo ID ngẫu nhiên dựa trên timestamp và chuỗi random
 * Sử dụng cho các trường hợp cần ID tạm thời phía client
 * @returns Chuỗi ID duy nhất
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Định dạng ngày tháng rút gọn
 * @param date - Ngày cần định dạng (Date hoặc string ISO)
 * @returns Chuỗi ngày tháng rút gọn
 */
export const formatDateShort = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("vi-VN");
};

/**
 * Rút gọn mã đơn hàng để hiển thị
 * Giữ lại 8 ký tự đầu với prefix # và suffix ...
 * @param orderId - Mã đơn hàng đầy đủ
 * @returns Mã đơn hàng đã rút gọn
 * @example truncateOrderId("abc123456789") => "#abc12345..."
 */
export const truncateOrderId = (orderId: string): string => {
  if (orderId.length <= 10) return orderId;
  return `#${orderId.substring(0, 8)}...`;
};

/**
 * Rút gọn văn bản theo độ dài tối đa
 * @param text - Văn bản cần rút gọn
 * @param maxLength - Độ dài tối đa cho phép
 * @returns Văn bản đã rút gọn với suffix ...
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Hàm debounce để tối ưu hiệu suất cho các thao tác liên tục
 * Thường dùng cho: search input, resize handler, scroll handler
 * @param func - Hàm cần debounce
 * @param wait - Thời gian chờ (ms) trước khi thực thi
 * @returns Hàm đã được debounce
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Kiểm tra tính hợp lệ của địa chỉ email
 * @param email - Địa chỉ email cần kiểm tra
 * @returns true nếu email hợp lệ
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Kiểm tra tính hợp lệ của số điện thoại Việt Nam
 * Hỗ trợ các định dạng: +84, 84, 0 + đầu số nhà mạng
 * @param phone - Số điện thoại cần kiểm tra
 * @returns true nếu số điện thoại hợp lệ
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex =
    /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}
export const getStatusBadge = (status: Order["status"]) => {
  const statusConfig = {
    pending: {
      label: "Chờ xử lý",
      variant: "secondary" as const,
      icon: Package,
    },
    processing: {
      label: "Đang xử lý",
      variant: "default" as const,
      icon: Truck,
    },
    completed: {
      label: "Hoàn thành",
      variant: "outline" as const,
      icon: CheckCircle,
    },
    cancelled: {
      label: "Đã hủy",
      variant: "destructive" as const,
      icon: XCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export const getPaymentBadge = (status: string) => {
  const paymentConfig = {
    paid: { label: "Đã thanh toán", variant: "outline" as const },
    unpaid: { label: "Chưa thanh toán", variant: "secondary" as const },
    failed: { label: "Thanh toán thất bại", variant: "destructive" as const },
  };

  const config = paymentConfig[status as keyof typeof paymentConfig];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
};

export const getCosmeticId = (item: any) =>
  item.cosmetic?._id || item.cosmeticId || "";