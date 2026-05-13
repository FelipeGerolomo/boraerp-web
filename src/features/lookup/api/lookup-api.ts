import type {
  LookupResponse,
  UnitOfMeasureLookupResponse,
} from "@/features/lookup/types/lookup-types"

export class LookupApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "LookupApiError"
    this.status = status
  }
}

type LookupApiErrorBody = {
  message?: string
  problem?: {
    detail?: string
    title?: string
  }
}

async function parseError(response: Response): Promise<never> {
  let payload: LookupApiErrorBody | null = null

  try {
    payload = (await response.json()) as LookupApiErrorBody
  } catch {
    payload = null
  }

  const message =
    payload?.problem?.detail ??
    payload?.problem?.title ??
    payload?.message ??
    "Request could not be completed."

  throw new LookupApiError(response.status, message)
}

async function request<TResponse>(path: string): Promise<TResponse> {
  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    await parseError(response)
  }

  return (await response.json()) as TResponse
}

export function listProductTypesLookupRequest() {
  return request<LookupResponse[]>("/api/lookups/product-types")
}

export function listProductStatusesLookupRequest() {
  return request<LookupResponse[]>("/api/lookups/product-statuses")
}

export function listSpedItemTypesLookupRequest() {
  return request<LookupResponse[]>("/api/lookups/sped-item-types")
}

export function listProductOriginCodesLookupRequest() {
  return request<LookupResponse[]>("/api/lookups/product-origin-codes")
}

export function listPackageTypesLookupRequest() {
  return request<LookupResponse[]>("/api/lookups/package-types")
}

export function listMarketplaceChannelsLookupRequest() {
  return request<LookupResponse[]>("/api/lookups/marketplace-channels")
}

export function listUnitsOfMeasureLookupRequest() {
  return request<UnitOfMeasureLookupResponse[]>("/api/lookups/units-of-measure")
}
