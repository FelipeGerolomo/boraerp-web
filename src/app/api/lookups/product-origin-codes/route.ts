import { NextResponse } from "next/server"
import { listProductOriginCodesLookup } from "@/features/lookup/api/server"
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
    const response = await listProductOriginCodesLookup(context.token)
    return NextResponse.json(response)
  } catch (error) {
    return handleLookupRouteError(error, "Unable to list product origin codes")
  }
}
