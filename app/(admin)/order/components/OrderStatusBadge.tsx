"use client";

import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS, PAYMENT_STATUS, OrderStatus, PaymentStatus } from "@/lib/constants/orderStatus";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = ORDER_STATUS[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const config = PAYMENT_STATUS[status];
  
  if (!config) {
    return <Badge variant="secondary">{status}</Badge>;
  }

  return <Badge variant={config.variant}>{config.label}</Badge>;
};