import type { Table } from "@tanstack/react-table";

interface UsePaginationProps<TData> {
  table: Table<TData>;
}

export function usePagination<TData>({ table }: UsePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();

  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  const getPageNumbers = () => {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const complexPages: (number | string)[] = [1];
    if (pageIndex > 2) complexPages.push("...");

    const start = Math.max(2, pageIndex);
    const end = Math.min(pageCount - 1, pageIndex + 2);

    for (let i = start; i <= end; i++) {
      complexPages.push(i);
    }

    if (end < pageCount - 1) complexPages.push("...");
    if (pageCount > 1) complexPages.push(pageCount);

    return complexPages;
  };

  return {
    pageIndex,
    pageSize,
    totalRows,
    pageCount,
    startRow,
    endRow,
    pageNumbers: getPageNumbers(),
    canPreviousPage: table.getCanPreviousPage(),
    canNextPage: table.getCanNextPage(),
    nextPage: table.nextPage,
    previousPage: table.previousPage,
    setPageIndex: table.setPageIndex,
  };
}
