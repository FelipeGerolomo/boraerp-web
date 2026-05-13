"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query"
import {
  activateProductRequest,
  archiveProductRequest,
  createProductRequest,
  getProductRequest,
  listProductsRequest,
  replaceKitItemsRequest,
  replaceMarketplaceListingsRequest,
  replaceProductAttributesRequest,
  replaceProductPricesRequest,
  updateProductComplementaryRequest,
  updateProductCostsRequest,
  updateProductGeneralRequest,
  updateProductOtherRequest,
} from "@/features/product/api/client"
import type {
  CreateProductRequest,
  ProductDetail,
  ProductListFilters,
  ProductListPage,
  ProductSummary,
  ReplaceKitItemsRequest,
  ReplaceMarketplaceListingsRequest,
  ReplaceProductAttributesRequest,
  ReplaceProductPricesRequest,
  UpdateProductComplementaryRequest,
  UpdateProductCostsRequest,
  UpdateProductGeneralRequest,
  UpdateProductOtherRequest,
} from "@/features/product/types/product"

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductListFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (productId: string) => [...productKeys.details(), productId] as const,
}

export function useProducts(filters: ProductListFilters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => listProductsRequest(filters),
  })
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProductRequest(productId),
    enabled: Boolean(productId),
  })
}

function invalidateProductQueries(queryClient: ReturnType<typeof useQueryClient>, productId?: string) {
  void queryClient.invalidateQueries({ queryKey: productKeys.lists() })

  if (productId) {
    void queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) })
  }
}

export function useCreateProduct(
  options?: UseMutationOptions<ProductSummary, Error, CreateProductRequest>,
) {
  return useMutation({
    mutationFn: createProductRequest,
    ...options,
  })
}

export function useUpdateProductGeneral(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProductGeneralRequest) =>
      updateProductGeneralRequest(productId, payload),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useUpdateProductComplementary(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProductComplementaryRequest) =>
      updateProductComplementaryRequest(productId, payload),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useReplaceProductAttributes(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ReplaceProductAttributesRequest) =>
      replaceProductAttributesRequest(productId, payload),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useReplaceMarketplaceListings(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ReplaceMarketplaceListingsRequest) =>
      replaceMarketplaceListingsRequest(productId, payload),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useReplaceKitItems(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ReplaceKitItemsRequest) =>
      replaceKitItemsRequest(productId, payload),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useReplaceProductPrices(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ReplaceProductPricesRequest) =>
      replaceProductPricesRequest(productId, payload),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useUpdateProductCosts(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProductCostsRequest) =>
      updateProductCostsRequest(productId, payload),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useUpdateProductOther(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProductOtherRequest) =>
      updateProductOtherRequest(productId, payload),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useActivateProduct(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => activateProductRequest(productId),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}

export function useArchiveProduct(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => archiveProductRequest(productId),
    onSuccess: () => invalidateProductQueries(queryClient, productId),
  })
}
