"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductImageProps {
  image: string;
  name: string;
  isOutOfStock: boolean;
}

const ProductImage = ({ image, name, isOutOfStock }: ProductImageProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg border border-border relative w-full h-[400px] md:h-[450px] lg:h-[500px]">
        <Image
          src={image || ""}
          alt={name || "Cosmetic Image"}
          width={500}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-contain w-full h-full ${
            isOutOfStock ? "grayscale" : ""
          }`}
        />
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge className="bg-destructive text-white font-poppins text-lg px-6 py-3">
              Hết hàng
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;