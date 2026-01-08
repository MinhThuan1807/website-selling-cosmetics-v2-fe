import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Order } from "@/lib/types/index";
import { AppDispatch } from "@/lib/redux/store";
import {
  fetchAllOrdersWithPagination,
  selectOrders,
  selectOrderPagination,
  selectOrderLoading,
  updateOrder,
  deleteOrder,
} from "@/lib/redux/order/orderSlice";
import { selectAllUsers, fetchALlUsers } from "@/lib/redux/user/userSlice";

export interface OrderFiltersState {
  searchTerm: string;
  statusFilter: string;
  paymentFilter: string;
}

export interface DialogState {
  detailOpen: boolean;
  updateStatusOpen: boolean;
  deleteOpen: boolean;
  selectedOrder: Order | null;
  orderToUpdate: Order | null;
  orderToDelete: string | null;
  newStatus: Order["status"];
}

export const useOrderManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);
  const pagination = useSelector(selectOrderPagination);
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectOrderLoading);

  // Filters State
  const [filters, setFilters] = useState<OrderFiltersState>({
    searchTerm: "",
    statusFilter: "all",
    paymentFilter: "all",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Dialog State
  const [dialogState, setDialogState] = useState<DialogState>({
    detailOpen: false,
    updateStatusOpen: false,
    deleteOpen: false,
    selectedOrder: null,
    orderToUpdate: null,
    orderToDelete: null,
    newStatus: "pending",
  });

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchALlUsers());
  }, [dispatch]);

  // Fetch orders when pagination changes
  useEffect(() => {
    dispatch(
      fetchAllOrdersWithPagination({
        page: currentPage,
        limit: pageSize,
        sortBy: "createdAt",
        sortOrder: "desc",
      })
    );
  }, [dispatch, currentPage, pageSize]);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      order.receiverName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      order.receiverPhone.includes(filters.searchTerm);
    const matchesStatus =
      filters.statusFilter === "all" || order.status === filters.statusFilter;
    const matchesPayment =
      filters.paymentFilter === "all" || order.payment.status === filters.paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Filter handlers
  const handleFilterChange = useCallback((key: keyof OrderFiltersState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Pagination handlers
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  // Quick status update (inline buttons)
  const handleQuickStatusUpdate = useCallback(
    async (orderId: string, newStatus: Order["status"]) => {
      try {
        await dispatch(
          updateOrder({
            orderId,
            data: { status: newStatus },
          })
        ).unwrap();
        toast.success("Cập nhật trạng thái thành công");
      } catch {
        toast.error("Cập nhật trạng thái thất bại");
      }
    },
    [dispatch]
  );

  // View details
  const handleViewDetails = useCallback((order: Order) => {
    setDialogState((prev) => ({
      ...prev,
      detailOpen: true,
      selectedOrder: order,
    }));
  }, []);

  const closeDetailDialog = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      detailOpen: false,
      selectedOrder: null,
    }));
  }, []);

  // Update status dialog
  const handleOpenUpdateDialog = useCallback((order: Order) => {
    setDialogState((prev) => ({
      ...prev,
      updateStatusOpen: true,
      orderToUpdate: order,
      newStatus: order.status,
    }));
  }, []);

  const handleNewStatusChange = useCallback((status: Order["status"]) => {
    setDialogState((prev) => ({
      ...prev,
      newStatus: status,
    }));
  }, []);

  const handleConfirmUpdateStatus = useCallback(async () => {
    const { orderToUpdate, newStatus } = dialogState;
    if (!orderToUpdate) return;

    try {
      await dispatch(
        updateOrder({
          orderId: orderToUpdate._id,
          data: { status: newStatus },
        })
      ).unwrap();

      toast.success("Cập nhật trạng thái đơn hàng thành công");
      setDialogState((prev) => ({
        ...prev,
        updateStatusOpen: false,
        orderToUpdate: null,
      }));
    } catch {
      toast.error("Cập nhật trạng thái thất bại");
    }
  }, [dialogState, dispatch]);

  const closeUpdateDialog = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      updateStatusOpen: false,
      orderToUpdate: null,
    }));
  }, []);

  // Delete dialog
  const handleOpenDeleteDialog = useCallback((orderId: string) => {
    setDialogState((prev) => ({
      ...prev,
      deleteOpen: true,
      orderToDelete: orderId,
    }));
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const { orderToDelete } = dialogState;
    if (!orderToDelete) return;

    try {
      await dispatch(deleteOrder(orderToDelete)).unwrap();
      toast.success("Xóa đơn hàng thành công");
      setDialogState((prev) => ({
        ...prev,
        deleteOpen: false,
        orderToDelete: null,
      }));

      // Refresh data
      dispatch(
        fetchAllOrdersWithPagination({
          page: currentPage,
          limit: pageSize,
          sortBy: "createdAt",
          sortOrder: "desc",
        })
      );
    } catch {
      toast.error("Xóa đơn hàng thất bại");
    }
  }, [dialogState, dispatch, currentPage, pageSize]);

  const closeDeleteDialog = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      deleteOpen: false,
      orderToDelete: null,
    }));
  }, []);

  // Helper: Get user name by ID
  const getUserName = useCallback(
    (userId: string) => {
      const user = users.find((u) => u._id === userId);
      return user ? user.fullName : "N/A";
    },
    [users]
  );

  return {
    // Data
    orders,
    loading,
    pagination,
    filteredOrders,
    users,

    // Filters
    filters,
    handleFilterChange,

    // Pagination
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,

    // Actions
    handleQuickStatusUpdate,
    handleViewDetails,
    handleOpenUpdateDialog,
    handleOpenDeleteDialog,

    // Dialog state & handlers
    dialogState,
    handleNewStatusChange,
    handleConfirmUpdateStatus,
    handleConfirmDelete,
    closeDetailDialog,
    closeUpdateDialog,
    closeDeleteDialog,

    // Helpers
    getUserName,
  };
};