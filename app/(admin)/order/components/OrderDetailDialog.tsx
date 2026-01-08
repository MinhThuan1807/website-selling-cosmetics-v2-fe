"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/types/index";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface OrderDetailDialogProps {
  isOpen: boolean;
  order: Order | null;
  getUserName: (userId: string) => string;
  onClose: () => void;
}

export const OrderDetailDialog = ({
  isOpen,
  order,
  getUserName,
  onClose,
}: OrderDetailDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[720px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{order._id}</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về đơn hàng và sản phẩm
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-1">
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Thông tin khách hàng</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Tên:</span>{" "}
                    {getUserName(order.userId)}
                  </p>
                  <p>
                    <span className="font-medium">Người nhận:</span>{" "}
                    {order.receiverName}
                  </p>
                  <p>
                    <span className="font-medium">SĐT:</span>{" "}
                    {order.receiverPhone}
                  </p>
                  <p>
                    <span className="font-medium">Địa chỉ:</span>{" "}
                    {order.receiverAddress}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Thông tin đơn hàng</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Trạng thái:</span>{" "}
                    <OrderStatusBadge status={order.status} />
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Thanh toán:</span>{" "}
                    <PaymentStatusBadge status={order.payment.status as "paid" | "unpaid" | "failed"} />
                  </p>
                  <p>
                    <span className="font-medium">Phương thức:</span>{" "}
                    {order.payment.method || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Ngày đặt:</span>{" "}
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-medium mb-2">Sản phẩm trong đơn hàng</h4>
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Sản phẩm</TableHead>
                      <TableHead className="text-center">Số lượng</TableHead>
                      <TableHead className="text-right">Đơn giá</TableHead>
                      <TableHead className="text-right">Thành tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.cosmeticImage}
                              alt={item.cosmeticName}
                              className="w-10 h-10 object-contain rounded"
                            />
                            <div className="min-w-0">
                              <div className="font-medium text-sm">
                                {item.cosmeticName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.cosmetic?.brand}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          {formatCurrency(item.price)}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          {formatCurrency(item.subtotal)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Order Total */}
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-lg font-medium">
                  Tổng cộng: {formatCurrency(order.totalAmount)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};