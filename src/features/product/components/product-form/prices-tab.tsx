import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { PRICE_LIST_OPTIONS, type ProductPrice } from "@/features/product/types"
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
    <FieldGroup className="gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Tabelas de preço</h3>
        <Button type="button" size="sm" variant="outline" onClick={addPrice}>
          <Plus data-icon="inline-start" />
          Adicionar preço
        </Button>
      </div>

      {prices.length === 0 && (
        <p className="rounded-xl border border-dashed px-4 py-6 text-sm text-muted-foreground">
          Nenhum preço cadastrado.
        </p>
      )}

      {prices.map((price, index) => (
        <div key={`${index}-${price.priceListId}`} className="rounded-xl border p-4">
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
              <Input
                type="number"
                min="0"
                step="0.01"
                value={price.price}
                onChange={(event) =>
                  updateItem(index, {
                    ...price,
                    price: Number(event.target.value || 0),
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>Preço promocional</FieldLabel>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={price.promotionalPrice ?? ""}
                onChange={(event) =>
                  updateItem(index, {
                    ...price,
                    promotionalPrice:
                      event.target.value === ""
                        ? undefined
                        : Number(event.target.value),
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>Preço de custo</FieldLabel>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={price.costPrice ?? ""}
                onChange={(event) =>
                  updateItem(index, {
                    ...price,
                    costPrice:
                      event.target.value === ""
                        ? undefined
                        : Number(event.target.value),
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>Início vigência</FieldLabel>
              <Input
                type="datetime-local"
                value={price.startsAt ? price.startsAt.slice(0, 16) : ""}
                onChange={(event) =>
                  updateItem(index, {
                    ...price,
                    startsAt: event.target.value
                      ? new Date(event.target.value).toISOString()
                      : undefined,
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>Fim vigência</FieldLabel>
              <Input
                type="datetime-local"
                value={price.endsAt ? price.endsAt.slice(0, 16) : ""}
                onChange={(event) =>
                  updateItem(index, {
                    ...price,
                    endsAt: event.target.value
                      ? new Date(event.target.value).toISOString()
                      : undefined,
                  })
                }
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
  )
}
