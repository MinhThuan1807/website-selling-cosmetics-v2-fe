import { Button } from "@/components/animate-ui/components/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface CartMobileCardProps {
  cartItems: CartItem[];
  onToggleItem: (itemId: string) => void;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  isItemSelected: (itemId: string) => boolean;
}

export const CartMobileCard = ({
  cartItems,
  onToggleItem,
  onIncrement,
  onDecrement,
  onRemove,
  isItemSelected,
}: CartMobileCardProps) => {
  return (
    <div className="md:hidden space-y-4">
      {cartItems.map((item) => {
        const itemId = getCosmeticId(item);
        return (
          <Card key={itemId} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={isItemSelected(itemId)}
                  onCheckedChange={() => onToggleItem(itemId)}
                  className="mt-1 flex-shrink-0"
                />
                <div className="flex-1 space-y-3 min-w-0">
                  {/* Product Info */}
                  <div className="flex space-x-3">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-border relative">
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
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="font-inter font-medium text-foreground text-sm line-clamp-2">
                            {item.cosmetic?.nameCosmetic}
                          </h4>
                          {item.cosmetic?.brand && (
                            <p className="text-xs text-muted-foreground font-inter">
                              {item.cosmetic.brand}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemove(itemId)}
                          className="text-destructive hover:text-destructive flex-shrink-0 h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDecrement(itemId)}
                      className="h-8 w-8 flex-shrink-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-poppins font-medium w-8 text-center flex-shrink-0">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onIncrement(itemId)}
                      className="h-8 w-8 flex-shrink-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Price */}
                  <div className="flex justify-end pt-1 border-t border-border">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground font-inter mb-1">
                        Tổng tiền
                      </p>
                      <span className="font-poppins font-bold text-brand-deep-pink text-base">
                        {formatPrice(
                          (item.cosmetic?.discountPrice || 0) * item.quantity
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};