import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "balance-web",
    timestamp: new Date().toISOString()
  });
}
