import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { PRICE_LIST_OPTIONS } from "@/features/product/types"
import { NumberInput } from "./form-fields"
import type { ProductFormTabProps } from "./types"

export function ProductCostsTab({ values, setValue }: ProductFormTabProps) {
  return (
    <FieldSet>
      <FieldLegend>Custos</FieldLegend>
      <FieldDescription>
        Tabela de custo padrão e preço de custo usados no cálculo de margem.
      </FieldDescription>
      <FieldGroup className="gap-4">
        <div className="grid gap-4 md:grid-cols-2">
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
            <NumberInput
              value={values.costPrice}
              onChange={(value) => setValue("costPrice", value)}
              placeholder="0,00"
              startAddon="R$"
            />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}
