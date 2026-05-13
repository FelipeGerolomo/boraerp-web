import {
  BadgePercent,
  Barcode,
  Boxes,
  CalendarClock,
  Hash,
  Landmark,
  MapPin,
  PackageMinus,
  PackagePlus,
  Tag,
  Weight,
} from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import {
  PackageTypeAutocomplete,
  ProductOriginCodeAutocomplete,
  ProductStatusAutocomplete,
  ProductTypeAutocomplete,
  SpedItemTypeAutocomplete,
  UnitOfMeasureAutocomplete,
} from "@/features/lookup/components"
import { BoxDimensionsDiagram } from "./box-dimensions-diagram"
import { NumberInput, TextInput } from "./form-fields"
import type { ProductFormTabProps } from "./types"

export function ProductGeneralTab({ values, setValue }: ProductFormTabProps) {
  return (
    <div className="flex flex-col gap-8">
      <FieldSet>
        <FieldLegend>Classificação</FieldLegend>
        <FieldDescription>
          Define o tipo do produto e o enquadramento fiscal usado em notas e no
          SPED.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel>Tipo do produto</FieldLabel>
              <ProductTypeAutocomplete
                value={values.productTypeCode}
                onChange={(value) => setValue("productTypeCode", value ?? "")}
                placeholder="Selecione o tipo do produto"
              />
            </Field>

            <Field>
              <FieldLabel>Tipo do item SPED</FieldLabel>
              <SpedItemTypeAutocomplete
                value={values.spedItemTypeCode}
                onChange={(value) => setValue("spedItemTypeCode", value ?? "")}
                placeholder="Selecione o tipo do item SPED"
              />
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <ProductStatusAutocomplete
                value={values.statusCode}
                onChange={(value) => setValue("statusCode", value ?? "")}
                placeholder="Selecione o status"
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Identificação</FieldLegend>
        <FieldDescription>
          Dados principais do produto: nome, códigos de identificação, unidades
          de medida e preços de venda.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="name">Nome do produto *</FieldLabel>
            <TextInput
              id="name"
              value={values.name}
              onChange={(value) => setValue("name", value)}
              placeholder="Digite o nome do produto"
              startAddon={<Tag />}
              required
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel>SKU</FieldLabel>
              <TextInput
                value={values.sku}
                onChange={(value) => setValue("sku", value)}
                placeholder="Ex.: PRD-0001"
                startAddon={<Hash />}
              />
            </Field>

            <Field>
              <FieldLabel>Código de barras / GTIN</FieldLabel>
              <TextInput
                value={values.barcode}
                onChange={(value) => setValue("barcode", value)}
                placeholder="Ex.: 7891234567890"
                startAddon={<Barcode />}
                inputMode="numeric"
              />
            </Field>

            <Field>
              <FieldLabel>NCM</FieldLabel>
              <TextInput
                value={values.ncm}
                onChange={(value) => setValue("ncm", value)}
                placeholder="Ex.: 6109.10.00"
                startAddon={<Landmark />}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>CEST</FieldLabel>
              <TextInput
                value={values.cest}
                onChange={(value) => setValue("cest", value)}
                placeholder="Ex.: 28.038.00"
                startAddon={<Landmark />}
              />
            </Field>

            <Field>
              <FieldLabel>Origem do produto (ICMS)</FieldLabel>
              <ProductOriginCodeAutocomplete
                value={values.originCode}
                onChange={(value) => setValue("originCode", value ?? "")}
                placeholder="Selecione a origem"
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel>Unidade de medida</FieldLabel>
              <UnitOfMeasureAutocomplete
                value={values.unitOfMeasureId}
                onChange={(value) => setValue("unitOfMeasureId", value ?? "")}
                placeholder="Selecione a unidade"
              />
            </Field>

            <Field>
              <FieldLabel>Unidade comercial</FieldLabel>
              <UnitOfMeasureAutocomplete
                value={values.commercialUnitId}
                onChange={(value) => setValue("commercialUnitId", value ?? "")}
                placeholder="Selecione a unidade comercial"
              />
            </Field>

            <Field>
              <FieldLabel>Unidade tributável</FieldLabel>
              <UnitOfMeasureAutocomplete
                value={values.taxableUnitId}
                onChange={(value) => setValue("taxableUnitId", value ?? "")}
                placeholder="Selecione a unidade tributável"
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Preço de venda</FieldLabel>
              <NumberInput
                value={values.price}
                onChange={(value) => setValue("price", value)}
                placeholder="0,00"
                startAddon="R$"
              />
            </Field>
            <Field>
              <FieldLabel>Preço promocional</FieldLabel>
              <NumberInput
                value={values.promotionalPrice}
                onChange={(value) => setValue("promotionalPrice", value)}
                placeholder="0,00"
                startAddon="R$"
                endAddon={<BadgePercent />}
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Dimensões e peso</FieldLegend>
        <FieldDescription>
          Medidas, peso e embalagem do produto, usados em cálculos de frete e
          logística.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-start">
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field>
                  <FieldLabel>Largura (L)</FieldLabel>
                  <NumberInput
                    value={values.widthCm}
                    onChange={(value) => setValue("widthCm", value)}
                    placeholder="0,00"
                    endAddon="cm"
                  />
                </Field>
                <Field>
                  <FieldLabel>Altura (A)</FieldLabel>
                  <NumberInput
                    value={values.heightCm}
                    onChange={(value) => setValue("heightCm", value)}
                    placeholder="0,00"
                    endAddon="cm"
                  />
                </Field>
                <Field>
                  <FieldLabel>Comprimento (C)</FieldLabel>
                  <NumberInput
                    value={values.lengthCm}
                    onChange={(value) => setValue("lengthCm", value)}
                    placeholder="0,00"
                    endAddon="cm"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Peso líquido</FieldLabel>
                  <NumberInput
                    value={values.netWeightKg}
                    onChange={(value) => setValue("netWeightKg", value)}
                    placeholder="0,00"
                    startAddon={<Weight />}
                    endAddon="kg"
                  />
                </Field>
                <Field>
                  <FieldLabel>Peso bruto</FieldLabel>
                  <NumberInput
                    value={values.grossWeightKg}
                    onChange={(value) => setValue("grossWeightKg", value)}
                    placeholder="0,00"
                    startAddon={<Weight />}
                    endAddon="kg"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel>Tipo de embalagem</FieldLabel>
                <PackageTypeAutocomplete
                  value={values.packageTypeCode}
                  onChange={(value) => setValue("packageTypeCode", value ?? "")}
                  placeholder="Selecione o tipo de embalagem"
                />
              </Field>
            </div>

            <div className="order-first flex justify-center lg:order-none lg:pt-1">
              <BoxDimensionsDiagram className="w-full max-w-44" />
            </div>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Estoque</FieldLegend>
        <FieldDescription>
          Controle de estoque, níveis mínimo e máximo, localização e regras de
          disponibilidade.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel>Estoque inicial</FieldLabel>
              <NumberInput
                value={values.initialStock}
                onChange={(value) => setValue("initialStock", value)}
                placeholder="0"
                step="1"
                startAddon={<Boxes />}
              />
            </Field>
            <Field>
              <FieldLabel>Estoque mínimo</FieldLabel>
              <NumberInput
                value={values.minimumStock}
                onChange={(value) => setValue("minimumStock", value)}
                placeholder="0"
                step="1"
                startAddon={<PackageMinus />}
              />
            </Field>
            <Field>
              <FieldLabel>Estoque máximo</FieldLabel>
              <NumberInput
                value={values.maximumStock}
                onChange={(value) => setValue("maximumStock", value)}
                placeholder="0"
                step="1"
                startAddon={<PackagePlus />}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Dias para preparação</FieldLabel>
              <NumberInput
                value={values.preparationDays}
                onChange={(value) => setValue("preparationDays", value)}
                placeholder="0"
                step="1"
                startAddon={<CalendarClock />}
                endAddon="dias"
              />
            </Field>
            <Field>
              <FieldLabel>Localização</FieldLabel>
              <TextInput
                value={values.storageLocation}
                onChange={(value) => setValue("storageLocation", value)}
                placeholder="Ex.: Corredor A, Prateleira 3"
                startAddon={<MapPin />}
              />
            </Field>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <Field orientation="horizontal" className="w-fit">
              <FieldLabel htmlFor="trackInventory">
                Controlar estoque
              </FieldLabel>
              <Switch
                id="trackInventory"
                checked={values.trackInventory}
                onCheckedChange={(checked) =>
                  setValue("trackInventory", checked)
                }
              />
            </Field>

            <Field orientation="horizontal" className="w-fit">
              <FieldLabel htmlFor="allowBackorder">
                Permitir venda sem estoque
              </FieldLabel>
              <Switch
                id="allowBackorder"
                checked={values.allowBackorder}
                onCheckedChange={(checked) =>
                  setValue("allowBackorder", checked)
                }
              />
            </Field>

            <Field orientation="horizontal" className="w-fit">
              <FieldLabel htmlFor="batchControlEnabled">
                Controlar lotes
              </FieldLabel>
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
      </FieldSet>
    </div>
  )
}
