import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { ProductKitItem } from "@/features/product/types"
import type { ProductFormTabProps } from "./types"

export function ProductKitsTab({ values, setValue }: ProductFormTabProps) {
  const items = values.kitItems
  const isKit = values.productTypeCode === "KIT"

  function updateItem(index: number, next: ProductKitItem) {
    setValue(
      "kitItems",
      items.map((item, currentIndex) => (currentIndex === index ? next : item)),
    )
  }

  function addItem() {
    setValue("kitItems", [...items, { childProductId: "", quantity: 1 }])
  }

  function removeItem(index: number) {
    setValue(
      "kitItems",
      items.filter((_, currentIndex) => currentIndex !== index),
    )
  }

  if (!isKit) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Itens de kit disponíveis apenas para tipo KIT</EmptyTitle>
          <EmptyDescription>
            Defina o tipo do produto como KIT na aba Dados gerais para cadastrar
            os itens que compõem o kit.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <FieldGroup className="gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Itens do kit</h3>
        <Button type="button" size="sm" variant="outline" onClick={addItem}>
          <Plus data-icon="inline-start" />
          Adicionar item
        </Button>
      </div>

      {items.length === 0 && (
        <p className="rounded-xl border border-dashed px-4 py-6 text-sm text-muted-foreground">
          Nenhum item adicionado ao kit.
        </p>
      )}

      {items.map((item, index) => (
        <div key={`${index}-${item.childProductId}`} className="rounded-xl border p-4">
          <div className="grid gap-4 md:grid-cols-[1fr_200px_auto]">
            <Field>
              <FieldLabel>ID do produto filho</FieldLabel>
              <Input
                value={item.childProductId}
                onChange={(event) =>
                  updateItem(index, {
                    ...item,
                    childProductId: event.target.value,
                  })
                }
                placeholder="UUID do produto filho"
              />
            </Field>

            <Field>
              <FieldLabel>Quantidade</FieldLabel>
              <Input
                type="number"
                min="0.0001"
                step="0.0001"
                value={item.quantity}
                onChange={(event) =>
                  updateItem(index, {
                    ...item,
                    quantity: Number(event.target.value || 0),
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>&nbsp;</FieldLabel>
              <Button
                type="button"
                variant="outline"
                onClick={() => removeItem(index)}
              >
                <Trash2 data-icon="inline-start" />
                Remover
              </Button>
            </Field>
          </div>
        </div>
      ))}
    </FieldGroup>
  )
}
