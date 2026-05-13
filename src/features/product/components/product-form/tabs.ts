export type ProductTabId =
  | "dados-gerais"
  | "dados-complementares"
  | "ficha-tecnica"
  | "anuncios"
  | "kits"
  | "precos"
  | "custos"
  | "outros"

export const PRODUCT_TABS: Array<{ id: ProductTabId; label: string }> = [
  { id: "dados-gerais", label: "Dados gerais" },
  { id: "dados-complementares", label: "Dados complementares" },
  { id: "ficha-tecnica", label: "Ficha técnica" },
  { id: "anuncios", label: "Anúncios" },
  { id: "kits", label: "Kits" },
  { id: "precos", label: "Preços" },
  { id: "custos", label: "Custos" },
  { id: "outros", label: "Outros" },
]

export const DEFAULT_PRODUCT_TAB: ProductTabId = "dados-gerais"

export function parseProductTab(value: string | null | undefined): ProductTabId {
  if (!value) return DEFAULT_PRODUCT_TAB

  return (
    PRODUCT_TABS.find((tab) => tab.id === value)?.id ?? DEFAULT_PRODUCT_TAB
  )
}
