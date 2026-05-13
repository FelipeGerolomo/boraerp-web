import { NextResponse } from "next/server"
import { replaceProductPrices } from "@/features/product/api/server"
import { replaceProductPricesSchema } from "@/features/product/api/schemas"
import {
  getProductApiContext,
  handleProductRouteError,
  unauthorizedResponse,
} from "../../_lib"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const context = await getProductApiContext()
  if (!context) return unauthorizedResponse()

  try {
    const { productId } = await params
    const body = replaceProductPricesSchema.parse(await request.json())
    const response = await replaceProductPrices(
      context.companyId,
      context.token,
      productId,
      body,
    )

    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Unable to save prices")
  }
}
