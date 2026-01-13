import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/types";
import { OrderStatusProgress } from "./OrderStatusProgress";
import { formatCurrency, formatDate, getStatusBadge, getPaymentBadge } from "@/lib/utils";

interface OrderDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  username: string;
}

export const OrderDetailDialog = ({
  open,
  onOpenChange,
  order,
  username,
}: OrderDetailDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-full sm:max-w-[820px] max-h-[90vh] overflow-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{order._id}</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về đơn hàng và sản phẩm
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status Progress */}
          <Card className="border-border">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4 text-center">
                Trạng thái đơn hàng
              </h4>
              <OrderStatusProgress status={order.status} />
            </CardContent>
          </Card>

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Thông tin khách hàng</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Tên:</span> {username}
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
                <p>
                  <span className="font-medium">Trạng thái:</span>{" "}
                  {getStatusBadge(order.status)}
                </p>
                <p>
                  <span className="font-medium">Thanh toán:</span>{" "}
                  {getPaymentBadge(order.payment.status)}
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
            <div className="border rounded-lg overflow-auto max-h-[40vh]">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Sản phẩm</TableHead>
                    <TableHead className="w-1/6 text-center">
                      Số lượng
                    </TableHead>
                    <TableHead className="w-1/6 text-right">Đơn giá</TableHead>
                    <TableHead className="w-1/6 text-right">
                      Thành tiền
                    </TableHead>
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
                            <div className="font-medium text-sm truncate max-w-[40ch]">
                              {item.cosmeticName}
                            </div>
                            <div className="text-xs text-muted-foreground truncate max-w-[40ch]">
                              {item.cosmetic?.brand}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell className="text-right">
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
      </DialogContent>
    </Dialog>
  );
};