import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Truck } from "lucide-react";
import InputFieldCheckout from "@/components/forms/InputFieldCheckout";
import { AddressSelect } from "@/components/address/AddressSelect";
import { Address } from "@/lib/api/address";
import {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { CreateOrderData } from "@/lib/api/order";

interface ShippingInfoCardProps {
  register: UseFormRegister<CreateOrderData>;
  errors: FieldErrors<CreateOrderData>;
  onAddressChange: (address: Address | null, index: number) => void;
}

export const ShippingInfoCard = ({
  register,
  errors,
  onAddressChange,
}: ShippingInfoCardProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-inter text-foreground flex items-center pt-3">
          <Truck className="h-5 w-5 mr-2" />
          Thông Tin Giao Hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-3">
        <AddressSelect onAddressChange={onAddressChange} />
        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputFieldCheckout
              label="Họ và tên"
              name="receiverName"
              type="text"
              placeholder="Nguyen Van A"
              register={register}
              error={errors.receiverName}
              validation={{
                required: "Họ và tên là bắt buộc",
                minLength: 8,
              }}
            />
          </div>
          <div className="space-y-2">
            <InputFieldCheckout
              label="Số điện thoại"
              name="receiverPhone"
              type="tel"
              placeholder="0123456789"
              register={register}
              error={errors.receiverPhone}
              validation={{
                required: "Số điện thoại là bắt buộc",
                minLength: 10,
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Số điện thoại không hợp lệ",
                },
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <InputFieldCheckout
            label="Địa chỉ giao hàng"
            name="receiverAddress"
            type="text"
            placeholder="123 Đường ABC, Quận 1, TP.HCM"
            register={register}
            error={errors.receiverAddress}
            validation={{
              required: "Địa chỉ giao hàng là bắt buộc",
              minLength: 8,
            }}
          />
        </div>

        <div className="space-y-2">
          <InputFieldCheckout
            label="Ghi chú (tùy chọn)"
            name="orderNotes"
            type="text"
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
            register={register}
            error={errors.orderNotes}
          />
        </div>
      </CardContent>
    </Card>
  );
};