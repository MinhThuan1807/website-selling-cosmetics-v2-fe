import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  filteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const UserPagination = ({
  currentPage,
  totalPages,
  totalCount,
  filteredCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: UserPaginationProps) => {
  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
      if (
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 && page <= currentPage + 1)
      ) {
        return (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (page === currentPage - 2 || page === currentPage + 2) {
        return (
          <PaginationItem key={page}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      return null;
    });
  };

  return (
    <div className="flex items-center justify-between space-y-4 md:space-y-0">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Hiển thị {filteredCount} / {totalCount} người dùng
        </span>
        <Select
          value={pageSize.toString()}
          onValueChange={(val) => onPageSizeChange(parseInt(val))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UserPagination;