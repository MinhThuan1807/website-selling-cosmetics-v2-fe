import axios, { AxiosError, AxiosInstance } from "axios";
import { logoutUserApi } from "../redux/user/userSlice";
import { logoutAdminApi } from "../redux/admin/adminSlice";
import { toast } from "sonner";

let axiosReduxStore: any;
let isLoggingOut = false;

export const injectStore = (mainStore: any) => {
  axiosReduxStore = mainStore;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10 * 60 * 200,
});

const PUBLIC_PATHS = [
  "/",
  "/product",
  "/cart",
  "/users/login",
  "/users/register",
  "/admin/login",
];

const isPublicPath = (pathname: string): boolean => {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith("/product/")
  );
};

const getRedirectUrl = (): string => {
  // Check current URL path first
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;

    // If on admin page, redirect to admin login
    if (currentPath.startsWith("/admin")) {
      return "/admin/login";
    }
  }

  // Check from Redux state
  const state = axiosReduxStore?.getState?.() || {};
  const isAdmin =
    state?.admin?.currentAdmin?.role === "admin" || state?.admin?.isLoggedIn;

  // Default: customer redirects to /users/login, admin to /admin/login
  return isAdmin ? "/admin/login" : "/users/login";
};

const handleLogout = async () => {
  if (!axiosReduxStore) return;

  try {
    const state = axiosReduxStore.getState?.() || {};

    // Check if user is admin or customer
    const isAdmin =
      state?.admin?.currentAdmin?.role === "admin" ||
      state?.admin?.isLoggedIn ||
      (typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin"));

    // Dispatch appropriate logout action
    if (isAdmin) {
      await axiosReduxStore.dispatch(logoutAdminApi());
    } else {
      await axiosReduxStore.dispatch(logoutUserApi());
    }

    // Clear storage immediately
    if (typeof window !== "undefined") {
      localStorage.removeItem("persist:root");
      sessionStorage.clear();
      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }
  } catch (error) {
    toast.error("Logout error!");
  }
};

/**
 * Xử lý lỗi từ response API
 * Hiển thị toast thông báo phù hợp với từng loại lỗi
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response, config } = error;
    const status = response?.status;

    // Xử lý lỗi Rate Limit (429)
    if (status === 429) {
      const retryAfter = response?.headers?.["retry-after"];
      const message = retryAfter
        ? `Quá nhiều yêu cầu. Vui lòng thử lại sau ${retryAfter}s`
        : "Quá nhiều yêu cầu. Vui lòng thử lại sau";

      // Kiểm tra header để quyết định có hiển thị toast không
      if (!config?.headers?.["X-No-Toast"]) {
        toast.error(message);
      }
      return Promise.reject(error);
    }

    // Xử lý các lỗi khác (400, 403, 404, 500, v.v.)
    if (status && !config?.headers?.["X-No-Toast"]) {
      const data = error.response?.data as Record<string, unknown>;
      const errorMessage =
        (data?.message as string) ||
        (data?.error as string) ||
        error.message ||
        "Đã xảy ra lỗi";
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
