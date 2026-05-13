"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import {
  replaceKitItemsRequest,
  replaceMarketplaceListingsRequest,
  replaceProductAttributesRequest,
  replaceProductPricesRequest,
  updateProductComplementaryRequest,
  updateProductCostsRequest,
  updateProductGeneralRequest,
  updateProductOtherRequest,
} from "@/features/product/api/client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  createEmptyProductFormValues,
  mapProductDetailToFormValues,
  toAttributesPayload,
  toComplementaryPayload,
  toCostsPayload,
  toGeneralPayload,
  toKitPayload,
  toMarketplacePayload,
  toOtherPayload,
  toPricesPayload,
  type ProductFormValues,
} from "@/features/product/components/product-form/mappers"
import { ProductAttributesTab } from "@/features/product/components/product-form/attributes-tab"
import { ProductComplementaryTab } from "@/features/product/components/product-form/complementary-tab"
import { ProductCostsTab } from "@/features/product/components/product-form/costs-tab"
import { ProductGeneralTab } from "@/features/product/components/product-form/general-tab"
import { ProductKitsTab } from "@/features/product/components/product-form/kits-tab"
import { ProductMarketplaceTab } from "@/features/product/components/product-form/marketplace-tab"
import { ProductOtherTab } from "@/features/product/components/product-form/other-tab"
import { ProductPricesTab } from "@/features/product/components/product-form/prices-tab"
import {
  DEFAULT_PRODUCT_TAB,
  parseProductTab,
  type ProductTabId,
} from "@/features/product/components/product-form/tabs"
import { ProductBottomBar } from "@/features/product/components/product-form/product-bottom-bar"
import { ProductFormTabs } from "@/features/product/components/product-form/product-form-tabs"
import {
  useCreateProduct,
  useProduct,
  useReplaceKitItems,
  useReplaceMarketplaceListings,
  useReplaceProductAttributes,
  useReplaceProductPrices,
  useUpdateProductComplementary,
  useUpdateProductCosts,
  useUpdateProductGeneral,
  useUpdateProductOther,
} from "@/features/product/hooks"

type ProductFormMode = "create" | "edit"

function hasFilledComplementary(values: ProductFormValues) {
  return Boolean(
    values.brandName.trim() ||
      values.categoryId.trim() ||
      values.description.trim() ||
      values.shortDescription.trim() ||
      values.slug.trim() ||
      values.keywords.trim() ||
      values.seoTitle.trim() ||
      values.seoDescription.trim() ||
      values.videoUrl.trim(),
  )
}

function hasFilledOther(values: ProductFormValues) {
  return Boolean(
    values.gtinTaxable.trim() ||
      values.conversionFactor != null ||
      values.ipiFrameCode.trim() ||
      values.ipiLegalFrameCode.trim() ||
      values.extipi.trim() ||
      values.fixedIpiAmount != null,
  )
}

export function ProductForm({
  mode,
  productId,
}: {
  mode: ProductFormMode
  productId?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [createdProductId, setCreatedProductId] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const activeTab = parseProductTab(searchParams.get("tab"))
  const editableProductId = createdProductId ?? productId ?? ""

  const productQuery = useProduct(mode === "edit" ? editableProductId : "")
  const createMutation = useCreateProduct()
  const generalMutation = useUpdateProductGeneral(editableProductId)
  const complementaryMutation = useUpdateProductComplementary(editableProductId)
  const attributesMutation = useReplaceProductAttributes(editableProductId)
  const marketplaceMutation = useReplaceMarketplaceListings(editableProductId)
  const kitsMutation = useReplaceKitItems(editableProductId)
  const pricesMutation = useReplaceProductPrices(editableProductId)
  const costsMutation = useUpdateProductCosts(editableProductId)
  const otherMutation = useUpdateProductOther(editableProductId)

  const form = useForm({
    defaultValues: createEmptyProductFormValues(),
    onSubmit: async () => {},
  })
  const [values, setValues] = useState<ProductFormValues>(
    createEmptyProductFormValues(),
  )

  useEffect(() => {
    if (productQuery.data) {
      const nextValues = mapProductDetailToFormValues(productQuery.data)
      setValues(nextValues)
      form.reset(nextValues)
    }
  }, [form, productQuery.data])

  function setTab(nextTab: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", nextTab)
    router.replace(`?${params.toString()}`)
  }

  const isSaving =
    createMutation.isPending ||
    generalMutation.isPending ||
    complementaryMutation.isPending ||
    attributesMutation.isPending ||
    marketplaceMutation.isPending ||
    kitsMutation.isPending ||
    pricesMutation.isPending ||
    costsMutation.isPending ||
    otherMutation.isPending

  const setValue = (key: keyof ProductFormValues, value: unknown) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }))
    form.setFieldValue(key, value as never)
  }

  const goToDetail = (id: string, tab: ProductTabId = DEFAULT_PRODUCT_TAB) => {
    router.replace(`/dashboard/cadastros/produtos/${id}?tab=${tab}`)
    router.refresh()
  }

  async function saveTab(tab: ProductTabId, targetProductId: string) {
    if (!targetProductId) return

    switch (tab) {
      case "dados-gerais":
        await generalMutation.mutateAsync(toGeneralPayload(values))
        break
      case "dados-complementares":
        await complementaryMutation.mutateAsync(toComplementaryPayload(values))
        break
      case "ficha-tecnica":
        await attributesMutation.mutateAsync(toAttributesPayload(values))
        break
      case "anuncios":
        await marketplaceMutation.mutateAsync(toMarketplacePayload(values))
        break
      case "kits":
        await kitsMutation.mutateAsync(toKitPayload(values))
        break
      case "precos":
        await pricesMutation.mutateAsync(toPricesPayload(values))
        break
      case "custos":
        await costsMutation.mutateAsync(toCostsPayload(values))
        break
      case "outros":
        await otherMutation.mutateAsync(toOtherPayload(values))
        break
    }
  }

  async function saveFilledTabsAfterCreate(targetProductId: string) {
    await updateProductGeneralRequest(targetProductId, toGeneralPayload(values))

    if (hasFilledComplementary(values)) {
      await updateProductComplementaryRequest(
        targetProductId,
        toComplementaryPayload(values),
      )
    }

    if (values.attributes.length) {
      await replaceProductAttributesRequest(
        targetProductId,
        toAttributesPayload(values),
      )
    }

    if (values.marketplaceListings.length) {
      await replaceMarketplaceListingsRequest(
        targetProductId,
        toMarketplacePayload(values),
      )
    }

    if (values.kitItems.length) {
      await replaceKitItemsRequest(targetProductId, toKitPayload(values))
    }

    if (values.prices.length) {
      await replaceProductPricesRequest(targetProductId, toPricesPayload(values))
    }

    if (values.costPrice != null) {
      await updateProductCostsRequest(targetProductId, toCostsPayload(values))
    }

    if (hasFilledOther(values)) {
      await updateProductOtherRequest(targetProductId, toOtherPayload(values))
    }
  }

  async function onSave() {
    setFormError(null)

    if (!values.name.trim()) {
      setFormError("Nome do produto é obrigatório.")
      return
    }

    try {
      if (mode === "create" && !createdProductId) {
        const created = await createMutation.mutateAsync({
          name: values.name,
        })

        setCreatedProductId(created.id)

        await saveFilledTabsAfterCreate(created.id)

        toast.success("Produto criado com sucesso")
        goToDetail(created.id, activeTab)
        return
      }

      await saveTab(activeTab, editableProductId)
      toast.success("Dados salvos com sucesso")
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o produto."
      setFormError(message)
      toast.error(message)
    }
  }

  const cancelHref = useMemo(() => {
    if (mode === "create") {
      return "/dashboard/cadastros/produtos"
    }

    return `/dashboard/cadastros/produtos/${editableProductId}?tab=${activeTab}`
  }, [activeTab, editableProductId, mode])

  if (mode === "edit" && productQuery.isLoading) {
    return <div className="h-56 animate-pulse rounded-xl bg-muted/40" />
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        void onSave()
      }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle>
            {mode === "create" ? "Novo produto" : "Editar produto"}
          </CardTitle>
          {mode === "edit" && (
            <Button
              variant="outline"
              type="button"
              nativeButton={false}
              render={
                <Link
                  href={`/dashboard/cadastros/produtos/${editableProductId}?tab=${activeTab}`}
                />
              }
            >
              Ver detalhes
            </Button>
          )}
        </CardHeader>
      </Card>

      {formError && (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível salvar</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setTab}>
        <ProductFormTabs value={activeTab} />

        <Card>
          <CardContent className="p-4">
            <TabsContent value="dados-gerais">
              <ProductGeneralTab values={values} setValue={setValue} />
            </TabsContent>

            <TabsContent value="dados-complementares">
              <ProductComplementaryTab values={values} setValue={setValue} />
            </TabsContent>

            <TabsContent value="ficha-tecnica">
              <ProductAttributesTab values={values} setValue={setValue} />
            </TabsContent>

            <TabsContent value="anuncios">
              <ProductMarketplaceTab values={values} setValue={setValue} />
            </TabsContent>

            <TabsContent value="kits">
              <ProductKitsTab values={values} setValue={setValue} />
            </TabsContent>

            <TabsContent value="precos">
              <ProductPricesTab values={values} setValue={setValue} />
            </TabsContent>

            <TabsContent value="custos">
              <ProductCostsTab values={values} setValue={setValue} />
            </TabsContent>

            <TabsContent value="outros">
              <ProductOtherTab values={values} setValue={setValue} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      <ProductBottomBar
        isSaving={isSaving}
        cancelHref={cancelHref}
        saveLabel={mode === "create" ? "Criar produto" : "Salvar aba"}
      />
    </form>
  )
}
