import { NextResponse } from "next/server"
import { getProduct } from "@/features/product/api/server"
import {
  getProductApiContext,
  handleProductRouteError,
  unauthorizedResponse,
} from "../_lib"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const context = await getProductApiContext()
  if (!context) {
    return unauthorizedResponse()
  }

  try {
    const { productId } = await params
    const response = await getProduct(context.companyId, context.token, productId)
    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Não foi possível carregar o produto")
  }
}
