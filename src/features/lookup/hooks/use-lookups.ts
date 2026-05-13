"use client"

import { useQuery } from "@tanstack/react-query"
import {
  listMarketplaceChannelsLookupRequest,
  listPackageTypesLookupRequest,
  listProductOriginCodesLookupRequest,
  listProductStatusesLookupRequest,
  listProductTypesLookupRequest,
  listSpedItemTypesLookupRequest,
  listUnitsOfMeasureLookupRequest,
} from "@/features/lookup/api/lookup-api"

const LOOKUP_STALE_TIME = 1000 * 60 * 30

export const lookupKeys = {
  all: ["lookups"] as const,
  productTypes: () => [...lookupKeys.all, "product-types"] as const,
  productStatuses: () => [...lookupKeys.all, "product-statuses"] as const,
  spedItemTypes: () => [...lookupKeys.all, "sped-item-types"] as const,
  productOriginCodes: () => [...lookupKeys.all, "product-origin-codes"] as const,
  packageTypes: () => [...lookupKeys.all, "package-types"] as const,
  marketplaceChannels: () => [...lookupKeys.all, "marketplace-channels"] as const,
  unitsOfMeasure: () => [...lookupKeys.all, "units-of-measure"] as const,
}

export function useProductTypesLookup() {
  return useQuery({
    queryKey: lookupKeys.productTypes(),
    queryFn: listProductTypesLookupRequest,
    staleTime: LOOKUP_STALE_TIME,
  })
}

export function useProductStatusesLookup() {
  return useQuery({
    queryKey: lookupKeys.productStatuses(),
    queryFn: listProductStatusesLookupRequest,
    staleTime: LOOKUP_STALE_TIME,
  })
}

export function useSpedItemTypesLookup() {
  return useQuery({
    queryKey: lookupKeys.spedItemTypes(),
    queryFn: listSpedItemTypesLookupRequest,
    staleTime: LOOKUP_STALE_TIME,
  })
}

export function useProductOriginCodesLookup() {
  return useQuery({
    queryKey: lookupKeys.productOriginCodes(),
    queryFn: listProductOriginCodesLookupRequest,
    staleTime: LOOKUP_STALE_TIME,
  })
}

export function usePackageTypesLookup() {
  return useQuery({
    queryKey: lookupKeys.packageTypes(),
    queryFn: listPackageTypesLookupRequest,
    staleTime: LOOKUP_STALE_TIME,
  })
}

export function useMarketplaceChannelsLookup() {
  return useQuery({
    queryKey: lookupKeys.marketplaceChannels(),
    queryFn: listMarketplaceChannelsLookupRequest,
    staleTime: LOOKUP_STALE_TIME,
  })
}

export function useUnitsOfMeasureLookup() {
  return useQuery({
    queryKey: lookupKeys.unitsOfMeasure(),
    queryFn: listUnitsOfMeasureLookupRequest,
    staleTime: LOOKUP_STALE_TIME,
  })
}
