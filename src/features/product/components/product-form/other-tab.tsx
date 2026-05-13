import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { ProductFormTabProps } from "./types"

export function ProductOtherTab({ values, setValue }: ProductFormTabProps) {
  return (
    <FieldGroup className="gap-4">
      <Field>
        <FieldLabel>GTIN/EAN tributável</FieldLabel>
        <Input
          value={values.gtinTaxable}
          onChange={(event) => setValue("gtinTaxable", event.target.value)}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Fator de conversão</FieldLabel>
          <Input
            type="number"
            min="0"
            step="0.0001"
            value={values.conversionFactor ?? ""}
            onChange={(event) =>
              setValue(
                "conversionFactor",
                event.target.value === "" ? undefined : Number(event.target.value),
              )
            }
          />
        </Field>

        <Field>
          <FieldLabel>Valor do IPI fixo</FieldLabel>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={values.fixedIpiAmount ?? ""}
            onChange={(event) =>
              setValue(
                "fixedIpiAmount",
                event.target.value === "" ? undefined : Number(event.target.value),
              )
            }
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel>Código enquadramento IPI</FieldLabel>
          <Input
            value={values.ipiFrameCode}
            onChange={(event) => setValue("ipiFrameCode", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Código legal IPI</FieldLabel>
          <Input
            value={values.ipiLegalFrameCode}
            onChange={(event) => setValue("ipiLegalFrameCode", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>EX TIPI</FieldLabel>
          <Input
            value={values.extipi}
            onChange={(event) => setValue("extipi", event.target.value)}
          />
        </Field>
      </div>
    </FieldGroup>
  )
}
