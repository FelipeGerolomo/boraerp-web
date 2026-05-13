"use client"

import { useMemo } from "react"
import { useSpedItemTypesLookup } from "@/features/lookup/hooks/use-lookups"
import { toLookupOption } from "@/features/lookup/types/lookup-types"
import { LookupAutocompleteBase } from "./lookup-autocomplete-base"
import { type LookupAutocompleteProps, toLookupErrorMessage } from "./shared"

export function SpedItemTypeAutocomplete({
  value,
  onChange,
  placeholder = "Selecione o tipo SPED",
  searchPlaceholder = "Buscar tipo SPED...",
  disabled,
  clearable,
}: LookupAutocompleteProps<string>) {
  const query = useSpedItemTypesLookup()

  const options = useMemo(
    () => (query.data ?? []).map(toLookupOption),
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
