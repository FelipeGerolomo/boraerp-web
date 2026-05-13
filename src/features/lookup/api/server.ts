import "server-only"

import { apiRequest } from "@/lib/api/http"
import type {
  LookupResponse,
  UnitOfMeasureLookupResponse,
} from "@/features/lookup/types/lookup-types"

const LOOKUP_BASE_PATH = "/api/v1/lookups"

export function listProductTypesLookup(token: string) {
  return apiRequest<LookupResponse[]>(`${LOOKUP_BASE_PATH}/product-types`, {
    method: "GET",
    token,
  })
}

export function listProductStatusesLookup(token: string) {
  return apiRequest<LookupResponse[]>(`${LOOKUP_BASE_PATH}/product-statuses`, {
    method: "GET",
    token,
  })
}

export function listSpedItemTypesLookup(token: string) {
  return apiRequest<LookupResponse[]>(`${LOOKUP_BASE_PATH}/sped-item-types`, {
    method: "GET",
    token,
  })
}

export function listProductOriginCodesLookup(token: string) {
  return apiRequest<LookupResponse[]>(`${LOOKUP_BASE_PATH}/product-origin-codes`, {
    method: "GET",
    token,
  })
}

export function listPackageTypesLookup(token: string) {
  return apiRequest<LookupResponse[]>(`${LOOKUP_BASE_PATH}/package-types`, {
    method: "GET",
    token,
  })
}

export function listMarketplaceChannelsLookup(token: string) {
  return apiRequest<LookupResponse[]>(`${LOOKUP_BASE_PATH}/marketplace-channels`, {
    method: "GET",
    token,
  })
}

export function listUnitsOfMeasureLookup(token: string) {
  return apiRequest<UnitOfMeasureLookupResponse[]>(
    `${LOOKUP_BASE_PATH}/units-of-measure`,
    {
      method: "GET",
      token,
    },
  )
}
