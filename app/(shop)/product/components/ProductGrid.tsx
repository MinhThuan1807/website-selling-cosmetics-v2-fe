"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Cosmetic } from "@/lib/types";
import ProductCardList from "@/components/product/ProductCardList";
import SkeletonProductCardList from "@/components/product/SkeletonProductCardList";

interface ProductGridProps {
  products: Cosmetic[];
  hasMoreProducts: boolean;
  onAddToCart: (cosmetic: Cosmetic, quantity?: number, variant?: string) => void;
  onViewDetail: (cosmetic: Cosmetic) => void;
  onLoadMore: () => void;
  onClearFilters: () => void;
}

const ProductGrid = ({
  products,
  hasMoreProducts,
  onAddToCart,
  onViewDetail,
  onLoadMore,
  onClearFilters,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground font-inter text-lg">
          Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn.
        </p>
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="mt-4 border-brand-pink text-brand-deep-pink hover:bg-brand-pink font-poppins"
        >
          Xóa bộ lọc
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Suspense fallback={<SkeletonProductCardList />}>
          <ProductCardList
            cosmetics={products}
            onAddToCart={onAddToCart}
            onViewDetail={onViewDetail}
          />
        </Suspense>
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={onLoadMore}
            className="bg-brand-deep-pink hover:bg-brand-deep-pink/90 text-white font-poppins px-8 py-6 text-base"
          >
            Xem thêm sản phẩm
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductGrid;