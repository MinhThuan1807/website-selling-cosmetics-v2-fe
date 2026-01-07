"use client";
import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Cosmetic } from "@/lib/types/index";
import { COSMETIC_CATEGORIES } from "@/lib/constants/categories";
import { DialogState, ImageState } from "@/hooks/useProductManagement";

interface ProductDialogProps {
  dialogState: DialogState;
  imageState: ImageState;
  fileInputRef: RefObject<HTMLInputElement>;
  onClose: () => void;
  onSave: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateProduct: (updates: Partial<Cosmetic>) => void;
}

export const ProductDialog = ({
  dialogState,
  imageState,
  fileInputRef,
  onClose,
  onSave,
  onImageChange,
  onUpdateProduct,
}: ProductDialogProps) => {
  const { isEditOpen, isAddOpen, selectedProduct } = dialogState;
  const isOpen = isEditOpen || isAddOpen;

  if (!selectedProduct) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isAddOpen ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
          </DialogTitle>
          <DialogDescription>
            {isAddOpen ? "Nhập thông tin sản phẩm mới" : "Cập nhật thông tin sản phẩm"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Image Upload */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Hình ảnh {isAddOpen && <span className="text-red-500">*</span>}
            </Label>
            <div className="col-span-3 space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {imageState.file ? "Thay đổi hình ảnh" : "Tải lên hình ảnh"}
              </Button>
              {imageState.preview && (
                <div className="relative w-full h-48 border rounded overflow-hidden">
                  <img
                    src={imageState.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nameCosmetic" className="text-right">
              Tên sản phẩm
            </Label>
            <Input
              id="nameCosmetic"
              value={selectedProduct.nameCosmetic}
              onChange={(e) => onUpdateProduct({ nameCosmetic: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Brand */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">
              Thương hiệu
            </Label>
            <Input
              id="brand"
              value={selectedProduct.brand}
              onChange={(e) => onUpdateProduct({ brand: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Textarea
              id="description"
              value={selectedProduct.description || ""}
              onChange={(e) => onUpdateProduct({ description: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="classify" className="text-right">
              Danh mục
            </Label>
            <Select
              value={selectedProduct.classify}
              onValueChange={(value) => onUpdateProduct({ classify: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COSMETIC_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Số lượng
            </Label>
            <Input
              id="quantity"
              type="number"
              value={selectedProduct.quantity}
              onChange={(e) => onUpdateProduct({ quantity: parseInt(e.target.value) || 0 })}
              className="col-span-3"
            />
          </div>

          {/* Original Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="originalPrice" className="text-right">
              Giá gốc
            </Label>
            <Input
              id="originalPrice"
              type="number"
              value={selectedProduct.originalPrice}
              onChange={(e) => onUpdateProduct({ originalPrice: parseInt(e.target.value) || 0 })}
              className="col-span-3"
            />
          </div>

          {/* Discount Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountPrice" className="text-right">
              Giá bán
            </Label>
            <Input
              id="discountPrice"
              type="number"
              value={selectedProduct.discountPrice}
              onChange={(e) => onUpdateProduct({ discountPrice: parseInt(e.target.value) || 0 })}
              className="col-span-3"
            />
          </div>

          {/* Rating */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Đánh giá
            </Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={selectedProduct.rating || ""}
              onChange={(e) => onUpdateProduct({ rating: parseFloat(e.target.value) || undefined })}
              className="col-span-3"
            />
          </div>

          {/* Is New */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isNew" className="text-right">
              Sản phẩm mới
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="isNew"
                checked={selectedProduct.isNew || false}
                onCheckedChange={(checked) => onUpdateProduct({ isNew: checked })}
              />
            </div>
          </div>

          {/* Is Sale Off */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isSaleOff" className="text-right">
              Đang giảm giá
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="isSaleOff"
                checked={selectedProduct.isSaleOff || false}
                onCheckedChange={(checked) => onUpdateProduct({ isSaleOff: checked })}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={onSave}>
            {isAddOpen ? "Thêm sản phẩm" : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};