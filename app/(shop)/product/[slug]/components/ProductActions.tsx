"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";

interface ProductActionsProps {
  isOutOfStock: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductActions = ({
  isOutOfStock,
  onAddToCart,
  onBuyNow,
}: ProductActionsProps) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className={`w-full font-poppins py-3 ${
          isOutOfStock
            ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            : "bg-brand-deep-pink hover:bg-brand-deep-pink/90 cursor-pointer"
        } text-white`}
        size="lg"
      >
        {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ hàng"}
      </Button>
      <Button
        onClick={onBuyNow}
        disabled={isOutOfStock}
        variant="outline"
        className={`w-full font-poppins py-3 ${
          isOutOfStock
            ? "cursor-not-allowed opacity-50"
            : "border-brand-deep-pink text-brand-deep-pink hover:bg-brand-deep-pink hover:text-white cursor-pointer"
        }`}
        size="lg"
      >
        {isOutOfStock ? "Không khả dụng" : "Mua ngay"}
      </Button>
    </div>
  );
};

export default ProductActions;