import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { ProductAttribute } from "@/features/product/types"
import type { ProductFormTabProps } from "./types"

export function ProductAttributesTab({ values, setValue }: ProductFormTabProps) {
  const attributes = values.attributes

  function updateItem(index: number, next: ProductAttribute) {
    const updated = attributes.map((item, currentIndex) =>
      currentIndex === index ? next : item,
    )
    setValue("attributes", updated)
  }

  function addItem() {
    setValue("attributes", [...attributes, { name: "", value: "" }])
  }

  function removeItem(index: number) {
    setValue(
      "attributes",
      attributes.filter((_, currentIndex) => currentIndex !== index),
    )
  }

  return (
    <FieldGroup className="gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Atributos do produto</h3>
        <Button type="button" size="sm" variant="outline" onClick={addItem}>
          <Plus data-icon="inline-start" />
          Adicionar atributo
        </Button>
      </div>

      {attributes.length === 0 && (
        <p className="rounded-xl border border-dashed px-4 py-6 text-sm text-muted-foreground">
          Nenhum atributo adicionado.
        </p>
      )}

      {attributes.map((attribute, index) => (
        <div key={`${index}-${attribute.name}`} className="rounded-xl border p-4">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <Field>
              <FieldLabel>Nome do atributo</FieldLabel>
              <Input
                value={attribute.name}
                onChange={(event) =>
                  updateItem(index, {
                    ...attribute,
                    name: event.target.value,
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>Valor</FieldLabel>
              <Input
                value={attribute.value}
                onChange={(event) =>
                  updateItem(index, {
                    ...attribute,
                    value: event.target.value,
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
