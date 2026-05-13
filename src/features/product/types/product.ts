export type ProductListItem = {
  id: string
  name: string
  sku?: string
  barcode?: string
  status?: string
  type?: string
  price?: number
  trackInventory?: boolean
  createdAt?: string
  updatedAt?: string
}

export type PageableObject = {
  offset: number
  sort: { empty: boolean; sorted: boolean; unsorted: boolean }
  paged: boolean
  pageNumber: number
  pageSize: number
  unpaged: boolean
}

export type SortObject = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type ProductListPage = {
  totalElements: number
  totalPages: number
  pageable: PageableObject
  sort: SortObject
  numberOfElements: number
  first: boolean
  last: boolean
  size: number
  content: ProductListItem[]
  number: number
  empty: boolean
}

export type ProductSummary = {
  id: string
  companyId: string
  name: string
  status?: string
  type?: string
  createdAt?: string
  updatedAt?: string
}

export type ProductDetailLookup = {
  id: string
  code?: string
  name: string
}

export type ProductFiscalData = {
  spedItemTypeCode?: string
  originCode?: string
  ncm?: string
  cest?: string
  gtinEan?: string
  gtinTaxable?: string
  commercialUnitId?: string
  taxableUnitId?: string
  conversionFactor?: number
  ipiFrameCode?: string
  ipiLegalFrameCode?: string
  extipi?: string
  fixedIpiAmount?: number
}

export type ProductInventoryData = {
  trackInventory?: boolean
  allowBackorder?: boolean
  minimumStock?: number
  maximumStock?: number
  initialStock?: number
  storageLocation?: string
  preparationDays?: number
  batchControlEnabled?: boolean
}

export type ProductDimensionsData = {
  packageTypeId?: number
  packageTypeCode?: string
  netWeightKg?: number
  grossWeightKg?: number
  widthCm?: number
  heightCm?: number
  lengthCm?: number
}

export type ProductPriceData = {
  priceListId?: string
  price?: number
  promotionalPrice?: number
  costPrice?: number
  startsAt?: string
  endsAt?: string
}

export type ProductGeneralData = {
  fiscal?: ProductFiscalData
  inventory?: ProductInventoryData
  dimensions?: ProductDimensionsData
  price?: ProductPriceData
}

export type ProductSeo = {
  slug?: string
  title?: string
  description?: string
  keywords?: string
  videoUrl?: string
}

export type ProductImage = {
  id: string
  storageKey?: string
  url?: string
  altText?: string
  primary?: boolean
  sortOrder?: number
}

export type ProductComplementaryData = {
  seo?: ProductSeo
  images?: ProductImage[]
}

export type ProductAttribute = {
  id?: string
  name: string
  value: string
  sortOrder?: number
}

export type ProductMarketplaceListing = {
  id?: string
  marketplaceChannelId: number
  marketplaceChannelCode?: string
  externalListingId?: string
  externalSku?: string
  title?: string
  description?: string
  listingUrl?: string
  active?: boolean
}

export type ProductKitItem = {
  id?: string
  childProductId: string
  childProductName?: string
  quantity: number
}

export type ProductPrice = {
  id?: string
  priceListId: string
  priceListName?: string
  price: number
  promotionalPrice?: number
  costPrice?: number
  startsAt?: string
  endsAt?: string
}

export type ProductCompletion = {
  basic?: boolean
  fiscalReady?: boolean
  marketplaceReady?: boolean
  inventoryReady?: boolean
}

export type ProductDetail = {
  id: string
  companyId: string
  name: string
  status?: string
  type?: string
  sku?: string
  barcode?: string
  shortDescription?: string
  description?: string
  brand?: ProductDetailLookup
  category?: ProductDetailLookup
  unitOfMeasure?: ProductDetailLookup
  general?: ProductGeneralData
  complementary?: ProductComplementaryData
  attributes?: ProductAttribute[]
  marketplaceListings?: ProductMarketplaceListing[]
  kitItems?: ProductKitItem[]
  prices?: ProductPrice[]
  completion?: ProductCompletion
  createdAt?: string
  updatedAt?: string
}

export type ProductListFilters = {
  search?: string
  status?: string
  type?: string
  page?: number
  size?: number
}

export type CreateProductRequest = {
  name: string
}

export type UpdateProductGeneralRequest = {
  name?: string
  productTypeId?: number
  productTypeCode?: string
  statusId?: number
  statusCode?: string
  sku?: string
  barcode?: string
  shortDescription?: string
  description?: string
  unitOfMeasureId?: string
  isSellable?: boolean
  isPurchasable?: boolean
  spedItemTypeId?: number
  spedItemTypeCode?: string
  originCodeId?: number
  originCode?: string
  ncm?: string
  cest?: string
  gtinEan?: string
  commercialUnitId?: string
  taxableUnitId?: string
  trackInventory?: boolean
  initialStock?: number
  minimumStock?: number
  maximumStock?: number
  storageLocation?: string
  preparationDays?: number
  batchControlEnabled?: boolean
  packageTypeId?: number
  packageTypeCode?: string
  netWeightKg?: number
  grossWeightKg?: number
  widthCm?: number
  heightCm?: number
  lengthCm?: number
  price?: number
  promotionalPrice?: number
  costPrice?: number
  priceListId?: string
}

export type UpdateProductComplementaryRequest = {
  brandId?: string
  brandName?: string
  categoryId?: string
  shortDescription?: string
  description?: string
  slug?: string
  seoTitle?: string
  seoDescription?: string
  keywords?: string
  videoUrl?: string
}

export type ReplaceProductAttributesRequest = {
  attributes: Array<{ name: string; value: string; sortOrder?: number }>
}

export type ReplaceMarketplaceListingsRequest = {
  listings: Array<{
    marketplaceChannelId: number
    externalListingId?: string
    externalSku?: string
    title?: string
    description?: string
    listingUrl?: string
    active?: boolean
  }>
}

export type ReplaceKitItemsRequest = {
  items: Array<{ childProductId: string; quantity: number }>
}

export type ReplaceProductPricesRequest = {
  prices: Array<{
    priceListId: string
    price: number
    promotionalPrice?: number
    costPrice?: number
    startsAt?: string
    endsAt?: string
  }>
}

export type UpdateProductCostsRequest = {
  priceListId?: string
  costPrice: number
}

export type UpdateProductOtherRequest = {
  gtinTaxable?: string
  taxableUnitId?: string
  conversionFactor?: number
  ipiFrameCode?: string
  ipiLegalFrameCode?: string
  extipi?: string
  fixedIpiAmount?: number
}

export type SelectOption = {
  value: string
  label: string
}
