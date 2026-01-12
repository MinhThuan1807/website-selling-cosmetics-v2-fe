"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";

interface ProductLoadingStateProps {
  loading: boolean;
  cosmetic: any;
  onBack: () => void;
}

const ProductLoadingState = ({
  loading,
  cosmetic,
  onBack,
}: ProductLoadingStateProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-deep-pink"></div>
      </div>
    );
  }

  if (!cosmetic && !loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Không tìm thấy sản phẩm
        </h2>
        <Button onClick={onBack} variant="outline">
          Quay lại danh sách sản phẩm
        </Button>
      </div>
    );
  }

  return null;
};

export default ProductLoadingState;