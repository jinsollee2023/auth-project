import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("accessToken");
  const fullPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (request.nextUrl.pathname.startsWith("/signup") && jwt) {
    return NextResponse.redirect(
      new URL("/?alert=접근 권한이 없습니다.", request.url)
    );
  }

  if (request.nextUrl.pathname.startsWith("/login") && jwt) {
    return NextResponse.redirect(
      new URL("/?alert=접근 권한이 없습니다.", request.url)
    );
  }

  if (request.nextUrl.pathname.startsWith("/profile") && !jwt) {
    return NextResponse.redirect(
      new URL(
        `/login?alert=로그인 후 이용 가능한 서비스입니다.&next=${fullPath}`,
        request.url
      )
    );
  }
}
