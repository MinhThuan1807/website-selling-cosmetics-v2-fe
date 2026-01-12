"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortBarProps {
  displayedCount: number;
  totalCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const ProductSortBar = ({
  displayedCount,
  totalCount,
  sortBy,
  onSortChange,
}: ProductSortBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <p className="text-muted-foreground font-inter">
        Hiển thị {displayedCount} / {totalCount} sản phẩm
      </p>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-48 bg-input-background border-border">
          <SelectValue placeholder="Sắp xếp theo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Tên A-Z</SelectItem>
          <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
          <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
          <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSortBar;