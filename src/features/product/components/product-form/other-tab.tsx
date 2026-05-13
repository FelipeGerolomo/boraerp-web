import { Barcode, Calculator, Hash, Landmark } from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { NumberInput, TextInput } from "./form-fields"
import type { ProductFormTabProps } from "./types"

export function ProductOtherTab({ values, setValue }: ProductFormTabProps) {
  return (
    <div className="flex flex-col gap-8">
      <FieldSet>
        <FieldLegend>Tributação complementar</FieldLegend>
        <FieldDescription>
          Informações fiscais adicionais usadas na emissão de notas.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>GTIN/EAN tributável</FieldLabel>
              <TextInput
                value={values.gtinTaxable}
                onChange={(value) => setValue("gtinTaxable", value)}
                placeholder="Ex.: 7891234567890"
                startAddon={<Barcode />}
                inputMode="numeric"
              />
            </Field>

            <Field>
              <FieldLabel>Fator de conversão</FieldLabel>
              <NumberInput
                value={values.conversionFactor}
                onChange={(value) => setValue("conversionFactor", value)}
                placeholder="1,0000"
                step="0.0001"
                startAddon={<Calculator />}
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>IPI</FieldLegend>
        <FieldDescription>
          Enquadramento e valores do Imposto sobre Produtos Industrializados.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <Field className="md:max-w-sm">
            <FieldLabel>Valor do IPI fixo</FieldLabel>
            <NumberInput
              value={values.fixedIpiAmount}
              onChange={(value) => setValue("fixedIpiAmount", value)}
              placeholder="0,00"
              startAddon="R$"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel>Código enquadramento IPI</FieldLabel>
              <TextInput
                value={values.ipiFrameCode}
                onChange={(value) => setValue("ipiFrameCode", value)}
                placeholder="Ex.: 999"
                startAddon={<Landmark />}
              />
            </Field>

            <Field>
              <FieldLabel>Código legal IPI</FieldLabel>
              <TextInput
                value={values.ipiLegalFrameCode}
                onChange={(value) => setValue("ipiLegalFrameCode", value)}
                placeholder="Ex.: 001"
                startAddon={<Landmark />}
              />
            </Field>

            <Field>
              <FieldLabel>EX TIPI</FieldLabel>
              <TextInput
                value={values.extipi}
                onChange={(value) => setValue("extipi", value)}
                placeholder="Ex.: 01"
                startAddon={<Hash />}
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
