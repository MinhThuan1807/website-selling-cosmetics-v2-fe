import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatPrice, getCosmeticId } from "@/lib/utils";

interface CartItem {
  cosmetic?: {
    _id: string;
    nameCosmetic: string;
    image?: string;
    brand?: string;
    discountPrice?: number;
  };
  cosmeticId?: string;
  quantity: number;
}

interface CartTableProps {
  cartItems: CartItem[];
  selectedCartItems: CartItem[];
  allItemsSelected: boolean;
  onToggleAll: () => void;
  onToggleItem: (itemId: string) => void;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  isItemSelected: (itemId: string) => boolean;
}

export const CartTable = ({
  cartItems,
  allItemsSelected,
  onToggleAll,
  onToggleItem,
  onIncrement,
  onDecrement,
  onRemove,
  isItemSelected,
}: CartTableProps) => {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-inter w-[50px]">
              <Checkbox
                checked={allItemsSelected}
                onCheckedChange={onToggleAll}
                className="mx-auto"
              />
            </TableHead>
            <TableHead className="font-inter">Sản phẩm</TableHead>
            <TableHead className="font-inter">Giá</TableHead>
            <TableHead className="font-inter">Số lượng</TableHead>
            <TableHead className="font-inter">Tổng</TableHead>
            <TableHead className="font-inter"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => {
            const itemId = getCosmeticId(item);
            return (
              <TableRow key={itemId}>
                <TableCell className="text-center align-middle">
                  <Checkbox
                    checked={isItemSelected(itemId)}
                    onCheckedChange={() => onToggleItem(itemId)}
                    className="mx-auto"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 overflow-hidden rounded-lg border border-border relative">
                      {item.cosmetic?.image ? (
                        <Image
                          src={item.cosmetic.image}
                          alt={item.cosmetic.nameCosmetic}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-xs">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-inter font-medium text-foreground">
                        {item.cosmetic?.nameCosmetic}
                      </h4>
                      {item.cosmetic?.brand && (
                        <p className="text-sm text-muted-foreground font-inter">
                          {item.cosmetic?.brand}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-poppins font-medium">
                    {formatPrice(item.cosmetic?.discountPrice || 0)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDecrement(itemId)}
                      className="h-8 w-8"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-poppins font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onIncrement(itemId)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-poppins font-medium text-brand-deep-pink">
                    {formatPrice(
                      (item.cosmetic?.discountPrice || 0) * item.quantity
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(itemId)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};