import { Hash, Link2, Plus, Tag, Trash2, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { MarketplaceChannelAutocomplete } from "@/features/lookup/components"
import type { ProductMarketplaceListing } from "@/features/product/types"
import { TextInput } from "./form-fields"
import type { ProductFormTabProps } from "./types"

export function ProductMarketplaceTab({
  values,
  setValue,
}: ProductFormTabProps) {
  const listings = values.marketplaceListings

  function updateItem(index: number, next: ProductMarketplaceListing) {
    setValue(
      "marketplaceListings",
      listings.map((item, currentIndex) =>
        currentIndex === index ? next : item,
      ),
    )
  }

  function addListing() {
    setValue("marketplaceListings", [...listings, { active: true }])
  }

  function removeListing(index: number) {
    setValue(
      "marketplaceListings",
      listings.filter((_, currentIndex) => currentIndex !== index),
    )
  }

  return (
    <FieldSet>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <FieldLegend className="mb-0">Anúncios em marketplaces</FieldLegend>
          <FieldDescription>
            Vínculos do produto com anúncios em canais externos (Mercado Livre,
            Shopee, etc.).
          </FieldDescription>
        </div>
        <Button type="button" size="sm" variant="outline" onClick={addListing}>
          <Plus data-icon="inline-start" />
          Adicionar anúncio
        </Button>
      </div>

      <FieldGroup className="gap-4">
        {listings.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyTitle>Nenhum anúncio cadastrado</EmptyTitle>
              <EmptyDescription>
                Vincule este produto a um canal de venda usando “Adicionar
                anúncio”.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {listings.map((listing, index) => (
          <div
            key={`${index}-${listing.id ?? listing.marketplaceChannelId ?? "novo"}`}
            className="rounded-2xl border p-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Canal</FieldLabel>
                <MarketplaceChannelAutocomplete
                  value={listing.marketplaceChannelId}
                  onChange={(value) =>
                    updateItem(index, {
                      ...listing,
                      marketplaceChannelId: value,
                    })
                  }
                  placeholder="Selecione o canal"
                />
              </Field>

              <Field orientation="horizontal">
                <FieldLabel>Ativo</FieldLabel>
                <Switch
                  checked={listing.active ?? false}
                  onCheckedChange={(checked) =>
                    updateItem(index, { ...listing, active: checked })
                  }
                />
              </Field>

              <Field>
                <FieldLabel>ID anúncio externo</FieldLabel>
                <TextInput
                  value={listing.externalListingId ?? ""}
                  onChange={(value) =>
                    updateItem(index, {
                      ...listing,
                      externalListingId: value,
                    })
                  }
                  placeholder="Ex.: MLB1234567890"
                  startAddon={<Hash />}
                />
              </Field>

              <Field>
                <FieldLabel>SKU externo</FieldLabel>
                <TextInput
                  value={listing.externalSku ?? ""}
                  onChange={(value) =>
                    updateItem(index, { ...listing, externalSku: value })
                  }
                  placeholder="SKU usado no canal"
                  startAddon={<Tag />}
                />
              </Field>

              <Field>
                <FieldLabel>Título</FieldLabel>
                <TextInput
                  value={listing.title ?? ""}
                  onChange={(value) =>
                    updateItem(index, { ...listing, title: value })
                  }
                  placeholder="Título do anúncio"
                  startAddon={<Type />}
                />
              </Field>

              <Field>
                <FieldLabel>URL do anúncio</FieldLabel>
                <TextInput
                  type="url"
                  value={listing.listingUrl ?? ""}
                  onChange={(value) =>
                    updateItem(index, { ...listing, listingUrl: value })
                  }
                  placeholder="https://"
                  startAddon={<Link2 />}
                />
              </Field>
            </div>

            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => removeListing(index)}
              >
                <Trash2 data-icon="inline-start" />
                Remover
              </Button>
            </div>
          </div>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}
