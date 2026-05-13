import { NextResponse } from "next/server"
import { replaceKitItems } from "@/features/product/api/server"
import { replaceKitItemsSchema } from "@/features/product/api/schemas"
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
    const body = replaceKitItemsSchema.parse(await request.json())
    const response = await replaceKitItems(
      context.companyId,
      context.token,
      productId,
      body,
    )

    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Não foi possível salvar os itens do kit")
  }
}
