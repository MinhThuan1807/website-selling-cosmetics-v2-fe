"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { Order } from "@/lib/types/index";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderStatusDialogProps {
  isOpen: boolean;
  order: Order | null;
  newStatus: Order["status"];
  onStatusChange: (status: Order["status"]) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export const OrderStatusDialog = ({
  isOpen,
  order,
  newStatus,
  onStatusChange,
  onConfirm,
  onClose,
}: OrderStatusDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
          <DialogDescription>
            Thay đổi trạng thái cho đơn hàng #{order?._id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Trạng thái hiện tại</Label>
            <div className="flex items-center">
              {order && <OrderStatusBadge status={order.status} />}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái mới</Label>
            <Select
              value={newStatus}
              onValueChange={(value) => onStatusChange(value as Order["status"])}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Chờ xử lý
                  </div>
                </SelectItem>
                <SelectItem value="processing">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Đang xử lý
                  </div>
                </SelectItem>
                <SelectItem value="completed">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Hoàn thành
                  </div>
                </SelectItem>
                <SelectItem value="cancelled">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Đã hủy
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-brand-deep-pink hover:bg-brand-deep-pink/90"
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};