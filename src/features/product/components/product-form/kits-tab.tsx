import { Package, Plus, Trash2 } from "lucide-react"
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
import type { ProductKitItem } from "@/features/product/types"
import { NumberInput, TextInput } from "./form-fields"
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
    <FieldSet>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <FieldLegend className="mb-0">Itens do kit</FieldLegend>
          <FieldDescription>
            Produtos que compõem este kit e a quantidade de cada um.
          </FieldDescription>
        </div>
        <Button type="button" size="sm" variant="outline" onClick={addItem}>
          <Plus data-icon="inline-start" />
          Adicionar item
        </Button>
      </div>

      <FieldGroup className="gap-4">
        {items.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyTitle>Nenhum item adicionado ao kit</EmptyTitle>
              <EmptyDescription>
                Use “Adicionar item” para compor o kit com outros produtos.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {items.map((item, index) => (
          <div
            key={`${index}-${item.childProductId}`}
            className="rounded-2xl border p-4"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_200px_auto]">
              <Field>
                <FieldLabel>Produto filho</FieldLabel>
                <TextInput
                  value={item.childProductId}
                  onChange={(value) =>
                    updateItem(index, { ...item, childProductId: value })
                  }
                  placeholder="UUID do produto filho"
                  startAddon={<Package />}
                />
              </Field>

              <Field>
                <FieldLabel>Quantidade</FieldLabel>
                <NumberInput
                  value={item.quantity}
                  onChange={(value) =>
                    updateItem(index, { ...item, quantity: value ?? 0 })
                  }
                  placeholder="1"
                  min="0.0001"
                  step="0.0001"
                  endAddon="un"
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
    </FieldSet>
  )
}
