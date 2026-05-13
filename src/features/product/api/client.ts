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

export class ProductApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "ProductApiError"
    this.status = status
  }
}

type ProductApiErrorBody = {
  message?: string
  problem?: {
    detail?: string
    title?: string
  }
}

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

async function parseError(response: Response): Promise<never> {
  let payload: ProductApiErrorBody | null = null

  try {
    payload = (await response.json()) as ProductApiErrorBody
  } catch {
    payload = null
  }

  const message =
    payload?.problem?.detail ??
    payload?.problem?.title ??
    payload?.message ??
    "Request could not be completed."

  throw new ProductApiError(response.status, message)
}

async function request<TResponse>(
  path: string,
  init: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  })

  if (!response.ok) {
    await parseError(response)
  }

  return (await response.json()) as TResponse
}

export function listProductsRequest(filters: ProductListFilters) {
  return request<ProductListPage>(
    withQuery("/api/products", {
      search: filters.search,
      status: filters.status,
      type: filters.type,
      page: filters.page ?? 0,
      size: filters.size ?? 20,
    }),
  )
}

export function getProductRequest(productId: string) {
  return request<ProductDetail>(`/api/products/${productId}`)
}

export function createProductRequest(body: CreateProductRequest) {
  return request<ProductSummary>("/api/products", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export function updateProductGeneralRequest(
  productId: string,
  body: UpdateProductGeneralRequest,
) {
  return request<ProductDetail>(`/api/products/${productId}/general`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
}

export function updateProductComplementaryRequest(
  productId: string,
  body: UpdateProductComplementaryRequest,
) {
  return request<ProductDetail>(`/api/products/${productId}/complementary`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
}

export function replaceProductAttributesRequest(
  productId: string,
  body: ReplaceProductAttributesRequest,
) {
  return request<ProductDetail>(`/api/products/${productId}/attributes`, {
    method: "PUT",
    body: JSON.stringify(body),
  })
}

export function replaceMarketplaceListingsRequest(
  productId: string,
  body: ReplaceMarketplaceListingsRequest,
) {
  return request<ProductDetail>(`/api/products/${productId}/marketplace-listings`, {
    method: "PUT",
    body: JSON.stringify(body),
  })
}

export function replaceKitItemsRequest(
  productId: string,
  body: ReplaceKitItemsRequest,
) {
  return request<ProductDetail>(`/api/products/${productId}/kit-items`, {
    method: "PUT",
    body: JSON.stringify(body),
  })
}

export function replaceProductPricesRequest(
  productId: string,
  body: ReplaceProductPricesRequest,
) {
  return request<ProductDetail>(`/api/products/${productId}/prices`, {
    method: "PUT",
    body: JSON.stringify(body),
  })
}

export function updateProductCostsRequest(
  productId: string,
  body: UpdateProductCostsRequest,
) {
  return request<ProductDetail>(`/api/products/${productId}/costs`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
}

export function updateProductOtherRequest(
  productId: string,
  body: UpdateProductOtherRequest,
) {
  return request<ProductDetail>(`/api/products/${productId}/other`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
}

export function activateProductRequest(productId: string) {
  return request<ProductSummary>(`/api/products/${productId}/activate`, {
    method: "POST",
  })
}

export function archiveProductRequest(productId: string) {
  return request<ProductSummary>(`/api/products/${productId}/archive`, {
    method: "POST",
  })
}

export function isProductApiError(error: unknown): error is ProductApiError {
  return error instanceof ProductApiError
}
