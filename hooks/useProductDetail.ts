import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/redux/store";
import {
  fetchCosmeticById,
  selectCosmeticLoading,
  selectSelectedCosmetic,
} from "@/lib/redux/cosmetic/cosmeticSlice";
import { addToCart } from "@/lib/redux/cart/cartSlice";
import {
  fetchCurrentUser,
  selectCurrentUser,
} from "@/lib/redux/user/userSlice";
import { Cosmetic } from "@/lib/types";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { fetchCosmeticBySlug } from "@/lib/redux/cosmetic/cosmeticSlice";

export const useProductDetail = () => {
  const params = useParams();
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectCurrentUser);
  const { requireUserAuth } = useAuth();

  const cosmetic = useSelector(selectSelectedCosmetic);
  const loading = useSelector(selectCosmeticLoading);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const isOutOfStock = !cosmetic?.quantity || cosmetic.quantity <= 0;

  // Fetch user from session when component mounts
  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCosmeticBySlug(slug as string)); // Gọi API theo slug
    }
  }, [slug, dispatch]);

  // Fetch cosmetic details
  useEffect(() => {
    if (params._id) {
      dispatch(fetchCosmeticById(params._id as string));
    }
  }, [params._id, dispatch]);

  // Update selected image when cosmetic changes
  useEffect(() => {
    if (cosmetic) {
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [cosmetic]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const handleAddToCart = (cosmeticItem: Cosmetic) => {
    if (!cosmeticItem) return;

    if (isOutOfStock) {
      toast.error("Sản phẩm đã hết hàng!");
      return;
    }

    requireUserAuth(() => {
      dispatch(
        addToCart({
          cosmeticId: cosmeticItem._id,
          quantity: quantity,
        })
      );
      toast.success("Đã thêm vào giỏ hàng!");
    });
  };

  const handleBuyNow = (cosmeticItem: Cosmetic) => {
    if (!cosmeticItem) return;

    if (isOutOfStock) {
      toast.error("Sản phẩm đã hết hàng!");
      return;
    }

    requireUserAuth(() => {
      dispatch(
        addToCart({
          cosmeticId: cosmeticItem._id,
          quantity: quantity,
        })
      );
      toast.success("Đã thêm vào giỏ hàng!");
      router.push("/cart");
    });
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (isOutOfStock) {
      toast.error("Sản phẩm đã hết hàng!");
      return;
    }

    if (quantity < cosmetic?.quantity!) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("Số lượng đã đạt giới hạn trong kho!");
    }
  };

  const discountPercentage = cosmetic?.originalPrice
    ? Math.round(
        ((cosmetic.originalPrice - cosmetic.discountPrice) /
          cosmetic.originalPrice) *
          100
      )
    : 0;

  return {
    // Data
    cosmetic,
    loading,
    quantity,
    selectedImage,
    isOutOfStock,
    discountPercentage,

    // Actions
    setSelectedImage,
    handleAddToCart,
    handleBuyNow,
    handleQuantityDecrease,
    handleQuantityIncrease,
    formatPrice,
    router,
  };
};
