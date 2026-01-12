"use client";

const OutOfStockNotice = () => {
  return (
    <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
      <p className="text-destructive font-inter font-semibold text-lg">
        ⚠️ Sản phẩm tạm hết hàng
      </p>
      <p className="text-muted-foreground font-inter text-sm mt-1">
        Vui lòng quay lại sau hoặc chọn sản phẩm khác
      </p>
    </div>
  );
};

export default OutOfStockNotice;