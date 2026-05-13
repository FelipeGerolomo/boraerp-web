"use client"

import { useMemo } from "react"
import { useUnitsOfMeasureLookup } from "@/features/lookup/hooks/use-lookups"
import { toUnitLookupOption } from "@/features/lookup/types/lookup-types"
import { LookupAutocompleteBase } from "./lookup-autocomplete-base"
import { type LookupAutocompleteProps, toLookupErrorMessage } from "./shared"

export function UnitOfMeasureAutocomplete({
  value,
  onChange,
  placeholder = "Selecione a unidade",
  searchPlaceholder = "Buscar unidade...",
  disabled,
  clearable,
}: LookupAutocompleteProps<string>) {
  const query = useUnitsOfMeasureLookup()

  const options = useMemo(
    () => (query.data ?? []).map(toUnitLookupOption),
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
