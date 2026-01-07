"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { COSMETIC_CATEGORIES, STOCK_FILTERS } from "@/lib/constants/categories";
import { ProductFiltersState } from "@/hooks/useProductManagement";

interface ProductFiltersProps {
  filters: ProductFiltersState;
  onFilterChange: (key: keyof ProductFiltersState, value: string) => void;
  onAddProduct: () => void;
}

export const ProductFilters = ({
  filters,
  onFilterChange,
  onAddProduct,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo tên sản phẩm hoặc thương hiệu..."
          value={filters.searchTerm}
          onChange={(e) => onFilterChange("searchTerm", e.target.value)}
          className="pl-10"
        />
      </div>

      <Select
        value={filters.categoryFilter}
        onValueChange={(value) => onFilterChange("categoryFilter", value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Danh mục" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả danh mục</SelectItem>
          {COSMETIC_CATEGORIES.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.stockFilter}
        onValueChange={(value) => onFilterChange("stockFilter", value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Tồn kho" />
        </SelectTrigger>
        <SelectContent>
          {STOCK_FILTERS.map((filter) => (
            <SelectItem key={filter.value} value={filter.value}>
              {filter.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={onAddProduct}>
        <Plus className="h-4 w-4 mr-2" />
        Thêm sản phẩm
      </Button>
    </div>
  );
};