import { NextResponse } from "next/server"
import { updateProductOther } from "@/features/product/api/server"
import { updateProductOtherSchema } from "@/features/product/api/schemas"
import {
  getProductApiContext,
  handleProductRouteError,
  unauthorizedResponse,
} from "../../_lib"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const context = await getProductApiContext()
  if (!context) return unauthorizedResponse()

  try {
    const { productId } = await params
    const body = updateProductOtherSchema.parse(await request.json())
    const response = await updateProductOther(
      context.companyId,
      context.token,
      productId,
      body,
    )

    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Não foi possível salvar os outros dados do produto")
  }
}
