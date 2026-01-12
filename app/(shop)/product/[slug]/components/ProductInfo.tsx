"use client";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductInfoProps {
  brand?: string;
  name: string;
  rating?: number;
  discountPrice: number;
  originalPrice?: number;
  discountPercentage: number;
  isOutOfStock: boolean;
  formatPrice: (price: number) => string;
}

const ProductInfo = ({
  brand,
  name,
  rating,
  discountPrice,
  originalPrice,
  discountPercentage,
  isOutOfStock,
  formatPrice,
}: ProductInfoProps) => {
  return (
    <div className="space-y-4">
      {/* Brand */}
      {brand && <p className="text-muted-foreground font-inter">{brand}</p>}

      {/* Product Name */}
      <h1 className="font-inter text-foreground text-3xl font-bold">{name}</h1>

      {/* Rating */}
      {rating && (
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating)
                    ? "text-brand-gold fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground font-inter">
            ({rating}) • 127 đánh giá
          </span>
        </div>
      )}

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="font-poppins font-bold text-brand-deep-pink text-2xl">
            {formatPrice(discountPrice)}
          </span>
          {originalPrice && (
            <>
              <span className="text-muted-foreground line-through font-poppins text-lg">
                {formatPrice(originalPrice)}
              </span>
              {!isOutOfStock && (
                <Badge className="bg-brand-deep-pink text-white font-poppins">
                  -{discountPercentage}%
                </Badge>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;