"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Wallet } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { iconMap, walletIconMap } from "@/lib/types/map";
import type { TTransactionWithRelations } from "@/lib/types/response";
import { formatRupiah } from "@/lib/utils";
import { TablePagination } from "./table-pagination";

export const columns: ColumnDef<TTransactionWithRelations>[] = [
  {
    accessorKey: "transaction_date",
    header: "Date",
    cell: ({ row }) => row.getValue("transaction_date"),
  },
  {
    accessorKey: "merchant",
    header: "Wallet / Description",
    cell: ({ row }) => {
      const Icon = walletIconMap[row.original.wallets?.icon || "cash"]?.icon || Wallet;

      return (
        <div className="flex justify-center items-center gap-3">
          <Icon className="h-4 w-4" />
          <span className="text-center">{row.original.description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "categories.name",
    header: "Category",
    cell: ({ row }) => {
      const categoryName = row.original.categories?.name || "Uncategorized";
      const iconKey = row.original.categories?.icon || "more";
      const Icon = iconMap[iconKey]?.icon || Wallet;

      return (
        <Badge variant={"outline"}>
          <Icon className="h-3 w-3 text-muted-foreground" />
          <span>{categoryName}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type = row.original.type;
      const formatted = formatRupiah(amount);

      return (
        <div
          className={`font-semibold ${type === "income" ? "text-green-600" : ""}`}
        >
          {type === "income" ? "+" : "-"}
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      const displayType = type.charAt(0).toUpperCase() + type.slice(1);
      return (
        <Badge variant={type === "income" ? "up" : "down"}>{displayType}</Badge>
      );
    },
  },
];

interface TransactionTableContainerProps {
  data: TTransactionWithRelations[];
}

export default function TransactionTableContainer({
  data,
}: TransactionTableContainerProps) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-5">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination table={table} />
    </div>
  );
}
