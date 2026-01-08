import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency for Vietnamese Dong
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ'
}

// Format date for Vietnamese locale
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('vi-VN')
}

// Generate random ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const formatDateShort = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("vi-VN");
};

export const truncateOrderId = (orderId: string): string => {
  if (orderId.length <= 10) return orderId;
  return `#${orderId.substring(0, 8)}...`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Debounce function for search
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate Vietnamese phone number
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}