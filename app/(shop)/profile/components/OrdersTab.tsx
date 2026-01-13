import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Order } from "@/lib/types";
import { OrderTable } from "./OrderTable";
import { OrderMobileCard } from "./OrderMobileCard";

interface OrdersTabProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onCancelOrder: (orderId: string) => void;
}

export const OrdersTab = ({
  orders,
  onViewDetails,
  onCancelOrder,
}: OrdersTabProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-inter text-foreground mt-3">
          Lịch Sử Đơn Hàng
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            <OrderTable
              orders={orders}
              onViewDetails={onViewDetails}
              onCancelOrder={onCancelOrder}
            />
            <OrderMobileCard orders={orders} onViewDetails={onViewDetails} />
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-inter">
              Bạn chưa có đơn hàng nào.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};