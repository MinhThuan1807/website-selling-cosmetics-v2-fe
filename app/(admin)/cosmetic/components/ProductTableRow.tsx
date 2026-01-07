"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Star, Package, AlertTriangle } from "lucide-react";
import { Cosmetic } from "@/lib/types/index";

interface ProductTableRowProps {
  product: Cosmetic;
  onEdit: (product: Cosmetic) => void;
  onDelete: (productId: string) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const getStockBadge = (quantity: number) => {
  if (quantity === 0) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Hết hàng
      </Badge>
    );
  } else if (quantity <= 10) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Package className="h-3 w-3" />
        Sắp hết
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="flex items-center gap-1">
      <Package className="h-3 w-3" />
      Còn hàng
    </Badge>
  );
};

const getCategoryBadge = (category: string) => {
  const categoryConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
    skincare: { label: "Chăm sóc da", variant: "default" },
    makeup: { label: "Trang điểm", variant: "secondary" },
    fragrance: { label: "Nước hoa", variant: "outline" },
  };

  const config = categoryConfig[category] || { label: category, variant: "outline" as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const ProductTableRow = ({ product, onEdit, onDelete }: ProductTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <img
            src={product.image}
            alt={product.nameCosmetic}
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <div className="font-medium">{product.nameCosmetic}</div>
            <div className="text-sm text-muted-foreground">{product.brand}</div>
            <div className="flex gap-1 mt-1">
              {product.isNew && (
                <Badge variant="secondary" className="text-xs">
                  Mới
                </Badge>
              )}
              {product.isSaleOff && (
                <Badge variant="destructive" className="text-xs">
                  Giảm giá
                </Badge>
              )}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{getCategoryBadge(product.classify)}</TableCell>
      <TableCell>
        <span className={product.isSaleOff ? "line-through text-muted-foreground" : ""}>
          {formatCurrency(product.originalPrice)}
        </span>
      </TableCell>
      <TableCell className="font-medium">
        {formatCurrency(product.discountPrice)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="font-medium">{product.quantity}</span>
          {getStockBadge(product.quantity)}
        </div>
      </TableCell>
      <TableCell>
        {product.rating ? (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">Chưa có</span>
        )}
      </TableCell>
      <TableCell>{formatDate(product.createdAt)}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(product._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};