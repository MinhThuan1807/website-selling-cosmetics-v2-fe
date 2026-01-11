"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Order } from "@/lib/types/index";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";
import { formatCurrency, formatDate, truncateOrderId } from "@/lib/utils";

interface OrderTableRowProps {
  order: Order;
  userName: string;
  onViewDetails: (order: Order) => void;
  onQuickStatusUpdate: (orderId: string, status: Order["status"]) => void;
  onOpenUpdateDialog: (order: Order) => void;
  onOpenDeleteDialog: (orderId: string) => void;
}

export const OrderTableRow = ({
  order,
  userName,
  onViewDetails,
  onQuickStatusUpdate,
  onOpenUpdateDialog,
  onOpenDeleteDialog,
}: OrderTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">{truncateOrderId(order._id)}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>#{order._id}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      <TableCell className="truncate max-w-[150px]">{userName}</TableCell>

      <TableCell>
        <div className="space-y-1">
          <div className="font-medium truncate max-w-[180px]">
            {order.receiverName}
          </div>
          <div className="text-sm text-muted-foreground">
            {order.receiverPhone}
          </div>
        </div>
      </TableCell>

      <TableCell className="font-medium whitespace-nowrap">
        {formatCurrency(order.totalAmount)}
      </TableCell>

      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>

      <TableCell>
        <PaymentStatusBadge status={order.payment.status as "paid" | "unpaid" | "failed"} />
      </TableCell>

      <TableCell className="whitespace-nowrap">
        {formatDate(order.createdAt)}
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(order)}
          >
            <Eye className="h-4 w-4" />
          </Button>

          {order.status === "pending" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickStatusUpdate(order._id, "processing")}
            >
              Xử lý
            </Button>
          )}

          {order.status === "processing" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickStatusUpdate(order._id, "completed")}
            >
              Hoàn thành
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenUpdateDialog(order)}
            className="border-brand-pink text-brand-deep-pink hover:bg-brand-pink"
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenDeleteDialog(order._id)}
            className="border-destructive text-destructive hover:bg-destructive hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};