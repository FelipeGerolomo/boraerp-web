import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Switch } from "@/components/ui/switch"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  ORIGIN_CODE_OPTIONS,
  PACKAGE_TYPE_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  SPED_ITEM_TYPE_OPTIONS,
  UNIT_OPTIONS,
} from "@/features/product/types"
import type { ProductFormTabProps } from "./types"

function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value?: number
  onChange: (value?: number) => void
  placeholder?: string
}) {
  return (
    <Input
      type="number"
      step="0.01"
      min="0"
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(event) => {
        const next = event.target.value
        onChange(next === "" ? undefined : Number(next))
      }}
    />
  )
}

export function ProductGeneralTab({ values, setValue }: ProductFormTabProps) {
  return (
    <FieldGroup className="gap-4">
      <Field>
        <FieldLabel htmlFor="name">Nome do produto *</FieldLabel>
        <Input
          id="name"
          value={values.name}
          onChange={(event) => setValue("name", event.target.value)}
          placeholder="Digite o nome do produto"
          required
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Tipo do produto</FieldLabel>
          <NativeSelect
            value={values.productTypeCode}
            onChange={(event) => setValue("productTypeCode", event.target.value)}
          >
            <NativeSelectOption value="">Selecione</NativeSelectOption>
            {PRODUCT_TYPE_OPTIONS.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <NativeSelect
            value={values.statusCode}
            onChange={(event) => setValue("statusCode", event.target.value)}
          >
            <NativeSelectOption value="">Selecione</NativeSelectOption>
            {PRODUCT_STATUS_OPTIONS.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Tipo do item SPED</FieldLabel>
          <NativeSelect
            value={values.spedItemTypeCode}
            onChange={(event) => setValue("spedItemTypeCode", event.target.value)}
          >
            <NativeSelectOption value="">Selecione</NativeSelectOption>
            {SPED_ITEM_TYPE_OPTIONS.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field>
          <FieldLabel>Origem do produto (ICMS)</FieldLabel>
          <NativeSelect
            value={values.originCode}
            onChange={(event) => setValue("originCode", event.target.value)}
          >
            <NativeSelectOption value="">Selecione</NativeSelectOption>
            {ORIGIN_CODE_OPTIONS.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel>SKU</FieldLabel>
          <Input
            value={values.sku}
            onChange={(event) => setValue("sku", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Código de barras / GTIN</FieldLabel>
          <Input
            value={values.barcode}
            onChange={(event) => setValue("barcode", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>NCM</FieldLabel>
          <Input
            value={values.ncm}
            onChange={(event) => setValue("ncm", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel>CEST</FieldLabel>
          <Input
            value={values.cest}
            onChange={(event) => setValue("cest", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Unidade de medida</FieldLabel>
          <NativeSelect
            value={values.unitOfMeasureId}
            onChange={(event) => setValue("unitOfMeasureId", event.target.value)}
          >
            <NativeSelectOption value="">Selecione</NativeSelectOption>
            {UNIT_OPTIONS.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field>
          <FieldLabel>Tipo de embalagem</FieldLabel>
          <NativeSelect
            value={values.packageTypeCode}
            onChange={(event) => setValue("packageTypeCode", event.target.value)}
          >
            <NativeSelectOption value="">Selecione</NativeSelectOption>
            {PACKAGE_TYPE_OPTIONS.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel>Preço de venda</FieldLabel>
          <NumberInput
            value={values.price}
            onChange={(value) => setValue("price", value)}
          />
        </Field>
        <Field>
          <FieldLabel>Preço promocional</FieldLabel>
          <NumberInput
            value={values.promotionalPrice}
            onChange={(value) => setValue("promotionalPrice", value)}
          />
        </Field>
        <Field>
          <FieldLabel>Estoque inicial</FieldLabel>
          <NumberInput
            value={values.initialStock}
            onChange={(value) => setValue("initialStock", value)}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel>Estoque mínimo</FieldLabel>
          <NumberInput
            value={values.minimumStock}
            onChange={(value) => setValue("minimumStock", value)}
          />
        </Field>
        <Field>
          <FieldLabel>Estoque máximo</FieldLabel>
          <NumberInput
            value={values.maximumStock}
            onChange={(value) => setValue("maximumStock", value)}
          />
        </Field>
        <Field>
          <FieldLabel>Dias para preparação</FieldLabel>
          <Input
            type="number"
            min="0"
            value={values.preparationDays ?? ""}
            onChange={(event) =>
              setValue(
                "preparationDays",
                event.target.value === "" ? undefined : Number(event.target.value),
              )
            }
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel>Peso líquido (kg)</FieldLabel>
          <NumberInput
            value={values.netWeightKg}
            onChange={(value) => setValue("netWeightKg", value)}
          />
        </Field>
        <Field>
          <FieldLabel>Peso bruto (kg)</FieldLabel>
          <NumberInput
            value={values.grossWeightKg}
            onChange={(value) => setValue("grossWeightKg", value)}
          />
        </Field>
        <Field>
          <FieldLabel>Localização</FieldLabel>
          <Input
            value={values.storageLocation}
            onChange={(event) => setValue("storageLocation", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel>Largura (cm)</FieldLabel>
          <NumberInput
            value={values.widthCm}
            onChange={(value) => setValue("widthCm", value)}
          />
        </Field>
        <Field>
          <FieldLabel>Altura (cm)</FieldLabel>
          <NumberInput
            value={values.heightCm}
            onChange={(value) => setValue("heightCm", value)}
          />
        </Field>
        <Field>
          <FieldLabel>Comprimento (cm)</FieldLabel>
          <NumberInput
            value={values.lengthCm}
            onChange={(value) => setValue("lengthCm", value)}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field orientation="horizontal">
          <FieldLabel htmlFor="trackInventory">Controlar estoque</FieldLabel>
          <Switch
            id="trackInventory"
            checked={values.trackInventory}
            onCheckedChange={(checked) => setValue("trackInventory", checked)}
          />
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="allowBackorder">
            Permitir venda sem estoque
          </FieldLabel>
          <Switch
            id="allowBackorder"
            checked={values.allowBackorder}
            onCheckedChange={(checked) => setValue("allowBackorder", checked)}
          />
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="batchControlEnabled">Controlar lotes</FieldLabel>
          <Switch
            id="batchControlEnabled"
            checked={values.batchControlEnabled}
            onCheckedChange={(checked) =>
              setValue("batchControlEnabled", checked)
            }
          />
        </Field>
      </div>
    </FieldGroup>
  )
}
