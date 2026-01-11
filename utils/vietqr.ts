import axios from "axios";

/**
 * Instance Axios cho VietQR API
 * Cấu hình sẵn base URL và headers xác thực
 */
const vietQRApi = axios.create({
  baseURL: "https://api.vietqr.io/v2",
  headers: {
    "x-client-id": process.env.NEXT_PUBLIC_VIETQR_CLIENT_ID as string,
    "x-api-key": process.env.NEXT_PUBLIC_VIETQR_API_KEY as string,
    "Content-Type": "application/json",
  },
});

/**
 * Tham số đầu vào để tạo mã QR thanh toán
 */
interface GenerateQRCodeParams {
  /** Số tài khoản ngân hàng nhận tiền */
  bankAccountNumber: string;
  /** Mã BIN của ngân hàng (theo chuẩn VietQR) */
  bankBin: string;
  /** Số tiền thanh toán (VNĐ) */
  amount: number;
  /** Nội dung chuyển khoản */
  description: string;
}

/**
 * Cấu trúc response từ VietQR API
 */
interface VietQRResponse {
  /** Mã trạng thái response */
  code: string;
  /** Mô tả trạng thái */
  desc: string;
  /** Dữ liệu QR code */
  data: Record<string, unknown>;
}

/**
 * Tạo mã QR thanh toán qua VietQR API
 * Sử dụng chuẩn VietQR để tạo mã QR tương thích với tất cả ngân hàng Việt Nam
 *
 * @param params - Thông tin thanh toán
 * @returns Promise chứa dữ liệu QR code
 * @throws Error nếu gọi API thất bại
 */
export const generateQRCode = async ({
  bankAccountNumber,
  bankBin,
  amount,
  description,
}: GenerateQRCodeParams): Promise<VietQRResponse> => {
  try {
    const response = await vietQRApi.post<VietQRResponse>("/generate", {
      accountNumber: bankAccountNumber,
      accountName: "Your Store Name", // TODO: Thay bằng tên cửa hàng thực tế
      acqId: bankBin,
      amount: amount,
      addInfo: description,
      format: "text", // Hoặc 'png' nếu cần hình ảnh
      template: "compact", // Hoặc 'no_border' cho template khác
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
