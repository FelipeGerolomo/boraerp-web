import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Switch } from "@/components/ui/switch"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { MARKETPLACE_CHANNEL_OPTIONS, type ProductMarketplaceListing } from "@/features/product/types"
import type { ProductFormTabProps } from "./types"

export function ProductMarketplaceTab({ values, setValue }: ProductFormTabProps) {
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
    setValue("marketplaceListings", [
      ...listings,
      {
        marketplaceChannelId: Number(MARKETPLACE_CHANNEL_OPTIONS[0]?.value ?? 1),
        active: true,
      },
    ])
  }

  function removeListing(index: number) {
    setValue(
      "marketplaceListings",
      listings.filter((_, currentIndex) => currentIndex !== index),
    )
  }

  return (
    <FieldGroup className="gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Anúncios em marketplaces</h3>
        <Button type="button" size="sm" variant="outline" onClick={addListing}>
          <Plus data-icon="inline-start" />
          Adicionar anúncio
        </Button>
      </div>

      {listings.length === 0 && (
        <p className="rounded-xl border border-dashed px-4 py-6 text-sm text-muted-foreground">
          Nenhum anúncio cadastrado.
        </p>
      )}

      {listings.map((listing, index) => (
        <div key={`${index}-${listing.marketplaceChannelId}`} className="rounded-xl border p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Canal</FieldLabel>
              <NativeSelect
                value={String(listing.marketplaceChannelId)}
                onChange={(event) =>
                  updateItem(index, {
                    ...listing,
                    marketplaceChannelId: Number(event.target.value),
                  })
                }
              >
                {MARKETPLACE_CHANNEL_OPTIONS.map((option) => (
                  <NativeSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>

            <Field orientation="horizontal">
              <FieldLabel>Ativo</FieldLabel>
              <Switch
                checked={listing.active ?? false}
                onCheckedChange={(checked) =>
                  updateItem(index, {
                    ...listing,
                    active: checked,
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>ID anúncio externo</FieldLabel>
              <Input
                value={listing.externalListingId ?? ""}
                onChange={(event) =>
                  updateItem(index, {
                    ...listing,
                    externalListingId: event.target.value,
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>SKU externo</FieldLabel>
              <Input
                value={listing.externalSku ?? ""}
                onChange={(event) =>
                  updateItem(index, {
                    ...listing,
                    externalSku: event.target.value,
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>Título</FieldLabel>
              <Input
                value={listing.title ?? ""}
                onChange={(event) =>
                  updateItem(index, {
                    ...listing,
                    title: event.target.value,
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>URL do anúncio</FieldLabel>
              <Input
                value={listing.listingUrl ?? ""}
                onChange={(event) =>
                  updateItem(index, {
                    ...listing,
                    listingUrl: event.target.value,
                  })
                }
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
  )
}
