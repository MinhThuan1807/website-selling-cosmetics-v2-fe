import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import { Order } from "@/lib/types";
import { formatCurrency, formatDate, getStatusBadge } from "@/lib/utils";

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onCancelOrder: (orderId: string) => void;
}

export const OrderTable = ({
  orders,
  onViewDetails,
  onCancelOrder,
}: OrderTableProps) => {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-inter">Mã đơn hàng</TableHead>
            <TableHead className="font-inter">Ngày đặt</TableHead>
            <TableHead className="font-inter">Tổng tiền</TableHead>
            <TableHead className="font-inter">Trạng thái</TableHead>
            <TableHead className="font-inter"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order?._id}>
              <TableCell className="font-poppins font-medium">
                #{order?._id}
              </TableCell>
              <TableCell className="font-inter">
                {formatDate(order.createdAt)}
              </TableCell>
              <TableCell className="font-poppins font-medium text-brand-deep-pink">
                {formatCurrency(order.totalAmount)}
              </TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-poppins"
                  onClick={() => onViewDetails(order)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Xem
                </Button>
                {order.status === "pending" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-poppins text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => onCancelOrder(order._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hủy
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};