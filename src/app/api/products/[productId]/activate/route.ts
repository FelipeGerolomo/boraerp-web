import { NextResponse } from "next/server"
import { activateProduct } from "@/features/product/api/server"
import {
  getProductApiContext,
  handleProductRouteError,
  unauthorizedResponse,
} from "../../_lib"

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const context = await getProductApiContext()
  if (!context) return unauthorizedResponse()

  try {
    const { productId } = await params
    const response = await activateProduct(
      context.companyId,
      context.token,
      productId,
    )

    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Unable to activate product")
  }
}
