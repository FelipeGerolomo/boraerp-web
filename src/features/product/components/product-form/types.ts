import type { ProductFormValues } from "@/features/product/components/product-form/mappers"

export type ProductFormTabProps = {
  values: ProductFormValues
  setValue: (key: keyof ProductFormValues, value: unknown) => void
}
