"use client";

import { Badge } from "@/components/ui/badge";

interface ProductBadgesProps {
  isNew?: boolean;
  isOutOfStock: boolean;
}

const ProductBadges = ({ isNew, isOutOfStock }: ProductBadgesProps) => {
  if (isOutOfStock) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {isNew && (
        <Badge className="bg-brand-gold text-foreground font-poppins">
          Sản phẩm mới
        </Badge>
      )}
      <Badge
        variant="outline"
        className="border-brand-pink text-brand-deep-pink font-poppins"
      >
        Miễn phí vận chuyển
      </Badge>
      <Badge
        variant="outline"
        className="border-brand-pink text-brand-deep-pink font-poppins"
      >
        Đổi trả 30 ngày
      </Badge>
    </div>
  );
};

export default ProductBadges;