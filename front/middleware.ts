import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  // Si no hay token y la ruta es privada → redirigir a /auth
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Si hay token y está en /auth → redirigir al dashboard
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Aplica a todas las rutas excepto archivos estáticos y assets de Next.js
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
