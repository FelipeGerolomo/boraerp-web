import { NextResponse } from "next/server"
import { updateProductGeneral } from "@/features/product/api/server"
import { updateProductGeneralSchema } from "@/features/product/api/schemas"
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
    const body = updateProductGeneralSchema.parse(await request.json())
    const response = await updateProductGeneral(
      context.companyId,
      context.token,
      productId,
      body,
    )

    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Não foi possível salvar os dados gerais")
  }
}
