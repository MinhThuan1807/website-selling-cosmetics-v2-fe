"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { ORDER_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from "@/lib/constants/orderStatus";
import { OrderFiltersState } from "@/hooks/useOrderManagement";

interface OrderFiltersProps {
  filters: OrderFiltersState;
  onFilterChange: (key: keyof OrderFiltersState, value: string) => void;
}

export const OrderFilters = ({ filters, onFilterChange }: OrderFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo mã đơn, tên người nhận hoặc số điện thoại..."
          value={filters.searchTerm}
          onChange={(e) => onFilterChange("searchTerm", e.target.value)}
          className="pl-10"
        />
      </div>

      <Select
        value={filters.statusFilter}
        onValueChange={(value) => onFilterChange("statusFilter", value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Trạng thái đơn" />
        </SelectTrigger>
        <SelectContent>
          {ORDER_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.paymentFilter}
        onValueChange={(value) => onFilterChange("paymentFilter", value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Thanh toán" />
        </SelectTrigger>
        <SelectContent>
          {PAYMENT_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};