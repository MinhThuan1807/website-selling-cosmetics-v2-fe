"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";
import { Order } from "@/lib/types/index";
import { OrderTableRow } from "./OrderTableRow";
import { ORDER_PAGE_SIZE_OPTIONS } from "@/lib/constants/orderStatus";

interface OrderTableProps {
  orders: Order[];
  loading: boolean;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  currentPage: number;
  pageSize: number;
  getUserName: (userId: string) => string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onViewDetails: (order: Order) => void;
  onQuickStatusUpdate: (orderId: string, status: Order["status"]) => void;
  onOpenUpdateDialog: (order: Order) => void;
  onOpenDeleteDialog: (orderId: string) => void;
}

export const OrderTable = ({
  orders,
  loading,
  pagination,
  currentPage,
  pageSize,
  getUserName,
  onPageChange,
  onPageSizeChange,
  onViewDetails,
  onQuickStatusUpdate,
  onOpenUpdateDialog,
  onOpenDeleteDialog,
}: OrderTableProps) => {
  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Mã đơn hàng</TableHead>
              <TableHead className="w-[150px]">Khách hàng</TableHead>
              <TableHead className="w-[180px]">Người nhận</TableHead>
              <TableHead className="w-[120px]">Tổng tiền</TableHead>
              <TableHead className="w-[120px]">Trạng thái đơn</TableHead>
              <TableHead className="w-[130px]">Thanh toán</TableHead>
              <TableHead className="w-[160px]">Ngày đặt</TableHead>
              <TableHead className="w-[200px] text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <OrderTableRow
                  key={order._id}
                  order={order}
                  userName={getUserName(order.userId)}
                  onViewDetails={onViewDetails}
                  onQuickStatusUpdate={onQuickStatusUpdate}
                  onOpenUpdateDialog={onOpenUpdateDialog}
                  onOpenDeleteDialog={onOpenDeleteDialog}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <p className="text-muted-foreground">
                    Không tìm thấy đơn hàng nào
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Hiển thị {orders.length} / {pagination.totalCount} đơn hàng
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(val) => onPageSizeChange(parseInt(val))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORDER_PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === pagination.totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(page);
                      }}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < pagination.totalPages) onPageChange(currentPage + 1);
                }}
                className={
                  currentPage === pagination.totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};