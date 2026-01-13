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
import { Briefcase, Music, Utensils, Zap } from "lucide-react";
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
import { formatRupiah } from "@/lib/utils";
import { TablePagination } from "./table-pagination";

// Define transaction type
export type Transaction = {
  id: string;
  date: string;
  merchant: string;
  description: string;
  category:
  | "Entertainment"
  | "Income"
  | "Food & Drink"
  | "Utilities"
  | "Technology";
  amount: number;
  type: "Expense" | "Income";
  icon: any;
  iconColor: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "DATE",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "merchant",
    header: "MERCHANT / DESCRIPTION",
    cell: ({ row }) => {
      const Icon = row.original.icon;
      return (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${row.original.iconColor}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{row.getValue("merchant")}</div>
            <div className="text-xs text-muted-foreground">
              {row.original.description}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      let Icon = Briefcase;
      if (category === "Entertainment") Icon = Music;
      if (category === "Income") Icon = Briefcase;
      if (category === "Food & Drink") Icon = Utensils;
      if (category === "Utilities") Icon = Zap;

      return (
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-muted w-fit text-xs font-medium">
          <Icon className="h-3 w-3 text-muted-foreground" />
          <span>{category}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type = row.original.type;
      const formatted = formatRupiah(amount);

      return (
        <div
          className={`font-semibold ${type === "Income" ? "text-green-600" : ""}`}
        >
          {type === "Income" ? "+" : ""}
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <Badge
          variant={type === "Income" ? "up" : "down"}
        >
          {type}
        </Badge>
      );
    },
  },
];

interface TransactionTableContainerProps {
  data: Transaction[];
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
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-xs uppercase font-semibold text-muted-foreground h-12"
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
                className="h-16"
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
