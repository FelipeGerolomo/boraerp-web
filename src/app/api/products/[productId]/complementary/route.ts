import { NextResponse } from "next/server"
import { updateProductComplementary } from "@/features/product/api/server"
import { updateProductComplementarySchema } from "@/features/product/api/schemas"
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
    const body = updateProductComplementarySchema.parse(await request.json())
    const response = await updateProductComplementary(
      context.companyId,
      context.token,
      productId,
      body,
    )

    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Não foi possível salvar os dados complementares")
  }
}
