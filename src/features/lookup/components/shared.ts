import type { LookupOption } from "@/features/lookup/types/lookup-types"

export type LookupAutocompleteProps<TValue extends string | number> = {
  value?: TValue
  onChange: (value: TValue | undefined) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  clearable?: boolean
}

export function toLookupErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Não foi possível carregar as opções."
}

export function buildTextLookupOptions(
  options: LookupOption<string>[] | undefined,
) {
  return options ?? []
}

export function buildNumericLookupOptions(
  options: LookupOption<number>[] | undefined,
) {
  return options ?? []
}
