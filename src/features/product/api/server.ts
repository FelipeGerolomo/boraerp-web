import "server-only"

import { apiRequest } from "@/lib/api/http"
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

function withQuery(path: string, params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === "") {
      continue
    }

    searchParams.set(key, String(value))
  }

  const query = searchParams.toString()
  return query ? `${path}?${query}` : path
}

function companyPath(companyId: string, suffix: string) {
  return `/api/v1/companies/${companyId}${suffix}`
}

export function listProducts(
  companyId: string,
  token: string,
  filters: ProductListFilters,
) {
  return apiRequest<ProductListPage>(
    withQuery(companyPath(companyId, "/products"), {
      search: filters.search,
      status: filters.status,
      type: filters.type,
      page: filters.page ?? 0,
      size: filters.size ?? 20,
      sort: "updatedAt,desc",
    }),
    { method: "GET", token },
  )
}

export function createProduct(companyId: string, token: string, body: CreateProductRequest) {
  return apiRequest<ProductSummary>(companyPath(companyId, "/products"), {
    method: "POST",
    token,
    body,
  })
}

export function getProduct(companyId: string, token: string, productId: string) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}`),
    { method: "GET", token },
  )
}

export function updateProductGeneral(
  companyId: string,
  token: string,
  productId: string,
  body: UpdateProductGeneralRequest,
) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}/general`),
    { method: "PATCH", token, body },
  )
}

export function updateProductComplementary(
  companyId: string,
  token: string,
  productId: string,
  body: UpdateProductComplementaryRequest,
) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}/complementary`),
    { method: "PATCH", token, body },
  )
}

export function replaceProductAttributes(
  companyId: string,
  token: string,
  productId: string,
  body: ReplaceProductAttributesRequest,
) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}/attributes`),
    { method: "PUT", token, body },
  )
}

export function replaceMarketplaceListings(
  companyId: string,
  token: string,
  productId: string,
  body: ReplaceMarketplaceListingsRequest,
) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}/marketplace-listings`),
    { method: "PUT", token, body },
  )
}

export function replaceKitItems(
  companyId: string,
  token: string,
  productId: string,
  body: ReplaceKitItemsRequest,
) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}/kit-items`),
    { method: "PUT", token, body },
  )
}

export function replaceProductPrices(
  companyId: string,
  token: string,
  productId: string,
  body: ReplaceProductPricesRequest,
) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}/prices`),
    { method: "PUT", token, body },
  )
}

export function updateProductCosts(
  companyId: string,
  token: string,
  productId: string,
  body: UpdateProductCostsRequest,
) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}/costs`),
    { method: "PATCH", token, body },
  )
}

export function updateProductOther(
  companyId: string,
  token: string,
  productId: string,
  body: UpdateProductOtherRequest,
) {
  return apiRequest<ProductDetail>(
    companyPath(companyId, `/products/${productId}/other`),
    { method: "PATCH", token, body },
  )
}

export function archiveProduct(companyId: string, token: string, productId: string) {
  return apiRequest<ProductSummary>(
    companyPath(companyId, `/products/${productId}/archive`),
    { method: "POST", token },
  )
}

export function activateProduct(companyId: string, token: string, productId: string) {
  return apiRequest<ProductSummary>(
    companyPath(companyId, `/products/${productId}/activate`),
    { method: "POST", token },
  )
}
