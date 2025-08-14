import { NextResponse, type NextRequest } from "next/server"

// No-op middleware: Supabase auth/admin has been removed.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

// Keep the matcher broad but behavior is pass-through.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
