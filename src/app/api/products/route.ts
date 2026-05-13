import { NextResponse } from "next/server"
import {
  createProduct,
  listProducts,
} from "@/features/product/api/server"
import {
  createProductSchema,
  listProductsQuerySchema,
} from "@/features/product/api/schemas"
import {
  getProductApiContext,
  handleProductRouteError,
  unauthorizedResponse,
} from "./_lib"

export async function GET(request: Request) {
  const context = await getProductApiContext()
  if (!context) {
    return unauthorizedResponse()
  }

  try {
    const { searchParams } = new URL(request.url)
    const query = listProductsQuerySchema.parse({
      search: searchParams.get("search") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      size: searchParams.get("size") ?? undefined,
    })

    const response = await listProducts(context.companyId, context.token, query)
    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Não foi possível listar os produtos")
  }
}

export async function POST(request: Request) {
  const context = await getProductApiContext()
  if (!context) {
    return unauthorizedResponse()
  }

  try {
    const body = createProductSchema.parse(await request.json())
    const response = await createProduct(context.companyId, context.token, body)
    return NextResponse.json(response)
  } catch (error) {
    return handleProductRouteError(error, "Não foi possível criar o produto")
  }
}
