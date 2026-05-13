import { z } from "zod"

const nonNegativeNumber = z.number().min(0)

export const listProductsQuerySchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  page: z.coerce.number().int().min(0).optional(),
  size: z.coerce.number().int().min(1).max(200).optional(),
})

export const createProductSchema = z.object({
  name: z.string().trim().min(1).max(180),
})

export const updateProductGeneralSchema = z.object({
  name: z.string().trim().max(180).optional(),
  productTypeId: z.number().int().optional(),
  productTypeCode: z.string().trim().max(50).optional(),
  statusId: z.number().int().optional(),
  statusCode: z.string().trim().max(50).optional(),
  sku: z.string().trim().max(80).optional(),
  barcode: z.string().trim().max(80).optional(),
  shortDescription: z.string().trim().max(500).optional(),
  description: z.string().optional(),
  unitOfMeasureId: z.uuid().optional(),
  isSellable: z.boolean().optional(),
  isPurchasable: z.boolean().optional(),
  spedItemTypeId: z.number().int().optional(),
  spedItemTypeCode: z.string().trim().max(80).optional(),
  originCodeId: z.number().int().optional(),
  originCode: z.string().trim().max(10).optional(),
  ncm: z.string().trim().max(10).optional(),
  cest: z.string().trim().max(10).optional(),
  gtinEan: z.string().trim().max(30).optional(),
  commercialUnitId: z.uuid().optional(),
  taxableUnitId: z.uuid().optional(),
  trackInventory: z.boolean().optional(),
  initialStock: nonNegativeNumber.optional(),
  minimumStock: nonNegativeNumber.optional(),
  maximumStock: nonNegativeNumber.optional(),
  storageLocation: z.string().trim().max(120).optional(),
  preparationDays: z.number().int().min(0).optional(),
  batchControlEnabled: z.boolean().optional(),
  packageTypeId: z.number().int().optional(),
  packageTypeCode: z.string().trim().max(50).optional(),
  netWeightKg: nonNegativeNumber.optional(),
  grossWeightKg: nonNegativeNumber.optional(),
  widthCm: nonNegativeNumber.optional(),
  heightCm: nonNegativeNumber.optional(),
  lengthCm: nonNegativeNumber.optional(),
  price: nonNegativeNumber.optional(),
  promotionalPrice: nonNegativeNumber.optional(),
  costPrice: nonNegativeNumber.optional(),
  priceListId: z.uuid().optional(),
})

export const updateProductComplementarySchema = z.object({
  brandId: z.uuid().optional(),
  brandName: z.string().trim().max(120).optional(),
  categoryId: z.uuid().optional(),
  shortDescription: z.string().trim().max(500).optional(),
  description: z.string().optional(),
  slug: z.string().trim().max(180).optional(),
  seoTitle: z.string().trim().max(180).optional(),
  seoDescription: z.string().trim().max(500).optional(),
  keywords: z.string().optional(),
  videoUrl: z.string().trim().max(1000).optional(),
})

export const replaceAttributesSchema = z.object({
  attributes: z.array(
    z.object({
      name: z.string().trim().min(1).max(120),
      value: z.string().trim().min(1).max(500),
      sortOrder: z.number().int().optional(),
    }),
  ),
})

export const replaceMarketplaceListingsSchema = z.object({
  listings: z.array(
    z.object({
      marketplaceChannelId: z.number().int(),
      externalListingId: z.string().trim().max(180).optional(),
      externalSku: z.string().trim().max(120).optional(),
      title: z.string().trim().max(180).optional(),
      description: z.string().optional(),
      listingUrl: z.string().trim().max(1000).optional(),
      active: z.boolean().optional(),
    }),
  ),
})

export const replaceKitItemsSchema = z.object({
  items: z.array(
    z.object({
      childProductId: z.uuid(),
      quantity: z.number().min(0.0001),
    }),
  ),
})

export const replaceProductPricesSchema = z.object({
  prices: z.array(
    z.object({
      priceListId: z.uuid(),
      price: nonNegativeNumber,
      promotionalPrice: nonNegativeNumber.optional(),
      costPrice: nonNegativeNumber.optional(),
      startsAt: z.iso.datetime().optional(),
      endsAt: z.iso.datetime().optional(),
    }),
  ),
})

export const updateProductCostsSchema = z.object({
  priceListId: z.uuid().optional(),
  costPrice: nonNegativeNumber,
})

export const updateProductOtherSchema = z.object({
  gtinTaxable: z.string().trim().max(30).optional(),
  taxableUnitId: z.uuid().optional(),
  conversionFactor: nonNegativeNumber.optional(),
  ipiFrameCode: z.string().trim().max(30).optional(),
  ipiLegalFrameCode: z.string().trim().max(30).optional(),
  extipi: z.string().trim().max(10).optional(),
  fixedIpiAmount: nonNegativeNumber.optional(),
})
