import { Button } from "@/components/animate-ui/components/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  selectedTotalPrice: number;
  shipping: number;
  finalTotal: number;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const OrderSummary = ({
  selectedTotalPrice,
  shipping,
  finalTotal,
  onCheckout,
  onContinueShopping,
}: OrderSummaryProps) => {
  return (
    <Card className="border-border sticky top-24">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-inter font-medium text-foreground text-xl">
          Tóm Tắt Đơn Hàng
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground font-inter">Tạm tính:</span>
            <span className="font-poppins font-medium">
              {formatPrice(selectedTotalPrice)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-inter">
              Phí vận chuyển:
            </span>
            <span className="font-poppins font-medium">
              {shipping === 0 ? (
                <span className="text-green-600">Miễn phí</span>
              ) : (
                formatPrice(shipping)
              )}
            </span>
          </div>
          {selectedTotalPrice > 0 && shipping === 0 && (
            <p className="text-green-600 font-inter text-sm">
              🎉 Bạn được miễn phí vận chuyển!
            </p>
          )}
          {selectedTotalPrice > 0 && shipping > 0 && (
            <p className="text-muted-foreground font-inter text-sm">
              Mua thêm {formatPrice(500000 - selectedTotalPrice)} để được miễn
              phí vận chuyển
            </p>
          )}
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="font-inter font-medium text-foreground">
              Tổng cộng:
            </span>
            <span className="font-poppins font-bold text-brand-deep-pink text-xl">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            onClick={onCheckout}
            className="w-full cursor-pointer bg-brand-deep-pink hover:bg-brand-deep-pink/90 text-white font-poppins py-3"
            size="lg"
          >
            Tiến hành thanh toán
          </Button>
          <Button
            onClick={onContinueShopping}
            variant="outline"
            className="w-full cursor-pointer font-poppins"
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};