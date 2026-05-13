import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { PRICE_LIST_OPTIONS } from "@/features/product/types"
import type { ProductFormTabProps } from "./types"

export function ProductCostsTab({ values, setValue }: ProductFormTabProps) {
  return (
    <FieldGroup className="gap-4">
      <Field>
        <FieldLabel>Tabela de custo padrão</FieldLabel>
        <NativeSelect
          value={values.prices[0]?.priceListId ?? ""}
          onChange={(event) => {
            const current = values.prices[0] ?? {
              priceListId: "",
              price: values.price ?? 0,
            }
            setValue("prices", [
              {
                ...current,
                priceListId: event.target.value,
              },
              ...values.prices.slice(1),
            ])
          }}
        >
          <NativeSelectOption value="">Selecione</NativeSelectOption>
          {PRICE_LIST_OPTIONS.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>

      <Field>
        <FieldLabel>Preço de custo</FieldLabel>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={values.costPrice ?? ""}
          onChange={(event) =>
            setValue(
              "costPrice",
              event.target.value === "" ? undefined : Number(event.target.value),
            )
          }
        />
      </Field>
    </FieldGroup>
  )
}
