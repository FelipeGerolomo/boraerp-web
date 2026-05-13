import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PRODUCT_TABS, type ProductTabId } from "./tabs"

export function ProductFormTabs({
  value,
}: {
  value: ProductTabId
}) {
  return (
    <TabsList variant="line" className="w-full justify-start overflow-x-auto">
      {PRODUCT_TABS.map((tab) => (
        <TabsTrigger key={tab.id} value={tab.id}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
