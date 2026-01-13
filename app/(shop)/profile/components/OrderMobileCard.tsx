import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Order } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface OrderMobileCardProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

export const OrderMobileCard = ({
  orders,
  onViewDetails,
}: OrderMobileCardProps) => {
  return (
    <div className="md:hidden space-y-4">
      {orders.map((order) => (
        <Card key={order?._id} className="border-border">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-poppins font-medium text-foreground">
                  {order?._id}
                </p>
                <p className="text-muted-foreground font-inter">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <Badge className={order.status}>{order.status}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-poppins font-medium text-brand-deep-pink">
                {formatCurrency(order.totalAmount)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(order)}
                className="border-brand-pink text-brand-deep-pink hover:bg-brand-pink font-poppins"
              >
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};