"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  useActivateProduct,
  useArchiveProduct,
  useProduct,
} from "@/features/product/hooks"
import { parseProductTab, PRODUCT_TABS } from "@/features/product/components/product-form/tabs"

function asCurrency(value?: number) {
  if (value == null) return "-"

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function asDate(value?: string) {
  if (!value) return "-"

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value))
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 rounded-lg border p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value || "-"}</span>
    </div>
  )
}

export function ProductDetailTabs({ productId }: { productId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = parseProductTab(searchParams.get("tab"))
  const { data: product, isLoading, isError, error } = useProduct(productId)
  const activateMutation = useActivateProduct(productId)
  const archiveMutation = useArchiveProduct(productId)

  function changeTab(nextTab: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", nextTab)
    router.replace(`?${params.toString()}`)
  }

  if (isLoading) {
    return <div className="h-56 animate-pulse rounded-xl bg-muted/40" />
  }

  if (isError || !product) {
    return (
      <Card>
        <CardContent className="py-6 text-sm text-destructive">
          {(error as Error)?.message ?? "Não foi possível carregar o produto."}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle>{product.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.status ?? "Sem status"}</Badge>
              <Badge variant="secondary">{product.type ?? "Sem tipo"}</Badge>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/dashboard/cadastros/produtos" />}
            >
              Voltar
            </Button>
            <Button
              nativeButton={false}
              render={
                <Link
                  href={`/dashboard/cadastros/produtos/${productId}/editar?tab=${tab}`}
                />
              }
            >
              Editar
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={activateMutation.isPending}
              onClick={() => activateMutation.mutate()}
            >
              Ativar
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={archiveMutation.isPending}
              onClick={() => archiveMutation.mutate()}
            >
              Arquivar
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={tab} onValueChange={changeTab}>
        <div className="rounded-xl border bg-card p-3">
          <div className="flex flex-wrap gap-2">
            {PRODUCT_TABS.map((item) => (
              <Button
                key={item.id}
                variant={item.id === tab ? "default" : "outline"}
                size="sm"
                type="button"
                onClick={() => changeTab(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <TabsContent value="dados-gerais">
          <Card>
            <CardContent className="grid gap-3 p-4 md:grid-cols-3">
              <Row label="Nome" value={product.name} />
              <Row label="SKU" value={product.sku ?? ""} />
              <Row label="Código de barras" value={product.barcode ?? ""} />
              <Row label="NCM" value={product.general?.fiscal?.ncm ?? ""} />
              <Row label="CEST" value={product.general?.fiscal?.cest ?? ""} />
              <Row label="Preço" value={asCurrency(product.general?.price?.price)} />
              <Row
                label="Preço promocional"
                value={asCurrency(product.general?.price?.promotionalPrice)}
              />
              <Row
                label="Estoque inicial"
                value={String(product.general?.inventory?.initialStock ?? "-")}
              />
              <Row
                label="Estoque mínimo"
                value={String(product.general?.inventory?.minimumStock ?? "-")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dados-complementares">
          <Card>
            <CardContent className="grid gap-3 p-4 md:grid-cols-2">
              <Row label="Marca" value={product.brand?.name ?? ""} />
              <Row label="Categoria" value={product.category?.name ?? ""} />
              <Row label="Slug" value={product.complementary?.seo?.slug ?? ""} />
              <Row label="Keywords" value={product.complementary?.seo?.keywords ?? ""} />
              <Row label="Título SEO" value={product.complementary?.seo?.title ?? ""} />
              <Row
                label="Descrição SEO"
                value={product.complementary?.seo?.description ?? ""}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ficha-tecnica">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                {product.attributes?.length ? (
                  product.attributes.map((attribute) => (
                    <Row
                      key={`${attribute.id ?? attribute.name}-${attribute.value}`}
                      label={attribute.name}
                      value={attribute.value}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Sem atributos.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anuncios">
          <Card>
            <CardContent className="space-y-2 p-4">
              {product.marketplaceListings?.length ? (
                product.marketplaceListings.map((listing, index) => (
                  <div key={`${listing.id ?? index}-${listing.marketplaceChannelId}`} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">
                      Canal {listing.marketplaceChannelCode ?? listing.marketplaceChannelId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {listing.title ?? "Sem título"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sem anúncios.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kits">
          <Card>
            <CardContent className="space-y-2 p-4">
              {product.kitItems?.length ? (
                product.kitItems.map((item, index) => (
                  <Row
                    key={`${item.id ?? index}-${item.childProductId}`}
                    label={item.childProductName ?? item.childProductId}
                    value={`Quantidade: ${item.quantity}`}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sem itens de kit.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="precos">
          <Card>
            <CardContent className="space-y-2 p-4">
              {product.prices?.length ? (
                product.prices.map((price, index) => (
                  <div key={`${price.id ?? index}-${price.priceListId}`} className="grid gap-1 rounded-lg border p-3">
                    <span className="text-sm font-medium">{price.priceListName ?? price.priceListId}</span>
                    <span className="text-xs text-muted-foreground">Preço: {asCurrency(price.price)}</span>
                    <span className="text-xs text-muted-foreground">
                      Promoção: {asCurrency(price.promotionalPrice)}
                    </span>
                    <span className="text-xs text-muted-foreground">Início: {asDate(price.startsAt)}</span>
                    <span className="text-xs text-muted-foreground">Fim: {asDate(price.endsAt)}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sem preços.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custos">
          <Card>
            <CardContent className="grid gap-3 p-4 md:grid-cols-2">
              <Row label="Custo" value={asCurrency(product.general?.price?.costPrice)} />
              <Row label="Atualizado em" value={asDate(product.updatedAt)} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outros">
          <Card>
            <CardContent className="grid gap-3 p-4 md:grid-cols-2">
              <Row label="GTIN tributável" value={product.general?.fiscal?.gtinTaxable ?? ""} />
              <Row label="Unidade tributável" value={product.general?.fiscal?.taxableUnitId ?? ""} />
              <Row
                label="Fator de conversão"
                value={String(product.general?.fiscal?.conversionFactor ?? "-")}
              />
              <Row label="IPI enquadramento" value={product.general?.fiscal?.ipiFrameCode ?? ""} />
              <Row label="IPI legal" value={product.general?.fiscal?.ipiLegalFrameCode ?? ""} />
              <Row label="EX TIPI" value={product.general?.fiscal?.extipi ?? ""} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
