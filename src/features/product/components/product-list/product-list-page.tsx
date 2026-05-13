"use client"

import Link from "next/link"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Skeleton } from "@/components/ui/skeleton"
import { archiveProductRequest } from "@/features/product/api/client"
import { productKeys, useProducts } from "@/features/product/hooks"
import {
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
} from "@/features/product/types"
import { ProductTable } from "./product-table"

export function ProductListPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [type, setType] = useState("")
  const [page, setPage] = useState(0)

  const listQuery = useProducts({
    search,
    status,
    type,
    page,
    size: 20,
  })

  const archiveMutation = useMutation({
    mutationFn: archiveProductRequest,
    onSuccess: () => {
      toast.success("Produto arquivado com sucesso")
      void queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível arquivar o produto",
      )
    },
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Produtos</CardTitle>
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/cadastros/produtos/novo" />}
          >
            Novo produto
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
            <Input
              value={search}
              onChange={(event) => {
                setPage(0)
                setSearch(event.target.value)
              }}
              placeholder="Buscar por nome, SKU ou código"
            />

            <NativeSelect
              value={status}
              onChange={(event) => {
                setPage(0)
                setStatus(event.target.value)
              }}
            >
              <NativeSelectOption value="">Todos os status</NativeSelectOption>
              {PRODUCT_STATUS_OPTIONS.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <NativeSelect
              value={type}
              onChange={(event) => {
                setPage(0)
                setType(event.target.value)
              }}
            >
              <NativeSelectOption value="">Todos os tipos</NativeSelectOption>
              {PRODUCT_TYPE_OPTIONS.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {listQuery.isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}

          {listQuery.isError && (
            <Alert variant="destructive">
              <AlertTitle>Erro ao carregar produtos</AlertTitle>
              <AlertDescription>
                {(listQuery.error as Error)?.message ??
                  "Tente novamente em instantes."}
              </AlertDescription>
            </Alert>
          )}

          {listQuery.data && (
            <>
              <ProductTable
                rows={listQuery.data.content}
                onArchive={(productId) => archiveMutation.mutate(productId)}
              />

              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Página {listQuery.data.number + 1} de {listQuery.data.totalPages || 1}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    disabled={listQuery.data.first}
                    onClick={() => setPage((current) => Math.max(0, current - 1))}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    disabled={listQuery.data.last}
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
