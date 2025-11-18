import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: "/user-info",
};