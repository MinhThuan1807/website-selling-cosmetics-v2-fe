import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { CreateOrderData } from "@/lib/api/order";

interface PaymentMethodCardProps {
  control: Control<CreateOrderData>;
  errors: FieldErrors<CreateOrderData>;
}

export const PaymentMethodCard = ({
  control,
  errors,
}: PaymentMethodCardProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-inter text-foreground flex items-center pt-3">
          <CreditCard className="h-5 w-5 mr-2" />
          Phương Thức Thanh Toán
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <Controller
          name="paymentMethod"
          control={control}
          rules={{ required: "Vui lòng chọn phương thức thanh toán" }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer">
                <RadioGroupItem
                  value="COD"
                  id="cod"
                  className="cursor-pointer"
                />
                <Label htmlFor="cod" className="flex-1">
                  <div className="space-y-1">
                    <p className="font-inter font-medium text-foreground">
                      Thanh toán khi nhận hàng (COD)
                    </p>
                    <p className="text-muted-foreground font-inter text-sm">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer">
                <RadioGroupItem
                  value="BANK"
                  id="bank"
                  className="cursor-pointer"
                />
                <Label htmlFor="bank" className="flex-1">
                  <div className="space-y-1">
                    <p className="font-inter font-medium text-foreground">
                      Chuyển khoản ngân hàng
                    </p>
                    <p className="text-muted-foreground font-inter text-sm">
                      Chuyển khoản trước khi giao hàng
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.paymentMethod && (
          <p className="text-sm text-red-500 mt-2">
            {errors.paymentMethod.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
};