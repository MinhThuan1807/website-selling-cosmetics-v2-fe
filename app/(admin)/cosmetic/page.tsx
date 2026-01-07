"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductFilters } from "./components/ProductFilters";
import { ProductTable } from "./components/ProductTable";
import { ProductDialog } from "./components/ProductDialog";
import { useProductManagement } from "@/hooks/useProductManagement";

const ProductsManagement = () => {
  const {
    // Data
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
  } = useProductManagement();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="pt-2">Quản lý sản phẩm</CardTitle>
          <CardDescription>
            Quản lý thông tin sản phẩm, giá cả và tồn kho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onAddProduct={handleAddProduct}
          />

          <ProductTable
            products={filteredProducts}
            loading={loading}
            pagination={pagination}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </CardContent>
      </Card>

      <ProductDialog
        dialogState={dialogState}
        imageState={imageState}
        fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
        onClose={closeDialog}
        onSave={handleSaveProduct}
        onImageChange={handleImageChange}
        onUpdateProduct={handleUpdateSelectedProduct}
      />
    </div>
  );
};

export default ProductsManagement;