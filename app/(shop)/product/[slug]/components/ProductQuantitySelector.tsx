"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { Minus, Plus } from "lucide-react";

interface ProductQuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const ProductQuantitySelector = ({
  quantity,
  maxQuantity,
  onDecrease,
  onIncrease,
}: ProductQuantitySelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="font-inter font-medium text-foreground">Số lượng</label>
      <div className="flex items-center space-x-3 flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={onDecrease}
            disabled={quantity <= 1}
            className="border-border"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-poppins font-medium text-xl w-12 text-center">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={onIncrease}
            disabled={quantity >= maxQuantity}
            className="border-border"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground font-inter text-sm">
            Có sẵn: {maxQuantity} sản phẩm
          </span>
          {quantity >= maxQuantity && (
            <span className="text-sm text-destructive font-inter">
              Đã đạt giới hạn trong kho
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;