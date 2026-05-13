"use client"

import { useMemo } from "react"
import { useMarketplaceChannelsLookup } from "@/features/lookup/hooks/use-lookups"
import { toNumericLookupOption } from "@/features/lookup/types/lookup-types"
import { LookupAutocompleteBase } from "./lookup-autocomplete-base"
import { type LookupAutocompleteProps, toLookupErrorMessage } from "./shared"

export function MarketplaceChannelAutocomplete({
  value,
  onChange,
  placeholder = "Selecione o canal",
  searchPlaceholder = "Buscar canal...",
  disabled,
  clearable,
}: LookupAutocompleteProps<number>) {
  const query = useMarketplaceChannelsLookup()

  const options = useMemo(
    () => (query.data ?? []).map(toNumericLookupOption),
    [query.data],
  )

  return (
    <LookupAutocompleteBase
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      disabled={disabled}
      loading={query.isLoading}
      clearable={clearable}
      errorMessage={query.isError ? toLookupErrorMessage(query.error) : undefined}
      onRetry={() => {
        void query.refetch()
      }}
    />
  )
}
