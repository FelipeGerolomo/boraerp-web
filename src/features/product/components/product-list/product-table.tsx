"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ProductListItem } from "@/features/product/types"

type Props = {
  rows: ProductListItem[]
  onArchive?: (productId: string) => void
}

const columnHelper = createColumnHelper<ProductListItem>()

function asCurrency(value?: number) {
  if (value == null) return "-"

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function asDate(value?: string) {
  if (!value) return "-"

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value))
}

export function ProductTable({ rows, onArchive }: Props) {
  const router = useRouter()

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Nome",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("sku", {
        header: "SKU",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("barcode", {
        header: "Código de barras",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("type", {
        header: "Tipo",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Badge variant="outline">{info.getValue() || "Sem status"}</Badge>
        ),
      }),
      columnHelper.accessor("price", {
        header: "Preço",
        cell: (info) => asCurrency(info.getValue()),
      }),
      columnHelper.accessor("updatedAt", {
        header: "Atualizado em",
        cell: (info) => asDate(info.getValue()),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-md p-1 transition-colors hover:bg-accent/50"
              onClick={(event) => event.stopPropagation()}
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/cadastros/produtos/${row.original.id}`)
                }
              >
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/cadastros/produtos/${row.original.id}/editar`)
                }
              >
                Editar
              </DropdownMenuItem>
              {onArchive && (
                <DropdownMenuItem onClick={() => onArchive(row.original.id)}>
                  Arquivar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    [onArchive, router],
  )

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              Nenhum produto encontrado.
            </TableCell>
          </TableRow>
        )}

        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="cursor-pointer"
            onClick={() =>
              router.push(`/dashboard/cadastros/produtos/${row.original.id}`)
            }
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
