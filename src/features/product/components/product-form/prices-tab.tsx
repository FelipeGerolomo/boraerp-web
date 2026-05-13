import { BadgePercent, CalendarClock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { PRICE_LIST_OPTIONS, type ProductPrice } from "@/features/product/types"
import { NumberInput, TextInput } from "./form-fields"
import type { ProductFormTabProps } from "./types"

export function ProductPricesTab({ values, setValue }: ProductFormTabProps) {
  const prices = values.prices

  function updateItem(index: number, next: ProductPrice) {
    setValue(
      "prices",
      prices.map((item, currentIndex) => (currentIndex === index ? next : item)),
    )
  }

  function addPrice() {
    setValue("prices", [
      ...prices,
      {
        priceListId: PRICE_LIST_OPTIONS[0]?.value ?? "",
        price: 0,
      },
    ])
  }

  function removePrice(index: number) {
    setValue(
      "prices",
      prices.filter((_, currentIndex) => currentIndex !== index),
    )
  }

  return (
    <FieldSet>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <FieldLegend className="mb-0">Tabelas de preço</FieldLegend>
          <FieldDescription>
            Preços por tabela, com vigência e valores promocionais e de custo.
          </FieldDescription>
        </div>
        <Button type="button" size="sm" variant="outline" onClick={addPrice}>
          <Plus data-icon="inline-start" />
          Adicionar preço
        </Button>
      </div>

      <FieldGroup className="gap-4">
        {prices.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyTitle>Nenhum preço cadastrado</EmptyTitle>
              <EmptyDescription>
                Use “Adicionar preço” para definir valores por tabela.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {prices.map((price, index) => (
          <div
            key={`${index}-${price.priceListId}`}
            className="rounded-2xl border p-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Tabela de preço</FieldLabel>
                <NativeSelect
                  value={price.priceListId}
                  onChange={(event) =>
                    updateItem(index, {
                      ...price,
                      priceListId: event.target.value,
                    })
                  }
                >
                  {PRICE_LIST_OPTIONS.map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>

              <Field>
                <FieldLabel>Preço</FieldLabel>
                <NumberInput
                  value={price.price}
                  onChange={(value) =>
                    updateItem(index, { ...price, price: value ?? 0 })
                  }
                  placeholder="0,00"
                  startAddon="R$"
                />
              </Field>

              <Field>
                <FieldLabel>Preço promocional</FieldLabel>
                <NumberInput
                  value={price.promotionalPrice}
                  onChange={(value) =>
                    updateItem(index, { ...price, promotionalPrice: value })
                  }
                  placeholder="0,00"
                  startAddon="R$"
                  endAddon={<BadgePercent />}
                />
              </Field>

              <Field>
                <FieldLabel>Preço de custo</FieldLabel>
                <NumberInput
                  value={price.costPrice}
                  onChange={(value) =>
                    updateItem(index, { ...price, costPrice: value })
                  }
                  placeholder="0,00"
                  startAddon="R$"
                />
              </Field>

              <Field>
                <FieldLabel>Início vigência</FieldLabel>
                <TextInput
                  type="datetime-local"
                  value={price.startsAt ? price.startsAt.slice(0, 16) : ""}
                  onChange={(value) =>
                    updateItem(index, {
                      ...price,
                      startsAt: value
                        ? new Date(value).toISOString()
                        : undefined,
                    })
                  }
                  startAddon={<CalendarClock />}
                />
              </Field>

              <Field>
                <FieldLabel>Fim vigência</FieldLabel>
                <TextInput
                  type="datetime-local"
                  value={price.endsAt ? price.endsAt.slice(0, 16) : ""}
                  onChange={(value) =>
                    updateItem(index, {
                      ...price,
                      endsAt: value
                        ? new Date(value).toISOString()
                        : undefined,
                    })
                  }
                  startAddon={<CalendarClock />}
                />
              </Field>
            </div>

            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => removePrice(index)}
              >
                <Trash2 data-icon="inline-start" />
                Remover
              </Button>
            </div>
          </div>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}
