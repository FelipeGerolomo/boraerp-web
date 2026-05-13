import type { SelectOption } from "@/features/product/types/product"

export const PRODUCT_TYPE_OPTIONS: SelectOption[] = [
  { value: "SIMPLE", label: "Simples" },
  { value: "SERVICE", label: "Serviço" },
  { value: "KIT", label: "Kit" },
]

export const PRODUCT_STATUS_OPTIONS: SelectOption[] = [
  { value: "ACTIVE", label: "Ativo" },
  { value: "DRAFT", label: "Rascunho" },
  { value: "ARCHIVED", label: "Arquivado" },
]

export const SPED_ITEM_TYPE_OPTIONS: SelectOption[] = [
  { value: "00", label: "00 - Mercadoria para revenda" },
  { value: "01", label: "01 - Matéria-prima" },
  { value: "99", label: "99 - Outros" },
]

export const ORIGIN_CODE_OPTIONS: SelectOption[] = [
  { value: "0", label: "0 - Nacional" },
  { value: "1", label: "1 - Estrangeira importação direta" },
  { value: "2", label: "2 - Estrangeira adquirida no mercado interno" },
]

export const UNIT_OPTIONS: SelectOption[] = [
  { value: "UN", label: "Unidade" },
  { value: "KG", label: "Quilograma" },
  { value: "CX", label: "Caixa" },
]

export const PACKAGE_TYPE_OPTIONS: SelectOption[] = [
  { value: "BOX", label: "Caixa" },
  { value: "BAG", label: "Saco" },
  { value: "PALLET", label: "Pallet" },
]

export const MARKETPLACE_CHANNEL_OPTIONS: SelectOption[] = [
  { value: "1", label: "Mercado Livre" },
  { value: "2", label: "Shopee" },
  { value: "3", label: "Magalu" },
]

export const PRICE_LIST_OPTIONS: SelectOption[] = [
  { value: "default", label: "Tabela padrão" },
  { value: "wholesale", label: "Atacado" },
]
