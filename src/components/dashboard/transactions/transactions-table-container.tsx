"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  Briefcase,
  ChevronDown,
  Film,
  MoreHorizontal,
  Music,
  ShoppingCart,
  Utensils,
  Wallet,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Define transaction type
export type Transaction = {
  id: string
  date: string
  merchant: string
  description: string
  category: "Entertainment" | "Income" | "Food & Drink" | "Utilities" | "Technology"
  amount: number
  type: "Expense" | "Income"
  icon: any
  iconColor: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "DATE",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "merchant",
    header: "MERCHANT / DESCRIPTION",
    cell: ({ row }) => {
      const Icon = row.original.icon
      return (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${row.original.iconColor}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{row.getValue("merchant")}</div>
            <div className="text-xs text-muted-foreground">{row.original.description}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      let Icon = Briefcase
      if (category === "Entertainment") Icon = Music
      if (category === "Income") Icon = Briefcase
      if (category === "Food & Drink") Icon = Utensils
      if (category === "Utilities") Icon = Zap

      return (
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-muted w-fit text-xs font-medium">
          <Icon className="h-3 w-3 text-muted-foreground" />
          <span>{category}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const type = row.original.type
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return (
        <div className={`font-semibold ${type === "Income" ? "text-green-600" : ""}`}>
          {type === "Income" ? "+" : ""}{formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) => {
      const type = row.original.type
      return (
        <Badge
          variant="secondary"
          className={`${type === "Income"
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-red-100 text-red-700 hover:bg-red-200"
            } font-normal`}
        >
          {type}
        </Badge>
      )
    },
  },
]

interface TransactionTableContainerProps {
  data: Transaction[]
}

export default function TransactionTableContainer({ data }: TransactionTableContainerProps) {
  const [rowSelection, setRowSelection] = React.useState({})

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
  })

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-xs uppercase font-semibold text-muted-foreground h-12">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
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
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">97</span> results
        </div>
        <Pagination className="w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="border rounded-md h-8 w-8 p-0 flex items-center justify-center" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white border-blue-500 h-8 w-8 rounded-md">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="h-8 w-8 rounded-md">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="h-8 w-8 rounded-md">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="h-8 w-8 rounded-md">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="border rounded-md h-8 w-8 p-0 flex items-center justify-center" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
