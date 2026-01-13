"use client";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/redux/store";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartItems,
  selectCartItemsSelected,
  selectCartSelectedTotalPrice,
  fetchCart,
  toggleItemSelection,
} from "@/lib/redux/cart/cartSlice";
import { toast } from "sonner";
import { getCosmeticId } from "@/lib/utils";
import { CartMobileCard } from "./components/CartMobileCard";
import { CartTable } from "./components/CartTable";
import { OrderSummary } from "./components/OrderSummary";
import { RemoveItemDialog } from "./components/RemoveItemDialog";
import { ClearCartDialog } from "./components/ClearCartDialog";
import { EmptyCart } from "./components/EmptyCart";

const ShoppingCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const selectedCartItems = useSelector(selectCartItemsSelected);
  const selectedTotalPrice = useSelector(selectCartSelectedTotalPrice);

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const shipping = useMemo(
    () => (selectedTotalPrice > 500000 ? 0 : 30000),
    [selectedTotalPrice]
  );
  const finalTotal = useMemo(
    () => selectedTotalPrice + shipping,
    [selectedTotalPrice, shipping]
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleToggleItem = (itemId: string) => {
    dispatch(toggleItemSelection(itemId));
  };

  const handleToggleAll = () => {
    const allSelected = cartItems.every((item) =>
      selectedCartItems.some(
        (selected) => getCosmeticId(selected) === getCosmeticId(item)
      )
    );

    cartItems.forEach((item) => {
      const itemId = getCosmeticId(item);
      const isCurrentlySelected = selectedCartItems.some(
        (selected) => getCosmeticId(selected) === itemId
      );

      if (allSelected && isCurrentlySelected) {
        dispatch(toggleItemSelection(itemId));
      } else if (!allSelected && !isCurrentlySelected) {
        dispatch(toggleItemSelection(itemId));
      }
    });
  };

  const isItemSelected = (itemId: string) => {
    return selectedCartItems.some((item) => getCosmeticId(item) === itemId);
  };

  const allItemsSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => isItemSelected(getCosmeticId(item)));

  const handleRemoveItem = (itemId: string) => {
    setItemToRemove(itemId);
    setShowRemoveDialog(true);
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
      setShowRemoveDialog(false);
      setItemToRemove(null);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    }
  };

  const handleContinueShopping = () => {
    router.push("/product");
  };

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 sản phẩm!");
      return;
    }

    try {
      sessionStorage.setItem(
        "checkoutItems",
        JSON.stringify(selectedCartItems)
      );
      sessionStorage.setItem(
        "checkoutTotalPrice",
        selectedTotalPrice.toString()
      );
      router.push("/checkout");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleClearCart = () => {
    setShowClearDialog(true);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setShowClearDialog(false);
    toast.success("Đã xóa toàn bộ giỏ hàng");
  };

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-inter text-foreground text-3xl font-bold">
          Giỏ Hàng Của Bạn
        </h1>
        <Button
          variant="outline"
          onClick={handleClearCart}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Xóa tất cả
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card className="border-border">
            <CardContent className="p-6">
              <CartTable
                cartItems={cartItems}
                selectedCartItems={selectedCartItems}
                allItemsSelected={allItemsSelected}
                onToggleAll={handleToggleAll}
                onToggleItem={handleToggleItem}
                onIncrement={(id) => dispatch(incrementQuantity(id))}
                onDecrement={(id) => dispatch(decrementQuantity(id))}
                onRemove={handleRemoveItem}
                isItemSelected={isItemSelected}
              />

              <CartMobileCard
                cartItems={cartItems}
                onToggleItem={handleToggleItem}
                onIncrement={(id) => dispatch(incrementQuantity(id))}
                onDecrement={(id) => dispatch(decrementQuantity(id))}
                onRemove={handleRemoveItem}
                isItemSelected={isItemSelected}
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            selectedTotalPrice={selectedTotalPrice}
            shipping={shipping}
            finalTotal={finalTotal}
            onCheckout={handleCheckout}
            onContinueShopping={handleContinueShopping}
          />
        </div>
      </div>

      <RemoveItemDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        onConfirm={confirmRemoveItem}
      />

      <ClearCartDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        onConfirm={confirmClearCart}
      />
    </div>
  );
};

export default ShoppingCart;