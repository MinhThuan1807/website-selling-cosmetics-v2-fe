"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";

interface ProductFiltersProps {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: { min: string; max: string };
  categories: string[];
  brands: (string | undefined)[];
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onPriceRangeChange: (value: { min: string; max: string }) => void;
  onCategoryChange: (category: string, checked: boolean) => void;
  onBrandChange: (brand: string, checked: boolean) => void;
  onClearFilters: () => void;
}

const ProductFilters = ({
  searchQuery,
  selectedCategories,
  selectedBrands,
  priceRange,
  categories,
  brands,
  hasActiveFilters,
  onSearchChange,
  onPriceRangeChange,
  onCategoryChange,
  onBrandChange,
  onClearFilters,
}: ProductFiltersProps) => {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <label className="font-inter font-medium text-foreground text-sm">
          Tìm kiếm
        </label>
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="pl-10 bg-input-background border-border"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="font-inter font-medium text-foreground text-sm">
          Danh mục
        </label>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    onCategoryChange(category, !!checked)
                  }
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm text-muted-foreground font-inter cursor-pointer hover:text-foreground transition-colors"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Brands */}
      {brands.length > 0 && (
        <div className="space-y-3">
          <label className="font-inter font-medium text-foreground text-sm">
            Thương hiệu
          </label>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand!)}
                    onCheckedChange={(checked) =>
                      onBrandChange(brand!, !!checked)
                    }
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm text-muted-foreground font-inter cursor-pointer hover:text-foreground transition-colors"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-3">
        <label className="font-inter font-medium text-foreground text-sm">
          Khoảng giá
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Từ"
            value={priceRange.min}
            onChange={(e) =>
              onPriceRangeChange({ ...priceRange, min: e.target.value })
            }
            className="bg-input-background border-border"
          />
          <Input
            type="number"
            placeholder="Đến"
            value={priceRange.max}
            onChange={(e) =>
              onPriceRangeChange({ ...priceRange, max: e.target.value })
            }
            className="bg-input-background border-border"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full border-brand-pink text-brand-deep-pink hover:bg-brand-pink font-poppins"
        >
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );
};

export default ProductFilters;