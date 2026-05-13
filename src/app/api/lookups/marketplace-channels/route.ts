import { NextResponse } from "next/server"
import { listMarketplaceChannelsLookup } from "@/features/lookup/api/server"
import {
  getLookupApiContext,
  handleLookupRouteError,
  unauthorizedResponse,
} from "../_lib"

export async function GET() {
  const context = await getLookupApiContext()
  if (!context) {
    return unauthorizedResponse()
  }

  try {
    const response = await listMarketplaceChannelsLookup(context.token)
    return NextResponse.json(response)
  } catch (error) {
    return handleLookupRouteError(error, "Não foi possível listar os canais de marketplace")
  }
}
