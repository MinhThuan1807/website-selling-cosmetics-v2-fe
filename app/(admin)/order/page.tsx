"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderFilters } from "./components/OrderFilters";
import { OrderTable } from "./components/OrderTable";
import { OrderDetailDialog } from "./components/OrderDetailDialog";
import { OrderStatusDialog } from "./components/OrderStatusDialog";
import { OrderDeleteDialog } from "./components/OrderDeleteDialog";
import { useOrderManagement } from "@/hooks/useOrderManagement";

const OrdersManagement = () => {
  const {
    // Data
    loading,
    pagination,
    filteredOrders,

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
  } = useOrderManagement();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="pt-2">Quản lý đơn hàng</CardTitle>
          <CardDescription>
            Theo dõi và quản lý trạng thái đơn hàng của khách hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrderFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          <OrderTable
            orders={filteredOrders}
            loading={loading}
            pagination={pagination}
            currentPage={currentPage}
            pageSize={pageSize}
            getUserName={getUserName}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onViewDetails={handleViewDetails}
            onQuickStatusUpdate={handleQuickStatusUpdate}
            onOpenUpdateDialog={handleOpenUpdateDialog}
            onOpenDeleteDialog={handleOpenDeleteDialog}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <OrderDetailDialog
        isOpen={dialogState.detailOpen}
        order={dialogState.selectedOrder}
        getUserName={getUserName}
        onClose={closeDetailDialog}
      />

      <OrderStatusDialog
        isOpen={dialogState.updateStatusOpen}
        order={dialogState.orderToUpdate}
        newStatus={dialogState.newStatus}
        onStatusChange={handleNewStatusChange}
        onConfirm={handleConfirmUpdateStatus}
        onClose={closeUpdateDialog}
      />

      <OrderDeleteDialog
        isOpen={dialogState.deleteOpen}
        onConfirm={handleConfirmDelete}
        onClose={closeDeleteDialog}
      />
    </div>
  );
};

export default OrdersManagement;