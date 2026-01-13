import type { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const {
    pageIndex,
    startRow,
    endRow,
    totalRows,
    pageNumbers,
  } = usePagination({ table });

  return (
    <div className="flex items-center w-full justify-between px-4 py-4 border-t">
      <div className="text-sm text-muted-foreground w-full">
        Showing{" "}
        <span className="font-medium">{totalRows > 0 ? startRow : 0}</span> to{" "}
        <span className="font-medium">{endRow}</span> of{" "}
        <span className="font-medium">{totalRows}</span> results
      </div>
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (table.getCanPreviousPage()) table.previousPage();
              }}
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => (
            <PaginationItem key={`${page}-${index}`}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex((page as number) - 1);
                  }}
                  isActive={pageIndex + 1 === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (table.getCanNextPage()) table.nextPage();
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
