"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";
import { Cosmetic } from "@/lib/types";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {
  fetchAllCosmetics,
  selectAllCosmetics,
} from "@/lib/redux/cosmetic/cosmeticSlice";
import { addToCart } from "@/lib/redux/cart/cartSlice";
import { useRouter } from "next/navigation";
import { selectCurrentUser } from "@/lib/redux/user/userSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProductHeader from "./components/ProductHeader";
import ProductFilters from "./components/ProductFilters";
import ProductSortBar from "./components/ProductSortBar";
import ProductGrid from "./components/ProductGrid";
import { useProductFilter } from "@/hooks/useProductFilter";

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cosmetics = useSelector(selectAllCosmetics);
  const user = useSelector(selectCurrentUser);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchAllCosmetics());
  }, [dispatch]);

  const {
    searchQuery,
    selectedCategories,
    selectedBrands,
    priceRange,
    sortBy,
    categories,
    brands,
    displayedProducts,
    sortedProducts,
    hasMoreProducts,
    hasActiveFilters,
    setSearchQuery,
    setPriceRange,
    setSortBy,
    handleLoadMore,
    handleCategoryChange,
    handleBrandChange,
    clearFilters,
  } = useProductFilter(cosmetics);

  // Handle add to cart
  const handleAddToCart = (
    cosmetic: Cosmetic,
    quantity: number = 1,
    variant?: string
  ) => {
    if (user == null) {
      setTimeout(() => {
        router.push("users/login");
        toast.error("Hãy đăng nhập để thêm sản phẩm vào giỏ hàng!");
      }, 500);
      return;
    }
    dispatch(
      addToCart({
        cosmeticId: cosmetic._id,
        quantity,
        variant,
      })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng!");
  };

  // Handle view product detail
  const handleViewProduct = (cosmetic: Cosmetic) => {
    router.push(`/product/${cosmetic.slug}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductHeader />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <Card className="border-border sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-inter font-medium text-foreground text-lg">
                  Bộ Lọc
                </h3>
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="pr-4">
                  <ProductFilters
                    searchQuery={searchQuery}
                    selectedCategories={selectedCategories}
                    selectedBrands={selectedBrands}
                    priceRange={priceRange}
                    categories={categories}
                    brands={brands}
                    hasActiveFilters={hasActiveFilters}
                    onSearchChange={setSearchQuery}
                    onPriceRangeChange={setPriceRange}
                    onCategoryChange={handleCategoryChange}
                    onBrandChange={handleBrandChange}
                    onClearFilters={clearFilters}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="bg-brand-deep-pink hover:bg-brand-deep-pink/90 text-white shadow-lg rounded-full h-14 w-14 p-0"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="font-inter">Bộ Lọc Sản Phẩm</SheetTitle>
                <SheetDescription className="font-inter">
                  Tìm kiếm sản phẩm theo danh mục, thương hiệu và giá
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="p-6">
                  <ProductFilters
                    searchQuery={searchQuery}
                    selectedCategories={selectedCategories}
                    selectedBrands={selectedBrands}
                    priceRange={priceRange}
                    categories={categories}
                    brands={brands}
                    hasActiveFilters={hasActiveFilters}
                    onSearchChange={setSearchQuery}
                    onPriceRangeChange={setPriceRange}
                    onCategoryChange={handleCategoryChange}
                    onBrandChange={handleBrandChange}
                    onClearFilters={clearFilters}
                  />
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <ProductSortBar
            displayedCount={displayedProducts.length}
            totalCount={sortedProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <ProductGrid
            products={displayedProducts}
            hasMoreProducts={hasMoreProducts}
            onAddToCart={handleAddToCart}
            onViewDetail={handleViewProduct}
            onLoadMore={handleLoadMore}
            onClearFilters={clearFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;