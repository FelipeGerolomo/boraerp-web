import { ProductForm } from "@/features/product/components/product-form/product-form"

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params

  return <ProductForm mode="edit" productId={productId} />
}
