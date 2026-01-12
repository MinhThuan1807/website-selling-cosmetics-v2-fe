"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Cosmetic } from "@/lib/types";

import ProductLoadingState from "./components/ProductLoadingState";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ProductQuantitySelector from "./components/ProductQuantitySelector";
import ProductActions from "./components/ProductActions";
import ProductBadges from "./components/ProductBadges";
import ProductDetails from "./components/ProductDetails";
import OutOfStockNotice from "./components/OutOfStockNotice";
import { useProductDetail } from "@/hooks/useProductDetail";

const COSMETIC_DESCRIPTION =
  "Son dưỡng môi với chiết xuất từ thiên nhiên, phù hợp cho mọi loại da. Công thức độc đáo giúp dưỡng ẩm và bảo vệ môi khỏi khô nẻ.";

const CosmeticDetail = () => {
  const {
    cosmetic,
    loading,
    quantity,
    isOutOfStock,
    discountPercentage,
    handleAddToCart,
    handleBuyNow,
    handleQuantityDecrease,
    handleQuantityIncrease,
    formatPrice,
    router,
  } = useProductDetail();

  // Loading or not found state
  const loadingState = (
    <ProductLoadingState
      loading={loading}
      cosmetic={cosmetic}
      onBack={() => router.push("/product")}
    />
  );

  if (loading || (!cosmetic && !loading)) {
    return loadingState;
  }

  if (!cosmetic) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="mb-6 font-poppins flex items-center text-white bg-brand-deep-pink px-4 py-2 rounded-md hover:underline w-fit cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Quay lại
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <ProductImage
          image={cosmetic.image}
          name={cosmetic.nameCosmetic}
          isOutOfStock={isOutOfStock}
        />

        {/* Product Info */}
        <div className="space-y-6">
          <ProductInfo
            brand={cosmetic.brand}
            name={cosmetic.nameCosmetic}
            rating={cosmetic.rating}
            discountPrice={cosmetic.discountPrice}
            originalPrice={cosmetic.originalPrice}
            discountPercentage={discountPercentage}
            isOutOfStock={isOutOfStock}
            formatPrice={formatPrice}
          />

          {/* Stock Status */}
          {isOutOfStock ? (
            <OutOfStockNotice />
          ) : (
            <>
              {/* Description */}
              <p className="text-muted-foreground font-inter leading-relaxed">
                {COSMETIC_DESCRIPTION}
              </p>

              {/* Quantity */}
              <ProductQuantitySelector
                quantity={quantity}
                maxQuantity={cosmetic.quantity || 0}
                onDecrease={handleQuantityDecrease}
                onIncrease={handleQuantityIncrease}
              />
            </>
          )}

          {/* Action Buttons */}
          <ProductActions
            isOutOfStock={isOutOfStock}
            onAddToCart={() => handleAddToCart(cosmetic as Cosmetic)}
            onBuyNow={() => handleBuyNow(cosmetic as Cosmetic)}
          />

          {/* Badges */}
          <ProductBadges isNew={cosmetic.isNew} isOutOfStock={isOutOfStock} />
        </div>
      </div>

      {/* Product Details Accordion */}
      <ProductDetails />
    </div>
  );
};

export default CosmeticDetail;