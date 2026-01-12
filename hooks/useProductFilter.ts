import { useState, useEffect, useMemo } from "react";
import { Cosmetic } from "@/lib/types";

const PRODUCTS_PER_PAGE = 8;

interface PriceRange {
  min: string;
  max: string;
}

export const useProductFilter = (cosmetics: Cosmetic[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: "", max: "" });
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE);
  const [sortBy, setSortBy] = useState("name");

  // Get unique categories and brands
  const categories = useMemo(
    () => Array.from(new Set(cosmetics?.map((p) => p.classify) || [])),
    [cosmetics]
  );

  const brands = useMemo(
    () => Array.from(new Set(cosmetics?.map((p) => p.brand).filter(Boolean) || [])),
    [cosmetics]
  );

  // Filter products
  const filteredProducts = useMemo(() => {
    return cosmetics.filter((cosmetic) => {
      if (
        searchQuery &&
        !cosmetic.nameCosmetic.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(cosmetic.classify)
      ) {
        return false;
      }

      if (
        selectedBrands.length > 0 &&
        cosmetic.brand &&
        !selectedBrands.includes(cosmetic.brand)
      ) {
        return false;
      }

      if (priceRange.min && cosmetic.discountPrice < parseInt(priceRange.min)) {
        return false;
      }
      if (priceRange.max && cosmetic.discountPrice > parseInt(priceRange.max)) {
        return false;
      }

      return true;
    });
  }, [cosmetics, searchQuery, selectedCategories, selectedBrands, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.discountPrice - b.discountPrice;
        case "price-desc":
          return b.discountPrice - a.discountPrice;
        case "name":
          return a.nameCosmetic.localeCompare(b.nameCosmetic);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, displayedCount);
  const hasMoreProducts = displayedCount < sortedProducts.length;

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange.min ||
    priceRange.max;

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(PRODUCTS_PER_PAGE);
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy]);

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + PRODUCTS_PER_PAGE);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands((prev) => [...prev, brand]);
    } else {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand));
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: "", max: "" });
    setSortBy("name");
  };

  return {
    // State
    searchQuery,
    selectedCategories,
    selectedBrands,
    priceRange,
    sortBy,
    
    // Computed
    categories,
    brands,
    displayedProducts,
    sortedProducts,
    hasMoreProducts,
    hasActiveFilters,
    
    // Actions
    setSearchQuery,
    setPriceRange,
    setSortBy,
    handleLoadMore,
    handleCategoryChange,
    handleBrandChange,
    clearFilters,
  };
};