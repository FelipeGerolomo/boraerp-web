import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  PackageTypeAutocomplete,
  ProductOriginCodeAutocomplete,
  ProductStatusAutocomplete,
  ProductTypeAutocomplete,
  SpedItemTypeAutocomplete,
  UnitOfMeasureAutocomplete,
} from "@/features/lookup/components"
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
          <ProductTypeAutocomplete
            value={values.productTypeCode}
            onChange={(value) => setValue("productTypeCode", value ?? "")}
          />
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <ProductStatusAutocomplete
            value={values.statusCode}
            onChange={(value) => setValue("statusCode", value ?? "")}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Tipo do item SPED</FieldLabel>
          <SpedItemTypeAutocomplete
            value={values.spedItemTypeCode}
            onChange={(value) => setValue("spedItemTypeCode", value ?? "")}
          />
        </Field>

        <Field>
          <FieldLabel>Origem do produto (ICMS)</FieldLabel>
          <ProductOriginCodeAutocomplete
            value={values.originCode}
            onChange={(value) => setValue("originCode", value ?? "")}
          />
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

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>CEST</FieldLabel>
          <Input
            value={values.cest}
            onChange={(event) => setValue("cest", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Tipo de embalagem</FieldLabel>
          <PackageTypeAutocomplete
            value={values.packageTypeCode}
            onChange={(value) => setValue("packageTypeCode", value ?? "")}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel>Unidade de medida</FieldLabel>
          <UnitOfMeasureAutocomplete
            value={values.unitOfMeasureId}
            onChange={(value) => setValue("unitOfMeasureId", value ?? "")}
          />
        </Field>

        <Field>
          <FieldLabel>Unidade comercial</FieldLabel>
          <UnitOfMeasureAutocomplete
            value={values.commercialUnitId}
            onChange={(value) => setValue("commercialUnitId", value ?? "")}
          />
        </Field>

        <Field>
          <FieldLabel>Unidade tributável</FieldLabel>
          <UnitOfMeasureAutocomplete
            value={values.taxableUnitId}
            onChange={(value) => setValue("taxableUnitId", value ?? "")}
          />
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
