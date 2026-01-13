"use client";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemsSelected } from "@/lib/redux/cart/cartSlice";
import {
  createOrder,
  selectCreateOrderLoading,
} from "@/lib/redux/order/orderSlice";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CreateOrderData } from "@/lib/api/order";
import { toast } from "sonner";
import { Address } from "@/lib/api/address";
import PaymentModal from "@/components/PaymentModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingState } from "./components/LoadingState";
import { ShippingInfoCard } from "./components/ShippingInfoCard";
import { PaymentMethodCard } from "./components/PaymentMethodCard";
import { OrderItemsCard } from "./components/OrderItemsCard";

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const selectedCartItems = useSelector(selectCartItemsSelected);
  const createLoading = useSelector(selectCreateOrderLoading);
  const [showPayment, setShowPayment] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [pendingOrder, setPendingOrder] = useState<CreateOrderData | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrderData>({
    defaultValues: {
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      orderNotes: "",
      paymentMethod: "COD",
    },
  });

  useEffect(() => {
    const loadCheckoutData = () => {
      try {
        const savedItems = sessionStorage.getItem("checkoutItems");

        if (savedItems) {
          const parsedItems = JSON.parse(savedItems);
          if (parsedItems.length > 0) {
            setCheckoutItems(parsedItems);
            setIsLoading(false);
            return;
          }
        }

        if (selectedCartItems.length > 0) {
          setCheckoutItems(selectedCartItems);
          setIsLoading(false);
          return;
        }

        setShouldRedirect(true);
        toast.error("Vui lòng chọn sản phẩm để thanh toán!");
        setTimeout(() => {
          router.push("/cart");
        }, 1500);
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
        setShouldRedirect(true);
        setTimeout(() => {
          router.push("/cart");
        }, 1500);
      }
    };

    loadCheckoutData();
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      setValue("receiverName", selectedAddress.name);
      setValue("receiverPhone", selectedAddress.phone);
      setValue("receiverAddress", selectedAddress.addressDetail);
    }
  }, [selectedAddress, setValue]);

  const handleAddressChange = (address: Address | null, index: number) => {
    setSelectedAddress(address);
  };

  const onSubmit = async (data: CreateOrderData) => {
    if (data.paymentMethod === "BANK") {
      setPendingOrder(data);
      setShowPayment(true);
      return;
    }
    await handleOrder(data);
  };

  const handleOrder = async (data: CreateOrderData) => {
    try {
      const orderData = {
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone,
        receiverAddress: data.receiverAddress,
        orderNotes: data.orderNotes,
        paymentMethod: data.paymentMethod,
        items: checkoutItems
          .filter(
            (item) =>
              item.cosmetic?._id && item.cosmetic?.discountPrice !== undefined
          )
          .map((item) => ({
            cosmeticId: item.cosmetic!._id,
            quantity: item.quantity,
            price: item.cosmetic!.discountPrice,
          })),
      };

      await dispatch(createOrder(orderData)).unwrap();

      sessionStorage.removeItem("checkoutItems");
      sessionStorage.removeItem("checkoutTotalPrice");

      toast.success("Đặt hàng thành công!");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.message || "Đặt hàng thất bại!");
    }
  };

  const itemsTotal = useMemo(() => {
    return checkoutItems.reduce((total, item) => {
      return total + (item.cosmetic?.discountPrice || 0) * item.quantity;
    }, 0);
  }, [checkoutItems]);

  const shipping = useMemo(
    () => (itemsTotal > 500000 ? 0 : itemsTotal > 0 ? 30000 : 0),
    [itemsTotal]
  );

  const total = useMemo(() => itemsTotal + shipping, [itemsTotal, shipping]);

  if (isLoading) {
    return <LoadingState message="Đang tải thông tin đơn hàng..." />;
  }

  if (shouldRedirect || checkoutItems.length === 0) {
    return <LoadingState message="Đang chuyển hướng..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/cart"
        className="mb-6 font-poppins flex items-center text-white bg-brand-deep-pink px-4 py-2 rounded-md hover:underline w-fit cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Quay lại
      </Link>

      <h1 className="font-inter text-foreground mb-8">Thanh Toán Đơn Hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <ShippingInfoCard
              register={register}
              errors={errors}
              onAddressChange={handleAddressChange}
            />

            <PaymentMethodCard control={control} errors={errors} />

            <Button
              type="submit"
              disabled={
                isSubmitting || createLoading || checkoutItems.length === 0
              }
              className="w-full bg-brand-deep-pink hover:bg-brand-deep-pink/90 text-white font-poppins py-3 cursor-pointer"
              size="lg"
            >
              {isSubmitting || createLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white mr-2"></div>
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Xác nhận đơn hàng"
              )}
            </Button>
          </form>
        </div>

        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thanh toán chuyển khoản</DialogTitle>
            </DialogHeader>
            <PaymentModal
              amount={total}
              onClose={() => setShowPayment(false)}
              onPaid={async () => {
                setShowPayment(false);
                if (pendingOrder) {
                  await handleOrder(pendingOrder);
                  setPendingOrder(null);
                }
              }}
            />
          </DialogContent>
        </Dialog>

        <div className="lg:col-span-1">
          <OrderItemsCard
            checkoutItems={checkoutItems}
            itemsTotal={itemsTotal}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;