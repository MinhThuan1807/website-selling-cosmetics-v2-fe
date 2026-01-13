import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface CheckoutItem {
  cosmetic?: {
    _id: string;
    nameCosmetic: string;
    image?: string;
    discountPrice?: number;
  };
  quantity: number;
}

interface OrderItemsCardProps {
  checkoutItems: CheckoutItem[];
  itemsTotal: number;
  shipping: number;
  total: number;
}

export const OrderItemsCard = ({
  checkoutItems,
  itemsTotal,
  shipping,
  total,
}: OrderItemsCardProps) => {
  return (
    <Card className="border-border sticky top-24">
      <CardHeader>
        <CardTitle className="font-inter text-foreground pt-3">
          Đơn Hàng Của Bạn
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-3">
        {/* Order Items */}
        <div className="space-y-4">
          {checkoutItems.map((item) => (
            <div key={item.cosmetic?._id} className="flex space-x-3">
              <div className="w-16 h-16 overflow-hidden rounded-lg border border-border">
                <Image
                  width={64}
                  height={64}
                  src={item.cosmetic?.image || ""}
                  alt={item.cosmetic?.nameCosmetic || ""}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-inter font-medium text-foreground line-clamp-2">
                  {item.cosmetic?.nameCosmetic || ""}
                </h4>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-inter">
                    x{item.quantity}
                  </span>
                  <span className="font-poppins font-medium text-brand-deep-pink">
                    {formatPrice(
                      (item.cosmetic?.discountPrice || 0) * item.quantity
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Pricing Summary */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground font-inter">Tạm tính:</span>
            <span className="font-poppins font-medium">
              {formatPrice(itemsTotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-inter">
              Phí vận chuyển:
            </span>
            <span className="font-poppins font-medium">
              {shipping === 0 ? (
                <span className="text-brand-gold">Miễn phí</span>
              ) : (
                formatPrice(shipping)
              )}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-inter font-medium text-foreground">
            Tổng cộng:
          </span>
          <span className="font-poppins font-bold text-brand-deep-pink text-xl">
            {formatPrice(total)}
          </span>
        </div>

        {/* Security Notice */}
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-muted-foreground font-inter text-sm">
            🔒 Thông tin của bạn được bảo mật an toàn. Chúng tôi cam kết không
            chia sẻ thông tin cá nhân với bên thứ ba.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};