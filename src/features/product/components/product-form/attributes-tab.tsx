import { Plus, Tag, Trash2, Type } from "lucide-react"
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
import type { ProductAttribute } from "@/features/product/types"
import { TextInput } from "./form-fields"
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
    <FieldSet>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <FieldLegend className="mb-0">Ficha técnica</FieldLegend>
          <FieldDescription>
            Atributos e características técnicas do produto (cor, material,
            voltagem, etc.).
          </FieldDescription>
        </div>
        <Button type="button" size="sm" variant="outline" onClick={addItem}>
          <Plus data-icon="inline-start" />
          Adicionar atributo
        </Button>
      </div>

      <FieldGroup className="gap-4">
        {attributes.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyTitle>Nenhum atributo adicionado</EmptyTitle>
              <EmptyDescription>
                Use “Adicionar atributo” para incluir características do produto.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {attributes.map((attribute, index) => (
          <div
            key={`${index}-${attribute.name}`}
            className="rounded-2xl border p-4"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <Field>
                <FieldLabel>Nome do atributo</FieldLabel>
                <TextInput
                  value={attribute.name}
                  onChange={(value) =>
                    updateItem(index, { ...attribute, name: value })
                  }
                  placeholder="Ex.: Cor"
                  startAddon={<Tag />}
                />
              </Field>

              <Field>
                <FieldLabel>Valor</FieldLabel>
                <TextInput
                  value={attribute.value}
                  onChange={(value) =>
                    updateItem(index, { ...attribute, value })
                  }
                  placeholder="Ex.: Azul"
                  startAddon={<Type />}
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
