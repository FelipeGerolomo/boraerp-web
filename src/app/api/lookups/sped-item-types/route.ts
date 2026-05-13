import { NextResponse } from "next/server"
import { listSpedItemTypesLookup } from "@/features/lookup/api/server"
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
    const response = await listSpedItemTypesLookup(context.token)
    return NextResponse.json(response)
  } catch (error) {
    return handleLookupRouteError(error, "Unable to list SPED item types")
  }
}
