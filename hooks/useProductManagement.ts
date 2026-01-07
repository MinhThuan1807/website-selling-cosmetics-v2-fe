import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Cosmetic } from "@/lib/types/index";
import { AppDispatch } from "@/lib/redux/store";
import {
  createCosmetic,
  deleteCosmetic,
  getPagination,
  selectAllCosmetics,
  selectCosmeticLoading,
  selectCosmeticPagination,
  updateCosmetic,
} from "@/lib/redux/cosmetic/cosmeticSlice";

export interface ProductFiltersState {
  searchTerm: string;
  categoryFilter: string;
  stockFilter: string;
}

export interface DialogState {
  isEditOpen: boolean;
  isAddOpen: boolean;
  selectedProduct: Cosmetic | null;
}

export interface ImageState {
  file: File | null;
  preview: string;
}

const createEmptyProduct = (): Cosmetic => ({
  _id: "",
  brand: "",
  nameCosmetic: "",
  description: "",
  classify: "skincare",
  image: "",
  quantity: 0,
  originalPrice: 0,
  discountPrice: 0,
  rating: 0,
  isNew: false,
  isSaleOff: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const useProductManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cosmetics = useSelector(selectAllCosmetics);
  const loading = useSelector(selectCosmeticLoading);
  const pagination = useSelector(selectCosmeticPagination);

  // Filters State
  const [filters, setFilters] = useState<ProductFiltersState>({
    searchTerm: "",
    categoryFilter: "all",
    stockFilter: "all",
  })

  // Pagination State 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dialog State
  const [dialogState, setDialogState] = useState<DialogState>({
    isEditOpen: false,
    isAddOpen: false,
    selectedProduct: null,
  })

  // Image State
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    preview: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch products when pagination changes
  useEffect(() => {
    dispatch(
      getPagination({
        page: currentPage,
        limit: pageSize,
        sortBy: "createdAt",
        sortOrder: "desc",
      })
    );
  }, [currentPage, pageSize, dispatch]);

  // Filtered products
  const filteredProducts = cosmetics.filter((product) => {
    const matchesSearch =
      product.nameCosmetic.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesCategory =
      filters.categoryFilter === "all" || product.classify === filters.categoryFilter;
    const matchesStock =
      filters.stockFilter === "all" ||
      (filters.stockFilter === "in-stock" && product.quantity > 0) ||
      (filters.stockFilter === "out-of-stock" && product.quantity === 0) ||
      (filters.stockFilter === "low-stock" && product.quantity > 0 && product.quantity <= 10);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Handlers 
  const handleFilterChange = (key: keyof ProductFiltersState, value: string) => {
    setFilters((prev) => ({...prev, [key]: value}));
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    if(!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn tệp hình ảnh hợp lệ.");
      return;
    }

    if(file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước tệp hình ảnh không được vượt quá 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageState({
        file,
        preview: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

   const handleEditProduct = (product: Cosmetic) => {
    setDialogState({
      isEditOpen: true,
      isAddOpen: false,
      selectedProduct: product,
    });
    setImageState({
      file: null,
      preview: product.image || "",
    });
  };

  const handleAddProduct = () => {
    setDialogState({
      isEditOpen: false,
      isAddOpen: true,
      selectedProduct: createEmptyProduct(),
    });
    setImageState({ file: null, preview: "" });
  };

  const handleUpdateSelectedProduct = (updates: Partial<Cosmetic>) => {
    if (!dialogState.selectedProduct) return;
    setDialogState((prev) => ({
      ...prev,
      selectedProduct: { ...prev.selectedProduct!, ...updates },
    }));
  };

   const handleSaveProduct = async () => {
    const { selectedProduct, isAddOpen } = dialogState;
    if (!selectedProduct) return;

    // Validation
    if (!selectedProduct.nameCosmetic.trim()) {
      toast.error("Tên sản phẩm là bắt buộc");
      return;
    }
    if (!selectedProduct.brand.trim()) {
      toast.error("Thương hiệu là bắt buộc");
      return;
    }
    if (selectedProduct.quantity < 0) {
      toast.error("Số lượng không được âm");
      return;
    }
    if (selectedProduct.originalPrice < 0 || selectedProduct.discountPrice < 0) {
      toast.error("Giá không được âm");
      return;
    }
    if (isAddOpen && !imageState.file) {
      toast.error("Hình ảnh sản phẩm là bắt buộc");
      return;
    }

    setIsSubmitting(true);
    try {
      const productData = {
        nameCosmetic: selectedProduct.nameCosmetic,
        brand: selectedProduct.brand,
        classify: selectedProduct.classify,
        quantity: selectedProduct.quantity,
        description: selectedProduct.description || "",
        originalPrice: selectedProduct.originalPrice,
        discountPrice: selectedProduct.discountPrice,
        rating: selectedProduct.rating,
        isNew: selectedProduct.isNew,
        isSaleOff: selectedProduct.isSaleOff,
      };

      if (isAddOpen) {
        await dispatch(
          createCosmetic({ data: productData, imageFile: imageState.file! })
        ).unwrap();
      } else {
        await dispatch(
          updateCosmetic({
            id: selectedProduct._id,
            data: productData,
            imageFile: imageState.file || undefined,
          })
        ).unwrap();
      }

      closeDialog();
    } catch {
      // Error handled by Redux slice
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      await dispatch(deleteCosmetic(productId));
    }
  };

  const closeDialog = () => {
    setDialogState({
      isEditOpen: false,
      isAddOpen: false,
      selectedProduct: null,
    });
    setImageState({ file: null, preview: "" });
  };

  return {
    // Data
    cosmetics,
    loading,
    pagination,
    filteredProducts,
    
    // Filters
    filters,
    handleFilterChange,
    
    // Pagination
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    
    // Dialog
    dialogState,
    handleEditProduct,
    handleAddProduct,
    handleUpdateSelectedProduct,
    handleSaveProduct,
    handleDeleteProduct,
    closeDialog,
    
    // Image
    imageState,
    handleImageChange,
    fileInputRef,
    
    // Submitting
    isSubmitting,
  };
}