import { ProductDetailTabs } from "@/features/product/components/product-detail/product-detail-tabs"

export default async function ProdutoDetalhePage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params

  return <ProductDetailTabs productId={productId} />
}
