import type {
  ProductAttribute,
  ProductDetail,
  ProductKitItem,
  ProductMarketplaceListing,
  ProductPrice,
  ReplaceKitItemsRequest,
  ReplaceMarketplaceListingsRequest,
  ReplaceProductAttributesRequest,
  ReplaceProductPricesRequest,
  UpdateProductComplementaryRequest,
  UpdateProductCostsRequest,
  UpdateProductGeneralRequest,
  UpdateProductOtherRequest,
} from "@/features/product/types/product"

export type ProductFormValues = {
  name: string
  productTypeCode: string
  spedItemTypeCode: string
  originCode: string
  barcode: string
  unitOfMeasureId: string
  commercialUnitId: string
  taxableUnitId: string
  ncm: string
  sku: string
  cest: string
  price?: number
  promotionalPrice?: number
  netWeightKg?: number
  grossWeightKg?: number
  packageTypeCode: string
  widthCm?: number
  heightCm?: number
  lengthCm?: number
  trackInventory: boolean
  allowBackorder: boolean
  initialStock?: number
  minimumStock?: number
  maximumStock?: number
  batchControlEnabled: boolean
  storageLocation: string
  preparationDays?: number
  statusCode: string
  categoryId: string
  brandName: string
  shortDescription: string
  description: string
  videoUrl: string
  slug: string
  keywords: string
  seoTitle: string
  seoDescription: string
  attributes: ProductAttribute[]
  marketplaceListings: ProductMarketplaceListing[]
  kitItems: ProductKitItem[]
  prices: ProductPrice[]
  costPrice?: number
  gtinTaxable: string
  conversionFactor?: number
  ipiFrameCode: string
  ipiLegalFrameCode: string
  extipi: string
  fixedIpiAmount?: number
}

export function createEmptyProductFormValues(): ProductFormValues {
  return {
    name: "",
    productTypeCode: "",
    spedItemTypeCode: "",
    originCode: "",
    barcode: "",
    unitOfMeasureId: "",
    commercialUnitId: "",
    taxableUnitId: "",
    ncm: "",
    sku: "",
    cest: "",
    packageTypeCode: "",
    trackInventory: false,
    allowBackorder: false,
    batchControlEnabled: false,
    storageLocation: "",
    statusCode: "",
    categoryId: "",
    brandName: "",
    shortDescription: "",
    description: "",
    videoUrl: "",
    slug: "",
    keywords: "",
    seoTitle: "",
    seoDescription: "",
    attributes: [],
    marketplaceListings: [],
    kitItems: [],
    prices: [],
    gtinTaxable: "",
    ipiFrameCode: "",
    ipiLegalFrameCode: "",
    extipi: "",
  }
}

export function mapProductDetailToFormValues(
  detail: ProductDetail,
): ProductFormValues {
  return {
    name: detail.name ?? "",
    productTypeCode: detail.type ?? "",
    spedItemTypeCode: detail.general?.fiscal?.spedItemTypeCode ?? "",
    originCode: detail.general?.fiscal?.originCode ?? "",
    barcode: detail.barcode ?? "",
    unitOfMeasureId: detail.unitOfMeasure?.id ?? "",
    commercialUnitId: detail.general?.fiscal?.commercialUnitId ?? "",
    taxableUnitId: detail.general?.fiscal?.taxableUnitId ?? "",
    ncm: detail.general?.fiscal?.ncm ?? "",
    sku: detail.sku ?? "",
    cest: detail.general?.fiscal?.cest ?? "",
    price: detail.general?.price?.price,
    promotionalPrice: detail.general?.price?.promotionalPrice,
    netWeightKg: detail.general?.dimensions?.netWeightKg,
    grossWeightKg: detail.general?.dimensions?.grossWeightKg,
    packageTypeCode: detail.general?.dimensions?.packageTypeCode ?? "",
    widthCm: detail.general?.dimensions?.widthCm,
    heightCm: detail.general?.dimensions?.heightCm,
    lengthCm: detail.general?.dimensions?.lengthCm,
    trackInventory: detail.general?.inventory?.trackInventory ?? false,
    allowBackorder: detail.general?.inventory?.allowBackorder ?? false,
    initialStock: detail.general?.inventory?.initialStock,
    minimumStock: detail.general?.inventory?.minimumStock,
    maximumStock: detail.general?.inventory?.maximumStock,
    batchControlEnabled: detail.general?.inventory?.batchControlEnabled ?? false,
    storageLocation: detail.general?.inventory?.storageLocation ?? "",
    preparationDays: detail.general?.inventory?.preparationDays,
    statusCode: detail.status ?? "",
    categoryId: detail.category?.id ?? "",
    brandName: detail.brand?.name ?? "",
    shortDescription: detail.shortDescription ?? "",
    description: detail.description ?? "",
    videoUrl: detail.complementary?.seo?.videoUrl ?? "",
    slug: detail.complementary?.seo?.slug ?? "",
    keywords: detail.complementary?.seo?.keywords ?? "",
    seoTitle: detail.complementary?.seo?.title ?? "",
    seoDescription: detail.complementary?.seo?.description ?? "",
    attributes: detail.attributes ?? [],
    marketplaceListings: detail.marketplaceListings ?? [],
    kitItems: detail.kitItems ?? [],
    prices: detail.prices ?? [],
    costPrice: detail.general?.price?.costPrice,
    gtinTaxable: detail.general?.fiscal?.gtinTaxable ?? "",
    conversionFactor: detail.general?.fiscal?.conversionFactor,
    ipiFrameCode: detail.general?.fiscal?.ipiFrameCode ?? "",
    ipiLegalFrameCode: detail.general?.fiscal?.ipiLegalFrameCode ?? "",
    extipi: detail.general?.fiscal?.extipi ?? "",
    fixedIpiAmount: detail.general?.fiscal?.fixedIpiAmount,
  }
}

function textOrUndefined(value: string) {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function hasMarketplaceChannelId(
  item: ProductMarketplaceListing,
): item is ProductMarketplaceListing & { marketplaceChannelId: number } {
  return typeof item.marketplaceChannelId === "number"
}

export function toGeneralPayload(values: ProductFormValues): UpdateProductGeneralRequest {
  return {
    name: textOrUndefined(values.name),
    productTypeCode: textOrUndefined(values.productTypeCode),
    statusCode: textOrUndefined(values.statusCode),
    sku: textOrUndefined(values.sku),
    barcode: textOrUndefined(values.barcode),
    shortDescription: textOrUndefined(values.shortDescription),
    description: textOrUndefined(values.description),
    unitOfMeasureId: textOrUndefined(values.unitOfMeasureId),
    commercialUnitId: textOrUndefined(values.commercialUnitId),
    taxableUnitId: textOrUndefined(values.taxableUnitId),
    spedItemTypeCode: textOrUndefined(values.spedItemTypeCode),
    originCode: textOrUndefined(values.originCode),
    ncm: textOrUndefined(values.ncm),
    cest: textOrUndefined(values.cest),
    gtinEan: textOrUndefined(values.barcode),
    trackInventory: values.trackInventory,
    initialStock: values.initialStock,
    minimumStock: values.minimumStock,
    maximumStock: values.maximumStock,
    storageLocation: textOrUndefined(values.storageLocation),
    preparationDays: values.preparationDays,
    batchControlEnabled: values.batchControlEnabled,
    packageTypeCode: textOrUndefined(values.packageTypeCode),
    netWeightKg: values.netWeightKg,
    grossWeightKg: values.grossWeightKg,
    widthCm: values.widthCm,
    heightCm: values.heightCm,
    lengthCm: values.lengthCm,
    price: values.price,
    promotionalPrice: values.promotionalPrice,
    costPrice: values.costPrice,
  }
}

export function toComplementaryPayload(
  values: ProductFormValues,
): UpdateProductComplementaryRequest {
  return {
    brandName: textOrUndefined(values.brandName),
    categoryId: textOrUndefined(values.categoryId),
    shortDescription: textOrUndefined(values.shortDescription),
    description: textOrUndefined(values.description),
    slug: textOrUndefined(values.slug),
    seoTitle: textOrUndefined(values.seoTitle),
    seoDescription: textOrUndefined(values.seoDescription),
    keywords: textOrUndefined(values.keywords),
    videoUrl: textOrUndefined(values.videoUrl),
  }
}

export function toAttributesPayload(
  values: ProductFormValues,
): ReplaceProductAttributesRequest {
  return {
    attributes: values.attributes
      .filter((item) => item.name.trim() && item.value.trim())
      .map((item, index) => ({
        name: item.name.trim(),
        value: item.value.trim(),
        sortOrder: item.sortOrder ?? index,
      })),
  }
}

export function toMarketplacePayload(
  values: ProductFormValues,
): ReplaceMarketplaceListingsRequest {
  return {
    listings: values.marketplaceListings
      .filter(hasMarketplaceChannelId)
      .map((item) => ({
        marketplaceChannelId: item.marketplaceChannelId,
        externalListingId: textOrUndefined(item.externalListingId ?? ""),
        externalSku: textOrUndefined(item.externalSku ?? ""),
        title: textOrUndefined(item.title ?? ""),
        description: textOrUndefined(item.description ?? ""),
        listingUrl: textOrUndefined(item.listingUrl ?? ""),
        active: item.active ?? false,
      })),
  }
}

export function toKitPayload(values: ProductFormValues): ReplaceKitItemsRequest {
  return {
    items: values.kitItems
      .filter((item) => item.childProductId && item.quantity > 0)
      .map((item) => ({
        childProductId: item.childProductId,
        quantity: item.quantity,
      })),
  }
}

export function toPricesPayload(
  values: ProductFormValues,
): ReplaceProductPricesRequest {
  return {
    prices: values.prices
      .filter((price) => Boolean(price.priceListId) && Number(price.price) >= 0)
      .map((price) => ({
        priceListId: price.priceListId,
        price: price.price,
        promotionalPrice: price.promotionalPrice,
        costPrice: price.costPrice,
        startsAt: price.startsAt,
        endsAt: price.endsAt,
      })),
  }
}

export function toCostsPayload(values: ProductFormValues): UpdateProductCostsRequest {
  return {
    priceListId: values.prices[0]?.priceListId,
    costPrice: values.costPrice ?? 0,
  }
}

export function toOtherPayload(values: ProductFormValues): UpdateProductOtherRequest {
  return {
    gtinTaxable: textOrUndefined(values.gtinTaxable),
    conversionFactor: values.conversionFactor,
    ipiFrameCode: textOrUndefined(values.ipiFrameCode),
    ipiLegalFrameCode: textOrUndefined(values.ipiLegalFrameCode),
    extipi: textOrUndefined(values.extipi),
    fixedIpiAmount: values.fixedIpiAmount,
  }
}
